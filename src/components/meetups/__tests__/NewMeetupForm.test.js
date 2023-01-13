import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import NewMeetupForm from "../NewMeetupForm";
import { MyContext } from "../../../context/MyProvider";

describe("<NewMeetupForm />", () => {
  // mocks the notification method
  const addedNewEvent = jest.spyOn(
    require("../../../utils/notifications"),
    "addedNewEvent"
  );

  it("should render form inputs and submit button", () => {
    render(<NewMeetupForm />);
    // checks that all expected elements are in the page
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Meetup/i)).toBeInTheDocument();
  });

  it("should update context and local storage when form is submitted", () => {
    const setCreatedMeetups = jest.fn();
    render(
      <MyContext.Provider value={{ setCreatedMeetups }}>
        <NewMeetupForm />
      </MyContext.Provider>
    );

    const titleInput = screen.getByLabelText(/title/i);
    const imageInput = screen.getByLabelText(/image/i);
    const addressInput = screen.getByLabelText(/address/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByText(/Add Meetup/i);

    // targets the element, changes it's value and clicks on the submit button
    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(imageInput, {
      target: { value: "https://example.com/test-image.jpg" },
    });
    fireEvent.change(addressInput, { target: { value: "Test Address" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });
    fireEvent.click(submitButton);
    // gets the generated element from localStorage (index 0 since here we will only have 1)
    const allMeetups = JSON.parse(localStorage.getItem("createdMeetups"));
    const newMeetup = allMeetups[0];
    // checks that it contains what was expected
    expect(newMeetup).toHaveProperty("title", "Test Title");
    expect(newMeetup).toHaveProperty(
      "image",
      "https://example.com/test-image.jpg"
    );
    expect(newMeetup).toHaveProperty("address", "Test Address");
    expect(newMeetup).toHaveProperty("description", "Test Description");
    expect(newMeetup).toHaveProperty("id");
    // tests that the context method was called with the proper array as argument
    expect(setCreatedMeetups).toHaveBeenCalledWith(allMeetups);
    // tests that the notification method was called
    expect(addedNewEvent).toHaveBeenCalled();
  });
});
