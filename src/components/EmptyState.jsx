import {PlusIcon} from "@heroicons/react/20/solid";
import Heading from "./Heading";
import {Link} from "react-router-dom";

const EmptyState = ({title, subtitle, btnText, url}) => {
  return (
    <>
      <img
        src='/images/integrations.png'
        alt='No integrations yet!'
        className='w-56 h-44'
      />
      <Heading title={title} subtitle={subtitle} center={true} titleClasses='text-gray-800 font-medium text-xl pb-2' subTitleClasses='text-gray-600 font-normal text-sm'/>
      <Link to={url} className='flex items-center bg-btnBg px-6 py-3 rounded-md text-white text-sm font-medium space-x-2'>
        <PlusIcon className='w-5 h-5 mr-2'/>
        {btnText}</Link>
    </>
  )
}
export default EmptyState;