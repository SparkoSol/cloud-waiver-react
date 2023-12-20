import Button from "../../../components/Button.jsx";
import {timeToDate} from "../../../utils/generalFunctions";

const InvoiceRow = ({item}) => {
    const handleDownloadInvoice = async () => {
        window.location.href = item.invoice_pdf
    }
  return (
    <tr>
      <td className='relative py-4 pl-4 sm:pl-6 pr-3 text-sm whitespace-nowrap'>
        {item.id}
      </td>
      <td className='relative py-4 pl-4 sm:pl-6 pr-3 text-sm whitespace-nowrap'>
        {timeToDate(item.period_start, item.period_end)}
      </td>
      <td className='relative py-4 pl-4 sm:pl-6 pr-3 text-sm whitespace-nowrap'>
        {item.total}
      </td>
      <td className='relative py-4 pl-4 sm:pl-6 pr-3 text-sm whitespace-nowrap'>
        {item.status}
      </td>
      <td className='relative py-4 pl-4 sm:pl-6 pr-3 text-sm whitespace-nowrap'>
        <Button
            btnText='Download'
            fullWidth='fit-content'
            btnClasses='py-2 bg-btnBg hover:bg-textDark'
            onClick={handleDownloadInvoice}
        />
      </td>
    </tr>
  )
}

export default InvoiceRow