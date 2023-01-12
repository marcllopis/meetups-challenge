import { useFetch } from "../util-hooks/useFetch";
import MeetupList from "../components/meetups/MeetupList";

export default function AllMeetupsPage() {
  const { data } = useFetch({
    url: "/data.json",
  });

  if (!data) return <p>Loading...</p>;

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={data} />
    </section>
  );
}
