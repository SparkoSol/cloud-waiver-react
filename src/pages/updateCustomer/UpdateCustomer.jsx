import Input from "../../components/inputs/Input.jsx";
import Heading from "../../components/Heading.jsx";
import Button from "../../components/Button.jsx";
import {Link} from "react-router-dom";

const UpdateCustomer = () => {
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
              <form className=''>
                <div className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                  <Input label='First Name' placeholder='First Name' inputClasses='pl-5'/>
                  <Input label='Last Name' placeholder='First Name' inputClasses='pl-5'/>
                  <Input label='Email' placeholder='Email' inputClasses='pl-5'/>
                  <Input label='Phone' placeholder='Phone' inputClasses='pl-5'/>
                </div>

                <div className='flex justify-end gap-3 items-center w-full mt-6'>
                  <Button btnText='Save' btnClasses='bg-btnBg px-6 py-2'/>
                  <Link to='/customers' className='text-gray-500 border border-gray-300 px-6 rounded-full text-sm py-2'>Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateCustomer