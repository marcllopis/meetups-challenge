import { useContext } from "react";
import { useFetch } from "../util-hooks/useFetch";
import MeetupList from "../components/meetups/MeetupList";
import { MyContext } from "../context/MyProvider";

export default function AllMeetupsPage() {
  const context = useContext(MyContext);
  const { data } = useFetch({
    url: "/data.json",
  });

  if (!data) return <p>Loading...</p>;

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={[...data, ...context.createdMeetups]} />
    </section>
  );
}
