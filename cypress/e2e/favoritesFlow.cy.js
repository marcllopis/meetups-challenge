describe("Select meetup as a favorite flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("Navigates to favorite and displays none at the beginning", () => {
    // clicks on favorite link
    cy.get("nav ul li").eq(2).click();
    // favorite section appears
    cy.get('[data-testid="favorites-page"]').should("be.visible");
    // with no favorite events
    cy.get('[data-testid="favorites-page"] h3').should(
      "contain",
      "You have no favorite events."
    );
    // Favorites number shows 0
    cy.get("nav ul li").eq(2).get("span").should("contain", 0);
  });
  it("Selects a meetup as favorite and test that is properly displayed", () => {
    // clicks on all meetups link
    cy.get("nav ul li").eq(0).click();
    // all meetups section appears
    cy.get('[data-testid="all-meetups-page"]').should("be.visible");
    // clicks on the 2nd meetup button
    cy.get('[data-testid="add-fav-btn-1"]').click();
    // the notification appears
    cy.get(".Toastify__toast-container").should("exist");
    // favorites number shows 1 now
    cy.get("nav ul li").eq(2).get("span").should("contain", 1);
    // clicks on favorite link
    cy.get("nav ul li").eq(2).click();
    // favorite section appears
    cy.get('[data-testid="favorites-page"]').should("be.visible");
    // with one favorite events
    cy.get('[data-testid="favorites-page"]')
      .get("ul li")
      .should("contain", "This is a second meetup");
  });
});
