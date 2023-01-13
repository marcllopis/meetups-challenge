import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MeetupItem from "../MeetupItem";
import { MyContext } from "../../../context/MyProvider";

describe("MeetupItem", () => {
  let contextValue;
  // mocks the notification methods
  const removedFavoriteEvent = jest.spyOn(
    require("../../../utils/notifications"),
    "removedFavoriteEvent"
  );
  const addedFavoriteEvent = jest.spyOn(
    require("../../../utils/notifications"),
    "addedFavoriteEvent"
  );
  // sets context value before each test
  beforeEach(() => {
    contextValue = {
      favorites: [],
      setFavorites: jest.fn(),
      favoritesNumber: 0,
      setFavoritesNumber: jest.fn(),
    };
  });

  it("renders MeetupItem correctly", () => {
    const item = {
      id: 1,
      title: "Example Meetup",
      address: "123 Example Street",
      description: "This is an example meetup",
      image: "example.jpg",
    };
    render(
      <MyContext.Provider value={contextValue}>
        <MemoryRouter>
          <MeetupItem item={item} />
        </MemoryRouter>
      </MyContext.Provider>
    );
    // test that all expected elements are there
    expect(screen.getByTestId("meet-up-item")).toBeInTheDocument();
    expect(screen.getByText(item.title)).toBeInTheDocument();
    expect(screen.getByText(item.address)).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
    expect(screen.getByAltText(item.title)).toHaveAttribute("src", item.image);
  });

  it("adds favorite correctly", () => {
    const item = {
      id: 1,
      title: "Example Meetup",
      address: "123 Example Street",
      description: "This is an example meetup",
      image: "example.jpg",
    };
    render(
      <MyContext.Provider value={contextValue}>
        <MemoryRouter>
          <MeetupItem item={item} />
        </MemoryRouter>
      </MyContext.Provider>
    );

    const button = screen.getByText("Add to favorites");
    fireEvent.click(button);
    // test that context methods have the expected value after click
    expect(contextValue.setFavorites).toHaveBeenCalledWith([item]);
    expect(contextValue.setFavoritesNumber).toHaveBeenCalledWith(1);
    // test that the notification has been called
    expect(addedFavoriteEvent).toHaveBeenCalled();
  });

  it("removes favorite correctly", () => {
    const item = {
      id: 1,
      title: "Example Meetup",
      address: "123 Example Street",
      description: "This is an example meetup",
      image: "example.jpg",
    };
    // adds an element to context and the relative favoritesNumber
    contextValue.favorites = [item];
    contextValue.favoritesNumber = contextValue.favorites.length;
    // renders the component but in the /favorites route so the button will behave as delete favorite
    render(
      <MyContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/favorites"]}>
          <MeetupItem item={item} />
        </MemoryRouter>
      </MyContext.Provider>
    );

    const button = screen.getByText("Remove from favorites");
    fireEvent.click(button);
    // test that context methods have the expected value after click (empty array and 0 as length)
    expect(contextValue.setFavorites).toHaveBeenCalledWith([]);
    expect(contextValue.setFavoritesNumber).toHaveBeenCalledWith(0);
    // test that the notification has been called
    expect(removedFavoriteEvent).toHaveBeenCalled();
  });
});
