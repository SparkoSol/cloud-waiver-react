// import Input from "../../components/inputs/Input.jsx";
// import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
// import {useRef, useState} from "react";
// import SelectInput from "../../components/inputs/SelectInput.jsx";
// import DataTable from "../../components/DataTable.jsx";
// import CustomersRow from "../customers/components/CustomersRow.jsx";
// import {customerData} from "../../utils/generalFunctions.js";
// import {FolderIcon} from "@heroicons/react/20/solid";
//
// const CustomerList = () => {
//   const searchRef = useRef();
//   const [status, setStatus] = useState('Status');
//   const [selectedCount, setSelectedCount] = useState(0);
//   const [selectAll, setSelectAll] = useState(false);
//   return (
//     <section className='space-y-8'>
//       <div className='flex items-center gap-4'>
//         <Input placeholder='Search' inputRef={searchRef} BtnIcon={MagnifyingGlassIcon} inputClasses='rounded-md pl-11'
//                extraClasses='w-fit inline-block'/>
//         <SelectInput options={['Approved', 'Submitted', 'Declined', 'Pending']} setState={setStatus} state={status}
//                      extraClasses='w-[222px]'/>
//       </div>
//       {customerData.length > 0 ?
//         <DataTable TableRow={CustomersRow} items={customerData} setSelectedCount={setSelectedCount} setSelectAll={setSelectAll}
//                    headers={['ID', 'Signed Date', 'Refrence No', 'Template Name', 'Status']}/> :
//         <div className='text-center'>
//           <FolderIcon className='w-40 h-40 text-gray-400 mx-auto'/>
//           <span className='text-gray-500 mb-10 text-base'>No Waivers Found. Get started by creating a waiver</span>
//         </div>}
//     </section>
//   )
// }
// export default CustomerList

//TODO : remove this component