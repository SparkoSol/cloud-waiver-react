import Input from "../../../components/inputs/Input";
import Button from "../../../components/Button";
import Submissions from "./Submissions";
import {useEffect, useRef, useState} from "react";
import {getDynamicTenantId, postRequest} from "../../../redux/cwAPI";
import toast from 'react-hot-toast'
import Spinner from "../../../components/Spinner";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../redux/user/userSlice";
import {useParams} from "react-router-dom";
import {selectSingleWaiver} from "../../../redux/waivers/waiverSlice";
import {CheckIcon} from "@heroicons/react/24/outline";

const Overview = () => {
  const {company_name} = useSelector(selectCurrentUser);
  const currentWaiver = useSelector(selectSingleWaiver);
  const {id} = useParams();
  const [data, setData] = useState([
    {class: 'border-blue-600', title: 'Total submissions', number: 0},
    {class: 'border-yellow-400', title: 'Total Invited', number: 0},
    {class: 'border-green-400', title: 'Total Approved', number: 0},
    {class: 'border-orange-400', title: 'Total Declined', number: 0}
  ]);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (currentWaiver) {
      setData([
        {class: 'border-blue-600', title: 'Total submissions', number: currentWaiver.total_submissions},
        {class: 'border-yellow-400', title: 'Total Invited', number: currentWaiver.total_invited},
        {class: 'border-green-400', title: 'Total Approved', number: currentWaiver.total_approved},
        {class: 'border-orange-400', title: 'Total Declined', number: currentWaiver.total_declined}
      ])
    }
  }, [currentWaiver]);
  const copyToClipboard = () => {
    if (currentWaiver.status === 'draft') {
      toast.error('Waiver not published yet');
      return;
    }
    if (setShowMessage) {
      navigator.clipboard.writeText(`https://${getDynamicTenantId()}.cloudwaiver.com/template/${currentWaiver._id}/public`)
        .then(() => {
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 1000);
        });
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (currentWaiver.status === 'draft') {
      toast.error('Waiver not published yet');
      return
    }
    setLoading(true);
    const body = {
      email: inputRef.current.value,
      company: company_name,
      link: `https://${getDynamicTenantId()}.cloudwaiver.com/template/${currentWaiver._id}/public`,
      waiverId: id
    }
    if (inputRef.current.value) {
      postRequest('/waivers/send-invitation', body)
        .then(r => {
          setData((prevData) => {
            const newData = [...prevData];
            newData[1].number += 1;
            return newData;
          });
          inputRef.current.value = ''
          toast.success("Invitation Successful!")
        })
        .catch(e => toast.error(e.response.data.message))
        .finally(() => setLoading(false))
    } else {
      toast.error('Email is required!')
    }
  }

  return (<section>
    {loading && <Spinner/>}
    <div className='flex gap-3 py-6 flex-wrap lg:flex-nowrap'>
      <div className="w-full lg:w-3/5">
        <div className="grid grid-cols-2 gap-3">
          {data.map((item, index) => {
            return (
              <div key={index}
                   className={`bg-white rounded-lg border-l-4 ${item.class} px-3 py-5 space-y-2`}>
                <p className="text-sm font-normal text-gray-600">{item.title}</p>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-3xl text-gray-800">{item.number}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="w-full lg:w-2/5">
        <div className="bg-white sm:p-4 py-7 rounded-md space-y-6">
          <div className='flex gap-3 items-end'>
            {currentWaiver?._id &&
              <Input placeholder='eg. Waiver 101' label='Share your waiver with the following link' disabled={true}
                     extraClasses='font-medium text-gray-500 lg:w-72' inputClasses='pl-3'
                     value={`https://${getDynamicTenantId()}.cloudwaiver.com/template/${currentWaiver._id}/public`}/>}
            <div className='flex gap-2'>
              {showMessage ? <Button BtnIcon={CheckIcon} iconClasses='w-5 h-5 text-green-500'
                                     btnClasses='bg-gray-200 px-6 py-3 text-gray-900'/> :
                <Button btnText='Copy' onClick={copyToClipboard}
                        btnClasses='bg-gray-200 px-6 py-3 text-gray-900'/>}

            </div>
          </div>
          <form onSubmit={handleSubmit} className='flex gap-3 items-end'>
            <Input placeholder='name@example.com' inputRef={inputRef} label='Share the link via email'
                   extraClasses='font-medium text-gray-600 lg:w-72' inputClasses='pl-3'/>
            <Button btnText='Share' btnClasses='bg-CW-primary px-6 py-3 bg-btnBg'/>
          </form>
        </div>
      </div>
    </div>
    <div className='bg-white rounded-md py-4'>
      <div className='min-w-full align-middle'>
        <Submissions/>
      </div>
    </div>
  </section>)
}

export default Overview;