import $ from "jquery"; //Load jquery
import {useParams} from "react-router-dom";
import React, {createRef, useEffect, useState} from "react";
import {getRequest} from "../redux/cwAPI";
import toast from 'react-hot-toast';
import {additionMinorForm, additionParticipantForm, formatDate, options} from "../utils/generalFunctions";
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
    //inject data to forms
    const allNodes = document.querySelectorAll('.rendered-form > *');
    const staticClass = 'formbuilder-';
    let tracker = {
      signatureCount: 0,
      primaryAdultParticipantCount: 0,
      addressCount: 0,
      additionalParticipantsCount: 0,
      additionalMinorsCount: 0,
      capturePhotoCount: 0,
      electronicSignatureConsentCount: 0,
      richTextEditorCount: 0
    }
    for (let i = 0; i < allNodes.length; i++) {
      const firstClass = allNodes[i].classList.item(0);
      switch (firstClass) {
        case `${staticClass}electronicSignatureConsent`:
          allNodes[i].getElementsByTagName('input')[0].checked = submissionData.data[i].userData[0];
          tracker.electronicSignatureConsentCount++
          break;
        case `${staticClass}primaryAdultParticipant`:
          let inputs = allNodes[i].getElementsByTagName('input')
          for (let j = 0; j < inputs.length; j++) {
            inputs[j].value = submissionData.data[i].userData[inputs[j].name]
          }
          let canvas = document.querySelectorAll('.adult');
          canvas = canvas[tracker.primaryAdultParticipantCount]
          canvas.innerHTML = `<img
            src=${submissionData.data[i].userData['signature']}
            alt="signature" class="w-1/2">`
          tracker.primaryAdultParticipantCount++;
          break
        case `${staticClass}signature`:
          let signCanvas = document.querySelectorAll('.main');
          signCanvas = signCanvas[tracker.signatureCount]
          signCanvas.innerHTML = `<img
            src=${submissionData.data[i].userData}
            alt="signature" class="w-1/2">`
          tracker.signatureCount++
          break;
        case `${staticClass}address`:
          let inputsSets = allNodes[i].getElementsByTagName('input')
          for (let j = 0; j < inputsSets.length; j++) {
            inputsSets[j].value = submissionData.data[i].userData[inputsSets[j].name]
          }
          tracker.addressCount++
          break;
        case `${staticClass}additionalMinors`:
          let divElement = document.querySelectorAll(`.${staticClass}additionalMinors`);
          divElement = divElement[tracker.additionalMinorsCount]
          divElement.innerHTML = '';
          for (let j = 0; j < submissionData.data[i].userData.length; j++) {
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = additionMinorForm;
            let allInputs = tempContainer.getElementsByTagName('input');
            for (let k = 0; k < allInputs.length; k++) {
              allInputs[k].value = submissionData.data[i].userData[j][allInputs[k].name]
            }
            divElement.append(tempContainer);
          }
          $(fb.current).find('input').prop('disabled', true);
          tracker.additionalMinorsCount++
          break;
        case `${staticClass}additionalParticipants`:
          let div = document.querySelectorAll(`.${staticClass}additionalParticipants`);
          div = div[tracker.additionalParticipantsCount]
          div.innerHTML = '';
          for (let j = 0; j < submissionData.data[i].userData.length; j++) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = additionParticipantForm;
            let allInputs = tempDiv.getElementsByTagName('input');
            for (let k = 0; k < allInputs.length; k++) {
              allInputs[k].value = submissionData.data[i].userData[j][allInputs[k].name]
            }
            let imageCanvas = tempDiv.querySelector('.adult');
            imageCanvas.innerHTML = `<img src=${submissionData.data[i].userData[j]['signature']} alt=""/>`;
            div.append(tempDiv);
          }
          $(fb.current).find('input').prop('disabled', true);
          tracker.additionalParticipantsCount++
          break;
        default:
          // Handle other cases
          break;
      }
    }
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