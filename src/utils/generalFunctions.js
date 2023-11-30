import {
  ArrowRightOnRectangleIcon,
  ClipboardDocumentIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  Squares2X2Icon,
  UserIcon,
  UsersIcon
} from "@heroicons/react/24/outline";
import {AdjustmentsVerticalIcon} from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import Control from "formBuilder/src/js/control";
import $ from 'jquery'
import tinymce from "tinymce";
import {patchRequest} from "../redux/cwAPI";

export function generateMonths(number) {
  const months = ['Month'];
  for (let i = 1; i <= number; i++) {
    months.push(i);
  }

  return months;
}

export function generateYears(startingYear) {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startingYear; year <= currentYear; year++) {
    years.push(year);
  }
  years.push('Year');
  return years.reverse();
}

export function isValidBody(body) {
  const invalidFields = [];

  for (const key in body) {
    if (body.hasOwnProperty(key) && typeof body[key] === 'string') {
      if (body[key].trim() === '') {
        invalidFields.push(key);
      }
    }
  }

  if (invalidFields.length > 0) {
    toast.error(`Invalid input at ${invalidFields[0]}`)
    return false;
  }

  return true;
}

export function isEmptyObject(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false; // If the object has any own property, it's not empty
    }
  }
  return true; // If the loop completes without finding any own properties, it's empty
}

export const capitalize = (string) => {
  if (string) return string.charAt(0).toUpperCase() + string.slice(1);
}
export const addCheck = (arr, filter) => {
  return arr.map(item => {
    return {...item, checked: false}
  });
}

export function limitChars(str, number) {
  return str.slice(0, number) + '...';
}

export function today() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = currentDate.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`
}

export function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type: mime});
}

//custom component logics
class SignatureControls extends Control {
  // eslint-disable-next-line
  constructor() {
    super();
  }

  static get definition() {
    return {
      subtype: 'signature',
      id: '1',
      isPreview: true,
      title: 'Signature',
      type: 'signature',
      access: false,
      required: false,
      label: 'Signature',
      i18n: {
        'fr-FR': 'Mon Type',
        'default': 'My Type'
      },
    };
  }

  configure() {
  }

  // Method to build and return a DOM element representing the control
  build() {
    const controlElement = document.createElement('div');
    controlElement.className = 'custom-control';

    return {
      field: controlElement,
      layout: 'noLabel',
    };
  }

  onRender(event) {
  }
}

Control.register('signature', SignatureControls);

//some forms are reusable

export let additionMinorForm = `
        <form class="space-y-2" id="myForm">
          <div class="mt-3">
            <label for="f_name" class='text-sm text-gray-900 whitespace-nowrap'>First name</label>
            <input type="text" name="f_name"  value="" placeholder="First name" class="block w-full p-2.5 border border-gray-300 bg-gray-200 text-gray-900 rounded-md" />
          </div>
          <div class="mt-3">
            <label for="l_name" class='text-sm text-gray-900 whitespace-nowrap'>Last name</label>
            <input type="text" name="l_name"  value="" placeholder="Last name" class="block w-full p-2.5 border border-gray-300 bg-gray-200 text-gray-900 rounded-md" />
          </div>
          <div class="mt-3">
            <h2 class="text-sm">Date of Birth</h2>
            <div class="flex items-center space-x-2">
              <input type="date" value="" name="date_of_birth" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" />
            </div>
          </div>
          <div class="mt-3">
            <h2 class="text-sm">Relationship</h2>
            <div class="flex items-center space-x-2">
              <input type="text" value="" name="relationship" placeholder="Relationship" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" />
            </div>
          </div>
        </form>`

//static headers
export const DashBoardHeaders = ['ID', 'Signed Date', 'First Name', 'Last Name', 'Reference No', 'Template Name', 'Status'];
export const dashboardData = [{
  _id: '1111111',
  signedDate: 'Oct 05, 2023',
  firstName: 'John',
  lastName: 'Doe',
  refrenceNo: 'SPARKO',
  templateName: 'Lorem',
  status: 'Submitted'
}]
export const sideBarOptions = [
  {
    id: 1,
    title: 'Dashboard',
    icon: Squares2X2Icon,
    url: '/dashboard'
  },
  {
    id: 2,
    title: 'Waiver Templates',
    icon: DocumentTextIcon,
    url: '/templates'
  },
  {
    id: 5,
    title: 'Signed Waivers',
    url: '/signed',
    icon: ClipboardDocumentIcon
  },
  {
    id: 6,
    title: 'Template Gallery',
    url: '/gallery',
    icon: UsersIcon,
    subList: [
      {
        id: 7,
        title: 'Templates 1',
      },
      {
        id: 8,
        title: 'Templates 2',
      }
    ]
  },
  {
    id: 9,
    title: 'Customers',
    url: '/customers',
    icon: UserIcon
  },
  {
    id: 10,
    title: 'Kiosk Settings',
    url: '/kiosk',
    icon: ComputerDesktopIcon
  },
  {
    id: 16,
    title: 'Staff Management',
    url: '/management',
    icon: UsersIcon
  },
  {
    id: 11,
    title: 'Settings',
    url: '/settings',
    icon: Cog6ToothIcon,
    subList: [
      {
        id: 13,
        title: 'Account',
        url: '/settings'
      },
      {
        id: 14,
        title: 'Password',
        url: '/settings/password'
      },
      {
        id: 15,
        title: 'Integrations',
        url: '/settings/integrations'
      }
    ]
  },
  {
    id: 12,
    title: 'Billing',
    url: '/billing',
    icon: AdjustmentsVerticalIcon
  },
  {
    id: 17,
    title: 'Sign Out',
    url: '#',
    icon: ArrowRightOnRectangleIcon
  }
];
export const countries = ["Pakistan", "Germany", "United States", "United Kingdom", "France", "Australia", "Canada", "Japan"];
export const billingOptions = [
  {
    plan: 'Growth',
    firstChar: {
      title: 'For the first 1 - 550', price: 'Flat USD45'
    },
    secondChar: {
      title: '550 - Rest Per Unit', price: 'USD0.09'
    }
  }, {
    plan: 'Free',
    firstChar: {
      title: 'For All Per Unit', price: 'USD0.15'
    }
  }, {
    plan: 'Basic',
    firstChar: {
      title: 'For the first 1 - 150', price: 'Flat USD10'
    },
    secondChar: {
      title: '150 - Rest Per Unit', price: 'USD0.1'
    }
  }, {
    plan: 'Standard',
    firstChar: {
      title: 'For the first 1 - 1050', price: 'Flat USD89'
    },
    secondChar: {
      title: '1050 - Rest Per Unit', price: 'USD0.09'
    }
  }, {
    plan: 'Enterprise Pro',
    firstChar: {
      title: 'For the first 1 - 5050', price: 'Flat USD199'
    },
    secondChar: {
      title: '5050 - Rest Per Unit', price: 'USD0.04'
    }
  }, {
    plan: 'Enterprise',
    firstChar: {
      title: 'For the first 1 - 2550', price: 'Flat USD125'
    },
    secondChar: {
      title: '2550 - Rest Per Unit', price: 'USD0.05'
    }
  }]
export const invoiceData = [
  {
    id: 1,
    invoice: 'B8DAA400-0001',
    period: 'Oct 04, 2023 - Oct 04, 2023',
    total: '$0 USD',
    status: 'Paid'
  }
]
export const customerData = [
  {
    _id: '11111111', firstName: 'John', lastName: 'Doe', email: 'john@gmail.com', count: 1
  }, {
    _id: '21111111', firstName: 'John', lastName: 'Doe', email: 'john@gmail.com', count: 1
  }
]
export let fields = [
  {
    label: 'Additional Participants',
    attrs: {
      type: 'additionalParticipants',
    },
    icon: '🤵',
  },
  {
    label: 'Additional Minors',
    attrs: {
      type: 'additionalMinors'
    },
    icon: '👨‍👦‍👦'
  },
  {
    label: 'Signature',
    attrs: {
      type: 'signature',
    },
    icon: '✍️',
  },
  {
    label: 'Address',
    attrs: {
      type: 'address'
    },
    icon: '🏠'
  },
  {
    label: 'Primary Adult Participant',
    attrs: {
      type: 'primaryAdultParticipant',
    },
    icon: '🤵'
  },
  {
    label: 'Rich Text Editor',
    attrs: {
      type: 'richTextEditor'
    },
    icon: '⌨️'
  },
  {
    label: 'Electronic Consent Signature',
    attrs: {
      type: 'electronicSignatureConsent'
    },
    icon: '💾'
  },
  {
    label: 'Capture Photo',
    attrs: {
      type: 'capturePhoto'
    },
    icon: '📷'
  },
  {
    label: 'Time',
    attrs: {
      type: 'timeComponent'
    },
    icon: '🕐'
  },
  {
    label: 'File Upload',
    attrs: {
      type: 'filesUpload'
    },
    icon: ' 🔗'
  }
];

const templates = {
  primaryAdultParticipant: function (fieldData) {
    return {
      onRender: function () {
        let element = $(`.field-${fieldData.name}`);
        element.append(additionParticipantForm(fieldData));
        $('.js-signature').jqSignature({autoFit: true, height: 200, border: '1px dashed #D1D5DB '});
      }
    };
  },
  additionalParticipants: function (fieldData) {
    let newDiv = $('<div class="participant-div-1"></div>');
    return {
      field: '<h2 class="text-xl font-semibold text-center py-4">How many additional adults?</h2>',
      onRender: function () {
        commonPayload(additionParticipantForm(fieldData), newDiv, fieldData);
      }
    };
  },
  additionalMinors: function (fieldData) {
    let newDiv = $('<div class="minor-div-1"></div>');
    return {
      field: `<h2 class="text-xl font-semibold text-center py-4"> How many minors are you consenting for?</h2>`,
      onRender: function () {
        commonPayload(additionMinorForm, newDiv, fieldData);
      }
    };
  },
  signature: function (fieldData) {
    return {
      onRender: function () {
        let element = $(`.field-${fieldData.name}`);
        element.append(`
        <div class="relative main">
        <div class="absolute w-full h-full cursor-pointer align-middle" onclick="this.remove();">
          <h5 style="display: flex; justify-content: center; height: 100%; align-items: center; color: #9CA3AF;">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5257 0.237081C16.835 0.442777 16.1908 0.95511 15.8837 1.54293C15.4656 2.343 9.06524 15.5794 9.025 15.7272C8.96802 15.9365 9.08443 19.371 9.15661 19.6086C9.18228 19.6932 9.25289 19.8355 9.31351 19.9248L9.42372 20.0872L9.24937 20.4388C9.15347 20.6321 9.07502 20.83 9.07502 20.8786C9.07502 21.1367 9.35701 21.4246 9.60951 21.4243C9.8327 21.424 9.99239 21.282 10.1726 20.9236L10.3405 20.5897L10.573 20.5657C10.7008 20.5525 10.8926 20.5031 10.9992 20.456C11.3238 20.3124 13.9805 18.3386 14.113 18.1426C14.1763 18.0489 15.5215 15.3074 17.1022 12.0504C18.683 8.7934 19.9899 6.12012 20.0067 6.10979C20.0317 6.09428 20.3343 6.19921 20.3761 6.23792C20.3829 6.24423 19.8055 7.45041 19.0929 8.91832C18.3803 10.3863 17.7865 11.6533 17.7735 11.7339C17.7286 12.0105 17.9943 12.3167 18.2796 12.3171C18.4339 12.3173 18.6189 12.22 18.7002 12.0958C18.7358 12.0415 19.5678 10.3437 20.5492 8.32296C21.6998 5.95357 22.3334 4.60316 22.3334 4.52035C22.3334 4.23209 22.1037 4.00331 21.8144 4.00331C21.5566 4.00331 21.4491 4.11594 21.1474 4.70207C20.9959 4.99621 20.8596 5.24918 20.8444 5.26421C20.8292 5.27925 20.7399 5.25235 20.646 5.20445L20.4752 5.11736L20.7735 4.49256C21.1491 3.70578 21.2521 3.32171 21.2194 2.82916C21.1434 1.68538 20.3304 0.678717 19.1777 0.301213C18.7239 0.152617 17.9147 0.121187 17.5257 0.237081ZM19.1315 1.42419C19.5539 1.63349 19.8229 1.90489 20.0202 2.32051C20.1359 2.56429 20.1509 2.63952 20.1514 2.97708L20.1519 3.35831L19.5589 4.5827C19.2327 5.25612 18.8324 6.07912 18.6694 6.41159L18.3728 7.0161L16.7632 6.23436C15.8779 5.80442 15.1568 5.43873 15.1608 5.42175C15.1921 5.28666 16.8568 1.92725 16.9493 1.8122C17.1116 1.61053 17.4117 1.40098 17.6823 1.30038C17.8656 1.23218 17.9866 1.21968 18.341 1.23227C18.7506 1.24675 18.7952 1.2576 19.1315 1.42419ZM17.2971 7.66962L17.9157 7.97545L15.6398 12.6561L13.364 17.3368L13.1998 17.3254C12.5765 17.2822 11.5801 16.9039 10.9336 16.4649C10.7917 16.3685 10.5526 16.1727 10.4023 16.0296L10.129 15.7695L12.4035 11.0832L14.678 6.39685L15.6783 6.88034C16.2284 7.14627 16.9569 7.50145 17.2971 7.66962ZM0.963262 6.57349C0.74418 6.67015 0.666748 6.79338 0.666748 7.0452C0.666748 7.23603 0.685555 7.29059 0.788276 7.3978C0.931619 7.54745 0.948055 7.5516 2.38229 7.80356C3.58292 8.01446 4.1033 8.13891 4.65663 8.34753C5.48433 8.65963 6.12624 9.16659 6.38387 9.71171C6.55089 10.0651 6.58181 10.2194 6.58003 10.6916C6.57677 11.5684 6.22485 12.4517 4.94514 14.7953C3.69424 17.0859 3.30377 17.9601 3.1204 18.8802C2.86307 20.1713 3.44504 21.0201 4.81794 21.3561C5.26826 21.4663 5.81355 21.5089 6.77378 21.509L7.71305 21.5092L7.84055 21.4019C8.10415 21.18 8.10415 20.8217 7.84055 20.5999C7.71775 20.4965 7.69158 20.4926 7.13383 20.4922C6.36985 20.4917 5.45684 20.4238 5.07938 20.3394C4.68789 20.2519 4.3123 20.054 4.20343 19.8779C4.01604 19.5747 4.14655 18.803 4.54006 17.8875C4.77643 17.3375 5.06587 16.7742 5.88928 15.2612C6.86646 13.4657 7.26934 12.5833 7.49448 11.7454C7.59504 11.3711 7.60847 11.2429 7.60999 10.6441C7.61156 10.0082 7.60436 9.9454 7.49304 9.62788C7.3339 9.17375 7.12765 8.8461 6.75658 8.45767C6.14581 7.81838 5.35929 7.40813 4.11901 7.08184C3.79306 6.99611 1.2139 6.5097 1.11707 6.51571C1.10237 6.51665 1.03315 6.54261 0.963262 6.57349ZM10.4305 17.3912C10.794 17.6388 11.5563 18.0045 11.9656 18.1277C12.1459 18.182 12.2889 18.2391 12.2833 18.2548C12.2777 18.2704 11.9036 18.5532 11.4519 18.8832C10.5767 19.5226 10.4401 19.587 10.2633 19.4439C10.1686 19.3672 10.1593 19.3224 10.1291 18.7939C10.0703 17.7676 10.0634 17.15 10.111 17.1778C10.1353 17.192 10.2791 17.2881 10.4305 17.3912Z" fill="#9CA3AF"></path></svg>
          &nbsp;&nbsp;Click to sign</h5>
        </div>
        <div class="js-signature"></div>
        </div>
      `);
        $('.js-signature').jqSignature({autoFit: true, height: 200, border: '1px solid transparent'});
      }
    };
  },
  address: function (fieldData) {
    return {
      onRender: function () {
        let element = $(`.field-${fieldData.name}`);
        element.append(`
  <form id="address" class="space-y-4">
    <div class="flex flex-col items-start space-y-1">
      <label for="address">Address-1</label>
      <input type="text" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" value="" name="address" placeholder="Address">
    </div>
    <div>
      <label for="address_2">Address 2</label>
      <input type="text" name="address_2" value="" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" placeholder="Address 2 (Suite, optional)">
    </div>
    <div class="w-full lg:flex items-center justify-between lg:space-x-4 space-y-4">
      <div class="w-full lg:w-1/2">
        <label for="city">City</label>
        <input type="text" name="city" value="" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" placeholder="City">
      </div>
      <div class="w-full lg:w-1/2">
        <label for="state">Province / State</label>
        <input type="text" name="state" value="" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" placeholder="Province / State">
      </div>
    </div>
    <div class="w-full lg:flex items-center justify-between lg:space-x-4 space-y-4">
      <div class="w-full lg:w-1/2">
        <label for="country">Country</label>
        <input type="text" name="country" value="" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" placeholder="Country">
      </div>
      <div class="w-full lg:w-1/2">
        <label for="zip_code">Zip code</label>
        <input type="text" name="zip_code" value="" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" placeholder="Zip code">
      </div>
    </div>
  </form>
`);
      }
    };
  },
  richTextEditor: function (fieldData) {
    return {
      onRender: function () {
        let element = $(`.field-${fieldData.name}`);
        element.append(`<textarea id=${fieldData.name} class="textarea-selector"></textarea>`);
        tinymce.init({
          selector: `#${fieldData.name}`,
          promotion: false,
          plugins: 'code anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar: window.location.pathname.includes('templates') ? 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat code' : false,
          statusbar: window.location.pathname.includes('templates'),
          menubar: window.location.pathname.includes('templates'),
          contextmenu: window.location.pathname.includes('templates'),
          table_sizing_mode: 'fixed',
          contentEditable: false,
          readonly: true
        });
      }
    };
  },
  electronicSignatureConsent: function (fieldData) {
    return {
      onRender: function () {
        let element = $(`.field-${fieldData.name}`);
        element.append(`
        <div class="relative flex items-start py-4 px-2">
          <div class="flex h-5 items-center">
            <input name="electronic-signature-consent" id="electronicSign" type="checkbox" class="h-6 w-6 rounded border-gray-300 ring-primary focus:ring-primary">
          </div>
          <div class="ml-3 text-sm">
            <p class="text-gray-500">${fieldData.content}</p>
          </div>
        </div>
      `);
      }
    };
  },
  capturePhoto: function (fieldData) {
    return {
      onRender: function () {
        let element = $(`.field-${fieldData.name}`);

        function openCamera() {
          let takePhotoButton = document.getElementById('takePhoto');
          let imagePreviewDiv = document.getElementById('imagePreview');
          navigator.mediaDevices.getUserMedia({video: true})
            .then(function (stream) {
              let video = document.getElementById('video');
              video.classList.remove('hidden')
              takePhotoButton.style.display = 'inline-block';
              video.srcObject = stream;
              video.play();

              function takePicture() {
                imagePreviewDiv.innerHTML = '';
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0);
                const imageData = canvas.toDataURL('image/png');
                const image = document.createElement('img');
                image.id = "preview-image";
                image.src = imageData;
                imagePreviewDiv.appendChild(image);
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
                video.srcObject = null;
                video.classList.add('hidden')
                takePhotoButton.style.display = 'none';
              }

              takePhotoButton.addEventListener('click', takePicture);
            })
            .catch(function (error) {
              console.log(error)
              toast.error('Failed to get access to the camera')
            });
        }

        element.append(`
        <div class="p-2 capture-photo">
          <h2 class="my-2 text-lg font-semibold text-gray-900">${fieldData.instructionHeader}</h2>
          <ul class="max-w space-y-1 text-gray-700 list-disc list-inside">
            ${fieldData.instructionLine1.length > 0 ? `<li>${fieldData.instructionLine1}</li>` : ''}
            ${fieldData.instructionLine2.length > 0 ? `<li>${fieldData.instructionLine2}</li>` : ''}
            ${fieldData.instructionLine3.length > 0 ? `<li>${fieldData.instructionLine3}</li>` : ''}
            ${fieldData.instructionLine4?.length > 0 ? `<li>${fieldData.instructionLine4}</li>` : ''}
          </ul>
          <div>
            <button id="captureButton" type="button" class="mt-5 px-3 py-2 cursor-pointer text-sm font-medium text-center text-white bg-[#66615b] rounded-lg ">${fieldData.buttonText}</button>
          </div>
           <video class="my-3 w-full hidden" id="video"></video>
           <button id="takePhoto" style="display: none" type="button" class="px-3 py-2 text-white bg-btnBg rounded-md">Take Photo</button>
           <div id="imagePreview" class="my-3"></div>
        </div>
      `);
        document.getElementById('captureButton').addEventListener('click', openCamera);
      }
    };
  },
  timeComponent: function (fieldData) {
    return {
      onRender: function () {
        let element = $(`.field-${fieldData.name}`);
        element.append('<input type="time" class="w-full p-2.5" name="time-field" id="time">');
      }
    };
  },
  filesUpload: function (fieldData) {
    return {
      onRender: function () {
        let element = $(`.field-${fieldData.name}`);
        element.append(`
        <h2 class="my-2 text-lg font-semibold text-gray-900">${fieldData.instructionHeader}</h2>
          <ul class="max-w space-y-1 text-gray-700 list-disc list-inside">
            ${fieldData.instructionLine1.length > 0 ? `<li>${fieldData.instructionLine1}</li>` : ''}
            ${fieldData.instructionLine2.length > 0 ? `<li>${fieldData.instructionLine2}</li>` : ''}
            ${fieldData.instructionLine3.length > 0 ? `<li>${fieldData.instructionLine3}</li>` : ''}
          </ul>`)
        let inputFile = $('<input>', {
          type: 'file',
          multiple: true,
          accept: "image/png, image/jpeg",
          id: `fileInput-${fieldData.name}`,
          class: 'file-inp',
          style: 'display: none',
          change: function () {
            displayUploadedFiles(fieldData.name);
          }
        });
        let openButton = $('<button>', {
          text: fieldData.buttonText,
          type: 'button',
          class: 'px-3 py-2 text-white bg-btnBg block w-fit my-4 rounded-lg',
          click: function () {
            $(`#fileInput-${fieldData.name}`).click();
          }
        });
        let fileDisplayDiv = $('<div>', {
          id: `uploadedFileDisplay-${fieldData.name}`,
          class: 'child:w-20 child:h-20 flex gap-3'
        });
        element.on('dragover', function (e) {
          e.preventDefault();
          element.addClass('drag-over');
        });
        element.on('dragleave', function () {
          element.removeClass('drag-over');
        });
        element.on('drop', function (e) {
          e.preventDefault();
          element.removeClass('drag-over');
          let files = e.originalEvent.dataTransfer.files;
          if (files.length > 0) {
            $(`#fileInput-${fieldData.name}`).prop('files', files);
            displayUploadedFiles(fieldData.name);
          }
        });
        element.append(inputFile, openButton, fileDisplayDiv);
      }
    };

    function displayUploadedFiles(fieldName) {
      let fileInput = $(`#fileInput-${fieldName}`);
      let displayDiv = $(`#uploadedFileDisplay-${fieldName}`);
      displayDiv.empty();

      if (fileInput[0].files.length > 0) {
        for (let i = 0; i < fileInput[0].files.length; i++) {
          let file = fileInput[0].files[i];
          if (file.type.startsWith('image/')) {
            let imgElement = $('<img>', {
              src: URL.createObjectURL(file),
              id: 'image-preview',
              alt: 'Uploaded Image'
            });
            displayDiv.append(imgElement);
          } else {
            displayDiv.append(`<p>File ${i + 1}: ${file.name} is not an image.</p>`);
          }
        }
      }
    }
  }

};
const inputSets = [{
  label: 'Primary Adult Participant(editable)',
  name: 'editable',
  other: true,
  icon: '✏️',
  showHeader: true,
  userData: [],
  fields: [{
    type: 'text',
    label: 'First Name',
    className: 'block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md',
    placeholder: 'First Name'
  }, {
    type: 'text',
    label: 'Last Name',
    className: 'block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md',
    placeholder: 'Last Name'
  }, {
    type: 'text',
    label: 'Email',
    className: 'block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md',
    subtype: 'email',
    placeholder: 'Email'
  }, {
    type: 'text',
    subtype: 'tel',
    label: 'Phone',
    className: 'block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md',
    placeholder: 'Phone'
  }, {
    type: 'date',
    label: 'Date of Birth',
    className: 'block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md',
    placeholder: 'dd/mm/yyyy'
  }, {
    type: 'signature', label: 'Signature'
  }]
}];
export let options = {
  fields,
  templates,
  disableFields: ['autocomplete', 'button', 'paragraph', 'file', 'textarea'],
  disabledAttrs: [
    'access',
    'multiple',
    'toggle',
    'className',
    'inline',
    'other',
    'rows',
    'name',
  ],
  disabledFieldButtons: {
    richTextEditor: ['copy', 'edit'],
  },
  stickyControls: true,
  controlPosition: 'right',
  inputSets,
  typeUserAttrs: {
    primaryAdultParticipant: {
      'showFirstName': {
        label: 'Show First Name',
        value: true,
        type: 'checkbox',
      },
      'showMiddleName': {
        label: 'Show Middle Name',
        value: true,
        type: 'checkbox',
      },
      'showLastName': {
        label: 'Show Last Name',
        value: true,
        type: 'checkbox',
      },
      'showEmail': {
        label: 'Show Email',
        value: true,
        type: 'checkbox',
      },
      'showPhone': {
        label: 'Show Phone',
        value: true,
        type: 'checkbox',
      },
      'showDateOfBirth': {
        label: 'Show Date Of Birth',
        value: true,
        type: 'checkbox',
      },
      'showSignature': {
        label: 'Show Signature',
        value: true,
        type: 'checkbox',
      },
      // 'show-scanner': {
      //   label: 'Show Scanner',
      //   value: true,
      //   type: 'checkbox',
      // },
      // 'show-age': {
      //   label: 'Show Age',
      //   value: true,
      //   type: 'checkbox',
      // },
      // 'show-address': {
      //   label: 'Show Address',
      //   value: true,
      //   type: 'checkbox',
      // }
    },
    additionalParticipants: {
      'showFirstName': {
        label: 'Show First Name',
        value: true,
        type: 'checkbox',
      },
      'showMiddleName': {
        label: 'Show Middle Name',
        value: true,
        type: 'checkbox',
      },
      'showLastName': {
        label: 'Show Last Name',
        value: true,
        type: 'checkbox',
      },
      'showEmail': {
        label: 'Show Email',
        value: true,
        type: 'checkbox',
      },
      'showPhone': {
        label: 'Show Phone',
        value: true,
        type: 'checkbox',
      },
      'showDateOfBirth': {
        label: 'Show Date Of Birth',
        value: true,
        type: 'checkbox',
      },
      'showSignature': {
        label: 'Show Signature',
        value: true,
        type: 'checkbox',
      }
    },
    additionalMinors: {
      'showFirstName': {
        label: 'Show First Name',
        value: true,
        type: 'checkbox',
      },
      'showLastName': {
        label: 'Show Last Name',
        value: true,
        type: 'checkbox',
      },
      'showDateOfBirth': {
        label: 'Show Date Of Birth',
        value: true,
        type: 'checkbox',
      },
      'showRelationship': {
        label: 'Show Relationship',
        value: true,
        type: 'checkbox'
      }
    },
    electronicSignatureConsent: {
      'content': {
        label: 'Content',
        type: 'textarea',
        value: 'By checking here, you are consenting to the use of your electronic signature in lieu of an original signature on paper. You have the right to request that you sign a paper copy instead. By checking here, you are waiving that right. After consent, you may, upon written request to us, obtain a paper copy of an electronic record. No fee will be charged for such copy and no special hardware or software is required to view it. Your agreement to use an electronic signature with us for any documents will continue until such time as you notify us in writing that you no longer wish to use an electronic signature. There is no penalty for withdrawing your consent. You should always make sure that we have a current email address in order to contact you regarding any changes, if necessary.',
      }
    },
    capturePhoto: {
      'instructionHeader': {
        label: 'Instruction Header',
        type: 'text',
        value: 'Please follow the provided instructions to complete your Photo Capture'
      },
      'instructionLine1': {
        label: 'Instruction Line 1',
        type: 'text',
        value: 'Make sure your camera has a clear view of you.'
      },
      'instructionLine2': {
        label: 'Instruction Line 2',
        type: 'text',
        value: 'When you are ready, press the Take photo button while facing your camera.'
      },
      'instructionLine3': {
        label: 'Instruction Line 3',
        type: 'text',
        value: 'If you are not satisfied with the photo, press the Retake button to try again.'
      },
      'instructionLine4': {
        label: 'Instruction Line 4',
        type: 'text',
        value: ''
      },
      'buttonText': {
        label: 'Button Text',
        type: 'text',
        value: 'Capture Photo'
      }
    },
    filesUpload: {
      'instructionHeader': {
        label: 'Instruction Header',
        type: 'text',
        value: 'Please follow the provided instructions.'
      },
      'instructionLine1': {
        label: 'Instruction Line 1',
        type: 'text',
        value: 'Make sure your have a clear view of you.'
      },
      'instructionLine2': {
        label: 'Instruction Line 2',
        type: 'text',
        value: 'When you are ready, press the File Upload button.'
      },
      'instructionLine3': {
        label: 'Instruction Line 3',
        type: 'text',
        value: 'If you are not satisfied with the photo, click the fileUpload button to try again.'
      },
      'buttonText': {
        label: 'Button Text',
        type: 'text',
        value: 'Files Upload'
      }
    }
  }
};
export const staticForm = [
  {
    type: 'text',
    label: 'Email',
    className: 'block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md',
    subtype: 'email',
    required: true,
    placeholder: 'Email',
    name: 'defaultMail'
  },
  {
    label: 'Electronic Signature Consent',
    type: 'electronicSignatureConsent',
    required: true,
  }
]
export const tabsData = [
  {name: 'Overview', id: 1, url: 'overview'},
  {name: 'Submissions', id: 2, url: 'submissions'},
  {name: 'Builder', id: 3, url: 'builder'},
  {name: 'Integrations', id: 4, url: 'integration'},
  {name: 'Settings', id: 4, url: 'setting'},
]

function commonPayload(form, newDiv, fieldData) {
  let element = $(`.field-${fieldData.name}`);
  let buttonsHTML = '';

  function handleButtonClick(i) {
    return function () {
      newDiv.empty(); // Clear the contents of the newDiv
      for (let j = 1; j <= i + 1; j++) {
        newDiv.append(`<div class="participant-${j} ${fieldData.type === 'additionalParticipants' ? 'participants' : 'minors'}">
            <button class="delete-button block w-full" data-index="${j}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer text-red-500 w-6 h-6 ml-auto mr-2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                    </svg></button>
           ${form}
          </div>`);
      }
      element.append(newDiv);
      $('.js-signature').jqSignature({
        autoFit: true,
        height: 200,
        border: '1px solid transparent',
      });
      element.find('.delete-button').each(function () {
        $(this).on('click', function () {
          const index = $(this).data('index');
          $(`.participant-${index}`).remove();
        });
      });
    };
  }

  for (let i = 0; i < 6; i++) {
    buttonsHTML += `<button type="button" class="text-sm px-4 py-2 bg-gray-800 rounded-md font-semibold text-white hover:bg-gray-700 active:bg-gray-900 focus:outline-none disabled:opacity-25 transition ease-in-out duration-150 part-btn">${i + 1}</button>`;
  }
  element.append(`<div class="flex items-center justify-center gap-2">${buttonsHTML}</div>`);
  element.find('.part-btn').each(function (i) {
    $(this).on('click', handleButtonClick(i));
  });
}

export const formatDate = (date) => {
  const originalDate = new Date(date);
  const options = {year: 'numeric', month: 'short', day: '2-digit'};
  return originalDate.toLocaleDateString('en-US', options)
}

export const filterWaivers = (waivers, filters) => {
  const {
    status,
    search,
    month = null,
    year = null,
    template = null,
  } = filters;

  return waivers.filter(item => {
    const hasMatchingStatus = status === 'Status' || item.status === status.toLowerCase();
    const hasMatchingSearch = !search || (
      item.reference_no?.toLowerCase().includes(search) ||
      (item?.customer?.first_name && item.customer.first_name.toLowerCase().includes(search)) ||
      (item?.customer?.last_name && item.customer.last_name.toLowerCase().includes(search)) ||
      item.waiver.name.toLowerCase().includes(search)
    );
    let hasMatchingTemplate;
    let hasMatchingMonth;
    let hasMatchingYear;
    if (month) {
      hasMatchingTemplate = template === 'Template' || item.waiver.name === template;
      hasMatchingMonth = month === 'Month' || new Date(item.updatedAt).getMonth() + 1 === month;
      hasMatchingYear = year === 'Year' || new Date(item.updatedAt).getFullYear() === year;

      return hasMatchingStatus && hasMatchingTemplate && hasMatchingSearch && hasMatchingMonth && hasMatchingYear;
    }
    return hasMatchingStatus && hasMatchingSearch
  });
};

export function searchWaiver(search, customers) {
  return customers.filter(item => {
    return !search || (
      (item?.first_name && item.first_name.toLowerCase().includes(search)) ||
      (item?.last_name && item.last_name.toLowerCase().includes(search)) ||
      item.email.toLowerCase().includes(search)
    );
  })
}

export function additionParticipantForm(data) {
  return `<form class="space-y-2" id="myForm">
          ${(data.f_name || data.showFirstName) ? `<div class="mt-3">
            <label for="f_name" class='text-sm text-gray-900 whitespace-nowrap'>First name</label>
            <input type="text" name="f_name"  value="" placeholder="First name" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" />
          </div>` : ''}
          ${(data.m_name || data.showMiddleName) ? `<div class="mt-3">
            <label for="m_name" class='text-sm text-gray-900 whitespace-nowrap'>Middle name</label>
            <input type="text" name="m_name"  value="" placeholder="Last name" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" />
          </div>` : ''}
          ${(data.l_name || data.showLastName) ? `<div class="mt-3">
            <label for="l_name" class='text-sm text-gray-900 whitespace-nowrap'>Last name</label>
            <input type="text" name="l_name"  value="" placeholder="Last name" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" />
          </div>` : ''}
          ${(data.phone || data.showPhone) ? `<div class="mt-3">
            <label class='text-sm text-gray-900 whitespace-nowrap' for="phone">Phone</label>
            <input type="text" name="phone"  value="" placeholder="Phone" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" />
          </div>` : ''}
          ${(data.email || data.showEmail) ? `<div class="mt-3">
            <label class='text-sm text-gray-900 whitespace-nowrap' for="email">Email</label>
            <input type="email" name="email" value="" placeholder="Email" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" />
          </div>` : ''}
          ${(data.date_of_birth || data.showDateOfBirth) ? `<div class="mt-3">
            <h2 class="text-sm">Date of Birth</h2>
            <div class="flex items-center space-x-2">
              <input type="date" value="" name="date_of_birth" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" />
            </div>
          </div>` : ''}
          ${(data.signature || data.showSignature) ? `<div class="relative min-h-[200px] sign-container">
          <h3 class="text-sm text-gray-900 whitespace-nowrap">Signature</h3>
        <div class="adult">
        <div class="absolute inset-0 flex items-center justify-center cursor-pointer" onclick="this.remove();">
          <h5 class="text-gray-400 text-center flex gap-1">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5257 0.237081C16.835 0.442777 16.1908 0.95511 15.8837 1.54293C15.4656 2.343 9.06524 15.5794 9.025 15.7272C8.96802 15.9365 9.08443 19.371 9.15661 19.6086C9.18228 19.6932 9.25289 19.8355 9.31351 19.9248L9.42372 20.0872L9.24937 20.4388C9.15347 20.6321 9.07502 20.83 9.07502 20.8786C9.07502 21.1367 9.35701 21.4246 9.60951 21.4243C9.8327 21.424 9.99239 21.282 10.1726 20.9236L10.3405 20.5897L10.573 20.5657C10.7008 20.5525 10.8926 20.5031 10.9992 20.456C11.3238 20.3124 13.9805 18.3386 14.113 18.1426C14.1763 18.0489 15.5215 15.3074 17.1022 12.0504C18.683 8.7934 19.9899 6.12012 20.0067 6.10979C20.0317 6.09428 20.3343 6.19921 20.3761 6.23792C20.3829 6.24423 19.8055 7.45041 19.0929 8.91832C18.3803 10.3863 17.7865 11.6533 17.7735 11.7339C17.7286 12.0105 17.9943 12.3167 18.2796 12.3171C18.4339 12.3173 18.6189 12.22 18.7002 12.0958C18.7358 12.0415 19.5678 10.3437 20.5492 8.32296C21.6998 5.95357 22.3334 4.60316 22.3334 4.52035C22.3334 4.23209 22.1037 4.00331 21.8144 4.00331C21.5566 4.00331 21.4491 4.11594 21.1474 4.70207C20.9959 4.99621 20.8596 5.24918 20.8444 5.26421C20.8292 5.27925 20.7399 5.25235 20.646 5.20445L20.4752 5.11736L20.7735 4.49256C21.1491 3.70578 21.2521 3.32171 21.2194 2.82916C21.1434 1.68538 20.3304 0.678717 19.1777 0.301213C18.7239 0.152617 17.9147 0.121187 17.5257 0.237081ZM19.1315 1.42419C19.5539 1.63349 19.8229 1.90489 20.0202 2.32051C20.1359 2.56429 20.1509 2.63952 20.1514 2.97708L20.1519 3.35831L19.5589 4.5827C19.2327 5.25612 18.8324 6.07912 18.6694 6.41159L18.3728 7.0161L16.7632 6.23436C15.8779 5.80442 15.1568 5.43873 15.1608 5.42175C15.1921 5.28666 16.8568 1.92725 16.9493 1.8122C17.1116 1.61053 17.4117 1.40098 17.6823 1.30038C17.8656 1.23218 17.9866 1.21968 18.341 1.23227C18.7506 1.24675 18.7952 1.2576 19.1315 1.42419ZM17.2971 7.66962L17.9157 7.97545L15.6398 12.6561L13.364 17.3368L13.1998 17.3254C12.5765 17.2822 11.5801 16.9039 10.9336 16.4649C10.7917 16.3685 10.5526 16.1727 10.4023 16.0296L10.129 15.7695L12.4035 11.0832L14.678 6.39685L15.6783 6.88034C16.2284 7.14627 16.9569 7.50145 17.2971 7.66962ZM0.963262 6.57349C0.74418 6.67015 0.666748 6.79338 0.666748 7.0452C0.666748 7.23603 0.685555 7.29059 0.788276 7.3978C0.931619 7.54745 0.948055 7.5516 2.38229 7.80356C3.58292 8.01446 4.1033 8.13891 4.65663 8.34753C5.48433 8.65963 6.12624 9.16659 6.38387 9.71171C6.55089 10.0651 6.58181 10.2194 6.58003 10.6916C6.57677 11.5684 6.22485 12.4517 4.94514 14.7953C3.69424 17.0859 3.30377 17.9601 3.1204 18.8802C2.86307 20.1713 3.44504 21.0201 4.81794 21.3561C5.26826 21.4663 5.81355 21.5089 6.77378 21.509L7.71305 21.5092L7.84055 21.4019C8.10415 21.18 8.10415 20.8217 7.84055 20.5999C7.71775 20.4965 7.69158 20.4926 7.13383 20.4922C6.36985 20.4917 5.45684 20.4238 5.07938 20.3394C4.68789 20.2519 4.3123 20.054 4.20343 19.8779C4.01604 19.5747 4.14655 18.803 4.54006 17.8875C4.77643 17.3375 5.06587 16.7742 5.88928 15.2612C6.86646 13.4657 7.26934 12.5833 7.49448 11.7454C7.59504 11.3711 7.60847 11.2429 7.60999 10.6441C7.61156 10.0082 7.60436 9.9454 7.49304 9.62788C7.3339 9.17375 7.12765 8.8461 6.75658 8.45767C6.14581 7.81838 5.35929 7.40813 4.11901 7.08184C3.79306 6.99611 1.2139 6.5097 1.11707 6.51571C1.10237 6.51665 1.03315 6.54261 0.963262 6.57349ZM10.4305 17.3912C10.794 17.6388 11.5563 18.0045 11.9656 18.1277C12.1459 18.182 12.2889 18.2391 12.2833 18.2548C12.2777 18.2704 11.9036 18.5532 11.4519 18.8832C10.5767 19.5226 10.4401 19.587 10.2633 19.4439C10.1686 19.3672 10.1593 19.3224 10.1291 18.7939C10.0703 17.7676 10.0634 17.15 10.111 17.1778C10.1353 17.192 10.2791 17.2881 10.4305 17.3912Z" fill="#9CA3AF"></path></svg>
          &nbsp;&nbsp;Click to sign</h5>
        </div>
        <div class="js-signature"></div>
        </div>
</div>` : ''}
        </form>`
}

export function updateAllSubmission(status, setSwitchState, setSelectedCount, setLoading, filteredWaivers) {
  const arr = filteredWaivers.reduce((result, item) => {
    if (item.checked) {
      result.push(item._id);
    }
    return result;
  }, []);
  let body = {
    status: status,
    submission_ids: arr
  }
  patchRequest(`/submissions/update-multiple`, body)
    .then(() => setSwitchState(prev => !prev))
    .catch(e => toast(e.response.data.message))
    .finally(() => {
      setSelectedCount(0)
      setLoading(false)
    })
}

export function authUrl(service) {
  switch (service) {
    case "dropbox":
      return "https://www.dropbox.com/oauth2/authorize?client_id=h8zd4n5p1xp6g7u&token_access_type=offline&response_type=code&redirect_uri=http://localhost:8000/auth&state="
    case "contact" :
      return "https://authz.constantcontact.com/oauth2/default/v1/authorize?client_id=ce7089bc-d014-4dd7-9c3a-909174df3019&redirect_uri=http://localhost:8000/constant-cotact/auth&response_type=code&scope=contact_data%20campaign_data%20offline_access&state="
    case "mailChimp" :
      return "https://login.mailchimp.com/oauth2/authorize?response_type=code&client_id=613502474364&redirect_uri=http://127.0.0.1:8000/mailchimp/auth&state="
    case "googleDrive" :
      return "https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=624151635976-l25unevsefskf8br0qjkenbh6i0f5ipv.apps.googleusercontent.com&redirect_uri=http://localhost:3000/google-drive&scope=https://www.googleapis.com/auth/drive&access_type=offline&approval_prompt=force&state="
    default :
      return ""
  }
}