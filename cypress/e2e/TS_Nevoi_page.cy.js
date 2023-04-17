/// <reference types="cypress" />

import { commands } from '../support/commands.js'


describe("Nevoi: use 'Vizualizeaza' functionality ", () => {
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it("Login, click on 'Nevoi', click on 'Vizualizare' button", function () {
     cy.login(this.data.username,this.data.password);
     cy.url().should('contains','/dashboard');

     cy.visit("https://iwanttohelp.bim.assistcloud.services/dashboard/needs");
     
     cy.get("i[title='Vizualizeaza']").first().click();
     cy.get('.title').first().should('have.text', ' Vizualizare nevoie ');
     cy.url().should('contains','https://iwanttohelp.bim.assistcloud.services/dashboard/needs/view');
     
  });
});


describe("Nevoi: use 'Aplica' functionality", () => {
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it("Login, click on 'Nevoi', click on 'Aplica' button", function () {
    cy.login(this.data.username,this.data.password);
    cy.url().should('contains','/dashboard');

    cy.visit("https://iwanttohelp.bim.assistcloud.services/dashboard/needs");

    cy.get("i[title='Aplica']").first().then((button) => {
     if (button.is(':disabled')) {
       // If the button is disabled, return
       return;
     } else {
       // If the button is enabled, click on it
       button.click();
       cy.get('h5.modal-title').should('have.text', 'Aplica pentru aceasta nevoie');
       cy.get("button[class='btn btn btn-primary btn-secondary btn-sm']").click();
     }
   });
 });
});

describe("Nevoi- use 'Completeaza' functionality", () => {
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it("Login, click on 'Nevoi', click on 'Completeaza' button", function () {
    cy.login(this.data.username,this.data.password);
    cy.url().should('contains','/dashboard');

    cy.visit("https://iwanttohelp.bim.assistcloud.services/dashboard/needs");

    cy.get("tbody tr:nth-child(1) td:nth-child(5) div:nth-child(1) i:nth-child(3)").then((button) => {
     if (button.is(':disabled')) {
       // If the button is disabled, return
       return;
     } else {
       // If the button is enabled, click on it
       button.click();
       cy.get('div.vue-star-rating > span:nth-child(4)').click();
       cy.get('h5.modal-title').should('have.text', 'Finalizati aceasta nevoie');
       cy.get("textarea[name='comment']").type(this.data.message);
       cy.get("button[class='btn btn btn-primary btn-secondary btn-sm']").click();
     }
   });
 });
});