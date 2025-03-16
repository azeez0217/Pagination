import React from "react";

const Pagination = ({ currentpage, totalPages, upadateCurrentPage, }) => {
  console.log(currentpage,totalPages)
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        className={`px-3 py-1 my-1 border-1 border-blue-300 rounded-md hover:border-1  cursor-pointer hover:border-blue-950 hover:shadow-md ${
          currentpage == i
            ? "bg-gray-400 text-white"
            : "bg-white text-blue-900"
        }`}
        onClick={()=>upadateCurrentPage(i)}
        key={i}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex flex-wrap justify-center space-x-3 w-full">
    <button 
      onClick={() => upadateCurrentPage(currentpage - 1)} 
      className="px-3 py-1 border border-blue-300 rounded-md cursor-pointer hover:border-blue-900 hover:shadow-md bg-white text-blue-900 disabled:opacity-50"
      disabled={currentpage == 1}
    >
      Previous
    </button>
    {pages}
    <button 
      onClick={() => upadateCurrentPage(currentpage + 1)} 
      className="px-3 py-1 border border-blue-300 rounded-md hover:border-blue-900 hover:shadow-md bg-white cursor-pointer text-blue-900 disabled:opacity-50"
      disabled={currentpage == totalPages}
    >
      Next
    </button>
  </div>
  
  );
};

export default Pagination;
