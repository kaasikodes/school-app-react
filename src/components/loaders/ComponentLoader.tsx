import BarLoader from "react-spinners/BarLoader";

const ComponentLoader = ({ height = "h-72" }: { height?: string }) => {
  return (
    <div className={`${height} pt-4  w-full flex justify-center items-center`}>
      <BarLoader color="#0080FE" />
    </div>
  );
};

export default ComponentLoader;
