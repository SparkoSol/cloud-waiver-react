import Input from "../../components/inputs/Input.jsx";
import Heading from "../../components/Heading.jsx";
import Button from "../../components/Button.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {isValidBody} from "../../utils/generalFunctions.js";
import Spinner from "../../components/Spinner.jsx";
import toast from "react-hot-toast";
import {getRequest, patchRequest} from "../../redux/cwAPI";

const options = [
  {name: 'first_name', label: 'First Name'},
  {name: 'last_name', label: 'Last Name'},
  {name: 'email', label: 'Email'},
  {name: 'phone', label: 'Phone'}
];

const UpdateCustomer = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', phone: ''
  })

  function handleSubmit(e) {
    e.preventDefault();
    const body = {};
    if (isValidBody(body)) {
      setLoading(true)
      patchRequest(`/customers/${id}`, formData)
        .then(() => navigate('/customers'))
        .catch(e => toast.error(e.response.data.message))
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomer().then(() => {
    })
    // eslint-disable-next-line
  }, []);

  async function fetchCustomer() {
    setLoading(true)
    getRequest(`/customers/${id}`)
      .then(r => {
        setFormData({
          first_name: r.data.first_name || '',
          last_name: r.data.last_name || '',
          email: r.data.email,
          phone: r.data.phone || ''
        })
      })
      .catch(e => e.response.data.message)
      .finally(() => setLoading(false))
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
                  {Object.values(formData).map((item, index) => {
                    return (
                      <Input
                        key={index}
                        label={options[index].label}
                        value={item}
                        placeholder='------'
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            [options[index].name]: e.target.value
                          }))
                        }
                        inputClasses='pl-5'
                      />
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