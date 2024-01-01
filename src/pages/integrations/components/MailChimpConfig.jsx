import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toggleMailchimp} from "../../../redux/integration/integrationSlice";
import axios from "axios";
import toast from "react-hot-toast";
import {selectCurrentUser} from "../../../redux/user/userSlice";
import {useNavigate} from "react-router-dom";
import ConfigCard from "./ConfigCard";

const DropBoxConfig = () => {
    const dispatch = useDispatch()
    const {deletedMailchimp, mailchimpActive} = useSelector(state => state.integration)
    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate()

    const toggleButtonState = () => {
        dispatch(toggleMailchimp(!mailchimpActive))
    }
    const deleteButton = () => {
        dispatch(toggleMailchimp(false))
        axios.delete(`http://localhost:3000/integration/auth-token/${user._id}?integration_type=mailchimp`).then(() => {
            navigate("/settings/integrations")
        }).catch((reason) => {
            toast.error(reason.response.data.message)
        })
    }
    return (
        <ConfigCard activeStatus={mailchimpActive} deletedStatus={deletedMailchimp} deleteToken={deleteButton}
                    toggleState={toggleButtonState} serviceImage={'/mailchimp.svg'} serviceName={"Mailchimp"}
                    serviceDescription={"Syncs with subscriber list"}/>
    );
};

export default DropBoxConfig;
