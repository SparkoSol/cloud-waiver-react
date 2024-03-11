import {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {useLocation, useNavigate} from "react-router-dom";
import {postRequest} from "../../redux/cwAPI";
import toast from "react-hot-toast";
import localStorage from "redux-persist/es/storage";
import {persistor} from "../../redux/store";

export default function VerificationModal({open, setOpen, currentUser = null}) {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      localStorage.removeItem('cw-access-token')
    }
  }, [open]);


  function requestMail() {
    setLoading(true)
    if (currentUser) {
      postRequest('/persons/resend-verification-email', {
        email: currentUser.username, id: currentUser._id, name: currentUser.first_name
      }).then((r) => {
        persistor.purge()
        toast.success(r.data.message)
        setOpen(false)
        navigate('/')
      })
        .finally(()=>setLoading(false))
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {
        setOpen(false);
        localStorage.removeItem('cw-access-token')
        persistor.purge();
      }
      }>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                <div className="bg-white p-6">
                  <div className="">
                    <div className="text-center sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Email Verification
                      </Dialog.Title>
                      <Dialog.Description className='text-sm text-gray-500 mt-3'>
                        Please check your email for verification.
                      </Dialog.Description>
                    </div>
                  </div>
                </div>
                {location === '/' && <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    disabled={loading}
                    type="button"
                    className={`text-white text-sm align-items-center align-middle rounded-md ${loading ? 'bg-gray-500' : 'bg-textDark'} px-4 py-2 font-semibold w-full mb-2 sm:mb-0`}
                    onClick={requestMail}>
                    {loading ? 'Sending...' : 'Resend Mail'}
                  </button>
                </div>}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
