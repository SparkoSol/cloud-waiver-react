import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../../redux/user/userSlice";
import {useNavigate} from "react-router-dom";
import {deleteDriveAccount, toggleDriveState} from "../../../redux/integration/integrationSlice";
import axios from "axios";
import toast from "react-hot-toast";
import ConfigCard from "./ConfigCard";

const GoogleDriveConfig = () => {
    const dispatch = useDispatch()
    const {googleDrive, deletedDriveAccount} = useSelector(state => state.integration)
    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate()

    const toggleButtonState = () => {
        dispatch(toggleDriveState(!googleDrive))
    }
    const deleteButton = () => {
        dispatch(deleteDriveAccount(true))
        dispatch(toggleDriveState(false))
        axios.delete(`http://localhost:3000/integration/google-drive/${user._id}`).then(() => {
            navigate("/settings/integrations")
        }).catch((reason) => {
            toast.error(reason.response.data.message)
        })
    }
    return (
        <ConfigCard serviceDescription={"Upload waiver to Google Drive"} serviceName={"Google Drive"}
                    toggleState={toggleButtonState} serviceImage={'/g-drive.svg'} deleteToken={deleteButton}
                    deletedStatus={deletedDriveAccount} activeStatus={googleDrive}/>
    );
};

export default GoogleDriveConfig;
