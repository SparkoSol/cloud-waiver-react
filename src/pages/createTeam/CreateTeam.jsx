import {useRef, useState} from "react";
import Input from "../../components/inputs/Input.jsx";
import Button from "../../components/Button.jsx";
import {useDispatch} from "react-redux";
import {addMember} from "../../redux/team/teamThunk.js";
import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner.jsx";

const CreateTeam = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
      ref: emailAddressRef,
      type: 'email'
    },
    {
      id: 4,
      label: 'Password',
      ref: passwordRef,
      type: 'password'
    },
    {
      id: 5,
      label: 'Confirm Password',
      ref: confirmPasswordRef,
      type: 'password'
    },
  ];
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    const body = {
      username: emailAddressRef.current.value,
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      password: passwordRef.current.value
    }
    const response = await dispatch(addMember({body:body, teamId:id}))
    setLoading(false)
    if (response.payload) {
      navigate(-1)
    }
  }

  // function

  return (
    <section className=''>
      <h1 className='text-2xl font-bold leading-tight text-gray-900'>Create user for Admins</h1>
      <form className='space-y-4 mt-8 w-full sm:w-1/2' onSubmit={handleSubmit}>
        {data.map(item => {
          return (
            <Input key={item.id} type={item.type} inputRef={item.ref} placeholder={item.label} inputClasses='pl-4'/>
          )
        })}
        <Button btnText='Invite User' fullWidth='w-full'
                btnClasses='bg-bgDark border-textDark lg:px-16 sm:px-8 sm:py-3.5 py-3.5 w-full'/>
      </form>
      {loading && <Spinner/>}
    </section>
  )
}

export default CreateTeam;