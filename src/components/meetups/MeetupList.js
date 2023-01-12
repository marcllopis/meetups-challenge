import { useFetch } from "./../../util-hooks/useFetch";
import classes from "./MeetupList.module.css";
import MeetupItem from "./MeetupItem";

export default function MeetupList() {
  const { data } = useFetch({
    url: "/data.json",
  });

  if (!data) return <p>Loading...</p>;

  return (
    <ul className={classes.list}>
      {data.map((meet) => (
        <MeetupItem key={meet.id} item={meet} />
      ))}
    </ul>
  );
}
