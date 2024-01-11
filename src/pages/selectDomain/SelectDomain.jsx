import Heading from "../../components/Heading.jsx";
import {selectCurrentUser} from "../../redux/user/userSlice.js";
import {useSelector} from "react-redux";

const SelectDomain = () => {
  const currentUser = useSelector(selectCurrentUser);
  const token = localStorage.getItem('cw-access-token');
  return (
    <section className='flex justify-center items-center w-full min-h-screen bg-gray-200 py-6'>
      <div className='w-11/12 sm:w-1/4 border rounded-3xl bg-white shadow-md p-5'>
        <Heading title='Select Your Workspace' subTitleClasses='text-gray-500 text-sm'
                 titleClasses='text-xl font-semibold mb-1' subtitle="Streamlining Your Digital Waiver Process"/>
        <ul className='space-y-4 mt-6'>
          {currentUser && currentUser.workspaces.map(item => {
            return <li key={item._id}
                       className='bg-gray-100 text-sm border p-3 text-center rounded-md cursor-pointer hover:bg-gray-200'
                       onClick={() => {
                         localStorage.clear();
                         window.location.href = `https://${item.domain}.cloudwaiver.com/dashboard?token=${token}`}
                       }>
              <h4 className='font-semibold text-gray-600'>{item.company_name}</h4>
              <span className='text-gray-900'>{item.domain}.cloudwaiver.com</span>
            </li>
          })}
        </ul>
      </div>
    </section>
  )
}

export default SelectDomain