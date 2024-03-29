export const data = [
  //TODO : type and id are same
  {
    id: 'MAILCHIMP',
    title: 'Mailchimp',
    subtitle: 'Syncs with subscriber list',
    image: 'mailchimp.svg',
    url: `https://login.mailchimp.com/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_MAILCHIMP_ID}&redirect_uri=https://api.cloudwaiver.com/integration/connect&state=`,
    type:'MAILCHIMP'
  },
  {
    id: 'DROPBOX',
    title: 'Dropbox',
    subtitle: 'Upload waiver to dropbox',
    image: 'dropbox.svg',
    url: `https://www.dropbox.com/oauth2/authorize?client_id=${process.env.REACT_APP_DROPBOX_ID}&token_access_type=offline&response_type=code&redirect_uri=https://api.cloudwaiver.com/integration/connect&state=`,
    type:'DROPBOX'
  },
  {
    id: 'GOOGLE_DRIVE',
    title: 'Google Drive',
    subtitle: 'Upload waiver to Google Drive',
    image: 'g-drive.svg', url: `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${process.env.REACT_APP_GOOGLE_ID}&redirect_uri=https://api.cloudwaiver.com/integration/connect&scope=https://www.googleapis.com/auth/drive&access_type=offline&approval_prompt=force&state=`,
    type:'GOOGLE_DRIVE'
  },
  {
    id: 'CONSTANT_CONTACT',
    title: 'Constant Contact',
    subtitle: 'Send email to Constant Contact',
    image: 'constant-contact.png',
    url: `https://authz.constantcontact.com/oauth2/default/v1/authorize?client_id=${process.env.REACT_APP_CONSTANT_ID}&redirect_uri=https://api.cloudwaiver.com/integration/connect&response_type=code&scope=contact_data%20campaign_data%20offline_access&state=`,
    type:'CONSTANT_CONTACT'
  }
]