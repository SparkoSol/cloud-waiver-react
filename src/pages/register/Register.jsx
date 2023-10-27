import {useRef, useState} from "react";
import {Link} from "react-router-dom";
import {BuildingOfficeIcon, EnvelopeIcon, LockClosedIcon, UserIcon} from "@heroicons/react/24/outline/index.js";
import FormLayout from "../../components/Form.jsx";
import Input from "../../components/inputs/Input.jsx";
import CheckboxInput from "../../components/inputs/CheckboxInput.jsx";
import Button from "../../components/Button.jsx";
import SideBarAdd from "../auth/components/SideBarAdd.jsx";
import {registerUser} from "../../redux/user/userThunk.js";
import {useDispatch} from "react-redux";
import VerificationModal from "../../components/modals/VerificationModal.jsx";
import Spinner from "../../components/Spinner.jsx";
import {isValidBody} from "../../utils/generalFunctions.js";
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [domainName, setDomainName] = useState('');
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const companyNameRef = useRef();
  const confirmPasswordRef = useRef()
  const passwordRef = useRef();

  const inputData = [
    {
      id: 1,
      placeHolder: 'First Name',
      label: '',
      type: 'text',
      btnIcon: UserIcon,
      ref: firstNameRef
    },
    {
      id: 2,
      placeHolder: 'Last Name',
      label: '',
      type: 'text',
      btnIcon: UserIcon,
      ref: lastNameRef
    },
    {
      id: 3,
      placeHolder: 'Email',
      label: '',
      type: 'email',
      btnIcon: EnvelopeIcon,
      ref: emailRef
    }, {
      id: 4,
      placeHolder: 'Password',
      label: '',
      type: 'password',
      btnIcon: LockClosedIcon,
      ref: passwordRef
    },
    {
      id: 5,
      placeHolder: 'Password Confirmation',
      label: '',
      type: 'password',
      btnIcon: LockClosedIcon,
      ref: confirmPasswordRef
    },
    {
      id: 6,
      placeHolder: 'Company Name',
      label: '',
      type: 'text',
      btnIcon: BuildingOfficeIcon,
      ref: companyNameRef
    }
  ]

  function convertSpaces(e) {
    const inputValue = e.target.value;
    // Use the regex pattern to replace spaces and remove special characters
    const convertedValue = inputValue
      .toLowerCase()
      .split(' ')
      .join('-')
      .replace(/[`~!@#$%^&*()_|+\=?;:'",.<>{}[\]\\\/]/gi, '');
    setDomainName(convertedValue);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    const body = {
      username: emailRef.current.value,
      password: passwordRef.current.value,
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      domain: domainName,
      company_name: companyNameRef.current.value
    }
    if (isValidBody(body)) {
      dispatch(registerUser(body)).unwrap()
        .then(r => {
          setOpen(!!r);
          setLoading(false)
        })
        .catch(e => {
          toast.error(e.message)
          setLoading(false)
        });
    } else {
      setLoading(false)
    }
  }

  return (
    <section className='flex justify-center items-center w-full min-h-screen bg-gray-200 shadow-md py-6'>
      <div className='flex w-11/12 sm:w-8/12 border rounded-3xl bg-white'>
        <FormLayout handleSubmit={handleSubmit}
                    title='Welcome to Cloud Waiver'
                    subtitle='Start your 15 day free trial today'>
          {inputData.map((item) => (
            <Input
              key={item.id}
              type={item.type}
              placeholder={item.placeHolder}
              BtnIcon={item.btnIcon}
              inputRef={item.ref}
              extraClasses={`mb-6 ${item.id !== 7 ? '' : 'w-fit inline-block'}`}
            />
          ))}
          <div className="mb-6 w-fit inline-block"><label
            className="block text-sm font-medium text-primary mb-2 text-start"
            htmlFor="domain name">Domain Name</label>
            <div className="relative rounded-md shadow-sm flex gap-2 items-center">
              <BuildingOfficeIcon
                className='pointer-events-none absolute inset-y-0 left-3 mt-px flex items-center text- w-5 h-5 transform translate-y-1/2'/>
              <input onChange={e => convertSpaces(e)}
                     className="block w-full py-2.5 rounded-full border border-gray-300 bg-gray-200 focus:border-gray-300 focus-visible:outline-none sm:text-sm text-gray-900 pl-11"
                     id="Indigo Mccormick" required placeholder="..." type="text" value={domainName}
                     name="domain name"/>
              <span>.cloudwaiver.com</span>
            </div>
          </div>
          <div className='flex mb-2 ml-2 block text-xs text-gray-500 font-normal'>
            <CheckboxInput label='I accept the ' link='terms and conditions' url='/' extraClasses='text-xs'
                           required={true}/>
          </div>
          <Button btnText='Get Started' fullWidth='w-9/12 mx-auto my-4'
                  btnClasses='bg-bgDark whitespace-nowrap border-textDark lg:px-16 sm:px-8 py-3.5 w-full'/>
          <div>
            <p className="font-medium text-textDark text-sm">Alraedy have an account? <Link
              to="/" className="text-blue-600">Login Here</Link></p>
          </div>
          <VerificationModal open={open} setOpen={setOpen}/>
        </FormLayout>
        {loading && <Spinner/>}
        <SideBarAdd/>
      </div>
    </section>
  )
}

export default RegisterForm;