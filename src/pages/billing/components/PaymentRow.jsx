import {detachPaymentMethod, setDefaultMethod} from "../../../redux/user/userThunk";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentPlan} from "../../../redux/user/userSlice";
import DropDown from "../../../components/inputs/DropDown";
import {Bars3Icon} from "@heroicons/react/20/solid";

const PaymentRow = ({item, setRemoveMethodId, totalLength}) => {
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
      {/*{(totalLength > 1) && (currentPlan !== item.id) && <div className="py-4 px-6 flex align-middle justify-end gap-2">*/}
      {/*  <button*/}
      {/*    className="py-2 px-3 bg-red-500 rounded-md text-sm text-white hover:bg-red-600"*/}
      {/*    onClick={handlePaymentMethodRemoval}*/}
      {/*  >*/}
      {/*    Remove*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    onClick={handleMakePaymentMethodDefault}*/}
      {/*    disabled={disabled}*/}
      {/*    className={`py-2 px-3 border-solid border-2 rounded-md text-sm sm ${disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-blue-500 hover:border-blue-500 hover:text-white"}`}*/}
      {/*  >*/}
      {/*    Make Default*/}
      {/*  </button>*/}
      {/*</div>}*/}
    </tr>
  )
}
export default PaymentRow