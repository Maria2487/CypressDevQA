// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Custom comand for login
Cypress.Commands.add("login", (username, password) => {
  cy.visit("https://iwanttohelp.bim.assistcloud.services/auth/login");
  
  cy.wait(1000);
  // Enter valid credinteals for an account
  cy.get('input[name="phone_number"]')
    .type(username)
    .should("have.value", username);
  cy.get('input[name="password"]')
    .type(password)
    .should("have.value", password);

  /// Click on Autentificare button
  cy.get("button[type='submit']").click();
  });


Cypress.Commands.add("typeInNevoiRecomandateWithoutDescription", (firstName, lastName, phoneNumber, category, street, county, city, postalCode) => {
    cy.visit("https://iwanttohelp.bim.assistcloud.services/dashboard/recommended_needs");

    cy.wait(1000);
    cy.get("button[title='Add new']").click();

    cy.get('input[name="contact_first_name"]')
    .type(firstName)
    .should("have.value",firstName);

    cy.get('input[name="contact_last_name"]')
    .type(lastName)
    .should("have.value",lastName);

    cy.get('input[name="contact_phone_number"]')
    .type(phoneNumber)
    .should("have.value", phoneNumber);

    cy.get('.vs__search').click();
    cy.get('.vs__dropdown-menu').should('be.visible');
    cy.get('.vs__dropdown-menu li').contains(category).click();

    cy.get("input[placeholder='Nume strada, numar ...']")
    .type(street)
    .should("have.value", street);

    cy.get('input[name="county"]')
    .type(county)
    .should("have.value", county);

    cy.get('input[name="city"]')
    .type(city)
    .should("have.value", city);

    cy.get('input[name="postal_code"]')
    .type(postalCode)
    .should("have.value", postalCode);
});


Cypress.Commands.add("getToken", (username,password) => {
    cy.request({
      method:'POST',
      url:'https://iwanttohelp.bim.assistcloud.services/auth/signin',
      body:{"auth":{"phone_number":username,"password":password}},
      failOnStatusCode: false,
      headers:{
        'content-type': 'application/json;charset=UTF-8',
        'referer': 'https://iwanttohelp.bim.assistcloud.services/auth/login',
      },
  }).then((response)=>{
      expect(response.status).to.equal(201);

    let authToken = response.body.jwt;
    cy.wrap(authToken).as('authToken');
  })
});