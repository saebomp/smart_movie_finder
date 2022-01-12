import React from 'react';
import { FiArrowUpCircle } from "react-icons/fi";

const ScrollToTop = ({is_visible }) => {

    const scrollPage = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
  return (
    <div className="scroll-to-top">
        {is_visible && (
        <div onClick={() => scrollPage()}>
            <FiArrowUpCircle style={{fontSize:'70px'}} />
        </div>
        )}
    </div>
  )
  
}

export default ScrollToTop;