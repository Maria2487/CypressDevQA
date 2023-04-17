/// <reference types="cypress" />


describe("Devino voluntar: redirect to Autentification page", () => {
    it("Go to 'Devino voluntar', click on 'Aveti deja un cont?'", function () {
        cy.visit("https://iwanttohelp.bim.assistcloud.services/auth/register");
        cy.get('.title').should('have.text', 'Inregistrare');

        cy.get("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > a:nth-child(1) > span:nth-child(1)").click();
        cy.url().should('contains','/auth/login');
        cy.get('.title').should('have.text', 'Autentificare');
    });
});