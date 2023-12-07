import $ from "jquery";
import React, {createRef, useEffect, useState} from "react";
import {capitalize, staticForm} from "../../../utils/generalFunctions";
import Button from "../../../components/Button";
import {TrashIcon} from "@heroicons/react/24/outline";
import {patchRequest} from "../../../redux/cwAPI";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {resetStatus, selectSingleWaiver, selectWaiverStatus} from "../../../redux/waivers/waiverSlice";
import Spinner from "../../../components/Spinner";
import toast from 'react-hot-toast'
import Modal from "../../../components/modals/Modal";
import {getSingleWaiver} from "../../../redux/waivers/waiverThunk";
import tinymce from "tinymce";
import {options} from "../../../utils/builder";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
require("jq-signature");
const FormBuilder = () => {
  const dispatch = useDispatch();
  const waiver = useSelector(selectSingleWaiver);
  const status = useSelector(selectWaiverStatus);
  const fb = createRef();
  const [loading, setLoading] = useState(false);
  const [FormBuilder, setFormBuilder] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const {id} = useParams();
  useEffect(() => {
    if (!FormBuilder?.formData && waiver && status === 'fulfilled') {
      setFormBuilder($(fb.current).formBuilder({
        disabledActionButtons: ['data', 'clear', 'save'],
        formData: waiver?.form_data.length > 0 ? waiver?.form_data : staticForm, ...options,
        controlOrder: ['primaryAdultParticipant', 'editable', 'additionalParticipants', 'additionalMinors', 'signature', 'address', 'richTextEditor', 'filesUpload', 'electronicSignatureConsent', 'capturePhoto']
      }))
      dispatch(resetStatus())
      setTimeout(() => {
        let textAreaArr = document.querySelectorAll('.textarea-selector');
        waiver?.form_data
          .filter(item => item.type === 'richTextEditor')
          .forEach((filteredItem, index) => {
            $(`#${textAreaArr[index].id}`).html(filteredItem.userData);
          });
      }, 300);
    }
    // eslint-disable-next-line
  }, [waiver, status]);

  function saveData(e, status) {
    setLoading(true);
    let jsonData = JSON.parse(FormBuilder.formData);
    let textAreaArr = document.querySelectorAll('.textarea-selector')[0];
    if (textAreaArr) {
      const richEditor = tinymce.get(textAreaArr.id);
      jsonData.map((item, index) => {
        if (item.type === 'richTextEditor') {
          jsonData[index]['userData'] = richEditor.getContent();
        }
        return item;
      });
    }
    patchRequest(`/waivers/${id}`, {form_data: jsonData})
      .then(() => toast.success('Saved Successfully'))
      .catch(e => toast.error(e.response.data.message))
      .finally(() => {
        dispatch(getSingleWaiver(id));
        setLoading(false)
      });
    if (status) {
      patchRequest(`/waivers/${id}`, {status: 'published'})
    }
  }

  return (<div className='common'>
    <div className='flex pb-5 justify-between items-center'>
      <Button btnText='Discard' btnClasses='text-red-500 bg-red-100 px-6' fullWidth='w-fit'
              onClick={() => setOpenModal(true)}
              BtnIcon={TrashIcon} iconClasses='text-red-500'/>
      <div className='flex gap-3 items-center'>
        <span
          className="text-yellow-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">{capitalize(waiver?.status)}</span>
        {waiver?.status !== 'draft' && <Link to={`/template/${id}/public`} target='_blank'
                                             className='bg-btnBg w-fit py-2.5 px-8 text-sm text-white font-semibold rounded-full'>Preview</Link>}
        {waiver?.status === 'draft' ? <>
            <Button btnText='Publish' btnClasses='bg-btnBg' fullWidth='w-fit' onClick={e => saveData(e, 'publish')}/>
            <Button btnText='Save' btnClasses='bg-btnBg' fullWidth='w-fit' onClick={saveData}/></> :
          <Button btnText='Save/Publish' btnClasses='bg-btnBg' fullWidth='w-fit' onClick={saveData}/>}
      </div>
    </div>
    <div ref={fb}/>
    <Modal open={openModal}
           setOpen={setOpenModal}
           btnText='Confirm'
           functionCall={() => {
             FormBuilder.actions.clearFields();
             for (let i = 0; i < staticForm.length; i++) {
               FormBuilder.actions.addField(staticForm[i])
             }
           }}
           description='This cannot be undone!'
           title='Are you sure?'/>
    {loading && <Spinner/>}
  </div>)
}

export default FormBuilder