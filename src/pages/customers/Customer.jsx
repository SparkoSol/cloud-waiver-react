import Heading from "../../components/Heading.jsx";
import DataTable from "../../components/DataTable.jsx";
import CustomersRow from "./components/CustomersRow.jsx";
import Input from "../../components/inputs/Input.jsx";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import Spinner from "../../components/Spinner.jsx";
import {useSearchParams} from "react-router-dom";
import {getRequest} from "../../redux/cwAPI";
import toast from 'react-hot-toast';
import {addCheck, searchWaiver} from "../../utils/generalFunctions";

const Customer = () => {
  const [loading, setLoading] = useState(false);
  let [searchParams] = useSearchParams();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  // eslint-disable-next-line no-unused-vars

  useEffect(() => {
    setLoading(true)
    if (searchParams.get('template')) {
      getRequest(`/submissions/waiver/${searchParams.get('template')}/customers`)
        .then(r => {
          setCustomers(addCheck(r.data));
          setFilteredCustomers(addCheck(r.data))
        })
        .catch(e => toast.error(e.response.data.message))
        .finally(() => setLoading(false))
    } else {
      getRequest(`/customers`)
        .then(r => {
          setCustomers(addCheck(r.data))
          setFilteredCustomers(addCheck(r.data))
        })
        .catch(e => toast.error(e.response.data.message))
        .finally(() => setLoading(false))
    }
    // eslint-disable-next-line
  }, [searchParams]);

  useEffect(() => {
    setFilteredCustomers(searchWaiver(searchText?.toLowerCase(), customers))
    //eslint-disable-next-line
  }, [searchText]);
  return (
    <div className="bg-white rounded-md p-6 w-full">
      <Heading subTitleClasses='text-sm text-gray-900' subtitle='List of customers associated with waivers.'
               title='Customer'
               titleClasses='font-semibold text-xl'/>
      <div className='mt-6'>
        <Input placeholder='Search' onChange={e => setSearchText(e.target.value)} BtnIcon={MagnifyingGlassIcon}
               inputClasses='rounded-md pl-11'
               extraClasses='w-fit inline-block mb-6'/>
        <DataTable TableRow={CustomersRow}
                   items={filteredCustomers}
                   setSelectAll={setSelectAll}
                   selectAll={selectAll}
                   setState={setFilteredCustomers}
                   headers={['FIRST NAME', 'LAST NAME', 'EMAIL', 'WAIVERS COUNT']}/>
      </div>
      {loading && <Spinner/>}
    </div>
  )
}

export default Customer