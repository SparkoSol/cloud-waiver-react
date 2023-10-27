import {TrashIcon} from "@heroicons/react/24/outline/index.js";
import {removeMember} from "../../../redux/team/teamThunk.js";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

const TeamRow = ({item}) => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const deleteMember = (index) => {
    dispatch(removeMember({teamId: id, memberId: item._id, index}))
  }
  return (
    <>
      <tr>
        <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
          {`${item.first_name} ${item.last_name}`}
        </td>
        <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
          {item.username}
        </td>
        <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
          <button onClick={deleteMember(item.index)}><TrashIcon className='w-5 h-5 text-red-400'/></button>
        </td>
      </tr>
    </>
  )
}

export default TeamRow