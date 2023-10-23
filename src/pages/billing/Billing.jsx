import DataTable from "../../components/DataTable.jsx";
import Heading from "../../components/Heading.jsx";
import BillingRow from "./components/BillingRow.jsx";
import {billingOptions, invoiceData} from "../../utils/generalFunctions.js";
import InvoiceRow from "./components/InvoiceRow.jsx";
import PaymentRow from "./components/PaymentRow.jsx";
import Button from "../../components/Button.jsx";
import {useState} from "react";
import PaymentModal from "../../components/modals/PaymentModal.jsx";

const Billing = () => {
  const [open, setOpen] = useState(false)
  return (
    <section className='space-y-6'>
      <div className='p-5 bg-white shadow-sm rounded-lg'>
        <Heading title='Plans' subtitle='You are on the free plan.' titleClasses='font-semibold text-xl'
                 subTitleClasses='text-sm'/>
        <div className='mt-6'>
          <DataTable headers={['Plans']} TableRow={BillingRow} items={billingOptions} colspan={2}/>
        </div>
      </div>

      <div className='p-5 bg-white shadow-sm rounded-lg'>
        <div className='flex justify-between items-center'>
          <Heading title='Payment Method' subtitle='Followings are the payment methods available to choose'
                   titleClasses='font-semibold text-xl' subTitleClasses='text-sm'/>
          <Button btnText='Add Credit Card' onClick={()=>setOpen(true)} btnClasses='bg-btnBg py-2.5'/>
        </div>
        <div className='mt-6'>
          <DataTable headers={['Brand', 'Last 4', 'Expiration']} TableRow={PaymentRow} items={[]} colspan={0}/>
        </div>
      </div>

      <div className='p-5 bg-white shadow-sm rounded-lg'>
        <Heading title='Invoices' subtitle='Followings are all the available invoices'
                 titleClasses='font-semibold text-xl' subTitleClasses='text-sm'/>
        <div className='mt-6'>
          <DataTable headers={['Invoice #', 'Period', 'Total', 'Status']} TableRow={InvoiceRow} items={invoiceData}
                     colspan={0}/>
        </div>
      </div>
      <PaymentModal open={open} setOpen={setOpen}/>
    </section>
  )
}

export default Billing