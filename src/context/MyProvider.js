import React, { useState } from "react";
import useStateWithLocalStorage, {
  parseLocalStorageArray,
} from "../util-hooks/useLocalStorage";

export const MyContext = React.createContext();

const MyProvider = (props) => {
  const [favoritesNumber, setFavoritesNumber] = useState(
    parseLocalStorageArray("favoriteMeetups").length || 0
  );
  const [favorites, setFavorites] = useStateWithLocalStorage(
    [],
    "favoriteMeetups"
  );
  const [createdMeetups, setCreatedMeetups] = useStateWithLocalStorage(
    [],
    "createdMeetups"
  );

  return (
    <MyContext.Provider
      value={{
        favoritesNumber,
        setFavoritesNumber,
        favorites,
        setFavorites,
        createdMeetups,
        setCreatedMeetups,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyProvider;
