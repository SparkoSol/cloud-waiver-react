import {useEffect, useRef, useState} from "react";
import Header from "./layout/Header.jsx";
import SideBarMenu from "./layout/SideBarMenu.jsx";
import {sideBarOptions} from "../utils/generalFunctions.js";
import {useOnClickOutside, useWindowSize} from "../utils/hooks.js";
import ErrorBoundary from "../ErrorBoundary";
import {userProfile} from "../redux/user/userThunk";
import {useDispatch} from "react-redux";

const ProtectedRoute = ({children}) => {
  const [openReplyMenuIndex, setOpenReplyMenuIndex] = useState(-1);
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false);
  const [width] = useWindowSize();
  const ref = useRef(null);

  const dispatch = useDispatch();
  const {pathname} = window.location;

  const isTemplatePath = pathname.includes('template');
  const isPdfPath = pathname.includes('pdf');
  const isKioskPath = pathname.includes('kiosk-preview');
  const isResetPath = pathname.includes('reset-password')
  const token = localStorage.getItem("cw-access-token");
  const handleReplyClick = (index) => {
    if (openReplyMenuIndex === index) setOpenReplyMenuIndex(-1)
    else setOpenReplyMenuIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isTemplatePath && !isPdfPath && !isKioskPath && !isResetPath) {
        dispatch(userProfile(token));
      }
    }, 21600000000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, []);

  useOnClickOutside(ref, () => {
    if(width < 786){
      setOpen(false)
    }
  });


  return (
    <div className='bg-gray-100 min-h-screen'>
      <div ref={ref}>
        <SideBarMenu handleReplyClick={handleReplyClick}
                     setHover={setHover}
                     hover={hover}
                     openReplyMenuIndex={openReplyMenuIndex}
                     open={open}
                     width={width}
                     setOpen={setOpen}
                     data={sideBarOptions}/>
      </div>
      <div className={`${open || hover ? 'lg:ml-64' : 'lg:ml-20'} transition-all duration-500 relative`}>
        <Header setOpen={setOpen}/>
        <section className='p-5 max-w-6xl mx-auto'>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </section>
      </div>
    </div>
  )
}

export default ProtectedRoute