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
import {getRequest, patchRequest} from "../redux/cwAPI";

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
  return str.slice(0)
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

export const DashBoardHeaders = ['Reference No', 'Signed Date', 'First Name', 'Last Name', 'Template Name', 'Status'];
export const sideBarOptions = [
  {
    id: 1,
    title: 'Dashboard',
    icon: Squares2X2Icon,
    url: '/dashboard',
    permission: "api_management"
  },
  {
    id: 2,
    title: 'Waiver Templates',
    icon: DocumentTextIcon,
    url: '/templates',
    permission: "waiver_templates"
  },
  {
    id: 5,
    title: 'Signed Waivers',
    url: '/signed',
    icon: ClipboardDocumentIcon,
    permission: "waiver_submissions"
  },
  {
    id: 6,
    title: 'Template Gallery',
    url: '/gallery',
    icon: UsersIcon,
    permission: "template_gallery"
  },
  {
    id: 9,
    title: 'Customers',
    url: '/customers',
    icon: UserIcon,
    permission: "customers"
  },
  {
    id: 10,
    title: 'Kiosk Settings',
    url: '/kiosk',
    icon: ComputerDesktopIcon,
    permission: "kiosk_settings"
  },
  {
    id: 16,
    title: 'Staff Management',
    url: '/management',
    icon: UsersIcon,
    permission: "team_management"
  },
  {
    id: 11,
    title: 'Settings',
    url: '/settings',
    icon: Cog6ToothIcon,
    permission: "settings",
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
    icon: AdjustmentsVerticalIcon,
    permission: "billing"
  },
  {
    id: 17,
    title: 'Sign Out',
    url: '#',
    icon: ArrowRightOnRectangleIcon,
    permission: "sign_out"
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

export const staticForm = [
  {
    type: 'emailInput',
    label: 'Email',
    // className: 'block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md',
    // subtype: 'email',
    required: true,
    // placeholder: 'Email',
    // name: 'defaultMail',
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

export async function getPackages(setPrices, setVariablePrice) {
  const response = await getRequest(`/payments/prices`);
  const temp = response.data.data.pop();
  setVariablePrice(temp);
  response.data.data.sort((a, b) => a.metadata.waiver_limit - b.metadata.waiver_limit);
  setPrices(response.data.data);
}

export function timeToDate(startSeconds, endSeconds) {
  const startDate = new Date(startSeconds * 1000);
  const endDate = new Date(endSeconds * 1000);

  // Format the date strings (adjust the format as needed)
  const startDateString = startDate.toISOString().split('T')[0];
  const endDateString = endDate.toISOString().split('T')[0];

  return `${startDateString} - ${endDateString}`;
}

export function convertToObjects(items) {
  if (!items) {
    return []
  }
  return items.map((myId) => ({price_id: myId}));
}

export function recursiveFunction(state, setSwitchState, recursionCount = 0) {
  // Check if the recursion count exceeds 5
  if (recursionCount > 5) {
    console.warn("Recursion limit reached. Returning nothing.");
    return;
  }
  if (state && state.contentWindow && state.contentWindow?.document.readyState === 'complete') {
    const iframeBody = state.contentWindow?.document.querySelector("body > div");
    const body = document.querySelector('.tox.tox-tinymce');
    if (!iframeBody || !body) {
      recursiveFunction(null, setSwitchState, recursionCount + 1);
      return;
    }
    body.innerHTML = iframeBody.innerHTML;
    body.removeAttribute('style');
    body.removeAttribute('class');
    setSwitchState(true);
    return state;
  }

  setTimeout(function () {
    const temp = document.querySelector("iframe.tox-edit-area__iframe");
    recursiveFunction(temp, setSwitchState, recursionCount + 1);
  }, 500);
}

