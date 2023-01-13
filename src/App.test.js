import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import MyProvider from "./context/MyProvider";
import { createMemoryHistory } from "history";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

describe("App", () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  afterEach(() => {
    cleanup();
  });

  it("App component renders correctly", async () => {
    render(
      <Router>
        <MyProvider favoritesNumber={0}>
          <App />
        </MyProvider>
      </Router>
    );
    const app = screen.getByTestId("app");
    expect(app).toBeInTheDocument();
  });

  it("router handles landing on a wrong path", () => {
    // pushes history router prop to navigate to selected path
    history.push("/some/wrong/route");
    render(
      <Router history={history}>
        <MyProvider favoritesNumber={0}>
          <App />
        </MyProvider>
      </Router>
    );
    // router redirects to all meetups page
    expect(screen.getByTestId("all-meetups-page")).toBeInTheDocument();
  });
  it("router allows navigation to another page section", async () => {
    render(
      <Router history={history}>
        <MyProvider favoritesNumber={0}>
          <App />
        </MyProvider>
      </Router>
    );
    // selects text in the navbar that links to /favorites and clicks
    const myFavoritesLink = screen.getByText("My Favorites");
    fireEvent.click(myFavoritesLink);
    // router navigates to favorites page
    await screen.findByTestId("favorites-page");
  });
});
