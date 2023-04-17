/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('https://iwanttohelp.bim.assistcloud.services/')
  })

  it('Navigate to Despe noi page', () => {
    cy.get('a[href*="/about"]').click()
    cy.url().should('/about')
    cy.get('.mb-5 h3.card-title').should('have.text', 'Despre noi')
  })



})
