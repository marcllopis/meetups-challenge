import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { MyContext } from "../../context/MyProvider";
import Card from "../ui/Card";
import Button from "../ui/Button";
import classes from "./MeetupItem.module.css";
import { parseLocalStorageArray } from "../../util-hooks/useLocalStorage";
import {
  addedFavoriteEvent,
  duplicatedFavoriteEvent,
  removedFavoriteEvent,
} from "../../utils/notifications";

export default function MeetupItem({ item }) {
  const context = useContext(MyContext);
  const location = useLocation();

  const addFavorite = (favorite) => {
    if (
      parseLocalStorageArray("favoriteMeetups").find(
        (e) => e.id === favorite.id
      )
    ) {
      duplicatedFavoriteEvent(favorite.title);
    } else {
      const allFavorites = [
        ...parseLocalStorageArray("favoriteMeetups"),
        favorite,
      ];
      localStorage.setItem("favoriteMeetups", JSON.stringify(allFavorites));
      addedFavoriteEvent();
      context.setFavorites(allFavorites);
      context.setFavoritesNumber(
        parseLocalStorageArray("favoriteMeetups").length
      );
    }
  };

  const removeFavorite = (currentFavorite) => {
    const storedFavorites = parseLocalStorageArray("favoriteMeetups");
    const actualFavorites = storedFavorites.filter(
      (favorite) => favorite.id !== currentFavorite.id
    );
    localStorage.setItem("favoriteMeetups", JSON.stringify(actualFavorites));
    removedFavoriteEvent();
    context.setFavorites(actualFavorites);
    context.setFavoritesNumber(
      parseLocalStorageArray("favoriteMeetups").length
    );
  };

  return (
    <li className={classes.item} data-testid="meet-up-item">
      <Card>
        <div className={classes.image}>
          <img src={item.image} alt={item.title} />
        </div>
        <article className={classes.content}>
          <h3>{item.title}</h3>
          <address>{item.address}</address>
          <p>{item.description}</p>
        </article>
        <div className={classes.actions}>
          <Button
            action={
              location.pathname === "/"
                ? () => addFavorite(item)
                : () => removeFavorite(item)
            }
            text={
              location.pathname === "/"
                ? "Add to favorites"
                : "Remove from favorites"
            }
          />
        </div>
      </Card>
    </li>
  );
}
