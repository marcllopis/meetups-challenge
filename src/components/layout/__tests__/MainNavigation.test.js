import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import MainNavigation from "../MainNavigation";
import MyProvider from "../../../context/MyProvider";

describe("MainNavigation", () => {
  it("renders correctly when visible is true", () => {
    render(
      <BrowserRouter>
        <MyProvider favoritesNumber={0}>
          <MainNavigation visible={true} />
        </MyProvider>
      </BrowserRouter>
    );
    // header visible since visible prop is true
    expect(screen.getByTestId("navigation-header")).toBeInTheDocument();
    expect(screen.getByTestId("navigation-header")).toHaveClass(
      "header-visible"
    );
    // react router links pointing to the proper paths
    expect(screen.getAllByRole("link")[0]).toHaveAttribute("href", "/");
    expect(screen.getAllByRole("link")[1]).toHaveAttribute(
      "href",
      "/new-meetup"
    );
    expect(screen.getAllByRole("link")[2]).toHaveAttribute(
      "href",
      "/favorites"
    );
    // number of favorites coming from context
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders correctly when visible is false", () => {
    render(
      <BrowserRouter>
        <MyProvider favoritesNumber={0}>
          <MainNavigation visible={false} />
        </MyProvider>
      </BrowserRouter>
    );
    // header not visible since visible prop is false
    expect(screen.getByTestId("navigation-header")).toBeInTheDocument();
    expect(screen.getByTestId("navigation-header")).toHaveClass(
      "header-hidden"
    );
  });
});
