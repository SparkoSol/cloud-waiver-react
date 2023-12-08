import CheckboxInput from "../../../components/inputs/CheckboxInput.jsx";
import {Link} from "react-router-dom";
import {EyeIcon} from "@heroicons/react/20/solid";
import {PencilSquareIcon} from "@heroicons/react/24/solid";

const CustomersRow = ({item, functionCall, index}) => {
  return (
    <tr>
      <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center max-w-fit">
          <CheckboxInput label='selectAll' extraClasses='hidden' checked={item.checked}
            onChange={() => functionCall(index)}/>
        </div>
      </td>
      {/*<td className='py-4 px-6 font-semibold text-sm text-gray-900 whitespace-nowrap'>{limitChars(item._id, 6)}</td>*/}
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.first_name}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.last_name}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.customer?.email || item.email}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.waiver_submission_count}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-6">
            <Link to={`/customers/${item._id}`}>
              <EyeIcon className='w-5 h-5 text-iconGray'/>
            </Link>
            <Link to={`/customers/${item._id}/edit`}>
              <PencilSquareIcon className='w-5 h-5 text-iconGray'/>
            </Link>
          </div>
        </div>
      </td>
    </tr>
  )
}
export default CustomersRow