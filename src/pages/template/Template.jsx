import Button from "../../components/Button";
import DataTable from "../../components/DataTable";
import {ClipboardIcon, FolderIcon} from "@heroicons/react/24/outline";
import React, {useMemo, useState} from "react";
import Spinner from "../../components/Spinner";
import Modal from "../../components/modals/Modal";
import {getRequest, patchRequest, postRequest} from "../../redux/cwAPI";
import TemplateRow from "./components/TemplateRow";
import {addCheck} from "../../utils/generalFunctions";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {allPermissions} from "../../redux/team/teamSlice";
import SelectInput from "../../components/inputs/SelectInput";

const options = ['all', 'draft', 'active', 'archived'];

function Template() {
  const permissions = useSelector(allPermissions);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTemplates, setAllTemplates] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [duplicate, setDuplicate] = useState({
    btnText: 'Submit',
    title: 'New Template',
    description: '',
    label: 'Please enter your template name',
    index: null,
    error: null
  })
  const [selectedCount, setSelectedCount] = useState(0);
  const [templateStatus, setTemplateStatus] = useState('all')

  useMemo(() => {
    setLoading(true);
    let temp = templateStatus === 'active' ? 'published&statuses=published' : (templateStatus === 'all' ? `published&statuses=draft` : `${templateStatus}&statuses=${templateStatus}`)
    getRequest(`/waivers?statuses=${temp}`)
      .then(r => setAllTemplates(addCheck(r.data)))
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false));
    setSelectedCount(0)
  }, [templateStatus])
  const handleSubmit = (name, type) => {
    if (name === 'cancel') {
      setDuplicate({
        btnText: 'Submit',
        title: 'New Template',
        description: '',
        label: 'Please enter your template name',
        index: null,
        error: null
      })
      setOpenModal(false)
      return;
    }
    if (name?.trim() === '') {
      setDuplicate(prevState => ({...prevState, error: 'Name is required'}))
      return;
    }
    setLoading(true);
    setOpenModal(false)
    let body;
    setLoading(true)
    if (type === 'Confirmation') {
      let removedIds = [];
      allTemplates.forEach(item => {
        if (item.checked) {
          removedIds.push(item._id);
        }
      });
      patchRequest('/waivers/update-multiple', {
        waiver_ids: removedIds,
        status: 'archived'
      }).then(e => {
        setSelectedCount(0)
      })
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

  function deleteRow(id, idx, status) {
    setLoading(true)
    let newData = [
      ...allTemplates.slice(0, idx),
      ...allTemplates.slice(idx + 1),
    ];

    patchRequest('/waivers/update-multiple', {
      waiver_ids: [id],
      status: status
    }).then(e => {
      setAllTemplates(newData)
    })
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
      <h1 className='text-xl font-semibold'>Templates</h1>
      <div>
        <div className='flex justify-between pb-6 items-center gap-4 flex-wrap grow'>
          <span className='text-sm font-semibold text-gray-600'>List of all templates you've created.</span>
          <div
            className='flex gap-2 items-center justify-center md:justify-end flex-wrap md:flex-nowrap mx-auto sm:mx-0'>
            <SelectInput extraClasses='w-36' options={options}
                         state={templateStatus}
                         setState={setTemplateStatus}/>
            {selectedCount > 0 && templateStatus !== 'archived' && <>
              <Button btnText={`Archive (${selectedCount})`} type='button' onClick={handleDelete}
                      btnClasses='bg-red-500 px-5'
              /></>}
            {permissions.includes("template_creation") && <Button BtnIcon={ClipboardIcon}
                                                                  btnText='Create waivers'
                                                                  type='button'
                                                                  onClick={() => {
                                                                    setOpenModal(true);
                                                                    setDuplicate(prev => ({...prev, index: null}));
                                                                  }}
                                                                  btnClasses='bg-btnBg border-btnBg px-5 py-2.5'
                                                                  iconClasses='w-4 h-4 text-white inline-block ml-2'/>}
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
      <Modal open={openModal} functionCall={handleSubmit} {...duplicate}/>
      {loading && <Spinner/>}
    </div>
  )
}

export default Template;