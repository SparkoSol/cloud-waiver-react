import React, {useEffect, useState} from 'react';
import SelectInput from "../../../components/inputs/SelectInput";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../redux/user/userSlice";
import toast from "react-hot-toast";
import Button from "../../../components/Button";
import {getRequest} from "../../../redux/cwAPI";
import {addCheck} from "../../../utils/generalFunctions";
import {useNavigate} from "react-router-dom";
import Spinner from "../../../components/Spinner";

const DropboxConfigRow = ({item}) => {
    const user = useSelector(selectCurrentUser)
    const [folders, setFolders] = useState([])
    const {dropBoxActive} = useSelector(state => state.integration)
    const [selected, setSelected] = useState(item.Inputs)
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3000/Integration/all-folders/${user._id}?integration_type=dropbox`).then((value) => {
            setFolders(value.data.map((folder) => folder.name))
        }).catch((reason) => {
            toast.error(reason.response.data.message)
        })
        getRequest(`/customers`)
            .then(r => {
                setCustomers(addCheck(r.data))
                console.log("all customers", r.data)
            })
            .catch(e => toast.error(e.response.data.message))
    }, []);

    const onSubmit = async () => {
        try {
            const data = {
                folder_name: selected,
                customers: customers
            }
            setLoading(true)
            const res = await axios.post(`http://localhost:3000/Integration/save-file/${user._id}?integration_type=dropbox`, data)
            setLoading(false)
            toast.custom(res.data.message)
            navigate(-1)
        } catch (e) {
            setLoading(false)
            toast.error(e.response.data.message)
        }
    }

    return (
        <>
            <tr>
                <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.templateName}</td>
                <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>
                    <SelectInput extraClasses='grow md:grow-0' options={folders} setState={setSelected}
                                 state={selected}/>
                </td>
                <td className='py-4 text-sm text-gray-900 whitespace-nowrap'>
                    {dropBoxActive && <Button onClick={onSubmit} btnText='Submit' type='button'
                                              btnClasses='border border-gray-400 py-2 text-gray-900 my-4'
                                              fullWidth='w-fit'/>}
                </td>
            </tr>
            {loading && <Spinner/>}
        </>
    );
};

export default DropboxConfigRow;
