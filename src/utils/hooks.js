import { useEffect, useLayoutEffect, useState } from "react";

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function useWindowSize(debounceDelay = 250) {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    const debouncedUpdateSize = debounce(updateSize, debounceDelay);
    window.addEventListener("resize", debouncedUpdateSize);
    updateSize();
    return () => {
      window.removeEventListener("resize", debouncedUpdateSize);
    };
  }, [debounceDelay]);
  return size;
}

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const barsBtn = document.getElementById("bars-btn");
    const listener = (event) => {
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        barsBtn.contains(event.target)
      ) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
