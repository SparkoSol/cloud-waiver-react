import React, {useEffect, useState} from 'react';
import SelectInput from "../../../components/inputs/SelectInput";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../redux/user/userSlice";
import toast from "react-hot-toast";

const GoogleDriveConfigRow = ({item}) => {
    const user = useSelector(selectCurrentUser)
    const [folders, setFolders] = useState([])
    const [selected, setSelected] = useState(item.Inputs)
    useEffect(() => {
        axios.get(`http://localhost:3000/Integration/google-drive-folders/${user._id}`).then((value) => {
            setFolders(value.data.map((folder) => folder.name))
        }).catch((reason) => {
            toast.error(reason.response.data.message)
        })
    }, []);
    return (
        <tr>
            <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.templateName}</td>
            <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>
                <SelectInput options={folders} setState={setSelected} state={selected}/>
            </td>
        </tr>
    );
};

export default GoogleDriveConfigRow;
