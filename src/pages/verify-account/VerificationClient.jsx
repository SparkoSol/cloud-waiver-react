import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import Heading from "../../components/Heading.jsx";
import {verifyUser} from "../../redux/user/userThunk.js";

const VerificationClient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id, hashId} = useParams();

  useEffect(() => {
    if (id && hashId) {
      VerifyUserToken()
        .then(() => {
          toast.success('Verification Successful.')
          navigate('/')
        })
        .catch(e => toast.error(e.response.data.message))
    }
    // eslint-disable-next-line
  }, [id, hashId]);

  async function VerifyUserToken() {
    return await dispatch(verifyUser({
      id,
      hash: hashId
    })).unwrap();
  }

  return (
    <div className='w-full h-screen fixed'>
      <img alt='Loading...' src='/verification.svg' className='w-1/3 mx-auto'/>
      <div className='sm:mt-[-30px] md:mt-[-50px] lg:mt-[-70px]'>
        <Heading center={true} title='Verify Your Email Address' subtitle='An Email has been sent'
                 titleClasses='text-xl text-gray-800' subTitleClasses='text-gray-500'/>
      </div>
    </div>
  )
}

export default VerificationClient