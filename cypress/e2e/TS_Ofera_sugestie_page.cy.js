/// <reference types="cypress" />


describe("Ofera sugestie: check that the fields are required ", () => {
    it("Go to 'Ofera sugestie', click on send button", function () {
        cy.visit("https://iwanttohelp.bim.assistcloud.services/contact");
        cy.get('.title').should('have.text', 'Ofera o sugestie');

        cy.get("button[class='btn btn-primary']").click();
        cy.get(".errors.text-left.mb-3").should('exist').and('contain.text', ' Acest camp este obligatoriu. ');
    });
});


describe("Ofera sugestie: ser is able to send a 'Sugestie' ", () => {
    before(function () {
        cy.fixture("log_data.json").then(function (data) {
          this.data = data;
        });
      });
    it("Go to 'Ofera sugestie', fill in data, click on send button", function () {
        cy.visit("https://iwanttohelp.bim.assistcloud.services/contact");
        cy.get('.title').should('have.text', 'Ofera o sugestie');

        cy.get('input[name="last_name"]')
             .type(this.data.lastName)
             .should("have.value", this.data.lastName);
        cy.get('input[name="email"]')
             .type(this.data.email)
             .should("have.value", this.data.email);  
        cy.get('textarea[name="message"]')
             .type(this.data.message)
             .should("have.value", this.data.message);      
        cy.get("button[class='btn btn-primary']").click();
        cy.get("div[role='alert']").should('exist').and('contain.text', 'Mesajul a fost trimis!');
    });
});