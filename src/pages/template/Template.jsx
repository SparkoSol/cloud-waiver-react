import Button from "../../components/Button";
import DataTable from "../../components/DataTable";
import {ClipboardIcon, FolderIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import Spinner from "../../components/Spinner";
import Modal from "../../components/modals/Modal";
import {getRequest} from "../../redux/cwAPI";
import TemplateRow from "./components/TemplateRow";
import {addCheck} from "../../utils/generalFunctions";
import toast from "react-hot-toast";

function Template() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTemplates, setAllTemplates] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRequest('/waivers')
      .then(r => setAllTemplates(addCheck(r.data)))
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false));
  }, []);


  function handleSubmit(item) {
    console.log(item)
  }

  return (
    <div>
      <h1 className='text-xl font-semibold mb-5'>Templates</h1>
      <div>
        <div className='flex justify-between pb-6'>
          <span className='text-sm font-semibold text-gray-600'>List of all templates you've created.</span>
          <Button BtnIcon={ClipboardIcon}
                  btnText='Create waivers'
                  onClick={() => setOpenModal(true)}
                  btnClasses='bg-btnBg border-btnBg px-5 py-2.5'
                  iconClasses='w-4 h-4 text-white inline-block ml-2'/>
        </div>
        <div>
          {allTemplates.length > 0 ?
            <DataTable selectAll={selectAll} setSelectAll={setSelectAll}
                       headers={['Name', 'Total Waivers', 'Status']} TableRow={TemplateRow} items={allTemplates}
                       setState={setAllTemplates}
            /> : <div className='text-center mt-4'>
              <FolderIcon className='w-40 h-40 text-gray-400 mx-auto'/>
              <span className='text-gray-500 mb-10 text-base'>No Waivers Found. Get started by creating a waiver</span>
            </div>}
        </div>
      </div>
      <Modal open={openModal} setOpen={setOpenModal} functionCall={handleSubmit}/>
      {loading && <Spinner/>}
    </div>
  )
}

export default Template;