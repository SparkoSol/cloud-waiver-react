import Button from "../Button.jsx";
import {AdjustmentsVerticalIcon, Bars3Icon} from "@heroicons/react/20/solid";
import Input from "../inputs/Input.jsx";
import PropTypes from 'prop-types';
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import {Link} from "react-router-dom";
import {BellIcon} from "@heroicons/react/24/outline";
import DropDown from "../inputs/DropDown.jsx";

const Header = ({searchRef, setOpen}) => {

  Header.propTypes = {
    searchRef: PropTypes.object.isRequired, // Example type, adjust as needed
    setOpen: PropTypes.func.isRequired, // This specifies that `setOpen` is required and should be a function
  };

  return (
    <header className={`text-center bg-gray-100 border z-10 sticky top-0 flex left-0 right-0 justify-between items-center p-4`}>
      <div className='flex items-center gap-6'>
        <Button btnClasses='w-8 h-8 flex justify-center items-center rounded-full bg-btnBg p-0' BtnIcon={Bars3Icon}
                fullWidth='w-fit hidden lg:block' onClick={() => setOpen(prev=>!prev)}
                iconClasses='w-4 h-4 text-white'/>
        <h1 className='text-xl font-semibold'>Overview</h1>
        <Input BtnIcon={MagnifyingGlassIcon} inputRef={searchRef} placeholder='Search' extraClasses='w-fit hidden lg:block'/>
      </div>
      <div className='flex items-center gap-8 px-4 py-2.5 hidden lg:flex'>
        {/*<Link to='/' className='text-iconGray flex items-center hover:text-blue-400 gap-2'>*/}
        {/*  <AdjustmentsVerticalIcon className='w-5 h-5'/>*/}
        {/*  Stats</Link>*/}
        {/*<Link to='/' className='text-iconGray flex items-center gap-2 hover:text-blue-400'>*/}
        {/*  <BellIcon className='w-5 h-5'/>*/}
        {/*  5</Link>*/}
        <DropDown/>
      </div>
      <Button btnClasses='p-0' BtnIcon={Bars3Icon}
              onClick={()=>setOpen(prev=>!prev)}
              fullWidth='w-fit block lg:hidden mr-4'
              iconClasses='w-7 h-7 text-iconGray'/>
    </header>
  )
}

export default Header;