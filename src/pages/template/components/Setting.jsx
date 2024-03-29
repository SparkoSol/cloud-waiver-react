import {useEffect, useRef, useState} from "react";
import Input from "../../../components/inputs/Input";
import Heading from "../../../components/Heading";
import Button from "../../../components/Button";
import ToggleButton from "../../../components/inputs/ToggleButton";
import {useNavigate, useParams} from "react-router-dom";
import {patchRequest} from "../../../redux/cwAPI";
import {useDispatch, useSelector} from "react-redux";
import toast from 'react-hot-toast';
import {selectSingleWaiver} from "../../../redux/waivers/waiverSlice";
import Spinner from "../../../components/Spinner";
import {getSingleWaiver} from "../../../redux/waivers/waiverThunk";

const Setting = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  const waiver = useSelector(selectSingleWaiver)

  const navigate = useNavigate();

  const [notificationCustomer, setNotificationCustomer] = useState(false);
  const [notificationAdmin, setNotificationAdmin] = useState(false);
  const [approve, setApprove] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef()

  let data = [{
    id: 1,
    state: notificationCustomer,
    setState: setNotificationCustomer,
    title: 'Notification For Customer',
    subtitle: 'Notify customer with attached pdf when signed waiver'
  }, {
    id: 2,
    state: notificationAdmin,
    setState: setNotificationAdmin,
    title: 'Notification For Admins',
    subtitle: 'Notify admins with attached pdf when signed waiver'
  }, {
    id: 3,
    state: approve,
    setState: setApprove,
    title: 'Auto Approve',
    subtitle: 'Automatically Approve incoming waivers'
  }, {
    id: 4,
    state: "",
    setState: "",
    title: 'Notification for New Waiver',
    subtitle: 'Get notified as soon as new waivers comes in'
  }
  ]

  useEffect(() => {
    if (waiver?.setting) {
      setNotificationCustomer(waiver.setting.customer_notification)
      setNotificationAdmin(waiver.setting.admins_notification)
      setApprove(waiver.setting.auto_approve)
      emailRef.current.value = waiver.setting.new_waiver_notification.join(',')
    }
  }, [waiver])

  useEffect(() => {
    return () => {
      dispatch(getSingleWaiver(id))
    };
    //eslint-disable-next-line
  }, []);


  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true);
    let body = {
      setting: {
        customer_notification: notificationCustomer,
        admins_notification: notificationAdmin,
        auto_approve: approve,
        new_waiver_notification: emailRef.current.value.split(',')
      }
    }
    if (emailRef.current.value.length === 0) delete body.setting.new_waiver_notification;
    await patchRequest(`/waivers/${id}`, body).then(r => toast.success('Updated Successfully'))
      .catch(e => toast.error(e.response.data.message)).finally(() => setLoading(false))
  }

  return (
    <form className='bg-white shadow rounded-lg p-5' onSubmit={submitHandler}>
      <ul className='flex flex-col gap-5'>
        {data.map(item => {
          return (<li key={item.id}
                      className='md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 bg-white border border-gray-50 px-4 py-5 shadow sm:rounded-lg sm:p-6'>
            <div className="md:col-span-1">
              <Heading title={item.title} subtitle={item.subtitle}
                       titleClasses='text-lg leading-6 text-gray-900 font-medium'
                       subTitleClasses='text-sm text-gray-500'/>
            </div>
            <div className='mt-4 md:mt-0 sm:px-6'>
              {item.id === 4 ?
                <Input placeholder='eg. john@doe.com, smith@sam.com' label='Email Addresses' required={false}
                       extraClasses='font-medium text-gray-500' inputClasses='pl-3'
                       inputRef={emailRef}/>
                : <ToggleButton enabled={item.state} setEnabled={item.setState}/>}
            </div>
          </li>)
        })}
      </ul>
      <div className='flex justify-end gap-3 mt-6'>
        <Button btnText='Cancel' btnClasses='bg-gray-200 px-6 py-2 text-gray-900' type='button'
                onClick={() => navigate(-1)}/>
        <Button btnText='Save' btnClasses='bg-btnBg px-6 py-2'/>
      </div>
      {loading && <Spinner/>}
    </form>
  )
}

export default Setting;