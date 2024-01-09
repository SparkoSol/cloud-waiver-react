import {detachPaymentMethod, setDefaultMethod} from "../../../redux/user/userThunk";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentPlan} from "../../../redux/user/userSlice";
import DropDown from "../../../components/inputs/DropDown";
import {Bars3Icon} from "@heroicons/react/20/solid";

const PaymentRow = ({item, totalLength}) => {
  const currentPlan = useSelector(selectCurrentPlan);
  const dispatch = useDispatch()
  const handlePaymentMethodRemoval = async () => {
    dispatch(detachPaymentMethod({paymentMethodId: item.id}))
  }
  const handleMakePaymentMethodDefault = async () => {
    await dispatch(setDefaultMethod({paymentMethodId: item.id}))
  }

  let data = [
    {id: 1, func: handlePaymentMethodRemoval, text: 'Remove'},
    {id: 2, func: handleMakePaymentMethodDefault, text: 'Default'}
  ]

  return (
    <tr>
      <td className="py-4 px-6 text-base text-black flex gap-1">
        {item.card.brand}
        {(currentPlan === item.id) && (
          <span className="text-sky-500">
                        (Default)
                    </span>
        )}
      </td>
      <td className="py-4 px-6 text-base">
        {item.card.last4}
      </td>
      <td className="py-4 px-6 text-sm">
        {`${item.card.exp_month} / ${item.card.exp_year}`}
      </td>
      {(totalLength > 1) && (currentPlan !== item.id) && <DropDown data={data} Icon={Bars3Icon}/>}
    </tr>
  )
}
export default PaymentRow