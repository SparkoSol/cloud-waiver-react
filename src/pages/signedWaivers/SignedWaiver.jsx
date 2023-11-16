import Heading from "../../components/Heading";
import Spinner from "../../components/Spinner";
import {useState} from "react";
import SubmissionTable from "../../components/SubmissionTable";
import Button from "../../components/Button";

const SignedWaivers = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);

  return (<section>
      <div className={'flex items-center justify-between'}>
          <Heading title='My Waivers List' titleClasses='text-xl text-gray-800 py-2'/>
          {selectedCount > 0 && <div className={'flex items-center'}>
              <span className='text-gray-500 mr-10'>Selected : {selectedCount}</span>
              <Button btnText='Approve' btnClasses='bg-green-700 mr-4' fullWidth='w-fit'/>
              <Button btnText='Decline' btnClasses='bg-red-500' fullWidth='w-fit'/>
          </div>}
      </div>
      <SubmissionTable setLoading={setLoading} setSelectedCount={setSelectedCount}/>
      {loading && <Spinner/>}
    </section>)
}

export default SignedWaivers;