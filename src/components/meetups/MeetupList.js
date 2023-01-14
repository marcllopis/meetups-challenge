import classes from "./MeetupList.module.css";
import MeetupItem from "./MeetupItem";

export default function MeetupList({ meetups }) {
  return (
    <ul className={classes.list}>
      {meetups.map((meet, index) => (
        <MeetupItem key={meet.id} item={meet} index={index} />
      ))}
    </ul>
  );
}
