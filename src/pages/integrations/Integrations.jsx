import Heading from "../../components/Heading.jsx";
import ToggleButton from "../../components/inputs/ToggleButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../redux/user/userSlice";
import Button from "../../components/Button";
import {authUrl} from "../../utils/generalFunctions";
import {useNavigate} from "react-router-dom";
import {
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
    dropBoxActiveState,
    mailchimpActive,
    constantContactActive,
  } = useSelector(state => state.integration)

  const user = useSelector(selectCurrentUser)

  let url = window.location.href
  // Extract the hostname
  let newUrl = new URL(url);
  let hostname = newUrl.hostname;

  let parts = hostname.split('.');
  let domain = parts[0]

  const data = [
    {
      id: 1,
      state: mailchimpActive,
      title: 'Mailchimp',
      subtitle: 'Syncs with subscriber list',
      image: '/mailchimp.svg',
      functionCall: toggleMailChimpState
    },
    {
      id: 2,
      state: dropBoxActiveState,
      title: 'Dropbox',
      subtitle: 'Upload waiver to dropbox',
      image: '/dropbox.svg',
      functionCall: toggleDropbox,
    },
    {
      id: 3,
      state: googleDrive,
      title: 'Google Drive',
      subtitle: 'Upload waiver to Google Drive',
      image: '/g-drive.svg', functionCall: toggleGoogleDrive,
    },
    {
      id: 4,
      state: constantContactActive,
      title: 'Constant Contact',
      subtitle: 'Send email to Constant Contact',
      image: '/constant-contact.svg', functionCall: toggleConstantContactAuth,
    }
  ]

  // useEffect(() => {
  //
  //     // axios.get(`http://192.168.1.28:3000/`)).catch((reason) => {
  //     //     if (reason) {
  //     //         dispatch(deleteDropbox(true))
  //     //         dispatch(toggleDropBoxState(false))
  //     //     }
  //     // })
  //     axios.get(`http://192.168.1.28:3000/integration/auth-token/${user._id}?integration_type=mailchimp`).then((value) => {
  //         if (value) {
  //             dispatch(deleteMailchimp(false))
  //         }
  //     }).catch((reason) => {
  //         if (reason) {
  //             dispatch(deleteMailchimp(true))
  //             dispatch(toggleMailchimp(false))
  //         }
  //     })
  //     axios.get(`http://192.168.1.28:3000/integration/auth-token/${user._id}?integration_type=google_drive`).then((value) => {
  //         if (value) {
  //             dispatch(deleteDriveAccount(false))
  //         }
  //     }).catch((reason) => {
  //         if (reason) {
  //             dispatch(deleteDriveAccount(true))
  //             dispatch(toggleDriveState(false))
  //         }
  //     })
  //     axios.get(`http://192.168.1.28:3000/integration/auth-token/${user._id}?integration_type=constant_contact`).then((value) => {
  //         if (value) {
  //             dispatch(deleteConstantContact(false))
  //         }
  //     }).catch((reason) => {
  //         if (reason) {
  //             dispatch(deleteConstantContact(true))
  //             dispatch(toggleConstantContact(false))
  //         }
  //     })
  //
  // }, []);

  //TODO : Simplify this
  async function toggleGoogleDrive() {
    dispatch(toggleDriveState(!googleDrive))
    if (!googleDrive) window.location.assign(`${authUrl("googleDrive")}${url},${user._id},${domain}`)
  }

  // toggle dropbox auth token
  async function toggleDropbox() {
    dispatch(toggleDropBoxState(!dropBoxActiveState))
    if (!dropBoxActiveState) window.location.assign(`${authUrl("dropbox")}${url},${user._id},${domain}`)
  }

  // toggle mailchimp auth token
  async function toggleMailChimpState() {
    dispatch(toggleMailchimp(!mailchimpActive))
    if (!mailchimpActive) window.location.assign(`${authUrl("mailChimp")}${url},${user._id},${domain}`)
  }

  // toggle constant contact auth token
  async function toggleConstantContactAuth() {
    dispatch(toggleConstantContact(!constantContactActive))
    if (!constantContactActive) window.location.assign(`${authUrl("contact")}${url},${user._id},${domain}`)
  }

  return (
    <div className="bg-white rounded-md p-6 w-full font-mulish">
      <Heading title='Integrations' subtitle='Lorem ipsum mit dollar' subTitleClasses='text-sm text-btnBg'
               titleClasses='text-xl font-semibold'/>
      <div className="grid grid-cols-2 gap-4 mt-6">
        {data.map((item) => {
          return (
            <Tile key={item.id} state={item.state} setState={item.functionCall}
                  subTitle={item.subtitle} title={item.title} image={item.image} showConfig={item.showConfig}/>
          )
        })}
      </div>
    </div>
  )
}
export default Integrations

export const Tile = ({state, setState, title, subTitle, image}) => {
  const navigate = useNavigate()

  return (
    <div className="bg-gray-50 border border-gray-300 rounded-xl flex items-center justify-between p-6">
      <div className='flex  gap-4'>
        <img
          src={image}
          alt={title}
        />
        <div className="text-start">
          <div className={twMerge(`mb-1 gap-4 flex`)}>
            <p>{title}</p>

          </div>
          <div className={twMerge(`text-sm text-gray-600`)}>
            {subTitle}
          </div>
          {state && <Button onClick={() => {
            navigate("/settings/configure", {state: {config: title.toLowerCase()}})
          }} btnText="Configure" btnClasses='border border-gray-400 py-2 text-gray-900 mt-4'/>}
        </div>
      </div>
      <ToggleButton enabled={state} setEnabled={setState}/>
    </div>
  )
}