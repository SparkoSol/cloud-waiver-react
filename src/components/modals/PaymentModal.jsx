import {Fragment, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {CreditCardIcon} from "@heroicons/react/24/outline";
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import {useDispatch} from "react-redux";
import {updatePaymentMethods, userProfile} from "../../redux/user/userThunk";
import toast from 'react-hot-toast';

export default function PaymentModal({open, setOpen}) {
  const [error, setError] = useState(null)
  const cancelButtonRef = useRef(null)
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const {paymentMethod, error} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message)
    } else {
      const token = localStorage.getItem("cw-access-token");
      await dispatch(updatePaymentMethods({paymentMethodId: paymentMethod.id}))
      await dispatch(userProfile(token));
      setOpen(false)
      setError(null)
      toast.success('Payment method added successfully');
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => {
        setError(null)
        setOpen(false)
      }}>
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
                  <div className="sm:flex sm:items-start">
                    <div className="sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex gap-3">
                        <CreditCardIcon className="h-6 w-6 text-textDark mt-0.5" aria-hidden="true"/>
                        Add Payment Method
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Payment methods are not stored with us. Instead, they are saved in tokenize form to help
                          protect your card information.
                        </p>
                        <p className='text-green-400 mt-4 text-xs'>
                          Note: Provided zip/postal code must match the billing address of the card.
                          {error && <span className='block text-red-400 mt-3'>{error}</span>}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <form>
                  <div className='m-4'>
                    <CardElement className="pl-3"/>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="text-white text-sm align-items-center align-middle rounded-md bg-bgDark px-4 py-2 font-semibold w-full mb-2 sm:mb-0"
                      onClick={(e) => {
                        handleSubmit(e)
                      }}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="text-sm align-items-center align-middle rounded-md bg-transparent font-semibold px-4 py-2 text-gray-500 border border-gray-300 mr-3 w-full"
                      onClick={() => {
                        setError(null)
                        setOpen(false)
                      }}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
