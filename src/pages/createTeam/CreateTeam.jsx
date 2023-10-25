import {useRef} from "react";
import Input from "../../components/inputs/Input.jsx";
import Button from "../../components/Button.jsx";

const CreateTeam = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailAddressRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const data = [
    {
      id: 1,
      label: 'First Name',
      ref: firstNameRef
    },
    {
      id: 2,
      label: 'Last Name',
      ref: lastNameRef
    },
    {
      id: 3,
      label: 'Email Address',
      ref: emailAddressRef
    },
    {
      id: 4,
      label: 'Password',
      ref: passwordRef
    },
    {
      id: 5,
      label: 'Confirm Password',
      ref: confirmPasswordRef
    },
  ];

  return (
    <section className='p-6'>
      <h1 className='text-2xl font-bold leading-tight text-gray-900'>Create user for Admins</h1>
      <form className='space-y-4 mt-8 w-1/2'>
        {data.map(item=>{
          return(
            <Input key={item.id} inputRef={item.ref} placeholder={item.label} inputClasses='pl-4'/>
          )
        })}
        <Button btnText='Invite User' fullWidth='w-full'
                btnClasses='bg-bgDark border-textDark lg:px-16 sm:px-8 sm:py-3.5 py-3.5 w-full'/>
      </form>
    </section>
  )
}

export default CreateTeam;