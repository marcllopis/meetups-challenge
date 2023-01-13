import { useContext } from "react";
import { useFetch } from "../util-hooks/useFetch";
import MeetupList from "../components/meetups/MeetupList";
import { MyContext } from "../context/MyProvider";
import { FETCH_MEETUPS_URL } from "../utils/constants";

export default function AllMeetupsPage() {
  const context = useContext(MyContext);
  const { data } = useFetch({
    url: FETCH_MEETUPS_URL,
  });

  return (
    <section data-testid="all-meetups-page">
      {data ? (
        <>
          <h1>All Meetups</h1>
          <MeetupList meetups={[...data, ...context.createdMeetups]} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}
