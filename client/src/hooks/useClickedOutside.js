import { useState, useEffect, useRef } from "react";

const useClickedOutside = (initialVal) => {
  const [isClickedOutside, setIsClickedOutside] = useState(initialVal);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && ref.current.contains(event.target)) {
      setIsClickedOutside(false);
    } else {
      setIsClickedOutside(true);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isClickedOutside, setIsClickedOutside };
};
export default useClickedOutside;
