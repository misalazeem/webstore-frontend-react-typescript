const LoadingComponent = () => {
  return (
    <>
      <div className="fixed w-full h-[100vh] z-50 bg-[#fff]">
        <div className="flex flex-row justify-center items-center w-full h-full">
          <span className="w-[75px] h-[75px] loading loading-spinner text-success"></span>
        </div>
      </div>
    </>
  );
};

export default LoadingComponent;
