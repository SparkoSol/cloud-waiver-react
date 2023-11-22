import Button from "../../components/Button";
import DataTable from "../../components/DataTable";
import {ClipboardIcon, FolderIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import Spinner from "../../components/Spinner";
import Modal from "../../components/modals/Modal";
import {deleteRequest, getRequest, patchRequest, postRequest} from "../../redux/cwAPI";
import TemplateRow from "./components/TemplateRow";
import {addCheck} from "../../utils/generalFunctions";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

function Template() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTemplates, setAllTemplates] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [switchState, setSwitchState] = useState(false);
  const [duplicate, setDuplicate] = useState({
    btnText: 'Submit',
    title: 'New Template',
    description: '',
    label: 'Please enter your template name',
    index: null
  })
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    getRequest('/waivers?statuses=draft&statuses=published')
      .then(r => setAllTemplates(addCheck(r.data, 't')))
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false));
  }, [switchState]);

  const handleSubmit = (name, type) => {
    setLoading(true);
    setOpenModal(false)
    let body;
    setLoading(true)
    if (type === 'Confirmation') {
      let removedIds = allTemplates.map(item => {
        if (item.checked) {
          return item._id
        }
      })
      patchRequest('/waivers/update-multiple', {
        waiver_ids: removedIds,
        status: 'archived'
      }).then(e => setSwitchState(prev => !prev))
        .finally(() => setLoading(false))
      return
    }
    if (type === 'Duplicate Template') body = {...allTemplates[duplicate.index], name}
    else body = {name}

    postRequest(`/waivers`, body)
      .then(r => navigate(`/templates/${r.data._id}/builder`))
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false))
  }

  function customOpenModal(bool, index) {
    setOpenModal(true);
    setDuplicate({
      btnText: 'Duplicate Template',
      title: 'Duplicate Template',
      description: '',
      label: 'Please provide name for the duplicate template',
      index
    })
  }

  function deleteRow(id, idx) {
    setLoading(true)
    const newData = [
      ...allTemplates.slice(0, idx),
      ...allTemplates.slice(idx + 1),
    ];
    deleteRequest(`/waivers/${id}`)
      .then(r => setAllTemplates(newData))
      .finally(() => setLoading(false))
  }

  function handleDelete() {
    setDuplicate({
      btnText: 'Yes, Delete',
      title: 'Confirmation',
      description: 'Are you sure you want to delete these templates?',
    })
    setOpenModal(true)
  }

  return (
    <div>
      <h1 className='text-xl font-semibold mb-5'>Templates</h1>
      <div>
        <div className='flex justify-between pb-6'>
          <span className='text-sm font-semibold text-gray-600'>List of all templates you've created.</span>
          <div className='flex gap-2 items-center'>
            {selectedCount > 0 && <>
              <span className='text-gray-500'>Selected : {selectedCount}</span>
              <Button btnText='Archive' onClick={handleDelete} btnClasses='bg-red-500' fullWidth='w-fit'/></>}
            <Button BtnIcon={ClipboardIcon}
                    btnText='Create waivers'
                    onClick={() => {
                      setOpenModal(true);
                      setDuplicate(prev => ({...prev, index: null}));
                    }}
                    btnClasses='bg-btnBg border-btnBg px-5 py-2.5'
                    iconClasses='w-4 h-4 text-white inline-block ml-2'/>
          </div>
        </div>
        <div>
          {allTemplates.length > 0 ?
            <DataTable selectAll={selectAll} setSelectAll={setSelectAll}
                       headers={['Name', 'Total Waivers', 'Status']} TableRow={TemplateRow} items={allTemplates}
                       setState={setAllTemplates} setSelectedCount={setSelectedCount}
                       deleteRow={deleteRow} customOpenModal={customOpenModal}/> : <div className='text-center mt-4'>
              <FolderIcon className='w-40 h-40 text-gray-400 mx-auto'/>
              <span className='text-gray-500 mb-10 text-base'>No Waivers Found. Get started by creating a waiver</span>
            </div>}
        </div>
      </div>
      <Modal open={openModal} setOpen={setOpenModal} functionCall={handleSubmit} {...duplicate}/>
      {loading && <Spinner/>}
    </div>
  )
}

export default Template;