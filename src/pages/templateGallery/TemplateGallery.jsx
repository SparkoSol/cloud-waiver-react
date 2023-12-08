import Heading from "../../components/Heading";
import {Link} from "react-router-dom";
import Modal from "../../components/modals/Modal";
import React, {useState} from "react";
import Button from "../../components/Button";
import {postRequest} from "../../redux/cwAPI";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import {staticData} from "../../utils/builder";

const TemplateGallery = () => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  function handleSubmit(name) {
    setLoading(true)
    const body = {
      name,
      form_data: staticData
    }
    setLoading(true)
    postRequest(`/waivers`, body)
      .then(r => window.location.pathname = `/templates/${r.data._id}/builder`)
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false))
  }

  return (
    <section className='space-y-8'>
      <Heading title='Template Gallery' titleClasses='text-xl font-semibold'/>
      <div
        className="space-x-3 rounded-lg w-1/2 border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
        <div className="min-w-0 flex-1">
          <p className="text-lg font-medium text-gray-900">FWC Attestation Form</p>
        </div>
        <div className="flex mt-4 gap-4">
          <Link target="_blank" to="/admin/preview"
                className="transition ease-in text-sm py-2.5 gap-2 block w-fit border border-gray-300 bg-inputColor px-4 rounded-md">
            Preview
          </Link>
          <Button btnText='Use Template' onClick={e => setModal(true)} fullWidth='w-fit'
                  btnClasses='bg-btnBg px-4 rounded-md'/>
        </div>
      </div>
      <Modal open={modal} setOpen={setModal} functionCall={handleSubmit} value='FWC Attested Form'/>
      {loading && <Spinner/>}
    </section>
  )
}

export default TemplateGallery