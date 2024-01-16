import DataTable from "../../components/DataTable.jsx";
import Heading from "../../components/Heading.jsx";
import BillingRow from "./components/BillingRow.jsx";
import secondsToDate, {capitalize, formatDate, getPackages} from "../../utils/generalFunctions.js";
import InvoiceRow from "./components/InvoiceRow.jsx";
import PaymentRow from "./components/PaymentRow.jsx";
import Button from "../../components/Button.jsx";
import {useEffect, useState} from "react";
import PaymentModal from "../../components/modals/PaymentModal.jsx";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, selectInvoicesData, selectPaymentMethods} from "../../redux/user/userSlice";
import Spinner from "../../components/Spinner";
import {getAllInvoices, getAllMethods} from "../../redux/user/userThunk";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const Billing = () => {
  const dispatch = useDispatch();
  const paymentMethodsOptions = useSelector(selectPaymentMethods) || [];
  const invoiceData = useSelector(selectInvoicesData) || [];
  const [open, setOpen] = useState(false);
  const [prices, setPrices] = useState([]);
  const [variablePrice, setVariablePrice] = useState({});
  const [currentStatus, setCurrentStatus] = useState('');
  const loadingSlice = useSelector(state => state.user.status) === 'pending';
  const currentPlan = useSelector(state => state.user.currentUser?.currentPlan);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    async function fetchData() {
      await getPackages(setPrices, setVariablePrice);
      await dispatch(getAllInvoices())
      await dispatch(getAllMethods())
    }

    fetchData().then(()=>{})
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(currentUser.subscription){
      const {lookup_key} = currentUser.subscription.items.find(item=>item.lookup_key !== 'variable_price');
      setCurrentStatus(lookup_key)
    }
  }, [currentUser]);


  return (
    <>
      {loadingSlice && <Spinner/>}
      <section className='space-y-6'>
        <div className='p-5 bg-white shadow-sm rounded-lg'>
          <div className='flex gap-3 justify-between flex-wrap'>
            <Heading title='Plans' subtitle={currentPlan ? `You are on the ${currentPlan} plan.` : `Select your plan.`}
                     titleClasses='font-semibold text-xl'
                     subTitleClasses='text-sm'/>
            {currentUser && !loadingSlice && <ul className='w-fit bg-red-100 p-4 rounded-lg grow sm:grow-0'>
              <li><strong className='w-24'>Status : </strong>{capitalize(currentStatus || 'Trail')}</li>
              <li><strong className='w-24'>Trail Ends :
              </strong> {currentUser.subscription?.trial_end ? secondsToDate(currentUser.subscription?.trial_end) : formatDate(currentUser.trial_until)}</li>
            </ul>}
          </div>
          <div className='mt-6'>
            <DataTable
              headers={['Plans']}
              TableRow={BillingRow}
              items={prices}
              colspan={2}
              variablePrice={variablePrice}
            />
          </div>
        </div>

        <div className='p-5 bg-white shadow-sm rounded-lg'>
          <div className='flex justify-between items-center flex-wrap gap-3'>
            <Heading title='Payment Method' subtitle='Followings are the payment methods available to choose'
                     titleClasses='font-semibold text-xl' subTitleClasses='text-sm'/>
            <Button btnText='Add Credit Card' onClick={() => setOpen(true)} btnClasses='bg-btnBg py-2.5'/>
          </div>
          <div className='mt-6 relative'>
            <DataTable
              headers={['Brand', 'Last 4', 'Expiration']}
              TableRow={PaymentRow} items={paymentMethodsOptions}
              emptyMessage={"No payment method added yet"}
              colspan={0} totalLength={paymentMethodsOptions.length}
            />
          </div>
        </div>

        <div className='p-5 bg-white shadow-sm rounded-lg'>
          <Heading title='Invoices' subtitle='Followings are all the available invoices'
                   titleClasses='font-semibold text-xl' subTitleClasses='text-sm'/>
          <div className='mt-6'>
            <DataTable
              headers={['Invoice #', 'Period', 'Total', 'Status']}
              TableRow={InvoiceRow}
              items={invoiceData}
              emptyMessage={"No invoice issued yet"}
              colspan={0}
            />
          </div>
        </div>
        <Elements stripe={stripePromise}>
          <PaymentModal open={open} setOpen={setOpen}/>
        </Elements>
      </section>
    </>
  )
}

export default Billing