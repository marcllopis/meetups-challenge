import { useState, useEffect } from "react";

import AllMeetupsPage from "./pages/AllMeetupsPage";
import FavoritesPage from "./pages/Favorites";
import NewMeetupsPage from "./pages/NewMeetup";
import {
  ALL_MEETUP_PAGE,
  FAVORITES_PAGE,
  NEW_MEETUP_PAGE,
} from "./utils/constants";

import MainNavigation from "./components/layout/MainNavigation";
import Layout from "./components/layout/Layout";

function App() {
  const [page, setPage] = useState(ALL_MEETUP_PAGE);
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

  function getCurrentPageComponent() {
    let currentPageComponent = <AllMeetupsPage />;
    switch (page) {
      case FAVORITES_PAGE:
        currentPageComponent = <FavoritesPage />;
        break;
      case NEW_MEETUP_PAGE:
        currentPageComponent = <NewMeetupsPage />;
        break;
      default:
        currentPageComponent = <AllMeetupsPage />;
    }

    return currentPageComponent;
  }

  return (
    <div data-test="app">
      <MainNavigation visible={visible} setPage={setPage} />
      <Layout>{getCurrentPageComponent()}</Layout>
    </div>
  );
}

export default App;
