import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import FormLayout from "../../components/Form.jsx";
import Input from "../../components/inputs/Input.jsx";
import Button from "../../components/Button.jsx";
import {Link, useNavigate} from "react-router-dom";
import {EnvelopeIcon} from "@heroicons/react/24/outline/index.js";
import SideBarAdd from "../auth/components/SideBarAdd.jsx";
import {forgetPassword} from "../../redux/user/userThunk.js";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner.jsx";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    const data = await dispatch(forgetPassword({
      email: emailRef.current.value
    })).unwrap()
    setLoading(false)
    toast.success(data.message)
    navigate('/')
  }

  return (
    <section className='flex justify-center items-center w-full min-h-screen bg-gray-200 py-6'>
      <div className='flex w-11/12 sm:w-8/12 border rounded-3xl bg-white shadow-md'>
        <FormLayout handleSubmit={handleSubmit}
                    title='Reset password'
                    subtitle='Please enter your email'>
          <Input
            type='email'
            placeholder='Email'
            label=''
            BtnIcon={EnvelopeIcon}
            inputRef={emailRef}
            extraClasses='mb-6'
          />
          <Button btnText='Email Password Reset Link' fullWidth='w-full mb-4'
                  btnClasses='bg-textDark border-textDark lg:px-16 sm:px-8 sm:py-3.5 py-3.5 w-full'/>
          <div>
            <p className="font-medium text-textDark text-sm">Do you want to login? <Link
              to="/" className="text-blue-600">Login</Link></p>
          </div>
        </FormLayout>
        {loading && <Spinner/>}
        <SideBarAdd/>
      </div>
    </section>
  )
}

export default ForgotPassword