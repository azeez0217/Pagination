import React from "react";

const Pagination = ({ currentpage, totalPages, upadateCurrentPage,pagesLimit }) => {
  console.log(currentpage,totalPages)
  const pages = [];
  for (let i = 0; i <= totalPages; i++) {
    pages.push(
      <button
        className={`px-3 py-1 my-1 border-1 border-blue-300 rounded-md hover:border-1 cursor-pointer hover:border-blue-900 hover:shadoe-md ${
          currentpage/pagesLimit == i
            ? "bg-gray-200 text-blue-400"
            : "bg-white text-blue-800"
        }`}
        onClick={()=>upadateCurrentPage(i *pagesLimit)}
        key={i}
      >
        {i+1}
      </button>
    );
  }

  return (
    <div className="flex flex-wrap justify-center space-x-3 w-full">
    <button 
      onClick={() => upadateCurrentPage(currentpage - pagesLimit)} 
      className="px-3 py-1 border border-blue-300 rounded-md cursor-pointer hover:border-blue-900 hover:shadow-md bg-white text-blue-900 disabled:opacity-50"
      disabled={currentpage == 0}
    >
      Previous
    </button>
    {pages}
    <button 
      onClick={() => upadateCurrentPage(currentpage + pagesLimit)} 
      className="px-3 py-1 border border-blue-300 rounded-md hover:border-blue-900 hover:shadow-md bg-white cursor-pointer text-blue-900 disabled:opacity-50"
      disabled={currentpage == totalPages}
    >
      Next
    </button>
  </div>
  
  );
};

export default Pagination;
