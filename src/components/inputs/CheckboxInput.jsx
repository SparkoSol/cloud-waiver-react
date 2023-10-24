import {Link} from "react-router-dom";
import {twMerge} from "tailwind-merge";

const CheckboxInput = ({
                         label = null,
                         inputRef = null,
                         url = null,
                         link = null,
                         extraClasses = '',
                         setState,
                         ...otherProps
                       }) => {
  return (
    <div className='flex gap-2 items-center'>
      <input
        type='checkbox'
        {...otherProps}
        ref={inputRef}
        className='w-4 h-4 border border-gray-300 border-sm focus:ring-blue-500 cursor-pointer'
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        onChange={e => setState && setState(e.target.checked)}
      />
      <label className={twMerge(`block text-gray-500 font-normal cursor-pointer ${extraClasses}`)}
             htmlFor={label.toLowerCase()}>{label}
        {link && <Link className='font-bold text-blue-600' to={url}> terms and conditions</Link>}
      </label>
    </div>
  )
}

export default CheckboxInput


