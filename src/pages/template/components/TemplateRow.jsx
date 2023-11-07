import {Link} from "react-router-dom";
import {capitalize} from "../../../utils/generalFunctions";
import {DocumentDuplicateIcon, EyeIcon, PencilSquareIcon, TrashIcon, UsersIcon} from "@heroicons/react/24/outline";
import CheckboxInput from "../../../components/inputs/CheckboxInput";

const TemplateRow = ({item}) => {
  return (
    <tr>
      <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center max-w-fit">
          <CheckboxInput label='selectAll' extraClasses='hidden'/>
        </div>
      </td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.name}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.total_approved}</td>
      <td className='py-4 px-3 text-sm text-gray-900 whitespace-nowrap'>
        <span
          className='bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-0.5 rounded '>{capitalize(item.status)}</span>
      </td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center justify-center gap-3">
          <Link to={`/`}>
            <EyeIcon className='w-5 h-5 text-gray-600'/>
          </Link>
          <Link to={`/`}>
            <UsersIcon className='w-5 h-5 text-gray-600'/>
          </Link>
          <Link to={`/templates/${item._id}/builder`}>
            <PencilSquareIcon className='w-5 h-5 text-gray-600'/>
          </Link>
          <Link to={`/`}>
            <DocumentDuplicateIcon className='w-5 h-5 text-gray-600'/>
          </Link>
          <Link to={`/`}>
            <TrashIcon className='w-5 h-5 text-gray-600'/>
          </Link>
        </div>
      </td>
    </tr>
  )
}

export default TemplateRow;