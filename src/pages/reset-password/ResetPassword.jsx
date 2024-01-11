import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import toast from "react-hot-toast";
import FormLayout from "../../components/Form.jsx";
import Input from "../../components/inputs/Input.jsx";
import Button from "../../components/Button.jsx";
import {useRef} from "react";
import {LockClosedIcon} from "@heroicons/react/24/outline";
import {resetPassword} from "../../redux/user/userThunk.js";
import SideBarAdd from "../auth/components/SideBarAdd.jsx";
import {resetUser} from "../../redux/user/userSlice";
import {persistor} from "../../redux/store";

const ResetPassword = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  const inputData = [{
    id: 2, placeHolder: 'Password', label: '', type: 'password', btnIcon: LockClosedIcon, ref: passwordRef
  }, {
    id: 3,
    placeHolder: 'Password Confirmation',
    label: '',
    type: 'password',
    btnIcon: LockClosedIcon,
    ref: confirmPasswordRef
  }]

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(resetUser());
    persistor.purge();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      toast.error('Passwords do not match!');
    }
    const body = {
      hash: id,
      password: passwordRef.current.value,
    }
    if(body.password.trim() !== ''){
      const data = await dispatch(resetPassword(body)).unwrap();
      toast.success(data.message)
      navigate('/')
    }
    else{
      toast.error('Please Enter a valid password')
    }
  }

  return (<section className='flex justify-center items-center w-full shadow-md min-h-screen bg-gray-200 py-6'>
    <div className='flex w-11/12 sm:w-8/12 border rounded-3xl bg-white'>
      <FormLayout
        handleSubmit={handleSubmit}
        title='Hi, Welcome to waiver'
        subtitle='Or Start your 15 day free trial'
      >
        {inputData.map((item) => (<Input
          extraClasses='mb-6'
          key={item.id}
          type={item.type}
          placeholder={item.placeHolder}
          label={item.label}
          BtnIcon={item.btnIcon}
          inputRef={item.ref}
        />))}
        <Button btnText='Reset Password' fullWidth='w-full mb-4'
                btnClasses='bg-bgDark border-textDark lg:px-16 sm:px-8 sm:py-3.5 py-3.5 w-full'/>
        <div>
          <p className="font-medium text-textDark text-sm">Don't have an account? <Link
            to="/register" className="text-blue-600">Signup</Link></p>
        </div>
      </FormLayout>
      <SideBarAdd/>
    </div>
  </section>)
}

export default ResetPassword;