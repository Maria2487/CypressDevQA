/// <reference types="cypress" />

import { commands } from '../support/commands.js'


describe("Autentificare: valid attempt and log out", () => {
  // Get data from fixtures(log_data.json) and put the values into this.data
  // to make easier to modify our input if needed
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });
  
  it("Valid credentials: Open the login page, type in valid credinteals and log out", function () {
    cy.visit("https://iwanttohelp.bim.assistcloud.services/auth/login");

    // Enter valid credinteals for an account
    cy.get('input[name="phone_number"]')
      .type(this.data.username)
      .should("have.value", this.data.username);
    cy.get('input[name="password"]')
      .type(this.data.password)
      .should("have.value", this.data.password);

    // Click on Autentificare button
    cy.get("button[type='submit']").click();

    // Verify if we are logged in 
    cy.url().should('contains','/dashboard');

    // Log out
    cy.get(".nav-link[href='#']").click();
  });
});


describe("Autentificare: invalid attempt", () => {
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it("Invalid credentials: Open the login page, type in invalid credinteals", function () {
    //Used a login function to not repeat the code above
    cy.login(this.data.invalidUser,this.data.invalidPassword);

    //Verify that the invalid attempt tiggered the error pop up
    cy.get('div[role="alert"]').should('exist').and('contain.text', 'Autentificarea a esuat!');

    //Verify that we are still on the Autentificare page
    cy.url().should('include', '/auth/login');
  });
});

describe("Autentificare: redirect to Devino voluntar page", () => {
  it("Go to 'Devino voluntar', click on 'Creati un cont nou'", function () {
      cy.visit("https://iwanttohelp.bim.assistcloud.services/auth/login");
      cy.get('.title').should('have.text', 'Autentificare');

      cy.get("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > a:nth-child(2) > span:nth-child(1)").click();
      cy.url().should('contains','/auth/register');
      cy.get('.title').should('have.text', 'Inregistrare');
  });
});