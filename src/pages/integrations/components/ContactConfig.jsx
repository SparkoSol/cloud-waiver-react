import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteConstantContact, toggleConstantContact} from "../../../redux/integration/integrationSlice";
import axios from "axios";
import toast from "react-hot-toast";
import {selectCurrentUser} from "../../../redux/user/userSlice";
import {useNavigate} from "react-router-dom";
import ConfigCard from "./ConfigCard";

const ConstantContactConfig = () => {
    const dispatch = useDispatch()
    const {deletedConstantContact, constantContactActive} = useSelector(state => state.integration)
    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate()

    const toggleButtonState = () => {
        dispatch(toggleConstantContact(!constantContactActive))
    }
    const deleteButton = () => {
        // dispatch(deleteConstantContact(true))
        dispatch(toggleConstantContact(false))
        axios.delete(`http://localhost:3000/integration/auth-token/${user._id}?integration_type=constant_contact`).then(() => {
            navigate("/settings/integrations")
        }).catch((reason) => {
            toast.error(reason.response.data.message)
        })
    }
    return (
        <ConfigCard activeStatus={constantContactActive} deletedStatus={deletedConstantContact}
                    deleteToken={deleteButton}
                    toggleState={toggleButtonState} serviceImage={'/constant-contact.svg'}
                    serviceName={"Constant Contact"}
                    serviceDescription={"Send email to Constant Contact"}/>
    );
};

export default ConstantContactConfig;
