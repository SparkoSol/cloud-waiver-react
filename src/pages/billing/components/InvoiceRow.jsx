import Button from "../../../components/Button.jsx";

const InvoiceRow = ({item}) => {
    const handleDownloadInvoice = async () => {
        window.location.href = item.downloadPdfUrl
    }
  return (
    <tr>
      <td className='relative py-4 pl-4 sm:pl-6 pr-3 text-sm whitespace-nowrap'>
        {item.invoiceNumber}
      </td>
      <td className='relative py-4 pl-4 sm:pl-6 pr-3 text-sm whitespace-nowrap'>
        {item.period}
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