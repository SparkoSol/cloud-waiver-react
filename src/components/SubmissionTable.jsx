import React, {useEffect, useState} from 'react';
import Input from "./inputs/Input";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import SelectInput from "./inputs/SelectInput";
import DataTable from "./DataTable";
import {addCheck, DashBoardHeaders, filterWaivers, generateMonths, generateYears} from "../utils/generalFunctions";
import DashboardRow from "../pages/dashboard/components/DashboardRow";
import {FolderIcon} from "@heroicons/react/20/solid";
import {getRequest, patchRequest} from "../redux/cwAPI";
import toast from "react-hot-toast";
import Button from "./Button";
import {useSelector} from "react-redux";
import Spinner from "./Spinner";

const SubmissionTable = ({title}) => {

  const [template, setTemplate] = useState('Template');
  const [month, setMonth] = useState('Month');
  const [year, setYear] = useState('Year');
  const [status, setStatus] = useState('All');
  const [templateMenu, setTemplateMenu] = useState(
    {
      options: ['Template'], state: template, setState: setTemplate
    });

  const selectData = [
    {
      options: ['Submitted', 'Approved', 'Declined', 'All'], state: status, setState: setStatus
    },
    {
      options: generateMonths(12), state: month, setState: setMonth
    },
    {
      options: generateYears(2005), state: year, setState: setYear
    }]


  const [allWaivers, setAllWaivers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filteredWaivers, setFilteredWaivers] = useState([]);
  const [search, setSearch] = useState('');
  // const searchRef = useRef();


  const [selectedCount, setSelectedCount] = useState(0);
  const selectedWaivers = useSelector(state => state.waivers.selectedWaivers)
  const [refetch, setRefetch] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getRequest('/submissions')
      .then(r => {
        const data = addCheck(r.data)
        setAllWaivers(data)
        setFilteredWaivers(data)
        const templateNames = [...new Set(data.map(item => item.waiver.name))]
        setTemplateMenu({options: ['Template', ...templateNames], state: template, setState: setTemplate})
        setLoading(false)
      })
      .catch(e => {
        setLoading(false);
        toast.error(e.response?.data.message || 'Something went wrong!')
      })
    // eslint-disable-next-line
  }, [refetch]);


  useEffect(() => {
    const data = filterWaivers(allWaivers, {
      status,
      month,
      year,
      template,
      search: search.toLowerCase()
    })
    setFilteredWaivers(addCheck(data))
    // eslint-disable-next-line
  }, [status, template, search, month, year])

  const resetStates = () => {
    setStatus('All')
    setMonth('Month')
    setYear('Year')
    setTemplate('Template')
    setSearch('')
    // searchRef.current.value = ''
  }


  const updateSubmissionStatus = async (id, status) => {
    setLoading(true)
    await patchRequest(`/submissions/${id}`, {status})

    getRequest('/submissions')
      .then(r => {
        const data = addCheck(r.data)
        setAllWaivers(data)
        setFilteredWaivers(data)
        setLoading(false)
        resetStates()
      })
      .catch(e => {
        setLoading(false);
        toast.error(e.response.data.message)
      })
  }

  async function updateStatus(status) {
    setLoading(true)
    const arr = selectedWaivers.reduce((result, item) => {
      if (item.checked) {
        result.push(item._id);
      }
      return result;
    }, []);
    patchRequest(`/submissions/update-multiple`, {
      status: status,
      submission_ids: arr
    })
      .then(() => {
        setRefetch(prev => !prev);
        setSelectedCount(0);
      })
      .catch(e => toast(e.response.data.message))
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className='flex justify-between gap-3 flex-wrap my-5'>
        <h1 className='text-xl font-semibold'>{title}</h1>
        <div className='flex items-center gap-1'>
          {selectedCount > 0 && <>
            <Button btnText={`Approve (${selectedCount})`}
                    btnClasses='bg-green-700 text-xs whitespace-nowrap px-2.5 py-1.5 sm:text-sm px-4 py-2' fullWidth='w-fit'
                    onClick={() => updateStatus('approved')}/>
            <Button btnText={`Decline (${selectedCount})`}
                    btnClasses='bg-red-500 text-xs whitespace-nowrap px-2.5 py-1.5 sm:text-sm px-4 py-2' fullWidth='w-fit'
                    onClick={() => updateStatus('declined')}/>
          </>}
        </div>
      </div>
      <div className='flex gap-2 mb-4 flex-wrap'>
        <Input placeholder='Search' BtnIcon={MagnifyingGlassIcon}
               inputClasses='rounded-md pl-11 grow sm:grow-0'
               extraClasses='w-fit inline-block grow sm:grow-0'
               onChange={(e) => {
                 setSearch(e.target.value)
               }}
        />
        <SelectInput extraClasses='grow md:grow-0 w-32' options={templateMenu.options} state={template}
                     setState={setTemplate}/>
        {selectData.map((item, index) => {
          return <SelectInput extraClasses='grow md:grow-0 w-28' key={index} options={item.options}
                              state={item.state}
                              setState={item.setState}/>
        })}
        <Button
          btnText='Reset'
          onClick={resetStates}
          btnClasses='bg-btnBg border-btnBg px-4 py-1.5 sm:ml-4'/>
      </div>
      <div>
        {filteredWaivers.length > 0 ?
          <DataTable headers={DashBoardHeaders} TableRow={DashboardRow} items={filteredWaivers}
                     setState={setFilteredWaivers} selectAll={selectAll} setSelectAll={setSelectAll}
                     deleteRow={updateSubmissionStatus} setSelectedCount={setSelectedCount}
          /> : <div className='text-center mt-4'>
            <FolderIcon className='w-40 h-40 text-gray-400 mx-auto'/>
            <span className='text-gray-500 mb-10 text-base'>No Waivers Found. Get started by creating a waiver</span>
          </div>}
      </div>
      {loading && <Spinner/>}
    </>
  );
};

export default SubmissionTable;