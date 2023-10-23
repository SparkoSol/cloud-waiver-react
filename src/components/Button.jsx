import {twMerge} from "tailwind-merge";

const Button = ({
                  fullWidth = '',
                  btnText = '',
                  btnClasses = '',
                  BtnIcon = null,
                  iconClasses = '',
                  ...otherProps
                }) => {
  return (
    <div className={`flex justify-center items-center ${fullWidth}`}>
      <button {...otherProps}
              className={twMerge(`text-white transition ease-in text-sm align-items-center rounded-full font-bold flex justify-center items-center px-8 py-1.5 gap-2 ${btnClasses}`)}>
        {BtnIcon && <BtnIcon className={iconClasses ? iconClasses : 'w-5 h-5 text-textDark'}/>}
        {btnText && btnText}
      </button>
    </div>
  )
}

export default Button