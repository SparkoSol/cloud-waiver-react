import Heading from "../../components/Heading.jsx";
import DataTable from "../../components/DataTable.jsx";
import CustomersRow from "./components/CustomersRow.jsx";
import Input from "../../components/inputs/Input.jsx";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useEffect, useRef, useState} from "react";
import Spinner from "../../components/Spinner.jsx";
import {useSearchParams} from "react-router-dom";
import {getRequest} from "../../redux/cwAPI";
import toast from 'react-hot-toast';

const Customer = () => {
  const [loading, setLoading] = useState(false);
  let [searchParams] = useSearchParams();
  const [customers, setCustomers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedCount, setSelectedCount] = useState(0);
  const searchRef = useRef();

  useEffect(() => {
    setLoading(true)
    if (searchParams.get('template')) {
      getRequest(`/submissions?waiverId=${searchParams.get('template')}`)
        .then(r => setCustomers(r.data))
        .catch(e => toast.error(e.response.data.message))
        .finally(() => setLoading(false))
    } else {
      getRequest(`/customers`)
        .then(r => setCustomers(r.data))
        .catch(e => toast.error(e.response.data.message))
        .finally(() => setLoading(false))
    }
    // eslint-disable-next-line
  }, [searchParams]);

  return (
    <div className="bg-white rounded-md p-6 w-full">
      <Heading subTitleClasses='text-sm text-gray-900' subtitle='List of customers associated with waivers.'
               title='Customer'
               titleClasses='font-semibold text-xl'/>
      <div className='mt-6'>
        <Input placeholder='Search' inputRef={searchRef} BtnIcon={MagnifyingGlassIcon} inputClasses='rounded-md pl-11'
               extraClasses='w-fit inline-block mb-6'/>
        <DataTable TableRow={CustomersRow}
                   items={customers}
                   setSelectAll={setSelectAll}
                   selectAll={selectAll}
                   setState={setCustomers}
                   setSelectedCount={setSelectedCount}
                   headers={['ID', 'FIRST NAME', 'LAST NAME', 'EMAIL', 'WAIVERS COUNT']}/>
      </div>
      {loading && <Spinner/>}
    </div>
  )
}

export default Customer