import Heading from "../../components/Heading.jsx";
import ToggleButton from "../../components/inputs/ToggleButton.jsx";
import {useEffect, useState} from "react";

const Integrations = () => {
  const [mailChimp, setMailChimp] = useState(false);
  const [dropbox, setDropbox] = useState(false);
  const [drive, setDrive] = useState(false);
  const [contact, setContact] = useState(false);

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

  // Dropbox Auth Setup
  useEffect(() => {
    if(dropbox === true){
      const domain = window.location.hostname.split('.')[0];
      const url = window.location.href;
      const auth_url =`https://www.dropbox.com/oauth2/authorize?client_id=h8zd4n5p1xp6g7u&token_access_type=offline&response_type=code&redirect_uri=http://localhost:8000/auth&state=${domain},${url}`
      console.log(domain)
      window.location.assign(auth_url)
    }
  }, [dropbox]);

  // Constant Contact Auth Setup
  useEffect(() => {
    if(contact === true){
      const domain = window.location.hostname.split('.')[0];
      const url = window.location.href;
      const auth_url =`https://authz.constantcontact.com/oauth2/default/v1/authorize?client_id=ce7089bc-d014-4dd7-9c3a-909174df3019&redirect_uri=http://localhost:8000/constant-cotact/auth&response_type=code&scope=contact_data%20campaign_data%20offline_access&state=${domain},${url}`
      console.log(domain)
      window.location.assign(auth_url)
    }
  }, [contact]);

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