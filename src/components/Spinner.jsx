const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
