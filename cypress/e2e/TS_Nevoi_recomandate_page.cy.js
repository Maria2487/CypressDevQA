/// <reference types="cypress" />


import { commands } from '../support/commands.js'

describe("Nevoi recomandate - user is able to add a new Nevoie recomandata", () => {
  
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it("Login, click on nevoi recomandate, click on add button, fill in data, submit back to nevoi recomandate", function () {
    cy.login(this.data.username,this.data.password);
    cy.url().should('contains','/dashboard');

    cy.typeInNevoiRecomandateWithoutDescription(this.data.firstName, this.data.lastName, this.data.phoneNumber,
      this.data.category, this.data.street, this.data.county, this.data.city, this.data.postalCode);

    cy.get('textarea[name="description"]')
    .type(this.data.description)
    .should("have.value", this.data.description);


    cy.get("button[type='submit']").click();
    cy.visit("https://iwanttohelp.bim.assistcloud.services/dashboard/recommended_needs");
  });
});

describe("Nevoi recomandate - user is NOT able to add a new Nevoie recomandata", () => {
  
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it("Login, click on nevoi recomandate, click on add button, fill in data, submit back to nevoi recomandate", function () {
     cy.login(this.data.username,this.data.password);
     cy.url().should('contains','/dashboard');

     cy.typeInNevoiRecomandateWithoutDescription(this.data.firstName, this.data.lastName, this.data.phoneNumber,
       this.data.category, this.data.street, this.data.county, this.data.city, this.data.postalCode);

     cy.get("button[type='submit']").click();

     //Verify that the invalid attempt tiggered the error pop up
     cy.get("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)")
     .should('exist').and('contain.text', ' Acest camp este obligatoriu.');
  });
  });


describe("Nevoi recomandate: use 'Vizualizeaza' functionality", () => {
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it("Login, click on 'Nevoi recomandate', click on 'Vizualizare' button", function () {
     cy.login(this.data.username,this.data.password);
     cy.url().should('contains','/dashboard');

     cy.visit("https://iwanttohelp.bim.assistcloud.services/dashboard/recommended_needs");

     cy.get("i[title='Vizualizeaza']").first().click();
     cy.url().should('contains','https://iwanttohelp.bim.assistcloud.services/dashboard/recommended_needs/view/');
     
  });
});


describe("Nevoi recomandate: use 'Sterge' functionality", () => {
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });
let numberOfRows;

  it("Login, click on 'Nevoi recomandate', click on 'Sterge' button", function () {
     cy.login(this.data.username,this.data.password);
     cy.url().should('contains','/dashboard');

     cy.visit("https://iwanttohelp.bim.assistcloud.services/dashboard/recommended_needs");


     cy.get("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(6) > div:nth-child(1) > i:nth-child(4)").then((button) => {
      if (button.is(':disabled')) {
        // If the button is disabled, return
         return;
      } else {
        // If the button is enabled, click on it
        
        cy.get('table >tbody > tr').its('length').then((initialLength)=>{
          numberOfRows=initialLength;});
    
         //click on delete button
         button.click();
    
         //click on Confirm button
         cy.get("button[class='btn btn btn-primary btn-secondary btn-sm']").click();
    
         //Check if the number of rows decreased 
         cy.get('table > tbody > tr').should((lista)=>{
           expect(lista).to.have.length(numberOfRows-1);});
      }
    });
 }); 
});


describe("Nevoi recomandate: use 'Search..' functionality description", () => {
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it("Search 'Descriere'", function (){
     cy.login(this.data.username,this.data.password);
     cy.url().should('contains','/dashboard');

     cy.visit("https://iwanttohelp.bim.assistcloud.services/dashboard/recommended_needs");


     cy.get("input.form-control.form-control-md").type(this.data.searchType);
     cy.get("tbody tr:nth-child(2) td:nth-child(2)").first().should('contain',this.data.searchType);
  });
});


describe("Nevoi recomandate: use 'Search' functionality contact", function () {
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it("Search 'Persoana Contact'",function (){
    cy.login(this.data.username,this.data.password);
    cy.url().should('contains','/dashboard');
  
    cy.visit("https://iwanttohelp.bim.assistcloud.services/dashboard/recommended_needs");
  
    cy.get("input.form-control.form-control-md").type(this.data.searchType);
    cy.get("tbody tr:nth-child(2) td:nth-child(2)").first().should('contain',this.data.searchType);
  });
});


describe("Nevoi recomandate: use 'Search' functionality by address", function () {
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it("Search 'Adresa'", function (){
    cy.login(this.data.username,this.data.password);
    cy.url().should('contains','/dashboard');
  
    cy.visit("https://iwanttohelp.bim.assistcloud.services/dashboard/recommended_needs");
  
    cy.get("input.form-control.form-control-md").type(this.data.searchType);
    cy.get("tbody tr:nth-child(2) td:nth-child(2)").first().should('contain',this.data.searchType);
  });
});


describe("Nevoi recomandate: use 'Search' functionality by phone number", function (){
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it("Search 'Telefon'",function (){
    cy.login(this.data.username,this.data.password);
    cy.url().should('contains','/dashboard');
  
    cy.visit("https://iwanttohelp.bim.assistcloud.services/dashboard/recommended_needs");
  
    cy.get("input.form-control.form-control-md").type(this.data.searchType);
    cy.get("tbody tr:nth-child(2) td:nth-child(2)").first().should('contain',this.data.searchType);
  });
});
