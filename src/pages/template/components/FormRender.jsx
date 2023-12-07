import $ from "jquery"; //Load jquery
import React, {createRef, useEffect, useRef, useState} from "react"; //For react component
import {
  dataURLtoFile,
  isEmptyObject,
  recursiveFunction,
  today
} from "../../../utils/generalFunctions";
import {useDispatch, useSelector} from "react-redux";
import {selectPublicWaiver} from "../../../redux/waivers/waiverSlice";
import {getPublicWaiver} from "../../../redux/waivers/waiverThunk";
import {useNavigate, useParams} from "react-router-dom";
import Button from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import {getDynamicTenantId, postRequest} from "../../../redux/cwAPI";
import toast from 'react-hot-toast'
import {htmlModal, options} from "../../../utils/builder";

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
          $(`#${textAreaArr[index].id}`).html(filteredItem.userData);
        });
      recursiveFunction(null, setSwitchState)
    }
    // eslint-disable-next-line
  }, [waiver])

  useEffect(() => {
    setLoading(true);
    dispatch(getPublicWaiver(id))
      .then(()=>navigator.clipboard.writeText(''))
      .finally(() => setLoading(false))
    // eslint-disable-next-line
  }, []);


  useEffect(() => {
    if (switchState !== 'idle') {
      setLoading(true)
      const body = document.querySelector(`table`);
      body.addEventListener('click', function (e) {
        let idx = e.target.classList[0]?.split('-')[1]
        //open the sign modal
        if (e.target.classList[0]?.includes('init')) {
          navigator.clipboard.readText().then(r=>{
            if(!r.includes('data:image/png')){
              document.querySelectorAll(`.modal`)[idx].classList.remove('hidden')
            }else{
              const tableCell = document.getElementById(`initials-${idx}`);
              tableCell.innerHTML += `<img src="${r}" style="width: 100px; height: 52px;" alt='' />`;
            }
          })
        }
        else if(e.target.tagName === 'IMG'){
          let idx = e.target.parentNode.classList[0]?.split('-')[1];
          document.querySelectorAll(`.js-signature.initial-signature-pad`)[idx].innerHTML =
            `<img src="${e.target.src}" style="width: 620px; height: 200px;" alt='' />`
          document.querySelectorAll(`.modal`)[idx].classList.remove('hidden')
        }
        //handle cancel button click
        else if (e.target.classList[0]?.includes('cac')) {
          const cancelBtn = document.getElementById(`${e.target.classList[0]}-cancel`);
          cancelBtn.addEventListener('click', function (e) {
            let signNode = document.querySelectorAll('.js-signature.initial-signature-pad')[idx];
            $(signNode).jqSignature('clearCanvas');
            document.querySelectorAll(`.modal`)[idx].classList.add('hidden')
          })
          cancelBtn.click();
        }
        //handle done button
        else if (e.target.classList[0]?.includes('done')) {
          const doneBtn = document.getElementById(`${e.target.classList[0]}-done`);
          doneBtn.addEventListener('click', function (e) {
            let signNode = document.querySelectorAll('.js-signature.initial-signature-pad')[idx];
            let sign = $(signNode).jqSignature('getDataURL');
            navigator.clipboard.writeText(sign);
            const tableCell = document.getElementById(`initials-${idx}`)
            let children = tableCell.children;
            if(children.length > 1) children[1].innerHTML += `<img src="${sign}" style="width: 100px; height: 52px;" alt='' />`;
            else tableCell.innerHTML += `<img src="${sign}" style="width: 100px; height: 52px;" alt='' />`;
            document.querySelectorAll(`.modal`)[idx].classList.add('hidden')
          })
          doneBtn.click();
        }
        //clear button
        else if (e.target.classList[0]?.includes('clear')) {
          const clearBtn = document.querySelector(`.${e.target.classList[0]}`);
          clearBtn.addEventListener('click', function (e) {
            let signNode = document.querySelectorAll('.js-signature.initial-signature-pad')[idx];
            $(signNode).jqSignature('clearCanvas');
          })
          clearBtn.click();
        }
        // if checkbox is checked
        else if (e.target.type === 'checkbox' && e.target.checked) {
          e.target.setAttribute("checked", "checked");
        }
        // if checkbox is not checked
        else if (e.target.type === 'checkbox' && !e.target.checked) {
          console.log('if 2')
          e.target.removeAttribute("checked");
        } else {
          console.log('default checj')
        }
      })

      const signCell = document.querySelectorAll('.sign');
      for (let i = 0; i < signCell.length; i++) {
        signCell[i].innerHTML = htmlModal(i);
      }
      $('.js-signature.initial-signature-pad').jqSignature({width: 620, height: 200, lineWidth: 3});
      setLoading(false)
    }
  }, [switchState]);

  const saveData = async () => {
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
      timeCount: 0
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
            hasEmail['first_name'] = formData.f_name;
            hasEmail['last_name'] = formData.l_name;
            hasEmail['phone'] = formData.phone;
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
          let checkbox = document.querySelectorAll('#electronicSign');
          checkbox = checkbox[tracker.electronicSignatureConsentCount].checked;
          item.userData = [checkbox]
          tracker.electronicSignatureConsentCount += 1;
          break
        case 'richTextEditor':
          // let textAreaArr = document.querySelectorAll('.textarea-selector')[tracker.richTextEditorCount];
          // const richEditor = tinymce.get(textAreaArr.id);
          // item.userData = richEditor.getContent();
          let imgStr = document.querySelector('div[role="application"]');
          let signArr = document.querySelectorAll('.sign');
          imgStr = document.querySelectorAll('table img');
          if(imgStr.length < signArr.length){
            toast.error('Please Add Initials')
            setLoading(false)
            return
          }
          $(fb.current).find('input').prop('disabled', true);
          item.userData = document.querySelector('div[role="application"]').outerHTML
          tracker.richTextEditorCount += 1;
          break
        case 'filesUpload':
          const fileInp = document.querySelector('.file-inp');
          const urlArr = [];
          let formData1 = new FormData();
          for (let i = 0; i < fileInp.files.length; i++) {
            formData1.append(`
          file`, fileInp.files[i])
            const {data} = await postRequest('/upload', formData1)
            urlArr.push(data.url)
            formData1.delete('file');
          }
          item.userData = urlArr
          break;
        case 'timeComponent':
          const allTimeDivs = document.querySelectorAll('#time')[tracker.timeCount];
          item.userData = allTimeDivs.value
          tracker.timeCount++;
          break;
        case 'emailInput':
          let mail = document.querySelector(`input[name='defaultMail']`).value;
          if(!mail){
            toast.error("Email is required!")
            setLoading(false);
            return
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