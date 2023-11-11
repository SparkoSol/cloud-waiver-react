import {useNavigate} from "react-router-dom";
import Button from "../../../components/Button";

const SuccessState = () => {
  const navigate = useNavigate();
  return (
    <section className='max-w-3xl mx-auto'>
      <div className="bg-white shadow-md rounded-md mt-20 px-8 py-10 max-h-screen">
        <div className="text-green-400 flex justify-center mb-10">
          <h1 className="text-2xl font-bold">
            Waiver Submitted Successfully!
          </h1>
        </div>
        <div className="text-left">
          <p className="mb-5">
            <strong>Reference No. SPARKO.20231110.208939</strong>
          </p>
          <p>
            Thank you for submitting your waiver to <b>sparkoSols</b>.
            You will receive an email copy shortly.
          </p>
          <div className="mt-10 text-center">
            <Button btnText='Submit another waiver' btnClasses='bg-green-400' fullWidth='w-fit mx-auto' onClick={e=>navigate(-1)}/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SuccessState