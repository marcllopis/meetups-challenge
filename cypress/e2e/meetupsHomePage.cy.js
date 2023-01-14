describe("Meetups home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("Expected header elements are present", () => {
    // header is visible
    cy.get('[data-testid="navigation-header"]').should("be.visible");
    // all links are present
    cy.get("nav ul li").should("have.length", 3);
    cy.get("nav ul li").first().contains("All Meetups");
    cy.get("nav ul li").eq(1).contains("Add New Meetup");
    cy.get("nav ul li").eq(2).contains("My Favorites");
    // displays the correct number of favorites in the badge (hardcoded 0 favs at the begining)
    cy.get("nav ul li").eq(2).get("span").should("contain", 0);
    // links are set to the expected path
    cy.get("nav ul li").first().find("a").click();
    cy.url().should("include", "/");
    cy.get("nav ul li").eq(1).find("a").click();
    cy.url().should("include", "/new-meetup");
    cy.get("nav ul li").eq(2).find("a").click();
    cy.url().should("include", "/favorites");
  });
  it("Header disappears if you scroll down", () => {
    // scroll down 100px
    cy.scrollTo(0, 100);
    // header is not visible
    cy.get('[data-testid="navigation-header"]').should("not.be.visible");
  });
  it("Header disappears if you scroll down", () => {
    // scroll up
    cy.scrollTo(0, 0);
    // header is visible again
    cy.get('[data-testid="navigation-header"]').should("be.visible");
  });
  it("Meetups section properly displays all expected meetups", () => {
    // meetups section
    cy.get('[data-testid="all-meetups-page"]').should("be.visible");
    // 3 meetups are displayed (hardcoded from data.json)
    cy.get('[data-testid="all-meetups-page"]')
      .get("ul li")
      .should("have.length", 3);
    cy.get('[data-testid="all-meetups-page"]')
      .get("ul li")
      .should("contain", "This is a first meetup");
    cy.get('[data-testid="all-meetups-page"]')
      .get("ul li")
      .should("contain", "This is a second meetup");
    cy.get('[data-testid="all-meetups-page"]')
      .get("ul li")
      .should("contain", "This is a third meetup");
  });
});
