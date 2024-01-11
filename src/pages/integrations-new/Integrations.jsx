import React, {useEffect} from 'react';
import Heading from "../../components/Heading";
import SocialServiceCard from "./components/SocialServiceCard";
import {data} from "./const/services_data";
import {useDispatch, useSelector} from "react-redux";
import {
  resetIntegrations,
  selectIntegrations,
  updateIntegrationStatus
} from "../../redux/integration-new/integrationSlice";
import {getRequest} from "../../redux/cwAPI";
import {selectCurrentUser} from "../../redux/user/userSlice";

const Integrations = () => {
  const dispatch = useDispatch();
  const integrationStatus = useSelector(selectIntegrations)
  const currentUser = useSelector(selectCurrentUser)
  useEffect(() => {
    dispatch(resetIntegrations())
    getRequest(`/integration`).then((resp) => {
      for (let item of resp.data) {
        dispatch(updateIntegrationStatus({
          actionType: item.integration_type,
          status: item.authenticated
        }));
      }
    })
  }, [currentUser, dispatch])
  return (
    <div className="bg-white rounded-md p-6 w-full font-mulish">
      <Heading title='Integrations' subTitleClasses='text-sm text-btnBg'
               titleClasses='text-xl font-semibold'/>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {data.map((item) => {
          return (
            <SocialServiceCard key={item.id} item={item} state={integrationStatus[item.id]}/>
          )
        })}
      </div>
    </div>
  )
};

export default Integrations;