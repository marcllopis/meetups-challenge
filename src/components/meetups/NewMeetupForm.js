import { useState, useContext } from "react";
import { v4 as uuid } from "uuid";

import { MyContext } from "../../context/MyProvider";
import { parseLocalStorageArray } from "../../util-hooks/useLocalStorage";
import { addedNewEvent } from "../../utils/notifications";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

export default function NewMeetupForm() {
  const [state, setState] = useState({
    title: "",
    image: "",
    address: "",
    description: "",
  });
  const context = useContext(MyContext);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formattedMeetups = {
      ...state,
      id: uuid(),
    };
    const allMeetups = [
      ...parseLocalStorageArray("createdMeetups"),
      formattedMeetups,
    ];
    localStorage.setItem("createdMeetups", JSON.stringify(allMeetups));
    context.setCreatedMeetups(allMeetups);
    setState({
      title: "",
      image: "",
      address: "",
      description: "",
    });
    addedNewEvent();
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup title</label>
          <input
            name="title"
            type="text"
            required
            value={state.title}
            onChange={handleChange}
            data-testid="title"
            id="title"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup image</label>
          <input
            name="image"
            type="url"
            required
            value={state.image}
            onChange={handleChange}
            data-testid="image"
            id="image"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Meetup address</label>
          <input
            name="address"
            type="text"
            required
            value={state.address}
            onChange={handleChange}
            data-testid="address"
            id="address"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Meetup description</label>
          <textarea
            name="description"
            data-testid="description"
            required
            value={state.description}
            onChange={handleChange}
            rows="5"
            id="description"
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}
