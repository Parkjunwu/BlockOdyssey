import { pageNumberOrSetFunction } from "../type/forStoreType.d";

type PageNumberButtonType = {
  pageNumber: number;
  setAndStoreCurrentPage: (pageNumberOrSetFunction: pageNumberOrSetFunction) => void;
};

const PageNumberButton = ({
  pageNumber,
  setAndStoreCurrentPage,
}: PageNumberButtonType) => <button className="Button" onClick={()=>setAndStoreCurrentPage(pageNumber)}>{pageNumber}</button>;

export default PageNumberButton;