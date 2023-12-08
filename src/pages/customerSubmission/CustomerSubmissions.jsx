import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getRequest, patchRequest} from "../../redux/cwAPI";
import {addCheck, filterWaivers, updateAllSubmission} from "../../utils/generalFunctions";
import toast from 'react-hot-toast'
import SelectInput from "../../components/inputs/SelectInput";
import Input from "../../components/inputs/Input";
import DataTable from "../../components/DataTable";
import {FolderIcon} from "@heroicons/react/20/solid";
import Spinner from "../../components/Spinner";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import CustomerSubmissionRow from "./components/CustomerSubmissionRow";
import Button from "../../components/Button";

const CustomerSubmissions = ({currentTab = ''}) => {
  const [status, setStatus] = useState('Status');
  const [allWaivers, setAllWaivers] = useState([]);
  const [filteredWaivers, setFilteredWaivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState('');
  const [switchState, setSwitchState] = useState(false)
  const [selectedCount, setSelectedCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const {customerId} = useParams();
  useEffect(() => {
    setLoading(true)
    getRequest(`/submissions?customerId=${customerId}`)
      .then(r => {
        setAllWaivers(addCheck(r.data));
        setFilteredWaivers(addCheck(r.data))
      })
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false));
  }, [customerId, switchState]);

  const updateSubmissionStatus = async (id, status) => {
    setLoading(true)
    patchRequest(`/submissions/${id}`, {status})
      .finally(() => setLoading(false))
    setSwitchState(prev => !prev)
  }

  useEffect(() => {
    const data = filterWaivers(allWaivers, {
      status,
      search: search.toLowerCase()
    })
    setFilteredWaivers(addCheck(data))
    // eslint-disable-next-line
  }, [status, search])

  return (
    <section>
      <div className='flex items-center justify-between'>
        <div className='flex gap-3 flex-wrap grow'>
          <Input placeholder='Search' BtnIcon={MagnifyingGlassIcon} onChange={e => setSearch(e.target.value)}
                 extraClasses='w-fit inline-block grow sm:grow-0' inputClasses='rounded-md pl-11'/>
          <SelectInput extraClasses='w-1/6 grow sm:grow-0'
                       options={['Submitted', 'Approved', 'Declined', 'Pending', 'Status']} setState={setStatus}
                       state={status}/>p
        </div>
        {selectedCount > 0 && <div className='flex items-center gap-3'>
          <span className='text-gray-500'>Selected : {selectedCount}</span>
          <Button btnText='Approve' btnClasses='bg-green-700' fullWidth='w-fit'
                  onClick={() => updateAllSubmission('approved', setSwitchState, setSelectedCount, setLoading, filteredWaivers)}/>
          <Button btnText='Decline' btnClasses='bg-red-500' fullWidth='w-fit'
                  onClick={() => updateAllSubmission('declined', setSwitchState, setSelectedCount, setLoading, filteredWaivers)}/>
        </div>}
      </div>
      {
        allWaivers.length > 0 ?
          <DataTable
            headers={['Reference No','Signed Date', 'Template Name', 'Status']}
            setSelectedCount={setSelectedCount}
            TableRow={CustomerSubmissionRow} items={filteredWaivers} setSelectAll={setSelectAll}
            selectAll={selectAll} deleteRow={updateSubmissionStatus}
            setState={setFilteredWaivers}/> :
          <div className='text-center mt-4'>
            <FolderIcon className='w-40 h-40 text-gray-400 mx-auto'/>
            <span className='text-gray-500 mb-10 text-base'>No Waivers Found. Get started by creating a waiver</span>
          </div>
      }
      {loading && <Spinner/>}
    </section>
  )
}

export default CustomerSubmissions