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
    <div className={twMerge(`flex justify-center items-center ${fullWidth}`)}>
      <button {...otherProps}
              className={twMerge(`text-white transition  ease-in text-sm rounded-full font-semibold flex justify-center items-center px-8 py-2.5 gap-2 ${btnClasses}`)}>
        {BtnIcon && <BtnIcon className={`w-5 h-5 ${iconClasses ? iconClasses : 'text-textDark'}`}/>}
        {btnText && btnText}
      </button>
    </div>
  )
}

export default Button