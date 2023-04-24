describe("Login", () => {
  it("should not allow form submission with invalid email", () => {
    cy.visit("http://localhost:3000/login");

    // Enter the user's credentials
    cy.get('input[name="email"]').type("tester");
    cy.get('input[name="password"]').type("InokpaOO123$");

    // Assert that the user is logged in
    // cy.url().should('not.include', '/login')
    cy.get("div").should("contain", "Invalid Email Address");
  });
  it("should not log in user with incorrect credentials", () => {
    cy.visit("http://localhost:3000/login");

    // Enter the user's credentials
    cy.get('input[name="email"]').type("tester1@gmail.com");
    cy.get('input[name="password"]').type("InokpaOO123$");

    // Submit the login form
    cy.get("form").submit();

    // Assert that the user is logged in
    // cy.url().should('not.include', '/login')
    cy.get("div").should(
      "contain",
      "Email & Password does not match with our record."
    );
  });
  it("should log in user with correct credentials", () => {
    cy.visit("http://localhost:3000/login");

    // Enter the user's credentials
    cy.get('input[name="email"]').type("odehisaac1998@gmail.com");
    cy.get('input[name="password"]').type("Inokpa123$");

    // Submit the login form
    cy.get("form").submit();

    // Assert that the user is logged in
    cy.url().should("not.include", "/login");
    cy.get("div").should("contain", "User Logged In Successfully");
  });
});
