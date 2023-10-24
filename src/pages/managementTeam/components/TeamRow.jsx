import {TrashIcon} from "@heroicons/react/24/outline/index.js";

const TeamRow = ({item}) => {
  return (
    <>
      <tr>
        <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
          {item.name}
        </td>
        <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
          {item.email}
        </td>
        <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
          <button><TrashIcon className='w-5 h-5 text-red-400'/></button>
        </td>
      </tr>
    </>
  )
}

export default TeamRow