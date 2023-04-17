/// <reference types="cypress" />

import { commands } from '../support/commands.js'


describe('Navigation bar before login', () => {
  it("open the page and click on every link from navigation bar", () => {
    cy.visit('https://iwanttohelp.bim.assistcloud.services/');

    //Click on the link to Top Voluntari
    cy.get('a[href*="/search"]').click()
    //Check if the url is correct
    cy.url().should('contains','/search');
    //Check if the corect text is displayed
    cy.get('input[placeholder="Cauta voluntar"]').should('be.visible');

    //Click on the link to Lista Nevoi
    cy.get('a[href*="/needs_list"]').click()
    //Check if the url is correct
    cy.url().should('contains','/needs_list')
    //Check if the title is correct
    cy.get('.mb-1 h3.card-title').should('have.text', 'Lista nevoi & Cazuri speciale')

    //Click on the link to Despre Noi
    cy.get('a[href*="/about"]').click()
    //Check if the url is correct
    cy.url().should('contains','/about')
    //Check if the title is correct
    cy.get('.mb-5 h3.card-title').should('have.text', 'Despre noi')

    //Click on the link to Oferta Sugestie
    cy.get('a[href*="/contact"]').click()
    //Check if the url is correct
    cy.url().should('contains','/contact')
    //Check if the title is correct
    cy.get('h5.title.text-left').should('have.text', 'Ofera o sugestie')
    
    //Click on the link to Devino Voluntar
    cy.get('a[href*="/auth/register"]').click()
    //Check if the url is correct
    cy.url().should('contains','/auth/register')
    //Check if the title is correct
    cy.get('h5.title.text-center').should('have.text', 'Inregistrare')

    //Click on the link to Autentificare
    cy.get('.nav-link[href="/auth/login"]').click()
    //Check if the url is correct
    cy.url().should('contains','/auth/login')
    //Check if the title is correct
    cy.get('h5.title.text-center').should('have.text', 'Autentificare')

    //Click on the link to Acasa
    cy.get('.nav-link.router-link-exact-active.router-link-active').click()
    //Check if the url is correct
    cy.url().should('contains','/')
    
  });
});



describe('Navigation bar before login', () => {
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it("Login, click on 'Nevoi', click on 'Vizualizare' button", function () {
     cy.login(this.data.username,this.data.password);
     cy.url().should('contains','/dashboard');


    //Click on the link to Nevoi
    cy.get("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1) > p:nth-child(2)").click()
    //Check if the url is correct
    cy.url().should('contains','/dashboard/needs');

    //Click on the link to Nevoi Recomandate
    cy.get("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1) > p:nth-child(2)").click()
    //Check if the url is correct
    cy.url().should('contains','/dashboard/recommended_needs')

    //Click on the link to Cazuri Speciale
    cy.get("li[class='nav-item']").eq(3).click()
    //Check if the url is correct
    cy.url().should('contains','/dashboard/cases')

    //Click on the link to Persoane Ajutate
    cy.get("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(5) > a:nth-child(1) > p:nth-child(2)").click()
    //Check if the url is correct
    cy.url().should('contains','/dashboard/helped_people')

    //Click on the link to Testimoniale
    cy.get("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(6) > a:nth-child(1) > p:nth-child(2)").click()
    //Check if the url is correct
    cy.url().should('contains','/dashboard/testimonials')

    //Click on the link to Profil
    cy.get("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > nav:nth-child(1) > div:nth-child(3) > ul:nth-child(1) > li:nth-child(8) > a:nth-child(1) > i:nth-child(1)").click()
    //Check if the url is correct
    cy.url().should('contains','/dashboard/profile')

    //Click on the link to Dashboard
    cy.get("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1) > p:nth-child(2)").click()
    //Check if the url is correct
    cy.url().should('contains','/dashboard')

  });
});