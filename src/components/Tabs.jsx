import {twMerge} from "tailwind-merge";
import {Link, useLocation, useParams} from "react-router-dom";

const Tabs = ({tabs}) => {
  const pathname = useLocation().pathname
  const {id} = useParams();
  return (<div className='flex font-medium text-sm border-b-2 border-gray-300 overflow-x-scroll sm:overflow-x-hidden'>
    {tabs.map((tab) => {
      return <Link
        data-current-tab={tab.name}
        key={tab.name}
        to={`/templates/${id}/${tab.url}`}
        onClick={tab.name === 'Builder' ? (e) => {
          const values = window.location.href.split('/')
          let url = ''
          values.forEach((value, index) => {
            if (index === values.length - 1) url += 'builder'
            else if (index === 1) {
              url += `/`
            } else {
              url += `${value}/`
            }
          })
          window.location.assign(url)
        } : null}
        className={twMerge(`
           text-gray-500  inline-block flex items-center p-4 rounded-t-lg hover:text-gray-600 space-x-2 
           ${(pathname.includes(tab.url)) && 'border-b-4 border-bgDark hover:border-gray-500 text-gray-900 hover:text-gray-600'}`)}
      >
          <span
            data-current-tab={tab.name}
          >
            {tab.name}
          </span>
      </Link>
    })}
  </div>)
}

export default Tabs