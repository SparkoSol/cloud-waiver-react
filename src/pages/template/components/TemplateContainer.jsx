import Modal from "../../../components/modals/Modal";
import {useEffect, useState} from "react";
import {PencilIcon} from "@heroicons/react/24/outline";
import Tabs from "../../../components/Tabs";
import {tabsData} from "../../../utils/generalFunctions";
import {useParams} from "react-router-dom";
import Spinner from "../../../components/Spinner";
import {useDispatch, useSelector} from "react-redux";
import {getSingleWaiver} from "../../../redux/waivers/waiverThunk";
import {selectSingleWaiver, updateWaiver} from "../../../redux/waivers/waiverSlice";
import {patchRequest} from "../../../redux/cwAPI";
import toast from 'react-hot-toast';
import {selectCurrentUser} from "../../../redux/user/userSlice";

const TemplateContainer = ({children}) => {
  const dispatch = useDispatch();
  const waiver = useSelector(selectSingleWaiver);
  const currentUser = useSelector(selectCurrentUser);
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  useEffect(() => {
    setLoading(true);
    dispatch(getSingleWaiver(id))
      .finally(() => setLoading(false))
    // eslint-disable-next-line
  }, []);

  function handleEdit(name) {
    setLoading(true);
    patchRequest(`/waivers/${id}`, {name})
      .then(r => {
        toast.success('Updated Successfully');
        dispatch(updateWaiver(name))
      })
      .catch(e => e.response.data.message)
      .finally(() => setLoading(false))
  }

  return (
    <main>
      {loading && <Spinner/>}
      <div className='px-2 py-3'>
        <div className="flex items-center space-x-4">
          <h2 className="font-bold text-2xl">{waiver?.name}</h2>
          <button className='outline-none' onClick={e => setEditMode(true)}>
            <PencilIcon className='w-5 h-5'/>
          </button>
          <Modal setOpen={setEditMode} open={editMode} editMode={true} title='Edit Template'
                 functionCall={handleEdit} value={waiver?.name}/>
        </div>
        <span
          className="text-sm italic">{`${currentUser?.domain}.cloudwaiver.com/template/${waiver?._id}/public`}</span>
      </div>
      <Tabs tabs={tabsData}/>
      <div className='shadow rounded-md sm:overflow-hidden bg-white py-6 px-4 space-y-6 sm:p-6'>
        {children}
      </div>
    </main>
  )
}

export default TemplateContainer