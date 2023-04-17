/// <reference types="cypress" />

import { commands } from '../support/commands.js'


describe("Persoane ajutate: use 'Vizualizeaza' functionality ", () => {
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it("Login, click on 'Persoane ajutate', click on 'Vizualizare' button", function () {
     cy.login(this.data.username,this.data.password);
     cy.url().should('contains','/dashboard');

     cy.visit("https://iwanttohelp.bim.assistcloud.services/dashboard/helped_people");
     
     cy.get("i[title='Vizualizeaza']").first().click();
     cy.get('.title').should('have.text', 'Vizualizare persoana ajutata');
     cy.url().should('contains','https://iwanttohelp.bim.assistcloud.services/dashboard/helped_people/view');
  });
});