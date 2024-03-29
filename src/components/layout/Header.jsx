import Button from "../Button.jsx";
import {Bars3Icon} from "@heroicons/react/20/solid";
import DropDown from "../inputs/DropDown.jsx";
import {Cog6ToothIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {selectCurrentUser} from "../../redux/user/userSlice";
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import ConfirmationModal from "../modals/ConfirmationModal";
import {persistor} from "../../redux/store";

const Header = ({ setOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState({
    title: "",
    desc: "",
  });
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation().pathname;

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (currentUser && !isAdmin) {
      // incomplete, incomplete_expired, trialing, active, past_due, canceled, or unpaid.
      const trialEnd = new Date(currentUser.trial_until);
      const currentDate = new Date(); // current date
      const isTrialExpired = trialEnd < currentDate;
      const allowedLocations = ["/billing", "/settings", "/settings/password"];
      switch (currentUser.subscription?.status) {
        case "incomplete":
          setDescription({
            title: "Incomplete Subscription",
            desc: "Your subscription is incomplete. Please update your payment information.",
          });
          break;
        case "incomplete_expired":
          setDescription({
            title: "Expired Incomplete Subscription",
            desc: "Your incomplete subscription has expired. Please start a new subscription.",
          });
          break;
        case "canceled":
          setDescription({
            title: "Canceled Subscription",
            desc: "Your subscription has been canceled. Please contact support for assistance.",
          });
          break;
        case "unpaid":
          setDescription({
            title: "Unpaid Subscription",
            desc: "Your subscription is unpaid. Please update your payment information.",
          });
          break;
        default:
          setDescription({
            title: "Trial Subscription",
            desc: "Your trial period has expired, kindly subscribe to continue using Cloud Waiver",
          });
          break;
      }
      const allowedStates = ["active", "trialing", "past_due"];
      if (currentUser.subscription) {
        if (
          !allowedStates.includes(currentUser.subscription?.status) &&
          !allowedLocations.includes(location)
        )
          setIsOpen(true);
      } else {
        if (isTrialExpired && !allowedLocations.includes(location))
          setIsOpen(true);
      }
    }
  }, [currentUser, location]);

  function handleClick() {
    persistor.purge();
    localStorage.removeItem("cw-access-token");
    window.location.href = "https://app.cloudwaiver.com";
  }

  const data = [
    {
      id: 1,
      func: handleClick,
      text: "Sign out",
    },
  ];
  return (
    <header
      className={`text-center bg-gray-100 border z-10 sticky top-0 flex left-0 right-0 justify-between items-center p-4`}
    >
      <div className="flex items-center gap-6">
        <Button
          btnClasses="w-8 h-8 flex justify-center items-center rounded-full bg-btnBg p-0"
          BtnIcon={Bars3Icon}
          fullWidth="w-fit hidden lg:block"
          onClick={() => setOpen((prev) => !prev)}
          iconClasses="w-4 h-4 text-white"
        />
        <Link className={`transition-all duration-500 lg:hidden`} to={'/dashboard'}>
          <img className='w-full max-w-[70px] mx-auto' alt='Loading..' src='/images/logo.png'/>
        </Link>
      </div>
      <div className="flex items-center gap-8 px-4 py-2.5 hidden lg:flex">
        <abbr title="Settings">
          <DropDown data={data} Icon={Cog6ToothIcon} />
        </abbr>
        <ConfirmationModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          {...description}
        />
      </div>
      <Button
        id="bars-btn"
        btnClasses="p-0"
        BtnIcon={Bars3Icon}
        onClick={() => setOpen((prev) => !prev)}
        fullWidth="w-fit block lg:hidden mr-4"
        iconClasses="w-7 h-7 text-iconGray"
      />
    </header>
  );
};

export default Header;
