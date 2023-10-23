import {Fragment, useRef} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import Input from "@/app/components/inputs/Input";
import {XMarkIcon} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function QRModal({open, setOpen}) {
  const handleDownload = () => {
    const pdfPath = '/images.qr.png';
    const link = document.createElement('a');
    link.href = pdfPath;
    link.target = '_blank'; // Open the PDF in a new tab/window.
    link.download = 'cloud-weaver-qr.png'; // Specify the filename for the downloaded file.
    link.click();
  };
  const cancelButtonRef = useRef(null)
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10 max-w-[30%]" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-1/2 sm:max-w-[418px]">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title as="div"
                                    className="text-base flex justify-between font-semibold text-gray-900 lg:text-xl pb-4 rounded-t border-b">
                        Share Waiver
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          <XMarkIcon className='w-5 h-5'/>
                        </button>
                      </Dialog.Title>
                        <Image
                          src='/images/qr.png'
                          alt='QR Scan'
                          width='200'
                          height='200'
                          className='mx-auto'
                        />
                      <button onClick={handleDownload} className='outline-none w-full block text-center'>
                        Click here to download
                      </button>
                      <div className="mt-8 flex flex-col gap-4">
                        <Input placeholder='eg. Waiver 101' label='You can share it with following link' extraClasses='font-medium text-gray-500' inputClasses='pl-3' value='sparko.onlinewaiverpro.com/waiver/5f816420-63fe-11ee-bdb3-b91279ed4d18' />
                        <Input placeholder='eg. Waiver 101' label='Invite via Email'
                               extraClasses='font-medium text-gray-500' inputClasses='pl-3'/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="text-white text-sm align-items-center align-middle rounded-md bg-textDark px-8 py-2 font-semibold mx-auto mb-2 sm:mb-0"
                    onClick={() => setOpen(false)}
                  >
                    Invite
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
