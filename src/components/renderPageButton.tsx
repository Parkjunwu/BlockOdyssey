import PageNumberButton from "./PageNumberButton";
import SkipText from "./SkipText";

const renderPageButton = (totalPages:number,currentPage:number,setAndStoreCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {

  const makeParams = (pageNumber:number) => ({
    key: pageNumber,
    pageNumber,
    setAndStoreCurrentPage,
  });
  
  const buttonArr = [<PageNumberButton {...makeParams(1)}/>];

  if(totalPages < 8) {
    for(let i=2;i<=totalPages;i++){
      buttonArr.push(<PageNumberButton {...makeParams(i)}/>)
    }
  } else {
    if(currentPage - 1 > 3) {
      if(10 - currentPage > 3) {
        buttonArr.push(<SkipText/>)
        for(let i=currentPage-1;i<=currentPage+1;i++){
          buttonArr.push(<PageNumberButton {...makeParams(i)}/>)
        }
        buttonArr.push(<SkipText/>)
        buttonArr.push(<PageNumberButton {...makeParams(10)}/>)
      } else {
        buttonArr.push(<SkipText/>)
        for(let i=6;i<=10;i++){
          buttonArr.push(<PageNumberButton {...makeParams(i)}/>)
        }
      }
    } else {
      for(let i=2;i<=5;i++){
        buttonArr.push(<PageNumberButton {...makeParams(i)}/>)
      }
      buttonArr.push(<SkipText/>)
      buttonArr.push(<PageNumberButton {...makeParams(10)}/>)
    }
  }

  return buttonArr;
};

export default renderPageButton;