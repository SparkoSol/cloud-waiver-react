import Input from "../../components/inputs/Input.jsx";
import Heading from "../../components/Heading.jsx";
import Button from "../../components/Button.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {getCustomer, updateCustomer} from "../../redux/customers/customerThunk.js";
import {isValidBody} from "../../utils/generalFunctions.js";
import Spinner from "../../components/Spinner.jsx";
import toast from "react-hot-toast";

const UpdateCustomer = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const dispatch = useDispatch();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {label: 'First Name', placeholder: 'First Name', id: 1, ref: firstNameRef, value: ''},
    {label: 'Last Name', placeholder: 'Last Name', id: 2, ref: lastNameRef, value: ''},
    {label: 'Email', placeholder: 'Email', id: 3, ref: emailRef, value: ''},
    {label: 'Phone', placeholder: 'Phone', id: 4, ref: phoneRef, value: ''},
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
    };
    if (isValidBody(body)) {
      setLoading(true)
      dispatch(updateCustomer({body, _id: id})).unwrap()
        .then(() => navigate('/customers'))
        .catch(e => toast.error(e.message))
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomer().then(() => {
    })
  }, []);

  async function fetchCustomer() {
    setLoading(true)
    const data = await dispatch(getCustomer(id)).unwrap();
    const updatedData = [
      {label: 'First Name', placeholder: 'First Name', id: 1, ref: firstNameRef, value: data.first_name},
      {label: 'Last Name', placeholder: 'Last Name', id: 2, ref: lastNameRef, value: data.last_name},
      {label: 'Email', placeholder: 'Email', id: 3, ref: emailRef, value: data.email},
      {label: 'Phone', placeholder: 'Phone', id: 4, ref: phoneRef, value: data.phone},
    ];
    setData(updatedData)
    setLoading(false)
  }

  return (
    <div className='p-5'>
      <Heading title='Update Customer -' titleClasses='text-xl leading-tight text-gray-800 mb-4'/>
      <div className='p-5'>
        <div className='bg-white shadow rounded-lg p-5'>
          <div className='flex gap-3'>
            <div className='w-1/3'>
              <Heading title='Update Customer' subtitle='Update Customers Details'
                       titleClasses='text-base font-semibold text-gray-800' subTitleClasses='text-gray-500 text-sm'/>
            </div>
            <div className='w-2/3'>
              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                  {data.map(item => {
                    return (
                      <Input key={item.id} inputRef={item.ref} label={item.label} value={item.value}
                             placeholder={item.placeholder}
                             inputClasses='pl-5'/>
                    )
                  })}
                </div>

                <div className='flex justify-end gap-3 items-center w-full mt-6'>
                  <Button btnText='Save' btnClasses='bg-btnBg px-6 py-2'/>
                  <Link to='/customers'
                        className='text-gray-500 border border-gray-300 px-6 rounded-full text-sm py-2'>Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {loading && <Spinner/>}
    </div>
  )
}

export default UpdateCustomer