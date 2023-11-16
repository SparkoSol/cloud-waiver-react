import {twMerge} from "tailwind-merge";
import {EyeIcon} from "@heroicons/react/24/outline";
import {useState} from "react";

const Input = ({
                   placeholder,
                   type = 'text',
                   label = null,
                   BtnIcon = null,
                   inputRef,
                   extraClasses = '',
                   inputClasses,
                   value = '',
                   ...props
               }) => {
    const [showPassword, setShowPassword] = useState(false);

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    return (<>
        <div className={twMerge(`w-full ${extraClasses}`)}>
            {label && <label className='block text-sm mb-1.5 font-semibold text-gray-500 text-start'
                             htmlFor={label.toLowerCase()}>{label}</label>}
            <div className="relative shadow-sm">
                {BtnIcon && <BtnIcon
                    className="pointer-events-none absolute inset-y-0 left-3 mt-px flex items-center text-btnBg w-5 h-5 transform translate-y-1/2"/>}
                {type === 'password' && <EyeIcon onClick={togglePasswordVisibility}
                                                 className="absolute top-1/2 right-3 cursor-pointer mt-px flex items-center text-btnBg w-4 h-4 transform translate-y-[-50%]"/>}
                <input ref={inputRef}
                       defaultValue={value}
                       className={twMerge(`block w-full w-full p-2.5 rounded-md border border-gray-300 bg-gray-200
               focus:border-gray-300 rounded-full focus-visible:outline-none sm:text-sm text-gray-600 ${type === 'password' && 'pr-8'}
               ${inputClasses ? inputClasses : 'pl-11'}`)}
                       id={placeholder} type={showPassword ? 'text' : type} name={label?.toLowerCase()}
                       required="required"
                       placeholder={placeholder}
                       {...props}
                />
            </div>
        </div>
    </>)
}

export default Input;