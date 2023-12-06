import DataTable from "../../components/DataTable.jsx";
import Heading from "../../components/Heading.jsx";
import BillingRow from "./components/BillingRow.jsx";
import {billingOptions} from "../../utils/generalFunctions.js";
import InvoiceRow from "./components/InvoiceRow.jsx";
import PaymentRow from "./components/PaymentRow.jsx";
import Button from "../../components/Button.jsx";
import {useState} from "react";
import PaymentModal from "../../components/modals/PaymentModal.jsx";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import {useSelector} from "react-redux";
import {selectInvoicesData, selectPaymentMethods} from "../../redux/user/userSlice";
import Spinner from "../../components/Spinner";

const stripePromise = loadStripe('pk_test_51NcNFQLXaNTLpBGT9RGxzW7Lpt8z0dABeSsaJ0EoFvlWrtzPSR1V33aHad44xpbqJXBNZaepVVQGsViSnYfWdogX00ozgABTKi');
const Billing = () => {
    const paymentMethodsOptions = useSelector((state) => selectPaymentMethods(state)) || []
    const invoiceData = useSelector((state) => selectInvoicesData(state)) || []
    const [open, setOpen] = useState(false)
    const loading = useSelector(state => state.user.status) === 'pending'
    const currentPlan = useSelector(state => state.user.currentUser.currentPlan)
  return (
      <>
          {loading && <Spinner/>}
        <section className='space-y-6'>
          <div className='p-5 bg-white shadow-sm rounded-lg'>
            <Heading title='Plans' subtitle={currentPlan ? `You are on the ${currentPlan} plan.` : `Select your plan.`} titleClasses='font-semibold text-xl'
                     subTitleClasses='text-sm'/>
            <div className='mt-6'>
              <DataTable
                  headers={['Plans']}
                  TableRow={BillingRow}
                  items={billingOptions}
                  colspan={2}
              />
            </div>
          </div>

          <div className='p-5 bg-white shadow-sm rounded-lg'>
            <div className='flex justify-between items-center'>
              <Heading title='Payment Method' subtitle='Followings are the payment methods available to choose'
                       titleClasses='font-semibold text-xl' subTitleClasses='text-sm'/>
              <Button btnText='Add Credit Card' onClick={()=>setOpen(true)} btnClasses='bg-btnBg py-2.5'/>
            </div>
            <div className='mt-6'>
              <DataTable
                  headers={['Brand', 'Last 4', 'Expiration']}
                  TableRow={PaymentRow} items={paymentMethodsOptions}
                  emptyMessage={"No payment method added yet"}
                  colspan={0}
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