/// <reference types="cypress" />


describe('Top Voluntari', () => {
  beforeEach(() => {
    cy.visit('https://iwanttohelp.bim.assistcloud.services/search');
  });


  it("Check if map is displayed", () => {
    cy.get('#search-map').should('exist').and('be.visible');
  });


  it("Check if volunteers are displayed", () => {
      cy.request("GET", "https://iwanttohelp.bim.assistcloud.services/public/api/v1/volunteers").then((response) => {

      expect(response.status).to.eq(200)
      if(expect(response.body.users).length.to.be.greaterThan(1))
      {
        cy.get('.card-volunteer').each(($el) => {
          cy.wrap($el).should('exist').and('be.visible');
        });
      }
      
    })
  });


  it('Map: zoom in/out', () => {
    // Zoom in using ctrl and scroll
    cy.get('button[aria-label="Zoom in"]').click().click();

    // Zoom out using ctrl and scroll
    cy.get('button[aria-label="Zoom out"]').click().click();
  });

});