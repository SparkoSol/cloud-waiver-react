import {Fragment, useRef} from "react";
import {Dialog, Transition} from '@headlessui/react'
import Input from "../inputs/Input.jsx";

export default function Modal({open, setOpen, functionCall, btnText = 'Submit', title = 'New Template', description}) {
  const cancelButtonRef = useRef(null)
  const inputRef = useRef();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        {title}
                      </Dialog.Title>
                      {description && <Dialog.Description className='text-sm text-gray-600 pt-3'>
                        {description}
                      </Dialog.Description>}
                      {!description && <div className="mt-8">
                        <Input placeholder='eg. Waiver 101' inputRef={inputRef} label='Please enter your template name'
                               extraClasses='font-medium text-gray-500' inputClasses='pl-3 rounded-md'/>
                      </div>}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="text-white text-sm align-items-center align-middle rounded-md bg-btnBg px-4 py-2 font-semibold w-full mb-2 sm:mb-0"
                    onClick={() => {
                      functionCall(inputRef.current?.value)
                      setOpen(false)
                    }}
                  >
                    {btnText}
                  </button>
                  <button
                    type="button"
                    className="text-sm align-items-center align-middle rounded-md bg-transparent font-semibold px-4 py-2 text-gray-500 border border-gray-300 mr-3 w-full"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
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
