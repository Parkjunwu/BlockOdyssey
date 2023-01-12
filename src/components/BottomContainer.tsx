import { ROW_PER_PAGE } from "../constantsForStore";
import { selectNumberOptions } from "../selectOptions";
import { productType } from "../type/fetchDataType.d";
import { pageNumberOrSetFunction } from "../type/forStoreType.d";
import PageArrowButton from "./PageArrowButton";
import renderPageButton from "./renderPageButton";

type BottomContainerProps = {
  filteredProducts: productType[];
  currentPage: number;
  totalDataNumber: number;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setAndStoreCurrentPage: (pageNumberOrSetFunction: pageNumberOrSetFunction) => void;
};

const BottomContainer = ({
  filteredProducts,
  currentPage,
  totalDataNumber,
  rowsPerPage,
  setRowsPerPage,
  setAndStoreCurrentPage,
}: BottomContainerProps) => {

  const onChangeSelectNumber = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setRowsPerPage(Number(value));
    sessionStorage.setItem(ROW_PER_PAGE,value);
    setAndStoreCurrentPage(1);
  };

  const totalPages = Math.ceil(totalDataNumber / rowsPerPage);
  
  return (
    <div className="BottomContainer">
      <table className="Table">
        <thead>
          <tr>
            <th>상품번호</th>
            <th>상품명</th>
            <th>브랜드</th>
            <th>상품내용</th>
            <th>가격</th>
            <th>평점</th>
            <th>재고</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts
            .slice((currentPage - 1) * rowsPerPage, (currentPage) * rowsPerPage)
            .map((product) => {
              const {
                id,
                title,
                brand,
                description,
                price,
                rating,
                stock,
              } = product;
              
              const editedDescription = description.length > 40 ? description.substring(0,40) + "..." : description;

              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{brand}</td>
                  <td>{editedDescription}</td>
                  <td>${price}</td>
                  <td>{rating}</td>
                  <td>{stock}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className="SearchOptionBar">
        <span className="SearchNumberText">페이지당 행: </span>
        <select className="SearchNumberSelect" value={rowsPerPage} onChange={onChangeSelectNumber}>
          {selectNumberOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <PageArrowButton arrow="ㅣ<" pageSetFunction={()=>setAndStoreCurrentPage(1)}/>
        <PageArrowButton arrow="<" pageSetFunction={()=>setAndStoreCurrentPage(prev=>prev === 1 ? prev : prev-1)}/>
        {renderPageButton(totalPages,currentPage,setAndStoreCurrentPage)}
        <PageArrowButton arrow=">" pageSetFunction={()=>setAndStoreCurrentPage(prev=>prev === totalPages ? prev : prev+1)}/>
        <PageArrowButton arrow=">ㅣ" pageSetFunction={()=>setAndStoreCurrentPage(totalPages)}/>
      </div>
    </div>
  );
};

export default BottomContainer;

