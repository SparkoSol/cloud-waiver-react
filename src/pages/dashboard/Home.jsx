import {MagnifyingGlassIcon} from "@heroicons/react/24/outline/index.js";
import Card from "./components/Card.jsx";
import {useEffect, useRef, useState} from "react";
import {dashboardData, DashBoardHeaders, generateMonths, generateYears} from "../../utils/generalFunctions.js";
import SelectInput from "../../components/inputs/SelectInput.jsx";
import Input from "../../components/inputs/Input.jsx";
import DataTable from "../../components/DataTable.jsx";
import {FolderIcon} from "@heroicons/react/20/solid/index.js";
import DashboardRow from "./components/DashboardRow.jsx";
import Button from "../../components/Button.jsx";
import clipboardIcon from "@heroicons/react/20/solid/esm/ClipboardIcon.js";
import Modal from "../../components/modals/Modal.jsx";
import axios from "axios";

const data = [
  {
    id: 1, title: 'Usage', value: '50', icon: '/database.svg'
  }, {
    id: 2, title: 'Templates', value: '50', icon: '/wallet.svg'
  }, {
    id: 3, title: 'Signed', value: '50', icon: '/pulse.svg'
  },
  {
    id: 4, title: 'Followers', value: '50', icon: '/twitter.svg'
  }
]

const Dashboard = () => {
  const searchRef = useRef();
  const [template, setTemplate] = useState('Template');
  const [month, setMonth] = useState('Month');
  const [year, setYear] = useState('Year');
  const [status, setStatus] = useState('Status');
  const [openModal, setOpenModal] = useState(false);

  const selectData = [{
    options: ['Submitted', 'Approved', 'Declined', 'Pending', 'Status'], state: status, setState: setStatus
  }, {
    options: ['Template'], state: template, setState: setTemplate
  }, {
    options: generateMonths(12), state: month, setState: setMonth
  }, {
    options: generateYears(2005), state: year, setState: setYear
  }]

  useEffect(() => {
    axios.get('https://cloudwaiver.sparkosol.com').then(r => console.log(r)).catch(e => console.log(e))
  }, []);

  return (
    <div>
      <div className=''>
        <h1 className='text-xl font-semibold mb-5'>Dashboard</h1>
        <div
          className='grid gap-3 grid-cols-1 grid-rows-4 sm:grid-rows-2 sm:grid-cols-2 md:grid-rows-1 md:grid-cols-4 mb-5'>
          {data.map(item => {
            return (
              <Card key={item.id} item={item}/>
            )
          })}
        </div>
      </div>
      <div>
        <div className='flex justify-between'>
          <h1 className='text-xl font-semibold my-5'>Recent waiver</h1>
          <Button BtnIcon={clipboardIcon}
                  btnText='Create waivers'
                  onClick={() => setOpenModal(true)}
                  btnClasses='bg-btnBg border-btnBg px-5 py-2.5'
                  iconClasses='w-4 h-4 text-white inline-block ml-2'/>
        </div>
        <div className='flex gap-2 mb-4 flex-wrap'>
          <Input placeholder='Search' inputRef={searchRef} BtnIcon={MagnifyingGlassIcon} inputClasses='rounded-md pl-11'
                 extraClasses='w-fit inline-block'/>
          {selectData.map((item, index) => {
            return <SelectInput extraClasses='grow md:grow-0 w-28' key={index} options={item.options} state={item.state}
                                setState={item.setState}/>
          })}
        </div>
        <div>
          {dashboardData.length > 0 ?
            <DataTable headers={DashBoardHeaders} TableRow={DashboardRow} items={dashboardData}
            /> : <div className='text-center mt-4'>
              <FolderIcon className='w-40 h-40 text-gray-400 mx-auto'/>
              <span className='text-gray-500 mb-10 text-base'>No Waivers Found. Get started by creating a waiver</span>
            </div>}
        </div>
      </div>
      <Modal open={openModal} setOpen={setOpenModal}/>
    </div>
  );
};

export default Dashboard;

// useEffect(() => {
//   async function fetchData() {
//     const response = await axios.get("http://192.168.1.36:3000", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(response.data);
//   }
//   fetchData();
// }, []);
