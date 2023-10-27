import CheckboxInput from "../../../components/inputs/CheckboxInput.jsx";
import {limitChars} from "../../../utils/generalFunctions.js";
import {Link} from "react-router-dom";
import {EyeIcon} from "@heroicons/react/20/solid/index.js";
import {PencilSquareIcon} from "@heroicons/react/24/solid/index.js";

const CustomersRow = ({item}) => {
  return (
    <tr>
      <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center max-w-fit">
          <CheckboxInput label='selectAll' extraClasses='hidden'/>
        </div>
      </td>
      <td className='py-4 px-6 font-semibold text-sm text-gray-900 whitespace-nowrap'>{limitChars(item._id, 6)}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.first_name}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.last_name}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.email}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.count}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-6">
            <Link to="/customers/123">
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