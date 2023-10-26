import {useEffect, useRef} from "react";

const Template = () => {
  const fb = useRef(null);

  useEffect(() => {
    import("jquery").then(($) => {
      console.log($)
      window.jQuery = $;
      window.$ = $;
      $(document).ready(() => {
        $("#sortable-list").sortable();
      });
    });
  }, []);

  return <div id="fb-editor" ref={fb}/>;
};

export default Template
