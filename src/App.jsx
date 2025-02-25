import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./components/Pagination";
const App = () => {
  const [products, setProduts] = useState([]);
  const [filterProducts, setFilterdProducts] = useState([]);
  const [currentpage, setCurentpage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pagesLimit = 15;
  useEffect(() => {
    fetchingProductsData();
  }, [currentpage]);
  const fetchingProductsData = async () => {
    const response = await axios.get(
      `https://dummyjson.com/products?skip=${currentpage}&limit=${pagesLimit}`
    );
    setProduts(response.data.products);
    setFilterdProducts(response.data.products);
    setTotalPages(Math.ceil(response.data.total / pagesLimit));
  };

  const updateFilterProducts = (e) => {
    debugger
    if (e.target.value === "") {
      setFilterdProducts(products);
    } else {
      const new_producuts_List = filterProducts.filter(
        (prod, i) => prod.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilterdProducts(new_producuts_List);
    }
  };

  const upadateCurrentPage = (num) => {
    debugger;
    setCurentpage(num);
  };

  return (
    <div className="max-w-[1250px] mx-auto mt-5 md:mt-10 ">
      <div className="mb-10 py-2">
        <div className="mx-auto text-center my-3">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search"
            className="border-1 font-semibold border-blue-200 px-2 py-2 rounded outline hover:border-blue-500 w-80 hover:shadow-lg cursor-pointer"
            onChange={(e) => updateFilterProducts(e)}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-15 ">
          {filterProducts.map((prod, i) => (
            <div
              className="shadow-md rounded-md p-2 cursor-pointer hover:border-1 hover:shadow-md hover:shadow-blue-700"
              key={prod.id}
            >
              <div className="border-b-1 border-blue-400">
                <img
                  src={prod.thumbnail}
                  alt="image"
                  className="w-full h-auto"
                />
              </div>
              <div>
                <p className="text-center font-semibold mt-2 mb-2">
                  {prod.title}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 mb-5 float-end px-5">
          <Pagination
            currentpage={currentpage}
            totalPages={totalPages}
            upadateCurrentPage={upadateCurrentPage}
            pagesLimit={pagesLimit}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
