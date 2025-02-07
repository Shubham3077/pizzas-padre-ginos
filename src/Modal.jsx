import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// portals renders conditional content which is separate from the dom hierarchy(modal div in index.html
const Modal = ({children}) => {
  const elRef = useRef(null);
  if(!elRef.current) {
    elRef.current = document.createElement('div') // elRef contains this same div everytime
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    modalRoot.appendChild(elRef.current);

    // cleanup modalRoot so it does keeps appending new divs everytime
  return () => modalRoot.removeChild(elRef.current);
    // return () => modalRoot.onLoad = null;
  }, [])


  return (
    createPortal(<div>{children}</div>,elRef.current)
  )
}

export default Modal;
