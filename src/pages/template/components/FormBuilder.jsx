import $ from "jquery";
import React, {createRef, useEffect, useState} from "react";
import {options, staticForm} from "../../../utils/generalFunctions";
import Button from "../../../components/Button";
import {TrashIcon} from "@heroicons/react/24/outline";
import {patchRequest} from "../../../redux/cwAPI";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectSingleWaiver} from "../../../redux/waivers/waiverSlice";
import Spinner from "../../../components/Spinner";
import toast from 'react-hot-toast'
import Modal from "../../../components/modals/Modal";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
require("jq-signature");
const FormBuilder = () => {
  const waiver = useSelector(selectSingleWaiver);
  const fb = createRef();
  const [loading, setLoading] = useState(false);
  const [FormBuilder, setFormBuilder] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    if (!FormBuilder?.formData && waiver) {
      setFormBuilder($(fb.current).formBuilder({
        disabledActionButtons: ['data', 'clear', 'save'],
        formData: waiver?.form_data || staticForm, ...options,
        controlOrder: ['primaryAdultParticipant', 'editable', 'additionalParticipants', 'additionalMinors', 'signature', 'address', 'richTextEditor', 'fileUpload', 'electronicSignatureConsent', 'capturePhoto']
      }))
    }
  }, [waiver]);

  function saveData() {
    setLoading(true);
    if (FormBuilder.formData) {
      patchRequest(`/waivers/${id}`, {form_data: JSON.parse(FormBuilder.formData)})
        .then(r => toast.success('Saved Successfully'))
        .catch(e => toast.error(e.response.data.message))
        .finally(() => setLoading(false));
    }
  }

  return (<div>
    <div className='flex pb-5 justify-between items-center'>
      <Button btnText='Discard' btnClasses='text-red-500 bg-red-100 px-6' fullWidth='w-fit'
              onClick={() => setOpenModal(true)}
              BtnIcon={TrashIcon} iconClasses='text-red-500'/>
      <div className='flex gap-3 items-center'>
        <span
          className="text-yellow-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">Draft</span>
        <Button btnText='Publish' btnClasses='bg-btnBg' fullWidth='w-fit'/>
        <Link to={`/templates/${id}/render`}
              className='bg-btnBg w-fit py-2.5 px-8 text-sm text-white font-semibold rounded-full'>Preview</Link>
        <Button btnText='Save' btnClasses='bg-btnBg' fullWidth='w-fit' onClick={saveData}/>
      </div>
    </div>
    <div ref={fb}/>
    <Modal open={openModal}
           setOpen={setOpenModal}
           btnText='Confirm'
           functionCall={() => {
             FormBuilder.actions.clearFields();
             FormBuilder.actions.addField(...staticForm)
           }}
           description='This cannot be undone!'
           title='Are you sure?'/>
    {loading && <Spinner/>}
  </div>)
}

export default FormBuilder