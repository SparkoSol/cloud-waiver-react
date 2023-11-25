import Heading from "../../components/Heading.jsx";
import ToggleButton from "../../components/inputs/ToggleButton.jsx";
import {useEffect, useState} from "react";
import {useGoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";

const Integrations = () => {
  const [mailChimp, setMailChimp] = useState(false);
  const [dropbox, setDropbox] = useState(false);
  const [drive, setDrive] = useState(false);
  const [contact, setContact] = useState(false);
  // const loadDriveApi = () => {
  //   window.gapi.client.load('drive', 'v3', () => {
  //     console.log('Drive API loaded.');
  //   });
  // };

// Initialize the API client library and set up sign-in state listeners
//   function initClient() {
//
//     window.gapi.client.init({
//       apiKey: 'AIzaSyBuK1Xr7VPQinHtOnSVd5FfVhGe4crQzkU', // Replace with your API key
//       clientId: '624151635976-pdokorihagf0osqpt8fmdsdh6luqpb1e.apps.googleusercontent.com', // Replace with your OAuth2 client ID
//       discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
//       scope: 'https://www.googleapis.com/auth/drive', // Define the required scope,
//       hosted_domain: 'http://localhost:3333'
//     }).then(() => {
//       console.log('API client initialized');
//       loadDriveApi();
//     }).catch((error) => {
//           console.error('Error initializing API client:', error);
//         });
//
//   }

  // const handleClientLoad = () => {
  //   window.gapi.load('client:auth2', initClient);
  // };
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
    redirect_uri:"https://techtrival.com"
  });
  const navigate = useNavigate()

  const getAuth = ()=>{
    window.location.assign("https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive&include_granted_scopes=true&response_type=code&&redirect_uri=https://techtrival.com&client_id=624151635976-svriaorhnerjpgj61modfe8k7sh5fbde.apps.googleusercontent.com&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow")
  }

  const data = [
    {
      id:1,
      state:mailChimp,
      setState:setMailChimp,
      title:'Mailchimp',
      subtitle:'Syncs with subscriber list',
      image:'/mailchimp.svg'
    },{
      id:2,
      state:dropbox,
      setState:setDropbox,
      title:'Dropbox',
      subtitle:'Upload waiver to dropbox',
      image:'/dropbox.svg'
    },{
      id:3,
      state:drive,
      setState:setDrive,
      title:'Google Drive',
      subtitle:'Upload waiver to Google Drive',
      image:'/g-drive.svg'
    },{
      id:4,
      state:contact,
      setState:setContact,
      title:'Constant Contact',
      subtitle:'Send email to Constant Contact',
      image:'/constant-contact.svg'
    }
  ]

  // useEffect(() => {
  //   window.handleClientLoad = handleClientLoad;
  //   const script = document.createElement('script');
  //   script.src = 'https://apis.google.com/js/api.js';
  //   script.onload = handleClientLoad;
  //   document.body.appendChild(script);
  //   // Clean up function
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  useEffect(() => {
    if (!drive)return
    navigate("/google-auth")
  }, [drive]);


  return (
    <div className="bg-white rounded-md p-6 w-full font-mulish">
      <Heading title='Integrations' subtitle='Lorem ipsum mit dollar' subTitleClasses='text-sm text-btnBg' titleClasses='text-xl font-semibold'/>
      <div className="grid grid-cols-2 gap-4 mt-6">
        {data.map(item=>{
          return(
            <Tile key={item.id} state={item.state} setState={item.setState} subTitle={item.subtitle} title={item.title} image={item.image}/>
          )
        })}
      </div>
    </div>
  )
}

export default Integrations

export const Tile = ({state, setState, title, subTitle, image}) => {
  return(
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