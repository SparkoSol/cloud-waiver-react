import {useEffect, useRef, useState} from "react";
import {countries, isEmptyObject} from "../../utils/generalFunctions.js";
import Heading from "../../components/Heading.jsx";
import SelectInput from "../../components/inputs/SelectInput.jsx";
import Input from "../../components/inputs/Input.jsx";
import Button from "../../components/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {updateProfile} from "../../redux/user/userThunk.js";
import {selectCurrentUser} from "../../redux/user/userSlice.js";
import toast from "react-hot-toast";
import ProfileImageUpload from "./profileImageUpload/ProfileImageUpload";

const Account = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const postalCodeRef = useRef(null)

  const [country, setCountry] = useState('Please Select');
  const data = [
    {
      id: 1,
      label: 'First Name',
      value: currentUser.first_name,
      type: 'text',
      placeholder: 'John',
      ref: firstNameRef,
      class: 'w-full sm:w-1/2 md:w-1/2'
    }, {
      id: 2,
      label: 'Last Name',
      value: currentUser.last_name,
      type: 'text',
      placeholder: 'Doe',
      ref: lastNameRef,
      class: 'w-full sm:w-1/2 md:w-1/2'
    }, {
      id: 3,
      label: 'Email',
      value: currentUser.username,
      type: 'email',
      placeholder: 'john@gmail.com',
      class: "w-full sm:w-1/2 md:w-9/12"
    },
    {
      id: 4,
      label: 'Country',
      options: countries,
      state: country,
      setState: setCountry,
      class: 'w-full sm:w-1/2 md:w-1/2'
    },
    {
      id: 5,
      label: 'Street Address',
      value: currentUser.address?.street_address || '',
      type: 'text',
      placeholder: '123 Main Street',
      ref: streetRef,
      class: "w-full sm:w-1/2 md:w-full"
    }, {
      id: 6,
      label: 'City',
      value: currentUser.address?.city || '',
      type: 'text',
      placeholder: 'Berlin',
      ref: cityRef,
      class: "w-full sm:w-1/2 md:w-1/3"
    }, {
      id: 7,
      label: 'State / Province',
      value: currentUser.address?.state || '',
      type: 'text',
      placeholder: 'Baden-Württemberg',
      ref: stateRef,
      class: "w-full sm:w-1/2 md:w-1/3"
    }, {
      id: 8,
      label: 'Zip / Postal Code',
      value: currentUser.address?.zip || '',
      type: 'text',
      placeholder: 'Baden-Württemberg',
      class: "w-full sm:w-1/2 md:w-1/3",
      ref: postalCodeRef
    }]

  useEffect(() => {
    if (!isEmptyObject(currentUser) && currentUser.address?.country) {
      setCountry(currentUser.address.country)
    }
  }, [currentUser]);


  function handleSubmit(e) {
    e.preventDefault();
    if (country === 'Please Select') {
      toast.error('Please select a country.')
      return
    }
    const body = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      profile_picture: currentUser.profile_picture,
      address: {
        country,
        street_address: streetRef.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        zip: postalCodeRef.current.value
      }
    };
    dispatch(updateProfile({body, _id: currentUser._id}));
  }

  return (
    <>
      <Heading title='Personal Information' subtitle='Ensure all details are correct'
               titleClasses='text-lg leading-6 font-medium text-gray-900'
               subTitleClasses='text-sm font-normal text-gray-500'/>

      <ProfileImageUpload/>
      <form className='flex flex-wrap mt-7' onSubmit={handleSubmit}>
        {data.map(item => {
          if (item.id === 4) {
            return (
              <div className={`px-3 mb-6 ${item.class}`} key={item.id}>
                <SelectInput extraClasses={`w-full`} options={item.options} setState={item.setState} state={item.state}
                             label='Country'/>
              </div>
            );
          } else {
            return (
              <div className={`px-3 mb-6 ${item.class}`} key={item.id}>
                <Input
                  inputClasses={`pl-3 rounded-md`}
                  type={item.type}
                  placeholder={item.placeholder}
                  label={item.label}
                  disabled={!item.ref}
                  inputRef={item.ref}
                  value={item.value}
                />
              </div>
            );
          }
        })}
        <div className='flex justify-end mt-2 grow'>
          <Button btnText='Save' btnClasses='bg-btnBg px-6 py-2'/>
        </div>
      </form>
    </>
  )
}

export default Account