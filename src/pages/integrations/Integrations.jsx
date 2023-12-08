import Heading from "../../components/Heading.jsx";
import ToggleButton from "../../components/inputs/ToggleButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../redux/user/userSlice";
import Button from "../../components/Button";
import {authUrl} from "../../utils/generalFunctions";
import {useNavigate} from "react-router-dom";
import {
    deleteConstantContact,
    deleteDriveAccount,
    deleteDropbox,
    deleteMailchimp,
    toggleConstantContact,
    toggleDriveState,
    toggleDropBoxState,
    toggleMailchimp
} from "../../redux/integration/integrationSlice";
import {twMerge} from "tailwind-merge";


const Integrations = () => {
    const dispatch = useDispatch()
    const {
        googleDrive,
        deletedDriveAccount,
        dropBoxActive,
        deletedDropBox,
        mailchimpActive,
        deletedMailchimp,
        constantContactActive,
        deletedConstantContact
    } = useSelector(state => state.integration)

    const user = useSelector(selectCurrentUser)

    let url = window.location.href
    const data = [
        {
            id: 1,
            state: mailchimpActive,
            title: 'Mailchimp',
            subtitle: 'Syncs with subscriber list',
            image: '/mailchimp.svg'
        },
        {
            id: 2,
            state: dropBoxActive,
            title: 'Dropbox',
            subtitle: 'Upload waiver to dropbox',
            image: '/dropbox.svg'
        },
        {
            id: 3,
            state: googleDrive,
            title: 'Google Drive',
            subtitle: 'Upload waiver to Google Drive',
            image: '/g-drive.svg'
        },
        {
            id: 4,
            state: constantContactActive,
            title: 'Constant Contact',
            subtitle: 'Send email to Constant Contact',
            image: '/constant-contact.svg'
        }
    ]


    // toggle google drive auth token
    const toggleGoogleDrive = async () => {
        dispatch(toggleDriveState(!googleDrive))
        if (deletedDriveAccount) {
            window.location.assign(`${authUrl("googleDrive")}${url},${user._id}`)
            dispatch(deleteDriveAccount(false))
        }
    }
    // toggle dropbox auth token
    const toggleDropbox = async () => {
        dispatch(toggleDropBoxState(!dropBoxActive))
        if (deletedDropBox) {
            window.location.assign(`${authUrl("dropbox")}${url},${user._id}`)
            dispatch(deleteDropbox(false))
        }
    }
    // toggle mailchimp auth token
    const toggleMailChimp = async () => {
        dispatch(toggleMailchimp(!mailchimpActive))
        console.log("mail chimp", mailchimpActive)
        if (deletedMailchimp) {
            window.location.assign(`${authUrl("mailChimp")}${url},${user._id}`)
            dispatch(deleteMailchimp(false))
        }
    }
    // toggle constant contact auth token
    const toggleConstantContactAuth = async () => {
        dispatch(toggleConstantContact(!constantContactActive))
        if (deletedConstantContact) {
            window.location.assign(`${authUrl("contact")}${url},${user._id}`)
            dispatch(deleteConstantContact(false))
        }
    }

    return (
        <div className="bg-white rounded-md p-6 w-full font-mulish">
            <Heading title='Integrations' subtitle='Lorem ipsum mit dollar' subTitleClasses='text-sm text-btnBg'
                     titleClasses='text-xl font-semibold'/>
            <div className="grid grid-cols-2 gap-4 mt-6">
                {data.map((item) => {
                    if (item.title === "Google Drive") {
                        return (
                            <Tile key={item.id} state={item.state} setState={toggleGoogleDrive}
                                  subTitle={item.subtitle} title={item.title} image={item.image}/>
                        )
                    }
                    if (item.title === "Dropbox") {
                        return (
                            <Tile key={item.id} state={item.state} setState={toggleDropbox}
                                  subTitle={item.subtitle} title={item.title} image={item.image}/>
                        )
                    }
                    if (item.title === "Mailchimp") {
                        return (
                            <Tile key={item.id} state={item.state} setState={toggleMailChimp}
                                  subTitle={item.subtitle} title={item.title} image={item.image}/>
                        )
                    }
                    if (item.title === "Constant Contact") {
                        return (
                            <Tile key={item.id} state={item.state} setState={toggleConstantContactAuth}
                                  subTitle={item.subtitle} title={item.title} image={item.image}/>
                        )
                    } else {
                        return (
                            <></>
                        )
                    }
                })}
            </div>
        </div>
    )
}
export default Integrations

export const Tile = ({state, setState, title, subTitle, image}) => {
    const {
        deletedDriveAccount,
        deletedDropBox,
        deletedConstantContact,
        deletedMailchimp
    } = useSelector(state => state.integration)
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
                            <p>{title}</p>

                        </div>
                        <div className={twMerge(`text-sm text-gray-600`)}>
                            {subTitle}
                        </div>
                        {!deletedDriveAccount && <Button onClick={() => {
                            navigate("/settings/configure", {state: {config: "googleDrive"}})
                        }} btnText="Configure" btnClasses='border border-gray-400 py-2 text-gray-900 mt-4'/>}
                    </div> :
                    title === "Dropbox" ?
                        <div className="text-start">
                            <div className={twMerge(`mb-1 gap-4 flex`)}>
                                <p>{title}</p>

                            </div>
                            <div className={twMerge(`text-sm text-gray-600`)}>
                                {subTitle}
                            </div>
                            {!deletedDropBox && <Button onClick={() => {
                                navigate("/settings/configure", {state: {config: "dropbox"}})
                            }} btnText="Configure" btnClasses='border border-gray-400 py-2 text-gray-900 mt-4'/>}
                        </div> :
                        title === "Mailchimp" ?
                            <div className="text-start">
                                <div className={twMerge(`mb-1 gap-4 flex`)}>
                                    <p>{title}</p>

                                </div>
                                <div className={twMerge(`text-sm text-gray-600`)}>
                                    {subTitle}
                                </div>
                                {!deletedMailchimp && <Button onClick={() => {
                                    navigate("/settings/configure", {state: {config: "mailchimp"}})
                                }} btnText="Configure" btnClasses='border border-gray-400 py-2 text-gray-900 mt-4'/>}
                            </div> :
                            title === "Constant Contact" ?
                                <div className="text-start">
                                    <div className={twMerge(`mb-1 gap-4 flex`)}>
                                        <p>{title}</p>
                                    </div>
                                    <div className={twMerge(`text-sm text-gray-600`)}>
                                        {subTitle}
                                    </div>
                                    {!deletedConstantContact && <Button onClick={() => {
                                        navigate("/settings/configure", {state: {config: "constantContact"}})
                                    }} btnText="Configure"
                                                                        btnClasses='border border-gray-400 py-2 text-gray-900 mt-4'/>}
                                </div> :
                                <></>
                }

            </div>
            <ToggleButton enabled={state} setEnabled={setState}/>
        </div>
    )
}