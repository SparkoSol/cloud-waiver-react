import Button from "../../../components/Button";
import ToggleButton from "../../../components/inputs/ToggleButton";
import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Badge from "../../../components/Badge";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../../redux/user/userSlice";
import {deleteRequest, getDynamicTenantId, patchRequest} from "../../../redux/cwAPI";
import {updateIntegrationStatus} from "../../../redux/integration-new/integrationSlice";
import {toast} from "react-hot-toast";
import Spinner from "../../../components/Spinner";

const SocialServiceCard = ({state, item, width, showConfig = false}) => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser)
  const {title, subtitle, image, url, type} = item
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  function handleToggle(bool) {
    setLoading(true)
    dispatch(updateIntegrationStatus({actionType: item.id, status: bool}))
    patchRequest(`/integration/${item.id}`, {
      authenticated: bool
    }).then(() => {
      if (bool) window.location.assign(`${url}${window.location.href},${user._id},${getDynamicTenantId()},${type}`)
      if (id) navigate(-1);
    }).catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false))
  }

  function handleDelete(id) {
    setLoading(true)
    deleteRequest(`/integration/${id}`, {authenticated: false})
      .then(() => {
        dispatch(updateIntegrationStatus({actionType: id, status: false}));
        navigate(-1)
      })
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false))
  }

  return (
    <div
      className={`gap-4 bg-gray-50 border border-gray-300 rounded-xl flex max-w-xl items-center justify-between p-6 gap-3 flex-wrap`}>
      <div className={'flex items-center gap-4'}>
        <div className={'h-10 w-10'}>
          <img
            src={`/integration-icons/${image}`}
            alt={title}
            className={'object-cover'}
          />
        </div>
        <div className={'flex items-start flex-col'}>
          <div className={`flex`}>
            <p className={'mr-2'}>{title}</p>
            {showConfig && <div><Badge text={state ? 'Enabled' : 'Disabled'}/></div>}
          </div>
          <p className={`text-sm text-gray-600 mt-1`}>
            {subtitle}
          </p>
          {!showConfig && state && <Button onClick={() => {
            navigate(`/settings/configure/${item.id}`)
          }} btnText="Configure" btnClasses='border border-gray-400 py-2 text-gray-900 mt-4'/>}
          {
            showConfig && <Button onClick={e => handleDelete(item.id)} btnText='Delete' type='button'
                                  btnClasses='border border-gray-400 py-2 text-gray-900 mt-4'
                                  fullWidth='w-fit'/>
          }
        </div>
      </div>
      <div className='grow flex justify-end'>
        <ToggleButton enabled={state} setEnabled={handleToggle}/>
      </div>
      {loading && <Spinner/>}
    </div>
  )
};

export default SocialServiceCard;
