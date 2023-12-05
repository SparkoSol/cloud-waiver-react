import React from 'react';
import {twMerge} from "tailwind-merge";
import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import ToggleButton from "../../../components/inputs/ToggleButton";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../../redux/user/userSlice";
import {useNavigate} from "react-router-dom";
import {deleteDriveAccount, toggleDriveState} from "../../../redux/integration/integrationSlice";
import axios from "axios";
import toast from "react-hot-toast";

const GoogleDriveConfig = () => {
    const dispatch = useDispatch()
    const {googleDrive, deletedDriveAccount} = useSelector(state => state.integration)
    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate()

    const toggleButtonState = (e) => {
        dispatch(toggleDriveState(!googleDrive))
    }
    const deleteButton = () => {
        dispatch(deleteDriveAccount(true))
        dispatch(dispatch(toggleDriveState(false)))
        axios.delete(`http://localhost:3000/integration/google-drive/${user._id}`).then(() => {
            navigate("/settings/integrations")
        }).catch((reason) => {
            toast.error(reason.response.data.message)
        })
    }
    return (
        <div className="grid grid-cols-2 gap-4 mt-6 w-full">
            <div className="bg-gray-50 border border-gray-300 rounded-xl flex items-center justify-between p-6">
                <div className='flex  gap-4'>
                    <img
                        src={'/g-drive.svg'}
                        alt={'Google Drive'}
                    />
                    <div className="text-start">
                        <div className={twMerge(`mb-1 gap-4 flex`)}>
                            <p>Google Drive</p>
                            {googleDrive ? <Badge text="Enabled"/> : <Badge text="Disabled"/>}
                        </div>
                        <div className={twMerge(`text-sm text-gray-600`)}>
                            Upload waiver to Google Drive
                        </div>
                        {!deletedDriveAccount &&
                            <Button onClick={deleteButton} btnText='Delete' type='button'
                                    btnClasses='border border-gray-400 py-2 text-gray-900 mt-4'
                                    fullWidth='w-fit'/>}
                    </div>
                </div>
                <ToggleButton enabled={googleDrive} setEnabled={toggleButtonState}/>
            </div>
        </div>
    );
};

export default GoogleDriveConfig;
