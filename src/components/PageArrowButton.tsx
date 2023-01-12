type PageArrowButtonType = {
  arrow: string;
  pageSetFunction: ()=>void;
};

const PageArrowButton = ({
  arrow,
  pageSetFunction,
}: PageArrowButtonType) => <button className="Button" onClick={pageSetFunction}>{arrow}</button>;

export default PageArrowButton;