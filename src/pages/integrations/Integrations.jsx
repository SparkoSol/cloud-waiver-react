import Heading from "../../components/Heading.jsx";
import ToggleButton from "../../components/inputs/ToggleButton.jsx";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../redux/user/userSlice";
import axios from "axios";
import Input from "../../components/inputs/Input";
import Button from "../../components/Button";
import toast from 'react-hot-toast'
import {authUrl} from "../../utils/generalFunctions";

//TODO : Remove this folder
const Integrations = () => {
    const [mailChimp, setMailChimp] = useState(false);
    const [dropbox, setDropbox] = useState(false);
    const [drive, setDrive] = useState(false);
    const [contact, setContact] = useState(false);
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
            state: drive,
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
        //eslint-disable-next-line
    }, []);

    // Dropbox Auth Setup
    useEffect(() => {
        if (dropbox === true) {
            window.location.assign(`${authUrl("dropbox")}${domain},${url}`)
        }
        //eslint-disable-next-line
    }, [dropbox]);

    // Constant Contact Auth Setup
    useEffect(() => {
        if (contact === true) {
            window.location.assign(`${authUrl("contact")}${domain},${url}`)
        }
        //eslint-disable-next-line
    }, [contact]);

    // Mailchimp Auth Setup
    useEffect(() => {
        if (mailChimp === true) {
            window.location.assign(`${authUrl("mailChimp")}${domain},${url}`)
        }
        //eslint-disable-next-line
    }, [mailChimp]);

    const driveDataSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3000/integration/google-drive/upload-svc", driveData)
        } catch (e) {
            toast.error(e.response.data.message)
        }
    }

    const toggleButtonState = (e) => {
        if (!drive) {
            window.location.assign(`${authUrl("googleDrive")}${url},${user._id}`)
            setDrive(e)
        } else {
            setToken("")
            setDrive(e)
            axios.delete(`http://localhost:3000/integration/google-drive/${user._id}`).catch((reason) => {
                toast.error(reason.response.data.message)
            })
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
                            <Tile token={token} key={item.id} state={item.state} setState={toggleButtonState}
                                  subTitle={item.subtitle} title={item.title} image={item.image}/>
                        )
                    } else {
                        return (
                            <Tile token={token} key={item.id} state={item.state} setState={item.setState}
                                  subTitle={item.subtitle} title={item.title} image={item.image}/>
                        )
                    }
                })}
            </div>
            {token === "available" &&
                <div>
                    <form className="flex w-full gap-4 items-center h-28" onSubmit={driveDataSubmit}>
                        <Input onChange={(e) => {
                            setDriveData({...driveData, file: e.target.value})
                        }} label="File" placeholder="file" extraClasses={"w-[30%]"}/>
                        <Input onChange={(e) => {
                            setDriveData({...driveData, folderName: e.target.value})
                        }} label="Folder" placeholder="Folder name" extraClasses={"w-[30%]"}/>
                        <Button type="submit" btnClasses='bg-btnBg border-btnBg px-4 py-1.5 ml-4 mt-6'
                                btnText="Save to drive"/>
                    </form>
                </div>
            }

        </div>
    )
}
export default Integrations

export const Tile = ({state, setState, title, subTitle, image}) => {
    return (
        <div className="bg-gray-50 border border-gray-300 rounded-xl flex items-center justify-between p-6">
            <div className='flex gap-4'>
                <img
                    src={image}
                    alt={title}
                />
                <Heading title={title}
                         subtitle={subTitle}
                         titleClasses='text-base font-medium text-gray-800 mb-0'
                         subTitleClasses='text-sm text-gray-600'/>
            </div>
            <ToggleButton enabled={state} setEnabled={setState}/>
        </div>
    )
}