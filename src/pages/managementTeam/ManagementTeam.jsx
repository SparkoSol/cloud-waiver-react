import Heading from "../../components/Heading.jsx";
import Input from "../../components/inputs/Input.jsx";
import {useRef} from "react";
import CheckboxInput from "../../components/inputs/CheckboxInput.jsx";
import Button from "../../components/Button.jsx";
import DataTable from "../../components/DataTable.jsx";
import TeamRow from "./components/TeamRow.jsx";
import {teamData} from "../../utils/generalFunctions.js";
import {Link} from "react-router-dom";

const ManagementTeam = () => {
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
    {id: 10, label: 'Api Management', ref: apiRef},
    {id: 1, label: 'Billing', ref: billingRef},
    {id: 2, label: 'Customers', ref: customersRef},
    {id: 3, label: 'Kiosk Settings', ref: kioskSettingsRef},
    {id: 4, label: 'Team Management', ref: teamManagementRef},
    {id: 5, label: 'Template Creation', ref: templateCreationRef},
    {id: 6, label: 'Template Editing', ref: templateEditingRef},
    {id: 7, label: 'Template Gallery', ref: templateGalleryRef},
    {id: 8, label: 'Waiver Submissions', ref: waiverSubmissionsRef},
    {id: 9, label: 'Webhooks Management', ref: webhooksManagementRef}
  ];
  return (
    <section className='space-y-6 xs:px-6'>
      <h1 className='text-2xl font-bold leading-tight text-gray-900'>Admins</h1>
      <div className='flex justify-between items-start gap-4 flex-col md:flex-row'>
        <Heading title='Team Information' subtitle='Please provide details about this team'
                 titleClasses='text-xl font-semibold'
                 subTitleClasses='text-sm text-gray-600'/>
        <div className='w-full md:w-8/12 bg-white rounded-md p-6 shadow-sm'>
          <Input inputRef={inputRef} label='Team Name' value='Admin' placeholder='Admin' inputClasses='pl-4'
                 extraClasses='w-full'/>
        </div>
      </div>

      <div className='flex justify-between items-start gap-4 flex-col md:flex-row'>
        <Heading title='Team Permissions' subtitle='Choose what your team may access'
                 titleClasses='text-xl font-semibold'
                 subTitleClasses='text-sm text-gray-600'/>
        <div className='w-full md:w-8/12 bg-white rounded-md p-6 shadow-sm'>
          <h1 className='text-base font-bold text-gray-500 mb-2'>Permissions</h1>
          <div className='space-y-4 mt-5 border-b py-6'>
            {menuItems.map(item => {
              return <CheckboxInput key={item.id} inputRef={item.ref} label={item.label}
                                    extraClasses='text-sm text-gray-700'/>
            })}
          </div>
          <Button btnText='Update Permissions' fullWidth='w-fit pt-6 ml-auto'
                  btnClasses='bg-textDark border-textDark px-6 py-2.5'/>
        </div>
      </div>

      <div className='flex justify-between items-start gap-4 flex-col md:flex-row'>
        <Heading title='Team Users' subtitle='Add users to your team'
                 titleClasses='text-xl font-semibold'
                 subTitleClasses='text-sm text-gray-600'/>
        <div className='w-full md:w-8/12 bg-white space-y-6 rounded-md p-6 shadow-sm'>
          <Link to={'/management/team/123/user/create'}
                className='bg-textDark border-textDark px-6 py-2.5 w-fit block ml-auto text-white rounded-full text-sm font-semibold'>Add User</Link>
          <DataTable TableRow={TeamRow} items={teamData} headers={['Name', 'Email']} colspan={0}/>
        </div>
      </div>
    </section>
  )
}

export default ManagementTeam