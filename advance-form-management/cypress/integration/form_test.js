describe("Quotes App", () => {
  beforeEach(() => {
    // Lets us test with fresh state every test
    cy.visit("http://localhost:3000");
  });

  // my points
  const fnameInput = () => cy.get("input[name=fname]");
  const lnameInput = () => cy.get("input[name=lname]");
  const emailInput = () => cy.get("input[name=email]");
  const passwordInput = () => cy.get("input[name=password]");
  const agreeInput = () => cy.get("input[name=agree]");
  const submitBtn = () => cy.get(`button[id=submitBtn]`);
  const userDiv = () => cy.get(".users");

  it("testing", () => {
    expect(1 + 1).to.equal(2);
    expect(1 + 4).to.equal(5);
    expect({}).not.to.equal({});
  });

  it("the proper elements are showing", () => {
    fnameInput().should("exist");
    lnameInput().should("exist");
    emailInput().should("exist");
    passwordInput().should("exist");
    agreeInput().should("exist");
    submitBtn().should("exist");

    cy.contains(/submit/i).should("exist");
  });

  describe("Filling out inputs and submitting", () => {
    it("can navigate to the site", () => {
      cy.url().should("include", "localhost");
    });

    it("submit button starts out disables", () => {
      submitBtn().should("be.disabled");
    });

    it("can type in the inputs", () => {
      fnameInput()
        .should("have.value", "")
        .type("Christopher")
        .should("have.value", "Christopher");
      lnameInput()
        .should("have.value", "")
        .type("Peralta")
        .should("have.value", "Peralta");
      emailInput()
        .should("have.value", "")
        .type("ChrisPeralta@gmail.com")
        .should("have.value", "ChrisPeralta@gmail.com");
      passwordInput()
        .should("have.value", "")
        .type("Password123")
        .should("have.value", "Password123");
    });

    it("can check and uncheck checkbox", () => {
      agreeInput().check().uncheck().check();
    });

    it("the submit button enables after all input and checkbox filled out", () => {
      fnameInput().type("Christopher");
      lnameInput().type("Peralta");
      emailInput().type("ChrisPeralta@gmail.com");
      passwordInput().type("Password123");
      agreeInput().check();
      submitBtn().should("not.be.disabled");
    });

    it("should be able to submit after filling out from", () => {
      fnameInput().type("Christopher");
      lnameInput().type("Peralta");
      emailInput().type("ChrisPeralta@gmail.com");
      passwordInput().type("Password123");
      agreeInput().check();
      submitBtn().click();
      userDiv().should("exist");
      fnameInput().type("Maclo");
      lnameInput().type("Peralta");
      emailInput().type("MacloPeralta@gmail.com");
      passwordInput().type("Password123");
      agreeInput().check();
      submitBtn().click();
    });
  });
});
