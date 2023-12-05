import $ from "jquery"; //Load jquery
import {useParams} from "react-router-dom";
import React, {createRef, useEffect, useState} from "react";
import {getRequest} from "../redux/cwAPI";
import toast from 'react-hot-toast';
import {
  additionMinorForm,
  additionParticipantForm,
  formatDate,
  options,
  recursiveFunction
} from "../utils/generalFunctions";
import Spinner from "../components/Spinner";
import tinymce from "tinymce";

window.jQuery = $; //JQuery alias
window.$ = $; //JQuery alias
require("jquery-ui-sortable"); //For FormBuilder Element Drag and Drop
require("formBuilder/dist/form-render.min.js")
const SubmissionView = () => {
  const {pathname} = window.location
  const fb = createRef();
  const {submissionId} = useParams();
  const [submissionData, setSubmissionData] = useState(null);
  const [iframe, setIframe] = useState(null);
  const [loading, setLoading] = useState(false);
  const isPdfPath = pathname.includes('pdf')

  useEffect(() => {
    setLoading(true)
    getRequest(`/submissions/${submissionId}`)
      .then(r => setSubmissionData(r.data))
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false))
  }, [submissionId])

  useEffect(() => {
    if (submissionData?.data?.length > 0) {
      $(fb.current).formRender({
        formData: submissionData.data, ...options
      });
    }
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
      richTextEditorCount: 0,
      filesUploadCount: 0,
      timeCount: 0
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
          let signCanvas = document.querySelectorAll('.main')[tracker.signatureCount];
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
          let divElement = document.querySelectorAll(`.${staticClass}additionalMinors`)[tracker.additionalMinorsCount];
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
          let div = document.querySelectorAll(`.${staticClass}additionalParticipants`)[tracker.additionalParticipantsCount];
          div.innerHTML = '';
          for (let j = 0; j < submissionData.data[i].userData.length; j++) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = additionParticipantForm(submissionData.data[i].userData[j]);
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
        case `${staticClass}filesUpload`:
          let fileUploadDiv = document.querySelectorAll(`.${staticClass}filesUpload`)[tracker.filesUploadCount];
          for (let j = 0; j < submissionData.data[i].userData.length; j++) {
            const imgElement = document.createElement('img');
            imgElement.src = submissionData.data[i].userData[j];
            imgElement.alt = 'Image ' + (j + 1);
            imgElement.classList.add('w-52', 'inline');
            fileUploadDiv.appendChild(imgElement);
          }
          tracker.filesUploadCount++
          break;
        case `${staticClass}richTextEditor`:
          let textAreaArr = document.querySelectorAll('.textarea-selector')[tracker.richTextEditorCount];
          $(`#${textAreaArr.id}`).html(submissionData.data[i].userData);
          tinymce.activeEditor.mode.set("readonly");
          tinymce.init({
            theme: "advanced",
            selector: `#${textAreaArr.id}`,
            readonly: 1,
            menubar: false,
            statusbar: false,
            toolbar: false,
          })
          tracker.richTextEditorCount++;
          break;
        case `${staticClass}capturePhoto`:
          let imagePreviewDiv = document.querySelectorAll(`.capture-photo`)[tracker.capturePhotoCount];
          if (submissionData.data[i].userData) {
            let imageElement = document.createElement('img');
            imageElement.src = submissionData.data[i].userData[0];
            imageElement.alt = '';
            imagePreviewDiv.innerHTML = '';
            imagePreviewDiv.appendChild(imageElement);
          }
          tracker.capturePhotoCount++;
          break;
        case `${staticClass}timeComponent`:
          const timeDiv = document.querySelectorAll('#time')[tracker.timeCount];
          timeDiv.value = submissionData.data[i].userData
          tracker.timeCount++
          break;
        default:
          // Handle other cases
          break;
      }
    }
    $(fb.current).find('input, #captureButton, select').prop('disabled', true);
    recursiveFunction(iframe, setIframe)
    // eslint-disable-next-line
  }, [submissionData])

useEffect(() => {
  const iframe = document.querySelector("iframe")
  if (iframe) {
    const body = iframe.contentWindow.document.querySelector("body");
    body.contentEditable = "false"
  }
}, [iframe]);


  return (
    <section className='max-w-4xl mx-auto py-6'>
      {loading && <Spinner/>}
      <div className='bg-white shadow-md px-5 py-2'>
        <p className='text-sm my-6'>Refrence No : <span>{submissionData?.reference_no}</span></p>
        <form ref={fb}></form>
        <p className='text-sm my-6'>Refrence No : <span>{submissionData?.reference_no}</span></p>
      </div>
      <div className={`bg-white shadow-md mt-6 ${isPdfPath ? "w-full" : "w-fit"} p-5`}>
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