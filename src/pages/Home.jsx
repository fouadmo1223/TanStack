import { Outlet } from "react-router-dom";
import Table from "../componnent/Table";

const Home = () => {
  return (
    <div className="bg-[#0f1115] pt-10 flex justify-center items-center relative">
      <Table />

      {/* ✅ nested route (/ :id) renders here */}
      <Outlet />
    </div>
  );
};

export default Home;
