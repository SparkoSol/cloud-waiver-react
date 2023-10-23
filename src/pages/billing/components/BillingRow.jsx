import Button from "../../../components/Button.jsx";

const BillingRow = ({item}) => {
  return (
    <tr>
      <td className='py-4 pl-4 sm:pl-6 pr-3 text-sm text-gray-900' colSpan='2'>
        <strong>{item.plan}</strong>
        <ul className='mt-1'>
          {item.firstChar && <li className='mb-0.5'>{item.firstChar.title} <strong> {item.firstChar.price}</strong></li>}
          {item.secondChar && <li>{item.secondChar.title} <strong> {item.secondChar.price}</strong></li>}
        </ul>
      </td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center space-x-6">
          <Button btnText='Select' fullWidth='w-fit ml-auto' btnClasses='border px-4 py-2 border-gray-300 text-gray-700 font-semibold'/>
        </div>
      </td>
    </tr>
  )
}

export default BillingRow