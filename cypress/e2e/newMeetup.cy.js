describe("Create a new meetup flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("Creates a new meetup and check that it renders on main page", () => {
    // clicks on add new meetup link
    cy.get("nav ul li").eq(1).click();
    // favorite section appears
    cy.get('[data-testid="new-meetups-page"]').should("be.visible");
    // types on all inputs
    cy.get('[data-testid="title"]').type("New test meetup");
    cy.get('[data-testid="image"]').type(
      "https://picsum.photos/seed/picsum/200/300"
    );
    cy.get('[data-testid="address"]').type("test address for a meetup");
    cy.get('[data-testid="description"]').type("test description for a meetup");
    //  Verify that the value has been updated
    cy.get('[data-testid="title"]').should("have.value", "New test meetup");
    cy.get('[data-testid="image"]').should(
      "have.value",
      "https://picsum.photos/seed/picsum/200/300"
    );
    cy.get('[data-testid="address"]').should(
      "have.value",
      "test address for a meetup"
    );
    cy.get('[data-testid="description"]').should(
      "have.value",
      "test description for a meetup"
    );
    // clicks on the add Meetup button
    cy.get("button").should("contain", "Add Meetup").click();
    // notification appears
    cy.get(".Toastify__toast-container").should("exist");
    // clicks on all meetups link
    cy.get("nav ul li").eq(0).click();
    // all meetups section appears
    cy.get('[data-testid="all-meetups-page"]').should("be.visible");
    // the new created meetup appears there
    cy.get('[data-testid="all-meetups-page"]')
      .get("ul li")
      .should("contain", "New test meetup");
  });
});
