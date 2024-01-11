import Heading from "../../components/Heading.jsx";
import {selectCurrentUser} from "../../redux/user/userSlice.js";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Modal from "../../components/modals/Modal";
import {useNavigate} from "react-router-dom";
import {persistor} from "../../redux/store";

const SelectDomain = () => {
  const currentUser = useSelector(selectCurrentUser);
  const token = localStorage.getItem('cw-access-token');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.workspaces.length === 0) setOpen(true)
  }, [currentUser]);

  const handleClose = (value, title) => {
    persistor.purge();
    localStorage.removeItem('cw-access-token')
    navigate('/')
    setOpen(false)
  }

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
                         persistor.purge();
                         localStorage.removeItem('cw-access-token');
                         window.location.href = `https://${item.domain}.cloudwaiver.com/dashboard?token=${token}`
                       }}>
              <h4 className='font-semibold text-gray-600'>{item.company_name}</h4>
              <span className='text-gray-900'>{item.domain}.cloudwaiver.com</span>
            </li>
          })}
        </ul>
      </div>
      <Modal
        title='No Workspaces Found'
        functionCall={handleClose}
        open={open}
        setOpen={setOpen}
        btnText='Go Back'
        description='Unfortunately, no workspaces are currently associated with this account. If you believe this is in error or if you need assistance, please contact our support team.'
      />
    </section>
  )
}

export default SelectDomain