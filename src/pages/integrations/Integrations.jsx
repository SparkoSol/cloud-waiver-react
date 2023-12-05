import Heading from "../../components/Heading.jsx";
import ToggleButton from "../../components/inputs/ToggleButton.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../redux/user/userSlice";
import axios from "axios";
import Button from "../../components/Button";
import toast from 'react-hot-toast'
import {authUrl} from "../../utils/generalFunctions";
import {useNavigate} from "react-router-dom";
import {deleteDriveAccount, toggleDriveState} from "../../redux/integration/integrationSlice";
import {twMerge} from "tailwind-merge";


const Integrations = () => {
    const dispatch = useDispatch()
    const [mailChimp, setMailChimp] = useState(false);
    const [dropbox, setDropbox] = useState(false);
    const [drive, setDrive] = useState(false);
    const [contact, setContact] = useState(false);
    const {googleDrive, deletedDriveAccount} = useSelector(state => state.integration)
    const [token, setToken] = useState("")
    const [driveData, setDriveData] = useState({
        file: null,
        folderName: "",
        accessToken: ""
    })
    const user = useSelector(selectCurrentUser)

    let url = window.location.href
    let domain = window.location.hostname.split('.')[0];

    const data = [
        {
            id: 1,
            state: mailChimp,
            setState: setMailChimp,
            title: 'Mailchimp',
            subtitle: 'Syncs with subscriber list',
            image: '/mailchimp.svg'
        }, {
            id: 2,
            state: dropbox,
            setState: setDropbox,
            title: 'Dropbox',
            subtitle: 'Upload waiver to dropbox',
            image: '/dropbox.svg'
        }, {
            id: 3,
            state: googleDrive,
            setState: setDrive,
            title: 'Google Drive',
            subtitle: 'Upload waiver to Google Drive',
            image: '/g-drive.svg'
        }, {
            id: 4,
            state: contact,
            setState: setContact,
            title: 'Constant Contact',
            subtitle: 'Send email to Constant Contact',
            image: '/constant-contact.svg'
        }
    ]


    useEffect(() => {
        axios.get(`http://localhost:3000/integration/google-drive/${user._id}`).then((value) => {
            if (user._id === value.data.userID) {
                setDrive(true)
                setToken("available")
                setDriveData({...driveData, accessToken: value.data.refresh_token})
            }
        }).catch((reason) => {
            toast.error(reason.response.data.message)
        })
    }, []);

    // Dropbox Auth Setup
    useEffect(() => {
        if (dropbox === true) {
            window.location.assign(`${authUrl("dropbox")}${url},${user._id}`)
            console.log(url)
        }
    }, [dropbox]);

    // Constant Contact Auth Setup
    useEffect(() => {
        if (contact === true) {
            window.location.assign(`${authUrl("contact")}${domain},${url}`)
        }
    }, [contact]);

    // Mailchimp Auth Setup
    useEffect(() => {
        if (mailChimp === true) {
            window.location.assign(`${authUrl("mailChimp")}${domain},${url}`)
        }
    }, [mailChimp]);

    const toggleButtonState = async (e) => {
        dispatch(toggleDriveState(!googleDrive))
        if (deletedDriveAccount) {
            window.location.assign(`${authUrl("googleDrive")}${url},${user._id}`)
            dispatch(deleteDriveAccount(false))
        }
    }

    return (
        <div className="bg-white rounded-md p-6 w-full font-mulish">
            <Heading title='Integrations' subtitle='Lorem ipsum mit dollar' subTitleClasses='text-sm text-btnBg'
                     titleClasses='text-xl font-semibold'/>
            <div className="grid grid-cols-2 gap-4 mt-6">
                {data.map(item => {
                    if (item.title === "Google Drive") {
                        return (
                            <Tile token={true} key={item.id} state={item.state} setState={toggleButtonState}
                                  subTitle={item.subtitle} title={item.title} image={item.image}/>
                        )
                    } else {
                        return (
                            <Tile token={false} key={item.id} state={item.state} setState={item.setState}
                                  subTitle={item.subtitle} title={item.title} image={item.image}/>
                        )
                    }
                })}
            </div>
        </div>
    )
}
export default Integrations

export const Tile = ({state, setState, title, subTitle, image, token = false}) => {
    const {deletedDriveAccount} = useSelector(state => state.integration)
    const navigate = useNavigate()
    return (
        <div className="bg-gray-50 border border-gray-300 rounded-xl flex items-center justify-between p-6">
            <div className='flex  gap-4'>
                <img
                    src={image}
                    alt={title}
                />
                {title === "Google Drive" ?
                    <div className="text-start">
                        <div className={twMerge(`mb-1 gap-4 flex`)}>
                            <p>Google Drive</p>

                        </div>
                        <div className={twMerge(`text-sm text-gray-600`)}>
                            Upload waiver to Google Drive
                        </div>
                        {!deletedDriveAccount && <Button onClick={() => {
                            navigate("/settings/configure")
                        }} btnText="Configure" btnClasses='border border-gray-400 py-2 text-gray-900 mt-4'/>}
                    </div> :
                    <Heading title={title}
                             subtitle={subTitle}
                             titleClasses='text-base font-medium text-gray-800 mb-0'
                             subTitleClasses='text-sm text-gray-600'/>}

            </div>
            <ToggleButton enabled={state} setEnabled={setState}/>
        </div>
    )
}