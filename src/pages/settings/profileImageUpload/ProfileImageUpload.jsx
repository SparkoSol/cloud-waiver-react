import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../../redux/user/userSlice.js";
import toast from "react-hot-toast";
import Input from "../../../components/inputs/Input";
import {updateProfilePicture} from "../../../redux/user/userThunk";
import Spinner from "../../../components/Spinner";

const ProfileImageUpload = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const [hover, setHover] = useState(false);

  async function handleImageUpload() {
    if(inputRef?.current?.files[0]){
      toast("Image Uploading...")
      const file = inputRef.current.files[0];
      //uploading
      const formData = new FormData();
      formData.append('file', file);
      dispatch(updateProfilePicture(formData))
      setLoading(true)
    }
  }
  function toggleHover(){
    setHover(!hover)
  }
  function selectImage(){
    inputRef?.current.click()
  }

  return (
    <>
      <div onMouseEnter={toggleHover} onMouseLeave={toggleHover} className="box-content h-28 w-28 m-4 relative rounded-full overflow-hidden">
        {loading && <Spinner pictureSpinner={true}/>}
        <img
          className="h-28 w-28 rounded-full z-0 object-cover"
          src={currentUser.profile_picture || "/images/avatar.png"}
          alt="profile_picture"
          onLoad={()=> setLoading(false)}
        />
        <div className={`h-28 w-28 ${hover ? "visible" : "hidden"} flex justify-center z-100 bg-slate-700 rounded-full absolute top-0 right-0 cursor-pointer opacity-40`}>
          <svg onClick={selectImage} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="m-auto bi bi-camera" viewBox="0 0 16 16">
            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
          </svg>
          <Input
            type={"file"}
            inputRef={inputRef}
            extraClasses={"hidden"}
            onChange={handleImageUpload}
          />
        </div>
      </div>
    </>
  )
}

export default ProfileImageUpload