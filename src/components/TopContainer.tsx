import { SEARCH_CONDITION, SEARCH_KEYWORD } from "../constantsForStore";
import { searchByOptions } from "../selectOptions";
import { pageNumberOrSetFunction } from "../type/forStoreType.d";

type TopContainerProps = {
  searchCondition: string;
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  setSearchCondition: React.Dispatch<React.SetStateAction<string>>;
  getFilteredDataAndSetData: () => void;
  setAndStoreCurrentPage: (pageNumberOrSetFunction: pageNumberOrSetFunction) => void;
};

const TopContainer = ({
  searchCondition,
  searchKeyword,
  setSearchKeyword,
  setSearchCondition,
  getFilteredDataAndSetData,
  setAndStoreCurrentPage,
}: TopContainerProps) => {

  const onChangeSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value);

  const onChangeSearchCondition = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    sessionStorage.setItem(SEARCH_CONDITION,value);
    setSearchCondition(value)
  };

  const onClickSearchByKeyword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    sessionStorage.setItem(SEARCH_KEYWORD,searchKeyword);
    getFilteredDataAndSetData();
    setAndStoreCurrentPage(1);
  };

  return (
    <div className="TopContainer">
      <div className="EachTopContainer">
        상품검색
      </div>
      <div className="Separator"/>
      <div className="EachTopContainer">
        <span className="SearchTitleText">
          검색
        </span>
        <select className="SearchOption" value={searchCondition} onChange={onChangeSearchCondition}>
          {searchByOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <input className="SearchInput" type="text" id="name" name="name" required value={searchKeyword} onChange={onChangeSearchKeyword}></input>
        <button className="SearchBtn" onClick={onClickSearchByKeyword}>조회</button>
      </div>
    </div>
  );
};

export default TopContainer;