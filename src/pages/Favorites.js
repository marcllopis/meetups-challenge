import { useContext } from "react";
import { MyContext } from "../context/MyProvider";
import MeetupList from "../components/meetups/MeetupList";

export default function FavoritesPage() {
  const context = useContext(MyContext);

  return (
    <section data-testid="favorites-page">
      <h1>Favorites Page</h1>
      <MeetupList meetups={context.favorites} />
      {context.favorites.length === 0 && <h3>You have no favorite events.</h3>}
    </section>
  );
}
