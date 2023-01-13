import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AllMeetupsPage from "./pages/AllMeetupsPage";
import FavoritesPage from "./pages/Favorites";
import NewMeetupsPage from "./pages/NewMeetup";
import MainNavigation from "./components/layout/MainNavigation";
import Layout from "./components/layout/Layout";

function App() {
  const [lastScroll, setLastScroll] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    function handleScroll() {
      const currentScroll = window.pageYOffset;
      currentScroll > lastScroll && currentScroll > 0
        ? setVisible(false)
        : setVisible(true);
      setLastScroll(currentScroll);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScroll]);

  return (
    <div data-testid="app">
      <MainNavigation visible={visible} />
      <Layout>
        <Routes>
          <Route path="/" element={<AllMeetupsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="new-meetup" element={<NewMeetupsPage />} />
          <Route path="*" element={<AllMeetupsPage />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </div>
  );
}

export default App;
