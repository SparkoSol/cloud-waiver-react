import $ from "jquery"; //Load jquery
import React, {createRef, useEffect, useState} from "react"; //For react component
import {options} from "../../../utils/generalFunctions";
import {useDispatch, useSelector} from "react-redux";
import {selectSingleWaiver} from "../../../redux/waivers/waiverSlice";
import {getSingleWaiver} from "../../../redux/waivers/waiverThunk";
import {useParams} from "react-router-dom";
import Button from "../../../components/Button";
import tinymce from "tinymce";

window.jQuery = $; //JQuery alias
window.$ = $; //JQuery alias

require("jquery-ui-sortable"); //For FormBuilder Element Drag and Drop
require("formBuilder/dist/form-render.min.js")

const FormRender = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const waiver = useSelector(selectSingleWaiver);
  const [loading, setLoading] = useState(false);
  const fb = createRef();
  let formRender;

  useEffect(() => {
    if (waiver) {
      formRender = $(fb.current).formRender({
        formData: JSON.stringify(waiver?.form_data), ...options
      });
    }
  }, [waiver])

  useEffect(() => {
    setLoading(true);
    dispatch(getSingleWaiver(id))
      .finally(() => setLoading(false))
  }, []);

  const saveData = (event) => {
    const htmlArr = $(fb.current).formRender("userData");
    const signatureElement = $('.js-signature');
    for (let item of htmlArr) {
      switch (item.type) {
        case 'signature':
          item.userData = signatureElement.jqSignature('getDataURL');
          break;
        case 'primaryAdultParticipant':
        case 'address':
          const formElements = document.getElementById(`${item.type === 'primaryAdultParticipant' ? 'myForm' : 'address'}`).elements;
          const formData = {};
          for (const element of formElements) {
            if (element.name !== "") { //TODO Remove the if block
              formData[element.name] = element.value;
            }
          }
          item.userData = formData;
          if (signatureElement.length > 0) {
            item.userData = {
              ...formData,
              signature: signatureElement.jqSignature('getDataURL')
            };
          }
          break;
        case 'additionalParticipants':
        case 'additionalMinors':
          let finalArr = [];
          let allForms;
          if (item.type === 'additionalParticipants') allForms = document.querySelectorAll(".participants > form");
          else allForms = document.querySelectorAll(".minors > form");
          console.log(item.type, allForms)
          for (let item of allForms) {
            let temp = {};
            for (const element of item.elements) {
              if (element.name !== "") { //TODO Remove the if block
                temp[element.name] = element.value;
              }
            }
            if (signatureElement.length > 0) {
              temp = {
                ...temp,
                signature: signatureElement.jqSignature('getDataURL')
              };
            }
            finalArr.push(temp)
          }
          item.userData = finalArr;
          break
        case 'capturePhoto':
          item.userData = document.querySelector('#files').files[0];
          break;
        case 'electronicSignatureConsent':
          const checkbox = document.querySelector('#electronicSign').checked;
          item.userData = [checkbox]
          break
        case 'richTextEditor':
          tinymce.init({
            selector: '#tinymce',
            promotion: false
          });
          const richEditor = tinymce.get('tinymce');
          item.userData = richEditor.getContent()
          break
        default:
          break
      }
    }
    console.log(htmlArr);
  }


  return (
    <div>
      <form ref={fb}></form>
      {waiver?.form_data.length > 0 &&
        <Button btnText='Submit Data' onClick={saveData}
                btnClasses='bg-btnBg' fullWidth='w-fit mx-auto'/>
      }
    </div>
  )
}

export default FormRender