import {useRef} from "react";
import Input from "../../components/inputs/Input.jsx";
import Heading from "../../components/Heading.jsx";
import Button from "../../components/Button.jsx";

const UpdatePassword = () => {
  const password = useRef();
  const confirmPassword = useRef();

  const data = [
    {
      id: 1,
      label: 'Password',
      value: '',
      type: 'text',
      placeholder: '********',
      ref: password,
      class: 'w-full md:w-1/2'
    }, {
      id: 2,
      label: 'Confirm Password',
      value: '',
      type: 'text',
      placeholder: '********',
      ref: confirmPassword,
      class: 'w-full md:w-1/2'
    }]
  return (
    <>
      <Heading title='Personal Information' subtitle='Ensure all details are correct'
               titleClasses='text-lg leading-6 font-medium text-gray-900'
               subTitleClasses='text-sm font-normal text-gray-500'/>
      <form className='flex flex-wrap mt-5'>
        {data.map(item => {
          return (
            <div className={`px-3 mb-6 ${item.class}`} key={item.id}>
              <Input
                inputClasses='pl-3 rounded-md'
                type={item.type}
                placeholder={item.placeholder}
                label={item.label}
                inputRef={item.ref}
                value={item.value}
              />
            </div>
          )
        })}
        <div className='flex justify-end mt-2 grow'>
          <Button btnText='Save' btnClasses='bg-btnBg px-6 py-2'/>
        </div>
      </form>
    </>
  )
}

export default UpdatePassword;