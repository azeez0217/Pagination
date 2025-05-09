import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
const Products = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterdProducts] = useState([]);
  const [currentpage, setCurentpage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;
  console.log(search);
  useEffect(() => {
    fetchingProductsData();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [currentpage, categories, search]);

  const fetchingProductsData = async () => {
    const response = await axios.get(`https://dummyjson.com/products`);
    const product = response.data.products;
    setProducts(product);

    const startIndex = (currentpage - 1) * itemsPerPage;
    const PaginatedProducts = product.slice(
      startIndex,
      startIndex + itemsPerPage
    );
    console.log("Paginatd Products", PaginatedProducts);
    setFilterdProducts(PaginatedProducts);
    setTotalPages(Math.ceil(product.length / itemsPerPage));
  };

  const applyFilter = () => {
    debugger;
    let filtered = products;
    if (categories.length > 0) {
      filtered = products.filter((product, i) =>
        categories.includes(product.category)
      );
    }
    if (categories.length > 0) {
      const product = products.filter((prod, i) =>
        categories.includes(prod.category)
      );
      filtered = product.filter((prod) =>
        prod.title.toLowerCase().includes(search)
      );
    } else {
      filtered = products.filter((prod) =>
        prod.title.toLowerCase().includes(search)
      );
    }

    const startIndex = (currentpage - 1) * itemsPerPage;
    const PaginatedProducts = filtered.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    setFilterdProducts(PaginatedProducts);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  const handleCategoryChange = (e) => {
    debugger;
    const category = e.target.value;
    const isChecked = e.target.checked;
    setCategories((previousCategory) =>
      isChecked
        ? [...previousCategory, category]
        : previousCategory.filter((cat) => cat !== category)
    );
    setCurentpage(1);
  };

  const handleSearhChange = (e) => {
    debugger;
    const searchValue = e.target.value;
    console.log(searchValue);
    setSearch(searchValue);
    let filtered = [];
    if (categories.length > 0) {
      const product = products.filter((prod, i) =>
        categories.includes(prod.category)
      );
      filtered = product.filter((prod) =>
        prod.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      filtered = products.filter((prod) =>
        prod.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    const startIndex = (currentpage - 1) * itemsPerPage;
    const PaginatedProducts = filtered.slice(
      startIndex,
      startIndex + itemsPerPage
    );
    setCurentpage(1);
    setFilterdProducts(PaginatedProducts);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  const upadateCurrentPage = (page) => {
    setCurentpage(page);
  };
  return (
    <div className="max-w-screen-2xl mx-auto px-3 mt-14">
      <div className="text-center mt-5 mx-auto mb-5">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          className="border-1 font-semibold border-blue-900 text-black bg-white px-2 py-2 rounded outline-0 hover:border-blue-500 w-80 hover:shadow-md hover:shadow-blue-900 cursor-pointer"
          onChange={handleSearhChange}
        />
      </div>
      <div className="flex flex-col space-y-4 text-center bg-white mx-auto rounded-md shadow-md mb-6 p-4 w-full sm:w-4/5 md:w-2/3">
        <ul className="flex flex-wrap gap-4 justify-center">
          {["beauty", "fragrances", "furniture", "groceries"].map(
            (category, i) => (
              <label
                className="capitalize cursor-pointer flex items-center gap-2"
                htmlFor={category}
                key={i}
              >
                <li className="list-none">
                  <input
                    type="checkbox"
                    value={category}
                    className="cursor-pointer"
                    onChange={handleCategoryChange}
                    id={category}
                    name={category}
                  />
                </li>
                {category}
              </label>
            )
          )}
        </ul>
      </div>
      <div className="flex justify-center flex-wrap gap-4 ">
        {filterProducts.map((prod, i) => (
          <div
            className="w-[18rem] shadow-md rounded-md cursor-pointer hover:border-blue-300 hover:shadow-md hover:shadow-blue-700 bg-white"
            key={prod.id}
          >
            <div className="border-b-1 border-blue-400">
              <img src={prod.thumbnail} alt="image" className="w-full h-auto" />
            </div>
            <div>
              <p className="text-center font-semibold mt-2 mb-2">
                {prod.title}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
      <button className="mt-4 flex justify-end pr-5 mb-0 w-full" type="button">
  <Pagination
    currentpage={currentpage}
    totalPages={totalPages}
    upadateCurrentPage={upadateCurrentPage}
  />
</button></div>
    </div>
  );
};

export default Products;
