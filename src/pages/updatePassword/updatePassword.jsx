import {useRef, useState} from "react";
import Input from "../../components/inputs/Input.jsx";
import Heading from "../../components/Heading.jsx";
import Button from "../../components/Button.jsx";
import {updateProfile} from "../../redux/user/userThunk.js";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../redux/user/userSlice.js";
import Spinner from "../../components/Spinner";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const password = useRef();
  const confirmPassword = useRef();
  const [loading, setLoading] = useState(false);

  const data = [
    {
      id: 1,
      label: 'Password',
      value: '',
      type: 'password',
      placeholder: '********',
      ref: password,
      class: 'w-full md:w-1/2'
    }, {
      id: 2,
      label: 'Confirm Password',
      value: '',
      type: 'password',
      placeholder: '********',
      ref: confirmPassword,
      class: 'w-full md:w-1/2'
    }]

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      toast.error("Passwords don't match")
      return
    }
    setLoading(true);
    const body = {
      password: password.current.value,
    };
    dispatch(updateProfile({body, _id: currentUser._id})).finally(() => setLoading(false));
  }

  return (
    <>
      <Heading title='Personal Information' subtitle='Ensure all details are correct'
               titleClasses='text-lg leading-6 font-medium text-gray-900'
               subTitleClasses='text-sm font-normal text-gray-500'/>
      <form className='flex flex-wrap mt-5' onSubmit={handleSubmit}>
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
      {loading && <Spinner/>}
    </>
  )
}

export default UpdatePassword;