import $ from "jquery"; //Load jquery
import React, {createRef, useEffect, useRef, useState} from "react"; //For react component
import {dataURLtoFile, isEmptyObject, recursiveFunction, today} from "../../../utils/generalFunctions";
import {useDispatch, useSelector} from "react-redux";
import {selectPublicWaiver} from "../../../redux/waivers/waiverSlice";
import {getPublicWaiver} from "../../../redux/waivers/waiverThunk";
import {useNavigate, useParams} from "react-router-dom";
import Button from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import {getDynamicTenantId, postRequest} from "../../../redux/cwAPI";
import toast from 'react-hot-toast'
import {events, initSignCode, options} from "../../../utils/builder";
import tinymce from "tinymce";

window.jQuery = $; //JQuery alias
window.$ = $; //JQuery alias

require("jquery-ui-sortable"); //For FormBuilder Element Drag and Drop
require("formBuilder/dist/form-render.min.js")

const FormRender = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const waiver = useSelector(selectPublicWaiver);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [switchState, setSwitchState] = useState('idle');
  const fb = createRef();
  const refNo = useRef();

  useEffect(() => {
    if (waiver) {
      $(fb.current).formRender({
        formData: JSON.stringify(waiver?.form_data), ...options
      });
      let textAreaArr = document.querySelectorAll('.textarea-selector');
      waiver?.form_data
        .filter(item => item.type === 'richTextEditor')
        .forEach((filteredItem, index) => {
          console.log(filteredItem, textAreaArr[index].id)
          $(`#${textAreaArr[index].id}`).html(filteredItem.userData);
        });
      recursiveFunction(null, setSwitchState)
    }
    // eslint-disable-next-line
  }, [waiver])

  useEffect(() => {
    setLoading(true);
    dispatch(getPublicWaiver(id))
      .then(() => navigator.clipboard.writeText(''))
      .finally(() => setLoading(false))
    // eslint-disable-next-line
  }, []);


  useEffect(() => {
    if (switchState !== 'idle') {
      setLoading(true)
      events();
      setLoading(false)
    }
  }, [switchState]);

  const saveData = async () => {
    const mainForm = document.querySelector('.rendered-form');
    let allInputs = mainForm.querySelectorAll('input[required]');
    let hasEmptyField = false;
    allInputs.forEach(input => {
      if (input.value.trim() === '') {
        hasEmptyField = true;
        return; // This will exit the loop early if an empty field is found
      }
    });
    if (hasEmptyField) {
      toast.error('Required fields cannot be empty');
      return;
    }
    setLoading(true)
    const htmlArr = $(fb.current).formRender("userData");
    let hasEmail = {};
    let tracker = {
      signatureCount: 0,
      primaryAdultParticipantCount: 0,
      addressCount: 0,
      additionalParticipantsCount: 0,
      additionalMinorsCount: 0,
      capturePhotoCount: 0,
      electronicSignatureConsentCount: 0,
      richTextEditorCount: 0,
      timeCount: 0,
      fileUpload: 0
    }
    for (let item of htmlArr) {
      let label = '';
      switch (item.type) {
        case 'signature':
          let signNode = document.querySelectorAll('.main .js-signature')[tracker.signatureCount];
          //check if it is required
          label = signNode.closest('.formbuilder-signature').firstChild.lastChild?.classList;
          if ($(signNode).jqSignature('getDataURL') === initSignCode && label) {
            toast.error('Signature is required.')
            setLoading(false)
            $(fb.current).find('input').prop('disabled', false);
            return
          }
          item.userData = $(signNode).jqSignature('getDataURL');
          tracker.signatureCount += 1;
          break;
        case 'primaryAdultParticipant':
        case 'address':
          let signatureComponent = document.querySelectorAll('.adult .js-signature');
          let breakLoop = false;
          signatureComponent = $(signatureComponent[tracker.primaryAdultParticipantCount]);
          let formElements = document.querySelectorAll(`${item.type === 'primaryAdultParticipant' ? '#myForm' : '#address'}`);
          formElements = formElements[item.type === 'primaryAdultParticipant' ? tracker.primaryAdultParticipantCount : tracker.addressCount]
          //check if it is required
          label = formElements.parentNode.firstChild.lastChild?.classList;
          const formData = {};
          for (const element of formElements) {
            if (element.value.trim() === '' && label) {
              toast.error(`${item.type === 'primaryAdultParticipant' ? 'Adult Participants' : 'Address'} cannot be empty`);
              setLoading(false);
              $(fb.current).find('input').prop('disabled', false);
              breakLoop = true
              return
            }
            formData[element.name] = element.value;
          }
          if (breakLoop) return
          item.userData = formData;
          if (signatureComponent) {
            hasEmail['first_name'] = formData.f_name;
            hasEmail['last_name'] = formData.l_name;
            hasEmail['phone'] = formData.phone;
            let signCode = signatureComponent.jqSignature('getDataURL');
            if (signCode === initSignCode) {
              toast.error('Additional Participants cannot be empty');
              setLoading(false);
              $(fb.current).find('input').prop('disabled', false);
              return
            }
            item.userData = {
              ...formData, signature: signatureComponent.jqSignature('getDataURL')
            };
          }
          tracker[`${item.type === 'primaryAdultParticipant' ? 'primaryAdultParticipantCount' : 'addressCount'}`] += 1;
          break;
        case 'additionalParticipants':
        case 'additionalMinors':
          let finalArr = [];
          let allForms;
          if (item.type === 'additionalParticipants') allForms = document.querySelectorAll(".participant-div-1")[tracker.additionalParticipantsCount];
          else allForms = document.querySelectorAll(".minor-div-1")[tracker.additionalMinorsCount];
          if (allForms) {
            for (let form of allForms.childNodes) {
              let signature = $(document.querySelectorAll(`.${form.className.replace(/ /g, '.')} .js-signature`)[tracker.additionalParticipantsCount]);
              let temp = {};
              for (const element of form.children[1].elements) {
                if (element.name !== "") {
                  temp[element.name] = element.value;
                }
              }
              if (signature) {
                temp = {
                  ...temp, signature: signature.jqSignature('getDataURL')
                };
              }
              finalArr.push(temp);
            }
          }
          item.userData = finalArr;
          tracker[`${item.type === 'additionalParticipants' ? 'additionalParticipantsCount' : 'additionalMinorsCount'}`] += 1;
          break;
        case 'capturePhoto':
          const node = document.querySelectorAll('#preview-image')[tracker.capturePhotoCount];
          const parentNode = document.querySelectorAll('.formbuilder-capturePhoto-label')[tracker.capturePhotoCount];
          label = parentNode.lastChild?.classList;
          if (label && !node) {
            toast.error('Capture Image is required.')
            setLoading(false)
            $(fb.current).find('input').prop('disabled', false);
            return
          }
          if (node) {
            let imageFile = dataURLtoFile(node.src, 'DCIM');
            const frmData = new FormData();
            frmData.append('file', imageFile);
            const {data} = await postRequest('/upload', frmData,);
            item.userData = [data.url];
          }
          tracker.capturePhotoCount += 1;
          break;
        case 'electronicSignatureConsent':
          let checkboxDiv = document.querySelectorAll('#electronicSign')[tracker.electronicSignatureConsentCount];
          let checkbox = checkboxDiv.checked;
          label = checkboxDiv.closest(`.formbuilder-electronicSignatureConsent`).firstChild.lastChild?.classList;
          console.log(label)
          if (!checkbox && label) {
            toast.error('Consent is required.')
            setLoading(false)
            $(fb.current).find('input').prop('disabled', false);
            return
          }
          item.userData = [checkbox]
          tracker.electronicSignatureConsentCount += 1;
          break
        case 'richTextEditor':
          let textAreaArr = document.querySelectorAll('.textarea-selector')[tracker.richTextEditorCount];
          const richEditor = tinymce.get(textAreaArr.id);
          let imgStr = document.querySelector('div[role="application"]');
          let signArr = document.querySelectorAll('.sign');
          imgStr = document.querySelectorAll('table img');
          if (imgStr.length < signArr.length) {
            toast.error('Please Add Initials')
            setLoading(false);
            $(fb.current).find('input').prop('disabled', false);
            return
          }
          let itemData = document.querySelector('div[role="application"] table');
          $(fb.current).find('input').prop('disabled', true);
          if (itemData) {
            item.userData = document.querySelector('div[role="application"]').outerHTML;
          } else {
            item.userData = richEditor.getContent();
          }
          tracker.richTextEditorCount += 1;
          break
        case 'filesUpload':
          const fileInp = document.querySelectorAll('.file-inp')[tracker.fileUpload];
          label = fileInp.closest('.formbuilder-filesUpload').firstChild.lastChild?.classList;
          const urlArr = [];
          let formData1 = new FormData();
          for (let i = 0; i < fileInp.files.length; i++) {
            formData1.append(`file`, fileInp.files[i])
            const {data} = await postRequest('/upload', formData1)
            urlArr.push(data.url)
            formData1.delete('file');
          }
          if (urlArr.length === 0 && label) {
            toast.error('File Upload is required.')
            setLoading(false);
            $(fb.current).find('input').prop('disabled', false);
            return
          }
          item.userData = urlArr
          tracker.fileUpload += 1
          break;
        case 'timeComponent':
          const allTimeDivs = document.querySelectorAll('#time')[tracker.timeCount];
          label = allTimeDivs.parentNode.firstChild.lastChild?.classList;
          if (label && allTimeDivs.value === '') {
            toast.error('Time is required.')
            setLoading(false);
            $(fb.current).find('input').prop('disabled', false);
            return
          }
          item.userData = allTimeDivs.value
          tracker.timeCount++;
          break;
        case 'emailInput':
          let mail = document.querySelector(`input[name='defaultMail']`).value;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!mail || !emailRegex.test(mail)) {
            toast.error("Email is required or not in a valid format!");
            $(fb.current).find('input').prop('disabled', false);
            setLoading(false);
            return;
          }
          item.userData = mail
          hasEmail['email'] = mail
          break
        default:
          break
      }
    }
    if (!isEmptyObject(hasEmail)) {
      const {data} = await postRequest('/customers', hasEmail)
      hasEmail['_id'] = data._id;
    }
    postRequest('/submissions', {
      reference_no: refNo.current?.innerText, status: 'submitted', customer: hasEmail._id, waiver: id, data: htmlArr
    }).then(r => {
      navigate(`/template/${id}/submission`);
      localStorage.setItem('ref', r.data.reference_no)
    })
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false));
  }

  return (<div className='max-w-5xl mx-auto my-6 common'>
    <p className='text-sm my-6'>Refrence No : <span
      ref={refNo}>{`${getDynamicTenantId()}.${today()}.${Math.floor(Math.random() * 1000000)}`}</span>
    </p>
    <form ref={fb}>
    </form>
    {waiver?.form_data.length > 0 && <Button btnText='Submit Data' onClick={saveData}
                                             btnClasses='bg-btnBg' fullWidth='w-fit mx-auto mt-8'/>}
    {loading && <Spinner/>}
  </div>)
}

export default FormRender