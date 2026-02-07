// App.js
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./layout/Navbar";
import PageWrapper from "./componnent/PageWrapper";
import Home from "./pages/Home";
import Create from "./pages/Create";
import PostDetails from "./componnent/PostDetails";

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <PageWrapper key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          {/* Standalone post details page */}
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </PageWrapper>
    </>
  );
}

export default App;
