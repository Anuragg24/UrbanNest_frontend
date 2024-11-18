import React, { useEffect, useState } from "react";
import productsData from "../../data/products.json";
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
const filters = {
  categories: ["all", "accessories", "dress", "jewellery", "cosmetics "],
  colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
  priceRanges: [
    { label: "under ₹500", min: 0, max: 500 },
    { label: "₹500 - ₹1000", min: 500, max: 1000 },
    { label: "₹1000 - ₹1500", min: 1000, max: 1500 },
    { label: "₹1500 - ₹2000", min: 1500, max: 2000 },
    { label: "above ₹2000", min: 2000, max: Infinity },
  ],
};
const ShopPage = () => {
  const [filterState, setFilterState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  const [currentPage, SetCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(8);

  const { category, color, priceRange } = filterState;
  const [minPrice, maxPrice] = priceRange.split("-").map(Number);

  const {
    data: { products = [], totalPages, totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: ProductsPerPage,
  });

  //clear filters

  const clearFilters = () => {
    setFilterState({
      category: "all",
      color: "all",
      priceRange: "",
    });
  };
  const handlePageChange = (pageNumber)=>{
    if (pageNumber > 0 && pageNumber <= totalPages){
        SetCurrentPage(pageNumber)
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading products</div>;

  const startProduct = (currentPage - 1) * ProductsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Shop Page</h2>
      </section>
      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/*left side*/}
          <ShopFiltering
            filters={filters}
            filterState={filterState}
            setFilterState={setFilterState}
            clearFilters={clearFilters}
          />
          {/*right side*/}
          <div>
            <h3 className="text-xl font-medium mb-4">
              Showing {startProduct} to {endProduct} of {totalProducts}
            </h3>
            <ProductCards products={products} />

            <div className="mt-6 flex justify-center">
              <button disabled={currentPage === 1} onClick={()=>handlePageChange(currentPage -1)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2">
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button onClick={()=>handlePageChange(index + 1)}
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  } rounded-md mx-1`}
                  key={index}
                >
                  {index + 1}
                </button>
              ))}
              <button disabled={currentPage === totalPages} onClick={()=>handlePageChange(currentPage +1)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2">
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
