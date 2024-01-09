import Button from "../Button.jsx";
import {Bars3Icon} from "@heroicons/react/20/solid";
import DropDown from "../inputs/DropDown.jsx";
import {Cog6ToothIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {selectCurrentUser} from "../../redux/user/userSlice";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import ConfirmationModal from "../modals/ConfirmationModal";

const Header = ({setOpen}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState({
    title:'', desc:''
  })
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation().pathname;

  useEffect(() => {
    if (currentUser) {
      // incomplete, incomplete_expired, trialing, active, past_due, canceled, or unpaid.
      const trialEnd = new Date(currentUser.subscription?.trial_end).toISOString();
      const currentDate = new Date().toISOString();
      const isTrialExpired = trialEnd < currentDate;
      const allowedLocations = ['/billing', '/settings', '/settings/password'];
      switch (currentUser.subscription?.status) {
        case 'incomplete':
          setDescription({
            title: 'Incomplete Subscription',
            desc: 'Your subscription is incomplete. Please update your payment information.'
          });
          break;
        case 'incomplete_expired':
          setDescription({
            title: 'Expired Incomplete Subscription',
            desc: 'Your incomplete subscription has expired. Please start a new subscription.'
          });
          break;
        case 'trialing':
          setDescription({
            title: 'Trial Subscription',
            desc: 'You are currently in the trial period of your subscription.'
          });
          break;
        case 'past_due':
          setDescription({
            title: 'Past Due Subscription',
            desc: 'Your subscription is past due. Please update your payment information.'
          });
          break;
        case 'canceled':
          setDescription({
            title: 'Canceled Subscription',
            desc: 'Your subscription has been canceled. Please contact support for assistance.'
          });
          break;
        case 'unpaid':
          setDescription({
            title: 'Unpaid Subscription',
            desc: 'Your subscription is unpaid. Please update your payment information.'
          });
          break;
        default:
          setDescription({
            title: '',
            desc: ''
          });
          break;
      }
      if (isTrialExpired && currentUser.subscription.status !== 'active' && !allowedLocations.includes(location)) setIsOpen(true);
    }
  }, [currentUser, location]);


  function handleClick() {
    localStorage.clear();
    window.location.href = 'https://cloudwaiver.com';
  }

  const data = [
    {
      id: 1,
      func: handleClick,
      text: 'Sign out'
    }
  ]
  return (
    <header
      className={`text-center bg-gray-100 border z-10 sticky top-0 flex left-0 right-0 justify-between items-center p-4`}>
      <div className='flex items-center gap-6'>
        <Button btnClasses='w-8 h-8 flex justify-center items-center rounded-full bg-btnBg p-0' BtnIcon={Bars3Icon}
                fullWidth='w-fit hidden lg:block' onClick={() => setOpen(prev => !prev)}
                iconClasses='w-4 h-4 text-white'/>
        <h1 className='text-xl font-semibold'>Overview</h1>
      </div>
      <div className='flex items-center gap-8 px-4 py-2.5 hidden lg:flex'>
        <DropDown data={data} Icon={Cog6ToothIcon}/>
        <ConfirmationModal isOpen={isOpen} setIsOpen={setIsOpen} {...description}/>
      </div>
      <Button btnClasses='p-0' BtnIcon={Bars3Icon}
              onClick={() => setOpen(prev => !prev)}
              fullWidth='w-fit block lg:hidden mr-4'
              iconClasses='w-7 h-7 text-iconGray'/>
    </header>
  )
}

export default Header;