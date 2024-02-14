import {useState} from "react";
import Header from "./layout/Header.jsx";
import SideBarMenu from "./layout/SideBarMenu.jsx";
import {sideBarOptions} from "../utils/generalFunctions.js";
import {useWindowSize} from "../utils/hooks.js";
import ErrorBoundary from "../ErrorBoundary";

const ProtectedRoute = ({children}) => {
  const [openReplyMenuIndex, setOpenReplyMenuIndex] = useState(-1);
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false);
  const [width] = useWindowSize();
  const handleReplyClick = (index) => {
    if (openReplyMenuIndex === index) setOpenReplyMenuIndex(-1)
    else setOpenReplyMenuIndex(index);
  };

  return (
    <div className='bg-gray-100 min-h-screen font-mulish'>
      <SideBarMenu handleReplyClick={handleReplyClick}
                   setHover={setHover}
                   hover={hover}
                   openReplyMenuIndex={openReplyMenuIndex}
                   open={open}
                   width={width}
                   setOpen={setOpen}
                   data={sideBarOptions}/>
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