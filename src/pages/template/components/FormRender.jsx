import $ from "jquery"; //Load jquery
import React, {createRef, useEffect, useRef, useState} from "react"; //For react component
import {options, today} from "../../../utils/generalFunctions";
import {useDispatch, useSelector} from "react-redux";
import {selectSingleWaiver} from "../../../redux/waivers/waiverSlice";
import {getSingleWaiver} from "../../../redux/waivers/waiverThunk";
import {useNavigate, useParams} from "react-router-dom";
import Button from "../../../components/Button";
import tinymce from "tinymce";
import Spinner from "../../../components/Spinner";
import {selectCurrentUser} from "../../../redux/user/userSlice";
import {postRequest} from "../../../redux/cwAPI";

window.jQuery = $; //JQuery alias
window.$ = $; //JQuery alias

require("jquery-ui-sortable"); //For FormBuilder Element Drag and Drop
require("formBuilder/dist/form-render.min.js")

const FormRender = () => {
  const {domain} = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const {id} = useParams();
  const dispatch = useDispatch();
  const waiver = useSelector(selectSingleWaiver);
  const [loading, setLoading] = useState(false);
  const fb = createRef();
  const refNo = useRef();

  useEffect(() => {
    if (waiver) {
      $(fb.current).formRender({
        formData: JSON.stringify(waiver?.form_data), ...options
      });
    }
    // eslint-disable-next-line
  }, [waiver])

  useEffect(() => {
    setLoading(true);
    dispatch(getSingleWaiver(id))
      .finally(() => setLoading(false))
    // eslint-disable-next-line
  }, []);

  const saveData = async (event) => {
    setLoading(true)
    const htmlArr = $(fb.current).formRender("userData");
    const signatureElement = $('.js-signature');
    let defaultObj = {
      email: null, first_name: null, last_name: null, phone: null
    };
    let customerId = null;
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
    for (let item of htmlArr) {
      switch (item.type) {
        case 'signature':
          let signNode = document.querySelectorAll('.main .js-signature');
          signNode = signNode[tracker.signatureCount];
          item.userData = $(signNode).jqSignature('getDataURL');
          tracker.signatureCount += 1;
          break;
        case 'primaryAdultParticipant':
        case 'address':
          let signatureComponent = document.querySelectorAll('.adult .js-signature');

          signatureComponent = $(signatureComponent[tracker.primaryAdultParticipantCount]);
          let formElements = document.querySelectorAll(`${item.type === 'primaryAdultParticipant' ? '#myForm' : '#address'}`);
          formElements = formElements[item.type === 'primaryAdultParticipant' ? tracker.primaryAdultParticipantCount : tracker.addressCount]
          const formData = {};
          for (const element of formElements) {
            if (element.name !== "") { //TODO Remove the if block
              formData[element.name] = element.value;
            }
          }
          item.userData = formData;
          if (signatureComponent) {
            item.userData = {
              ...formData,
              signature: signatureComponent.jqSignature('getDataURL')
            };
          }
          tracker[`${item.type === 'primaryAdultParticipant' ? 'primaryAdultParticipantCount' : 'addressCount'}`] += 1;
          break;
        case 'additionalParticipants':
        case 'additionalMinors':
          let finalArr = [];
          let signature = document.querySelectorAll(`${item.type === 'additionalParticipants' ? '.participant-div-1 .js-signature' : '.minor-div-1 .js-signature'}`);
          let index = 0;
          let allForms;
          if (item.type === 'additionalParticipants') allForms = document.querySelectorAll(".participants > form");
          else allForms = document.querySelectorAll(".minors > form");
          for (let item of allForms) {
            let newSignature = signature.length > 0 ? $(signature[index]) : null
            let temp = {};
            for (const element of item.elements) {
              if (element.name !== "") { //TODO Remove the if block
                temp[element.name] = element.value;
              }
            }
            if (newSignature) {
              temp = {
                ...temp,
                signature: newSignature.jqSignature('getDataURL')
              };
            }
            finalArr.push(temp)
            index++;
          }
          item.userData = finalArr;
          tracker[`${item.type === 'additionalParticipants' ? 'additionalParticipantsCount' : 'additionalMinorsCount'}`] += 1;
          break
        case 'capturePhoto':
          let node = document.querySelectorAll('#files');
          node = node[tracker.capturePhotoCount].files[0];
          item.userData = node
          tracker.capturePhotoCount += 1;
          break;
        case 'electronicSignatureConsent':
          let checkbox = document.querySelectorAll('#electronicSign');
          checkbox = checkbox[tracker.electronicSignatureConsentCount].checked;
          item.userData = [checkbox]
          tracker.electronicSignatureConsentCount += 1;
          break
        case 'richTextEditor':
          tinymce.init({
            selector: '#tinymce',
            promotion: false
          });
          const richEditor = tinymce.get('tinymce');
          item.userData = richEditor.getContent();
          tracker.electronicSignatureConsentCount += 1;
          break
        case 'text':
          switch (item.label) {
            case 'Email':
              defaultObj.email = item.userData[0];
              break;
            case 'First name':
              defaultObj.first_name = item.userData[0];
              break;
            case 'Last name':
              defaultObj.last_name = item.userData[0];
              break;
            case 'Phone number':
              defaultObj.phone = item.userData[0];
              break;
            default:
              break
          }
          break
        default:
          break
      }
    }

    if (defaultObj.email) {
      await postRequest('/customers', defaultObj)
        .then(r => customerId = r.data._id)
        .catch(e => e.response.data.message)
        .finally(() => setLoading(false));
    }

    postRequest('/submissions', {
      reference_no: refNo.current.innerText,
      status: 'submitted',
      customer: customerId,
      waiver: id,
      data: htmlArr
    }).then(r => navigate(`/templates/${id}/submission`))
      .catch(e => e.response.data.message)
      .finally(() => setLoading(false));
  }

  return (
    <div className='max-w-4xl mx-auto my-6 common'>
      <p className='text-sm my-6'>Refrence No : <span
        ref={refNo}>{`${domain.toUpperCase()}.${today()}.${Math.floor(Math.random() * 1000000)}`}</span></p>
      <form ref={fb}></form>
      {waiver?.form_data.length > 0 &&
        <Button btnText='Submit Data' onClick={saveData}
                btnClasses='bg-btnBg' fullWidth='w-fit mx-auto mt-8'/>
      }
      {loading && <Spinner/>}
    </div>
  )
}

export default FormRender