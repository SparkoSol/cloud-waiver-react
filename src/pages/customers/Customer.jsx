import Heading from "../../components/Heading.jsx";
import DataTable from "../../components/DataTable.jsx";
import CustomersRow from "./components/CustomersRow.jsx";
import {customerData} from "../../utils/generalFunctions.js";
import Input from "../../components/inputs/Input.jsx";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline/index.js";
import {useRef} from "react";

const Customer = () => {
  const searchRef = useRef();
  return (
    <div className="bg-white rounded-md p-6 w-full">
      <Heading subTitleClasses='text-sm text-gray-900' subtitle='lorem ipsum mit dollar' title='Customer'
               titleClasses='font-semibold text-xl'/>
      <div className='mt-6'>
        <Input placeholder='Search' inputRef={searchRef} BtnIcon={MagnifyingGlassIcon} inputClasses='rounded-md pl-11'
               extraClasses='w-fit inline-block mb-6'/>
        <DataTable TableRow={CustomersRow} items={customerData}
                   headers={['ID', 'FIRST NAME', 'LAST NAME', 'EMAIL', 'WAIVERS COUNT']}/>
      </div>
    </div>
  )
}

export default Customer