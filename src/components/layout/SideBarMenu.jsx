import {Link, useLocation} from "react-router-dom";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {Transition} from "@headlessui/react";
import {useDispatch, useSelector} from "react-redux";
import {resetUser, selectCurrentUser} from "../../redux/user/userSlice.js";
import {allPermissions, selectAllTeams, userPermissions} from "../../redux/team/teamSlice";
import {useEffect} from "react";
import {persistor} from "../../redux/store";

const SideBarMenu = ({
                       data,
                       open,
                       openReplyMenuIndex,
                       handleReplyClick,
                       hover,
                       setHover,
                       width,
                       setOpen
                     }) => {
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  const currentUser = useSelector(selectCurrentUser);
  const allTeams = useSelector(selectAllTeams);
  const permissions = useSelector(allPermissions);
  useEffect(() => {
    if (allTeams && currentUser) {
      let temp = allTeams.find(item => item.members.includes(currentUser._id));
      if (temp) {
        dispatch(userPermissions([...temp?.permissions, "waiver_templates", "sign_out", "settings", "dashboard"]))
      }
    }
  }, [allTeams, currentUser, dispatch]);


  return (
    <aside
      onMouseEnter={() => {
        if (width > 1024) {
          setHover(true);
        }
      }}
      onMouseLeave={() => {
        if (width > 1024) {
          setHover(false);
        }
      }}
      className={`${
        open || hover
          ? 'w-64 p-3'
          : width > 1024
            ? 'w-20 p-3'
            : 'w-0'
      } bg-bgDark h-screen transition-all duration-500 font-mulish fixed top-0 left-0 overflow-y-scroll scrollbar-thin z-20`}>
      <div className="w-full border-b border-btnBg py-4">
        <Link className={`transition-all duration-500 ${open || hover ? 'w-28' : 'w-8'}`} to={'/dashboard'}>
          <img className='w-full max-w-[112px] mx-auto' alt='Loading..' src='/images/logo.png'/>
        </Link>
      </div>

      {(open || hover) && <Link className="text-sm text-iconGray font-semibold" to="/settings/account">
        <div className="flex gap-2 items-center py-4 w-60 px-2 border-b border-btnBg">
          <div className="w-8 h-8 rounded-full border border-1 border-iconGray bg-white overflow-hidden">
            <img src={currentUser?.profile_picture || "/images/avatar.png"} className='w-full h-full object-cover'
                 alt=""/>
          </div>
          {`${currentUser?.first_name} ${currentUser?.last_name}`}
        </div>
      </Link>}
      <ul>
        {permissions.length > 0 && data.map((item, index) => {
          if (permissions.includes(item.permission)) {
            return <li className='text-sm relative font-semibold text-iconGray w-[244px]' key={index}>
              {item.subList ? (
                <div>
                  <button onClick={() => handleReplyClick(index)}
                          className={`flex items-center gap-4 py-2.5 pl-2 mt-2.5 w-full relative
                                         ${pathname.includes(item.url) ? 'text-blue-400' : 'text-iconGray'}`}
                  >
                    <item.icon className='w-7 h-7'/>
                    <span
                      className={`${open || hover ? 'opacity-100' : 'opacity-0'} transition-all duration-500`}>
                      <p className='whitespace-nowrap'>{item.title}</p><ChevronDownIcon
                      className='w-3 h-3 absolute right-4 top-1/2 transform -translate-y-1/2'/>
                    </span>

                  </button>
                  <Transition
                    show={openReplyMenuIndex === index}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <ul className="w-full">
                      {item.subList.map((subItem, subIndex) => {
                        return (
                          <li key={subIndex}>
                            <Link to={subItem.url} onClick={e => {
                              if (width < 1024) {
                                setOpen(false);
                              }
                            }}
                                  className={`flex items-center gap-6 p-2.5 ${pathname.includes(subItem.title.toLowerCase()) ? 'text-blue-400' : 'text-iconGray'}`}>
                              <span className="w-7 text-center">{subItem.title[0]}</span>
                              {subItem.title}
                            </Link>
                          </li>)
                      })}
                    </ul>
                  </Transition>
                </div>
              ) : (
                <Link to={item.url}
                      onClick={item.url === "#" ? () => {
                          dispatch(resetUser());
                          persistor.purge();
                          localStorage.removeItem('cw-access-token');
                          window.location.href = 'https://app.cloudwaiver.com';
                        } :
                        () => {
                          if (width < 1024) {
                            setOpen(false);
                          }
                        }
                      }
                      className={`flex items-center gap-4 py-2.5 pl-2 mt-2.5 ${pathname.includes(item.url) ? 'text-blue-400' : 'text-iconGray'}`}>
                  <item.icon className='w-7 h-7'/>
                  <p
                    className={`${open || hover ? 'opacity-100' : 'opacity-0'} transition-all duration-500 whitespace-nowrap`}>{item.title}</p>
                </Link>
              )}
            </li>
          } else {
            return null
          }
        })}
      </ul>
    </aside>
  )
}

export default SideBarMenu;