import Heading from "../../components/Heading.jsx";
import Input from "../../components/inputs/Input.jsx";
import {useEffect, useRef, useState} from "react";
import CheckboxInput from "../../components/inputs/CheckboxInput.jsx";
import Button from "../../components/Button.jsx";
import DataTable from "../../components/DataTable.jsx";
import TeamRow from "./components/TeamRow.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getSingleTeam, removeMember, updateTeam} from "../../redux/team/teamThunk.js";
import {currentTeamStatus, selectCurrentTeam} from "../../redux/team/teamSlice.js";
import Spinner from "../../components/Spinner.jsx";
import Modal from "../../components/modals/Modal";
import toast from 'react-hot-toast'
const ManagementTeam = () => {
  const selectedTeam = useSelector(selectCurrentTeam);
  const status = useSelector(currentTeamStatus)
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState({teamId: '', memberId: '', index: 0, isOpen: false});
  const {id} = useParams();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const apiRef = useRef();
  const billingRef = useRef();
  const customersRef = useRef();
  const kioskSettingsRef = useRef();
  const teamManagementRef = useRef();
  const templateCreationRef = useRef();
  const templateEditingRef = useRef();
  const templateGalleryRef = useRef();
  const waiverSubmissionsRef = useRef();
  const webhooksManagementRef = useRef();
  const menuItems = [
    {id: 10, label: 'Api Management', ref: apiRef, value: 'api_management'},
    {id: 1, label: 'Billing', ref: billingRef, value: 'billing'},
    {id: 2, label: 'Customers', ref: customersRef, value: 'customers'},
    {id: 3, label: 'Kiosk Settings', ref: kioskSettingsRef, value: 'kiosk_settings'},
    {id: 4, label: 'Team Management', ref: teamManagementRef, value: 'team_management'},
    {id: 5, label: 'Template Creation', ref: templateCreationRef, value: 'template_creation'},
    {id: 6, label: 'Template Editing', ref: templateEditingRef, value: 'template_editing'},
    {id: 7, label: 'Template Gallery', ref: templateGalleryRef, value: 'template_gallery'},
    {id: 8, label: 'Waiver Submissions', ref: waiverSubmissionsRef, value: 'waiver_submissions'},
    {id: 9, label: 'Webhooks Management', ref: webhooksManagementRef, value: 'webhooks_management'}
  ];
  useEffect(() => {
    if (id) {
      setLoading(true)
      dispatch(getSingleTeam(id))
        .then(r => inputRef.current.value = r.payload?.name)
        .finally(() => setLoading(false))
    }
    // eslint-disable-next-line
  }, [id]);

  function handleUpdate(e) {
    e.preventDefault();
    const body = {
      name: inputRef.current.value,
      permissions: []
    }
    for (const item of menuItems) {
      if (item.ref.current.checked) {
        body.permissions.push(item.value);
      }
    }
    setLoading(true)
    dispatch(updateTeam({teamId: id, body})).unwrap()
      .then(() => toast.success('Permissions updated successfully'))
      .catch(e => setLoading(false))
      .finally(() => setLoading(false));
  }

  function handleDelete(name) {
    if (name === 'cancel') {
      setConfirmOpen(prev => ({...prev, isOpen: false}));
      return
    }
    setLoading(true);
    dispatch(removeMember(confirmOpen))
      .finally(() => {
        setLoading(false);
        setConfirmOpen({teamId: '', memberId: '', index: 0, isOpen: false})
      })
  }

  return (
    <>
      <section className='space-y-6 xs:px-6'>
        <h1 className='text-2xl font-bold leading-tight text-gray-900'>Admins</h1>
        <div className='flex justify-between items-start gap-4 flex-col md:flex-row'>
          <Heading title='Team Information' subtitle='Please provide details about this team'
                   titleClasses='text-xl font-semibold'
                   subTitleClasses='text-sm text-gray-600'/>
          <div className='w-full md:w-8/12 bg-white rounded-md p-6 shadow-sm'>
            <Input inputRef={inputRef} label='Team Name' value={selectedTeam?.name} placeholder="Your team's name"
                   inputClasses='pl-4'
                   extraClasses='w-full'/>
          </div>
        </div>

        <div className='flex justify-between items-start gap-4 flex-col md:flex-row'>
          <Heading title='Team Permissions' subtitle='Choose what your team may access'
                   titleClasses='text-xl font-semibold'
                   subTitleClasses='text-sm text-gray-600'/>
          <form onSubmit={handleUpdate} className='w-full md:w-8/12 bg-white rounded-md p-6 shadow-sm'>
            <h1 className='text-base font-bold text-gray-500 mb-2'>Permissions</h1>
            <div className='space-y-4 border-b py-6'>
              {(selectedTeam && status === 'fulfilled') ? menuItems.map(item => {
                return <CheckboxInput key={item.id} inputRef={item.ref} label={item.label}
                                      defaultChecked={selectedTeam?.permissions.includes(item.value)}
                                      extraClasses='text-sm text-gray-700'/>
              }) : <span>Loading...</span>}
              {!selectedTeam && menuItems.map(item => {
                return <CheckboxInput key={item.id} inputRef={item.ref} label={item.label}
                                      extraClasses='text-sm text-gray-700'/>
              })}
            </div>
            <Button btnText='Update Permissions' fullWidth='w-fit pt-6 ml-auto'
                    btnClasses='bg-bgDark border-textDark px-6 py-2.5'/>
          </form>
        </div>

        <div className='flex justify-between items-start gap-4 flex-col md:flex-row'>
          <Heading title='Team Users' subtitle='Add users to your team'
                   titleClasses='text-xl font-semibold'
                   subTitleClasses='text-sm text-gray-600'/>
          <div className='w-full md:w-8/12 bg-white space-y-6 rounded-md p-6 shadow-sm'>
            <Link to={`/management/team/${id}/user/create`}
                  className='bg-bgDark border-textDark px-6 py-2.5 w-fit block ml-auto text-white rounded-full text-sm font-semibold'>Add
              User</Link>
            <DataTable TableRow={TeamRow} items={selectedTeam?.members || []} headers={['Name', 'Email']} colspan={0}
                       setOpen={setConfirmOpen}/>
          </div>
        </div>
        <Modal title='Are you sure you want to delete this item?'
               description='This action cannot be undone. Deleting the item will remove it permanently from your records.'
               open={confirmOpen.isOpen}
               btnText='Confirm' functionCall={handleDelete}
        />
      </section>
      {loading && <Spinner/>}
    </>
  )
}

export default ManagementTeam