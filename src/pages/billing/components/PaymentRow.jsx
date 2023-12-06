import {updatePaymentMethods} from "../../../redux/user/userThunk";
import {useDispatch} from "react-redux";

const PaymentRow = ({item, setRemoveMethodId}) => {
  const disabled = item.default;
  const dispatch = useDispatch()
  // const handlePaymentMethodRemoval = async () => {
  //     dispatch(updatePaymentMethods({ type: "REMOVE", methodId: item.methodId}))
  // }
  const handleMakePaymentMethodDefault = async () => {
      if(!disabled){
        dispatch(updatePaymentMethods({ type: "MAKE_DEFAULT", methodId: item.methodId}))
      }
  }
  return(
    <tr>
        <td className="py-4 px-6 text-base text-black flex gap-1">
            {item.brand}
            {
                item.default && (
                    <span className="text-sky-500">
                        (Default)
                    </span>
                )
            }
        </td>
        <td className="py-4 px-6 text-base">
            {item.last4}
        </td>
        <td className="py-4 px-6 text-sm">
            {item.expiry}
        </td>
        <div className="py-4 px-6 flex align-middle justify-end gap-2">
            {/*<button*/}
            {/*    className="py-2 px-3 bg-red-500 rounded-md text-sm text-white hover:bg-red-600"*/}
            {/*    onClick={handlePaymentMethodRemoval}*/}
            {/*>*/}
            {/*    Remove*/}
            {/*</button>*/}
            <button
                onClick={handleMakePaymentMethodDefault}
                disabled={disabled}
                className={`py-2 px-3 border-solid border-2 rounded-md text-sm sm ${disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-blue-500 hover:border-blue-500 hover:text-white"}`}
            >
                Make Default
            </button>
        </div>
    </tr>
  )
}
export default PaymentRow