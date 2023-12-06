import Button from "../../../components/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {updatePlan} from "../../../redux/user/userThunk";
import {selectPaymentMethods} from "../../../redux/user/userSlice";
import toast from "react-hot-toast";

const BillingRow = ({item}) => {
    const currentPlan = useSelector(state => state.user.currentUser.currentPlan)
    const paymentMethodsCount = useSelector(state => selectPaymentMethods(state)).length
    const disable = currentPlan === item.plan
    const dispatch = useDispatch();
    console.log(paymentMethodsCount)
    const handleChangePlan = () => {
        if(paymentMethodsCount > 0){
            dispatch(updatePlan({plan: item.plan}))
        } else {
            toast.error("Add payment method first.")
        }
    }
  return (
    <tr>
      <td className='py-4 pl-4 sm:pl-6 pr-3 text-sm text-gray-900' colSpan='2'>
        <strong>{item.plan}</strong>
        <ul className='mt-1'>
          {item.firstChar && <li className='mb-0.5'>{item.firstChar.title} <strong> {item.firstChar.price}</strong></li>}
          {item.secondChar && <li>{item.secondChar.title} <strong> {item.secondChar.price}</strong></li>}
        </ul>
      </td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center space-x-6">
          <Button
              disabled={disable}
              btnText='Select'
              fullWidth='w-fit ml-auto'
              btnClasses={`border px-4 py-2 border-gray-300 text-gray-700 font-semibold ${disable ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
              onClick={handleChangePlan}
          />
        </div>
      </td>
    </tr>
  )
}

export default BillingRow