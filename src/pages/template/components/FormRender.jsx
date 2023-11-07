import $ from "jquery"; //Load jquery
import React, {createRef, useEffect, useState} from "react"; //For react component
import {inputSets, options} from "../../../utils/generalFunctions";
import {useDispatch, useSelector} from "react-redux";
import {selectSingleWaiver} from "../../../redux/waivers/waiverSlice";
import {getSingleWaiver} from "../../../redux/waivers/waiverThunk";
import {useParams} from "react-router-dom";
import Button from "../../../components/Button";

window.jQuery = $; //JQuery alias
window.$ = $; //JQuery alias

require("jquery-ui-sortable"); //For FormBuilder Element Drag and Drop
require("formBuilder/dist/form-render.min.js")

const FormRender = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const waiver = useSelector(selectSingleWaiver);
  const [loading, setLoading] = useState(false);
  const fb = createRef();
  let formRender;

  useEffect(() => {
    if (waiver) {
      formRender = $(fb.current).formRender({
        formData: waiver?.form_data, ...options,
        inputSets,
      });
    }
  }, [waiver])

  useEffect(() => {
    setLoading(true);
    dispatch(getSingleWaiver(id))
      .finally(() => setLoading(false))
  }, []);

  function saveData() {
    if (Object.keys($(fb.current)?.formRender("userData")).length > 0) {
      console.log($(fb.current).formRender("userData"))
    }
  }

  return (
    <div>
      <form ref={fb}></form>
      {waiver?.form_data.length > 0 &&
        <Button btnText='Submit Data' onClick={saveData} btnClasses='bg-btnBg' fullWidth='w-fit mx-auto'/>
      }
    </div>
  )
}

export default FormRender