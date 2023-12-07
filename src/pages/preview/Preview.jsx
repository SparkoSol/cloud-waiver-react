import React, {createRef, useEffect, useRef, useState} from "react";
import {recursiveFunction, today} from "../../utils/generalFunctions";
import {getDynamicTenantId} from "../../redux/cwAPI";
import Button from "../../components/Button";
import toast from 'react-hot-toast';
import $ from "jquery";
import {htmlModal, options, staticData} from "../../utils/builder";

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
      const body = document.querySelector(`table`);
      body.addEventListener('click', function (e) {
        let idx = e.target.classList[0]?.split('-')[1]
        //open the sign modal
        if (e.target.classList[0]?.includes('init')) {
          navigator.clipboard.readText().then(r => {
            if (!r.includes('data:image/png')) {
              document.querySelectorAll(`.modal`)[idx].classList.remove('hidden')
            } else {
              const tableCell = document.getElementById(`initials-${idx}`);
              tableCell.innerHTML += `<img src="${r}" style="width: 100px; height: 52px;" alt='' />`;
            }
          })
        } else if (e.target.tagName === 'IMG') {
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
            if (children.length > 1) children[1].innerHTML += `<img src="${sign}" style="width: 100px; height: 52px;" alt='' />`;
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