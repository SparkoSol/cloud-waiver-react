import React, {createRef, useEffect, useRef, useState} from "react";
import {recursiveFunction, today} from "../../utils/generalFunctions";
import {getDynamicTenantId} from "../../redux/cwAPI";
import Button from "../../components/Button";
import toast from 'react-hot-toast';
import $ from "jquery";
import {events, htmlModal, options, staticData} from "../../utils/builder";

window.jQuery = $; //JQuery alias
window.$ = $; //JQuery alias

require("jquery-ui-sortable"); //For FormBuilder Element Drag and Drop
require("formBuilder/dist/form-render.min.js")

const Preview = () => {
  const fb = createRef();
  const refNo = useRef();
  const [switchState, setSwitchState] = useState('idle');

  useEffect(() => {
    $(fb.current).formRender({
      formData: JSON.stringify(staticData), ...options
    });
    let textAreaArr = document.querySelectorAll('.textarea-selector');
    staticData
      .filter(item => item.type === 'richTextEditor')
      .forEach((filteredItem, index) => {
        $(`#${textAreaArr[index].id}`).html(filteredItem.userData);
      });
    recursiveFunction(null, setSwitchState)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (switchState !== 'idle') {
      events();
    }
  }, [switchState]);

  const saveData = () => {
    let mail = document.querySelector(`input[name='defaultMail']`).value;
    if(!mail){
      toast.error("Email is required!")
      return
    }

    let signArr = document.querySelectorAll('.sign');
    let imgStr = document.querySelectorAll('table img');
    if (imgStr.length < signArr.length) {
      toast.error('Please Add Initials')
      return
    }

    toast.success('Please publish the template to submit.')
  }

  return (
    <div className='max-w-5xl mx-auto my-6 common'>
      <p className='text-sm my-6'>Refrence No : <span
        ref={refNo}>{`${getDynamicTenantId()}.${today()}.${Math.floor(Math.random() * 1000000)}`}</span>
      </p>
      <form ref={fb}></form>
      <Button btnText='Submit Data' onClick={saveData} btnClasses='bg-btnBg' fullWidth='w-fit mx-auto mt-8'/>
    </div>
  )
}

export default Preview