import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../redux/user/userSlice";
import axios from "axios";
import toast from "react-hot-toast";
import SelectInput from "../../../components/inputs/SelectInput";
import Button from "../../../components/Button";
import {getRequest} from "../../../redux/cwAPI";
import {addCheck} from "../../../utils/generalFunctions";
import {useNavigate} from "react-router-dom";
import Spinner from "../../../components/Spinner";

const ContactConfigRow = ({item}) => {
    const user = useSelector(selectCurrentUser)
    const {constantContactActive} = useSelector(state => state.integration)
    const [folders, setFolders] = useState([])
    const [selected, setSelected] = useState(item.Inputs)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/Integration/all-folders/${user._id}?integration_type=constant_contact`).then((value) => {
            setFolders(value.data.map((folder) => folder.name))
            console.log("folder", folders)
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
            setLoading(true)
            const newCustomerArr = customers.map((customer) => {
                return {
                    email_address: {
                        address: customer.email,
                        permission_to_send: "implicit"
                    },
                    create_source: "Account"
                }
            })
            const data = {
                list_name: selected,
                customers: newCustomerArr
            }
            await axios.post(`http://localhost:3000/Integration/send-file-to-contact-list/${user._id}?integration_type=constant_contact`, data)
            navigate(-1)
            toast.custom("Contacts saved")
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }

    return (
        <>
            <tr>
                <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.templateName}</td>
                <td className='px-6 text-sm text-gray-900 whitespace-nowrap'>
                    <SelectInput extraClasses='grow md:grow-0' options={folders} setState={setSelected}
                                 state={selected}/>
                </td>
                <td className='py-4 text-sm text-gray-900 whitespace-nowrap'>
                    {constantContactActive && <Button onClick={onSubmit} btnText='Submit' type='button'
                                                      btnClasses='border border-gray-400 py-2 text-gray-900 my-4'
                                                      fullWidth='w-fit'/>}
                </td>
            </tr>
            {loading && <Spinner/>}
        </>
    );
};

export default ContactConfigRow;
