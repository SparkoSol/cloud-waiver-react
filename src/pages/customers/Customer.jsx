import Heading from "../../components/Heading.jsx";
import DataTable from "../../components/DataTable.jsx";
import CustomersRow from "./components/CustomersRow.jsx";
import Input from "../../components/inputs/Input.jsx";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline/index.js";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {getAllCustomers} from "../../redux/customers/customerThunk.js";
import Spinner from "../../components/Spinner.jsx";

const Customer = () => {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const dispatch = useDispatch();
  const searchRef = useRef();

  useEffect(() => {
    fetchAllCustomers().then(()=>{})
  }, []);

  async function fetchAllCustomers() {
    setLoading(true)
    let resp = await dispatch(getAllCustomers());
    setCustomers(resp.payload)
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-md p-6 w-full">
      <Heading subTitleClasses='text-sm text-gray-900' subtitle='lorem ipsum mit dollar' title='Customer'
               titleClasses='font-semibold text-xl'/>
      <div className='mt-6'>
        <Input placeholder='Search' inputRef={searchRef} BtnIcon={MagnifyingGlassIcon} inputClasses='rounded-md pl-11'
               extraClasses='w-fit inline-block mb-6'/>
        <DataTable TableRow={CustomersRow} items={customers}
                   headers={['ID', 'FIRST NAME', 'LAST NAME', 'EMAIL', 'WAIVERS COUNT']}/>
      </div>
      {loading && <Spinner/>}
    </div>
  )
}

export default Customer