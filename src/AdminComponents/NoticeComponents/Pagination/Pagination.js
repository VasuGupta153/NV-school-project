import React, { useState, useEffect } from "react";
import "./Pagination.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        toast.error("First Page");
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (Math.ceil(total / showPerPage) === counter) {
        toast.error("Last Page");
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };

  return (
    <div className="pagination-btns-container">
      <button className="prev-btn" onClick={() => onButtonClick("prev")}>
      <i className="fas fa-chevron-left" style={{marginRight: "10px"}}></i>Previous
      </button>
      <button className="next-btn" onClick={() => onButtonClick("next")}>
        Next<i className="fas fa-chevron-right" style={{marginLeft: "10px"}}></i>
      </button>
    </div>
  );
};

export default Pagination;