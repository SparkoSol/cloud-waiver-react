import Button from "../../../components/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createPlan, getAllInvoices, updatePlan, userProfile} from "../../../redux/user/userThunk";
import {selectCurrentUser, selectPaymentMethods} from "../../../redux/user/userSlice";
import toast from "react-hot-toast";

const BillingRow = ({item, variablePrice}) => {
  const paymentMethodsCount = useSelector(state => selectPaymentMethods(state))?.length
  const currentUser = useSelector(selectCurrentUser);
  const disable = currentUser?.subscription?.items.some(row => row.price_id === item.id);
  const dispatch = useDispatch();
  const handleChangePlan = async (item) => {
    if (paymentMethodsCount > 0) {
      if (currentUser?.subscription) await dispatch(updatePlan({price: item.id}))
      else await dispatch(createPlan({prices: [item.id, variablePrice.id]}))

      //fetch invoices
      dispatch(getAllInvoices())

      const token = localStorage.getItem('cw-api-token');
      await dispatch(userProfile(token))
    } else {
      toast.error("Add payment method first.")
    }
  }
  return (
    <tr>
      <td className='py-4 pl-4 sm:pl-6 pr-3 text-sm text-gray-900' colSpan='2'>
        <strong>{item.lookup_key}</strong>
        <ul className='mt-1'>
          <li className='mb-0.5'>For the first 1 - {item.unit_amount / 100}
            <strong> Flat {item.currency.toUpperCase()}{item.unit_amount / 100}</strong></li>
          <li>{item.unit_amount / 100} - Rest Per
            Unit <strong> {item.currency.toUpperCase()}{Number(variablePrice.unit_amount_decimal) / 100}</strong></li>
        </ul>
      </td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center space-x-6">
          <Button
            disabled={disable}
            btnText='Select'
            fullWidth='w-fit ml-auto'
            btnClasses={`border px-4 py-2 border-gray-300 text-gray-700 font-semibold ${disable ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
            onClick={() => handleChangePlan(item)}
          />
        </div>
      </td>
    </tr>
  )
}

export default BillingRow