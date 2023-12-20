import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRequest} from "../../../redux/cwAPI";
import Spinner from "../../../components/Spinner";

const SplashScreen = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false)
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    getRequest(`/kiosk/public`)
      .then(r => setResponse(r.data))
      .catch(e => e.response.data.message)
      .finally(() => setLoading(false))
  }, [id]);

  return (
    <section className='w-full'>
      <div className="mx-auto pt-4 pb-8 max-w-xl px-6 lg:px-0">
        <div className="p-6 mt-4 bg-white rounded-md">
          <div className="flex mb-4 justify-center">
            <div className="mt-2">
              <img src={response?.logo}
                   width="200px" alt=''/>
            </div>
          </div>
          <div className="font-bold text-lg text-center">{response?.title}</div>
          <p>{response?.description}</p>
        </div>

        <div className="flex justify-center flex-col text-center">
          {response?.waivers.map((item, index) => {
            return (
              <Link to={`/template/${item._id}/public`} key={index}
                    className="block my-4 text-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white
                     shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>
      {loading && <Spinner/>}
    </section>
  )
}

export default SplashScreen;