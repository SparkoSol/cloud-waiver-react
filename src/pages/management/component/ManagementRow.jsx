import {Link} from "react-router-dom";
import {EyeIcon} from "@heroicons/react/20/solid/index.js";
import {UsersIcon} from "@heroicons/react/24/outline/index.js";

const ManagementRow = ({item}) => {
  return (
    <tr>
      <td
        className='py-4 px-6 font-semibold text-sm text-gray-900 whitespace-nowrap border border-gray-300'>{item.name}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap border border-gray-300'>{item.members.length}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap border border-gray-300'>
        <div className="flex items-center space-x-6">
          <div className="flex items-center gap-3">
            <Link to="/management/team/123">
              <EyeIcon className='w-5 h-5 text-iconGray'/>
            </Link>
            <button>
              <Link to='team/123/user/create'><UsersIcon className='w-6 h-6 text-iconGray'/></Link>
            </button>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default ManagementRow;
