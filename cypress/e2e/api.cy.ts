describe("API is running", () => {
  it("Should be able to visit base url", () => {
    cy.visit("http://localhost:8000/");
  });
});
