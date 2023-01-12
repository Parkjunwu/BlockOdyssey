type MiddleContainerType = {
  totalDataNumber: number;
};

const MiddleContainer = ({
  totalDataNumber,
}: MiddleContainerType) => {
  return (
    <div className="MiddleContainer">
      검색된 데이터 : {totalDataNumber}
    </div>
  );
};

export default MiddleContainer;