import { useLayoutEffect, useState } from "react";
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
