/// <reference types="cypress" />

import { commands } from '../support/commands.js'


describe("Testimoniale", () => {
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it("Login, click on 'Testimoniale'", function () {
     cy.login(this.data.username,this.data.password);
     cy.url().should('contains','/dashboard');

     cy.visit("https://iwanttohelp.bim.assistcloud.services/dashboard/testimonials");
     
    cy.contains(".text-center.text-white.mb-5", this.data.message).then(($text) => {
      if ($text.length > 0) {
        // The button is not present on the page
        return;
      } else {
        // The button is present on the page
        cy.get("button[type='submit']").click();

        cy.get('h5.modal-title').should('have.text', 'Adaugati un testimonial');

        cy.get("button[class='btn btn btn-primary btn-secondary btn-sm']").click();
        cy.get(".text-center.text-danger").should('exist').and('contain.text', ' Acest camp este obligatoriu. ');
        cy.wait(2000);
        cy.get("textarea[name='comment']")
            .type(this.data.message)
            .should("have.value", this.data.message);
        cy.get("button[class='btn btn btn-primary btn-secondary btn-sm']").click();
      }
    });

  });
});