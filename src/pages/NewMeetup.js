import NewMeetupForm from "../components/meetups/NewMeetupForm";

export default function NewMeetupsPage() {
  return (
    <section data-testid="new-meetups-page">
      <h1>Add New Meetup</h1>
      <NewMeetupForm />
    </section>
  );
}
