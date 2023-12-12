import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteDropbox, toggleDropBoxState} from "../../../redux/integration/integrationSlice";
import axios from "axios";
import toast from "react-hot-toast";
import {selectCurrentUser} from "../../../redux/user/userSlice";
import {useNavigate} from "react-router-dom";
import ConfigCard from "./ConfigCard";

const DropBoxConfig = () => {
    const dispatch = useDispatch()
    const {dropBoxActive, deletedDropBox} = useSelector(state => state.integration)
    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate()

    const toggleButtonState = () => {
        dispatch(toggleDropBoxState(!dropBoxActive))
    }
    const deleteButton = () => {
        dispatch(deleteDropbox(true))
        dispatch(dispatch(toggleDropBoxState(false)))
        axios.delete(`http://localhost:3000/integration/auth-token/${user._id}?integration_type=dropbox`).then(() => {
            navigate("/settings/integrations")
        }).catch((reason) => {
            toast.error(reason.response.data.message)
        })
    }
    return (
        <ConfigCard activeStatus={dropBoxActive} deletedStatus={deletedDropBox} deleteToken={deleteButton}
                    serviceImage={'/dropbox.svg'} toggleState={toggleButtonState} serviceName={"Dropbox"}
                    serviceDescription={"Upload waiver to dropbox"}/>
    );
};

export default DropBoxConfig;
