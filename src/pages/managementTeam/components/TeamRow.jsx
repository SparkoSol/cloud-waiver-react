import CheckboxInput from "../../../components/inputs/CheckboxInput.jsx";

const TeamRow = () => {
  return (
    <>
      <tr>
        <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
          <div className="flex items-center max-w-fit">
            <CheckboxInput label='selectAll' extraClasses='hidden'/>
          </div>
        </td>
      </tr>
    </>
  )
}

export default TeamRow