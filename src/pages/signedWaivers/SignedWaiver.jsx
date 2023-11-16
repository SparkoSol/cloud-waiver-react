import Heading from "../../components/Heading";
import {FolderIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import Input from "../../components/inputs/Input";
import SelectInput from "../../components/inputs/SelectInput";
import DataTable from "../../components/DataTable";
import {DashBoardHeaders, generateMonths, generateYears} from "../../utils/generalFunctions";
import DashboardRow from "../dashboard/components/DashboardRow";
import Spinner from "../../components/Spinner";
import {useRef, useState} from "react";
import Button from "../../components/Button";

const SignedWaivers = () => {
  const searchRef = useRef();
  const [allWaivers, setAllWaivers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState('Template');
  const [month, setMonth] = useState('Month');
  const [year, setYear] = useState('Year');
  const [status, setStatus] = useState('Status');
  const selectData = [{
    options: ['Submitted', 'Approved', 'Declined', 'Pending', 'Status'], state: status, setState: setStatus
  }, {
    options: ['Template'], state: template, setState: setTemplate
  }, {
    options: generateMonths(12), state: month, setState: setMonth
  }, {
    options: generateYears(2005), state: year, setState: setYear
  }]
  return (<section>
      <Heading title='My Waivers List' titleClasses='text-xl text-gray-800 py-2'/>
      <div className='flex gap-2 mb-4 flex-wrap'>
        <Input placeholder='Search' inputRef={searchRef} BtnIcon={MagnifyingGlassIcon} inputClasses='rounded-md pl-11'
               extraClasses='w-fit inline-block'/>
        {selectData.map((item, index) => {
          return <SelectInput extraClasses='grow md:grow-0 w-28' key={index} options={item.options} state={item.state}
                              setState={item.setState}/>
        })}
        {selectedCount > 0 && <>
          <span className='text-gray-500'>Selected : {selectedCount}</span>
          <Button btnText='Archive' btnClasses='bg-red-500' fullWidth='w-fit'/></>}
      </div>
      {allWaivers.length > 0 ?
        <DataTable headers={DashBoardHeaders} TableRow={DashboardRow} items={allWaivers} setSelectAll={setSelectAll}
                   selectAll={selectAll} setSelectedCount={setSelectedCount}
                   setState={setAllWaivers}/> : <div className='text-center mt-4'>
          <FolderIcon className='w-40 h-40 text-gray-400 mx-auto mt-20'/>
          <span className='text-gray-500 mb-10 text-base'>No Waivers Found. Get started by creating a waiver</span>
        </div>}
      {loading && <Spinner/>}
    </section>)
}

export default SignedWaivers;