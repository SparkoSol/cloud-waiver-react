import Modal from "../../../components/modals/Modal";
import {useEffect, useState} from "react";
import {ArrowLeftIcon, CheckIcon, ClipboardIcon, PencilIcon} from "@heroicons/react/24/outline";
import Tabs from "../../../components/Tabs";
import {limitChars, tabsData} from "../../../utils/generalFunctions";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Spinner from "../../../components/Spinner";
import {useDispatch, useSelector} from "react-redux";
import {getSingleWaiver} from "../../../redux/waivers/waiverThunk";
import {selectSingleWaiver, updateWaiver} from "../../../redux/waivers/waiverSlice";
import {getDynamicTenantId, patchRequest} from "../../../redux/cwAPI";
import toast from 'react-hot-toast';
import Button from "../../../components/Button";
import QRCodeComponent from "../../../components/QrCode";

const TemplateContainer = ({children}) => {
  const dispatch = useDispatch();
  const waiver = useSelector(selectSingleWaiver);
  const [editMode, setEditMode] = useState(false);
  const [copyState, setCopyState] = useState(false);
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const location = useLocation().pathname;

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    dispatch(getSingleWaiver(id)).finally(() => setLoading(false))
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    setTimeout(() => {
      setCopyState(false)
    }, 5000)
  }, [copyState]);


  function handleEdit(name) {
    if (name === 'cancel') {
      setEditMode(false);
      return
    }
    setLoading(true);
    patchRequest(`/waivers/${id}`, {name})
      .then(r => {
        toast.success('Updated Successfully');
        dispatch(updateWaiver(name))
      })
      .catch(e => e.response.data.message)
      .finally(() => {
        setLoading(false);
        setEditMode(false);
      })
  }

  return (
    <main>
      {loading && <Spinner/>}
      <Button btnText='Go Back' onClick={() => navigate(-1)} BtnIcon={ArrowLeftIcon} iconClasses='w-4 h-4 text-gray-600'
              btnClasses='border border-bgDark text-black-900 px-5' fullWidth='justify-start mb-4'/>
      <div className='px-2 py-3 flex flex-col md:flex-row md:justify-between w-full'>
        <div>
          <div className="flex items-center space-x-4">
            <h2 className="font-bold text-2xl">{limitChars(waiver?.name, 30)}</h2>
            <button className='outline-none' onClick={e => setEditMode(true)}>
              <PencilIcon className='w-5 h-5'/>
            </button>
            <Modal open={editMode} editMode={true} title='Edit Template'
                   functionCall={handleEdit} value={waiver?.name}/>
          </div>
          <span
            className="text-sm italic break-all">https://{`${getDynamicTenantId()}.cloudwaiver.com/template/${waiver?._id}/public`}
            {waiver?.status === 'published' && (copyState ? (
              <CheckIcon className='w-5 h-5 ml-2 inline mb-2'/>
            ) : (
              <ClipboardIcon
                className='w-5 h-5 ml-2 inline mb-2 cursor-pointer'
                onClick={() => {
                  navigator.clipboard.writeText(`https://${getDynamicTenantId()}.cloudwaiver.com/template/${waiver?._id}/public`)
                    .then(() => setCopyState(true));
                }}
              />
            ))}
        </span>
        </div>
        <QRCodeComponent url={`https://${getDynamicTenantId()}.cloudwaiver.com/template/${waiver?._id}/public`}/>
      </div>
      <Tabs tabs={tabsData}/>
      <div className='shadow rounded-md sm:overflow-hidden bg-white py-6 px-4 space-y-6 sm:p-6'>
        {children}
      </div>
    </main>
  )
}

export default TemplateContainer