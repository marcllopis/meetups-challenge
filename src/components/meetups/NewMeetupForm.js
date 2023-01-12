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
          <label htmlFor="title">Meetup Title</label>
          <input
            name="title"
            type="text"
            required
            value={state.title}
            onChange={handleChange}
            id="title"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input
            name="image"
            type="url"
            required
            value={state.image}
            onChange={handleChange}
            id="image"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input
            name="address"
            type="text"
            required
            value={state.address}
            onChange={handleChange}
            id="address"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            required
            value={state.description}
            onChange={handleChange}
            rows="5"
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}
