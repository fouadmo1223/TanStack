// App.js
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./layout/Navbar";
import PageWrapper from "./componnent/PageWrapper";
import Home from "./pages/Home";
import Create from "./pages/Create";

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {/* Wrap the entire Routes block or use the Wrapper inside each page */}
      <PageWrapper key={location.pathname}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </PageWrapper>
    </>
  );
}

export default App;
