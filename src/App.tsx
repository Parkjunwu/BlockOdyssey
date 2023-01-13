import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchProductList from "./api";
import { productType, fetchDataType, } from "./type/fetchDataType.d";
import './App.css';
import TopContainer from "./components/TopContainer";
import MiddleContainer from "./components/MiddleContainer";
import { pageNumberOrSetFunction } from "./type/forStoreType.d";
import BottomContainer from "./components/BottomContainer";
import { SEARCH_CONDITION, SEARCH_KEYWORD, CURRENT_PAGE } from "./constantsForStore";
import { searchByOptions } from "./selectOptions";

const App = () => {
  const [filteredProducts, setFilteredProducts] = useState<productType[]>([]);
  const [searchCondition, setSearchCondition] = useState(sessionStorage.getItem(SEARCH_CONDITION) || searchByOptions[0]);
  const [searchKeyword, setSearchKeyword] = useState(sessionStorage.getItem(SEARCH_KEYWORD) || "");
  const [currentPage, setCurrentPage] = useState(Number(sessionStorage.getItem(CURRENT_PAGE)) || 1);
  const [totalDataNumber, setTotalDataNumber] = useState(0);

  const { data } = useQuery<fetchDataType>(["productList"],fetchProductList);

  const getFilteredDataAndSetData = () => {
    const products = data?.products;
    if(!products) return;

    const filteredData = searchCondition === "전체" ?
      products.filter((product) => (
        product.title.toLowerCase().includes(searchKeyword.toLowerCase()) || 
        product.brand.toLowerCase().includes(searchKeyword.toLowerCase()) || 
        product.description.toLowerCase().includes(searchKeyword.toLowerCase())
      ))
      :
      products.filter((product) => {
        let filterColumnName: "title" | "brand" | "description" = "title";
        switch(searchCondition) {
          case "상품명":
            filterColumnName = "title";
            break;
          case "브랜드":
            filterColumnName = "brand";
            break;
          case "상품내용":
            filterColumnName = "description";
            break;
        }
        
        return product[filterColumnName].toLowerCase().includes(searchKeyword.toLowerCase())
      });

    setFilteredProducts(filteredData);
    setTotalDataNumber(filteredData.length);
  };

  useEffect(() => {
    if(!data) return;
    getFilteredDataAndSetData();
  }, [data]);
  
  const setAndStoreCurrentPage = (pageNumberOrSetFunction: pageNumberOrSetFunction) => {
    if(typeof pageNumberOrSetFunction === "number") {
      setCurrentPage(pageNumberOrSetFunction)
      sessionStorage.setItem(CURRENT_PAGE,String(pageNumberOrSetFunction));
    } else {
      setCurrentPage((prev)=>{
        const newValue = pageNumberOrSetFunction(prev);
        sessionStorage.setItem(CURRENT_PAGE,String(newValue));
        return newValue;
      });
    }
  };

  return (
    <div className="Container">
      <TopContainer
        searchCondition={searchCondition}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        setSearchCondition={setSearchCondition}
        getFilteredDataAndSetData={getFilteredDataAndSetData}
        setAndStoreCurrentPage={setAndStoreCurrentPage}
      />
      <MiddleContainer
        totalDataNumber={totalDataNumber}
      />
      <BottomContainer
        filteredProducts={filteredProducts}
        currentPage={currentPage}
        totalDataNumber={totalDataNumber}
        setAndStoreCurrentPage={setAndStoreCurrentPage}
      />
    </div>
  );
};

export default App;