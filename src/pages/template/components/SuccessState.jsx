import Button from "../../../components/Button";
import {CheckCircleIcon} from "@heroicons/react/24/outline";
import {getRequest} from "../../../redux/cwAPI";
import {useEffect, useState} from "react";
import toast from 'react-hot-toast';
import Spinner from "../../../components/Spinner";

const SuccessState = () => {
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getRequest('/persons/company-details')
      .then(r => setCompanyName(r.data.company_name))
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false))
  }, []);

  return (
    <section className='max-w-3xl mx-auto'>
      {loading && <Spinner/>}
      <div className="bg-white shadow-md rounded-md mt-20 px-8 py-10 max-h-screen">
        <div className="text-green-400 flex justify-center mb-10">
          <h1 className="text-2xl font-bold">
            <CheckCircleIcon className='w-7 h-7 inline mr-3'/>
            Waiver Submitted Successfully!
          </h1>
        </div>
        <div className="text-left">
          <p className="mb-5">
            <strong>Reference No. {localStorage.getItem('ref')}</strong>
          </p>
          <p>
            Thank you for submitting your waiver to <b>{companyName}</b>.
            You will receive an email copy shortly.
          </p>
          <div className="mt-10 text-center">
            <Button btnText='Submit another waiver' btnClasses='bg-green-400' fullWidth='w-fit mx-auto'
                    onClick={e => window.history.go(-1)}/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SuccessState