import $ from "jquery"; //Load jquery
import {useParams} from "react-router-dom";
import React, {createRef, useEffect, useState} from "react";
import {getRequest} from "../redux/cwAPI";
import toast from 'react-hot-toast';
import {formatDate, options} from "../utils/generalFunctions";
import Spinner from "../components/Spinner";

window.jQuery = $; //JQuery alias
window.$ = $; //JQuery alias
require("jquery-ui-sortable"); //For FormBuilder Element Drag and Drop
require("formBuilder/dist/form-render.min.js")
const SubmissionView = () => {
  const fb = createRef();
  const {submissionId} = useParams();
  const [submissionData, setSubmissionData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    getRequest(`/submissions/${submissionId}`)
      .then(r => setSubmissionData(r.data))
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false))
  }, [submissionId])

  useEffect(() => {
    if (submissionData?.data.length > 0) {
      $(fb.current).formRender({
        formData: submissionData.data, ...options
      });
    }
    $(fb.current).find('input').prop('disabled', true);
    // eslint-disable-next-line
  }, [submissionData])
  return (
    <section className='max-w-4xl mx-auto py-6'>
      {loading && <Spinner/>}
      <div className='bg-white shadow-md px-5 py-2'>
        <p className='text-sm my-6'>Refrence No : <span>{submissionData?.reference_no}</span></p>
        <form ref={fb}></form>
        <p className='text-sm my-6'>Refrence No : <span>{submissionData?.reference_no}</span></p>
      </div>
      <div className='bg-white shadow-md mt-6 w-fit p-5'>
        <div className="space-y-2 divide-gray-200 divide-y">
          <div className="py-3 space-y-4">
            <h3 className="font-bold text-base text-gray-800">Participant Details</h3>
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-gray-500">Name</p>
              <p className="font-semibold text-sm text-gray-800">{submissionData?.waiver?.name}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-gray-500">Create date</p>
              <p className="font-semibold text-sm text-gray-800">{formatDate(submissionData?.createdAt)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-gray-500">Sign date</p>
              <p className="font-semibold text-sm text-gray-800">{formatDate(submissionData?.updatedAt)}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="font-normal text-sm text-gray-500">Reference No</p>
              <p className="font-semibold text-sm text-gray-800">{submissionData?.reference_no}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SubmissionView