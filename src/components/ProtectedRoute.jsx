import {useEffect, useRef, useState} from "react";
import Header from "./layout/Header.jsx";
import SideBarMenu from "./layout/SideBarMenu.jsx";
import {sideBarOptions} from "../utils/generalFunctions.js";
import {useWindowSize} from "../utils/hooks.js";
import {useNavigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const navigate = useNavigate();
  const [openReplyMenuIndex, setOpenReplyMenuIndex] = useState(-1);
  const [open, setOpen] = useState(true)
  const [hover, setHover] = useState(false);
  const [width] = useWindowSize();
  const searchRef = useRef();

  const handleReplyClick = (index) => {
    if (openReplyMenuIndex === index) setOpenReplyMenuIndex(-1)
    else setOpenReplyMenuIndex(index);
  };


  return (
    <div className='bg-gray-100'>
      <SideBarMenu searchRef={searchRef}
                   handleReplyClick={handleReplyClick}
                   setHover={setHover}
                   hover={hover}
                   openReplyMenuIndex={openReplyMenuIndex}
                   open={open}
                   width={width}
                   data={sideBarOptions}/>
      <div className={`${open || hover ? 'lg:ml-64':'lg:ml-20'} transition-all duration-500 relative`}>
        <Header setOpen={setOpen} searchRef={searchRef}/>
        <section className='p-5 font-mulish max-w-6xl mx-auto'>
          {children}
        </section>
      </div>
    </div>
  )
}

export default ProtectedRoute