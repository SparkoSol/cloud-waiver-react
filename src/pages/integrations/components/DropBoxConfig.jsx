import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toggleDropBoxState} from "../../../redux/integration/integrationSlice";
import toast from "react-hot-toast";
import {selectCurrentUser} from "../../../redux/user/userSlice";
import {useNavigate} from "react-router-dom";
import ConfigCard from "./ConfigCard";
import {deleteRequest} from "../../../redux/cwAPI";

const DropBoxConfig = () => {
    const dispatch = useDispatch()
    const {dropBoxActiveState} = useSelector(state => state.integration)
    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate()

    const toggleButtonState = () => {
        dispatch(toggleDropBoxState(!dropBoxActiveState));
        navigate(-1)
    }
    const deleteButton = () => {
        dispatch(toggleDropBoxState(true))
        dispatch(dispatch(toggleDropBoxState(false)))
        deleteRequest(`/integration/auth-token/${user._id}?integration_type=dropbox`).then(() => {
            navigate("/settings/integrations")
        }).catch((reason) => {
            toast.error(reason.response.data.message)
        })
    }

    return (
        <ConfigCard activeStatus={dropBoxActiveState} deletedStatus={toggleDropBoxState} deleteToken={deleteButton}
                    serviceImage={'/dropbox.svg'} toggleState={toggleButtonState} serviceName="Dropbox"
                    serviceDescription="Upload waiver to dropbox"/>
    );
};

export default DropBoxConfig;
