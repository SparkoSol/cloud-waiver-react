import {ArrowPathIcon} from "@heroicons/react/24/outline/index.js";

const Card = ({item}) => {
  return (
    <div className="rounded-md shadow-md bg-white text-gray-800 w-full">
      <div className='p-3.5 flex justify-between border-b'>
        <div className='px-4'>
          <img src={item.icon} className='w-14' alt='loading...'/>
        </div>
        <div className='px-4'>
          <h1 className='text-lg'>{item.title}</h1>
          <h1 className='text-2xl'>{item.id === 1 && <span className=''>0</span>}{item.value}</h1>
        </div>
      </div>
      <span className='p-3.5 text-iconGray block text-sm'><ArrowPathIcon className='w-5 h-5 inline-block mr-2'/> Updated now</span>
    </div>
  )
}

export default Card;