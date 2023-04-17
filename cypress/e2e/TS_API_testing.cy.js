/// <reference types="cypress" />

import { commands } from '../support/commands.js'
 

describe('Api testing: Get profile', ()=>{
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it('endpoint: api/v1/profile',function (){
    cy.getToken(this.data.username,this.data.password).then((authToken)=>
    cy.request({
      method: 'GET',
      url: 'https://iwanttohelp.bim.assistcloud.services/volunteers/api/v1/profile',
      headers:{
        "authorization": `Bearer ${authToken}`,
        "referer": "https://iwanttohelp.bim.assistcloud.services/dashboard/profile",
       },
      failOnStatusCode: false,
    }).then((response)=>{
        expect(response.status).to.eq(200);
      }));
  });
});



describe('Api testing: Get all recommended needs endpoint:', ()=>{
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it('api/v1/charts/user_recomended_needs',function (){
    cy.getToken(this.data.username,this.data.password).then((authToken)=>
    cy.request({
      method: 'GET',
      url: 'https://iwanttohelp.bim.assistcloud.services/volunteers/api/v1/charts/user_recomended_needs',
      headers:{
        "authorization": `Bearer ${authToken}`,
        "referer": "https://iwanttohelp.bim.assistcloud.services/dashboard/profile",
       },
      failOnStatusCode: false,
    }).then((response)=>{
        expect(response.status).to.eq(200);
      }));
  });
});




let idPostNeed;
const postData={
  "contact_first_name": "kujyhg",
  "contact_last_name": "nbvcv",
  "contact_phone_number": "fdgb",
  "category": "food",
  "description": "just a random description",
  "address": {
    "street_name": "ertyk",
    "details": "sdfghj",
    "county": "adsfadsf",
    "city": "zxcv",
    "postal_code": "7845352"
  }
}

describe('Api testing: need',()=>{
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it('Create a need:',function (){
    cy.getToken(this.data.username,this.data.password).then((authToken)=>
    cy.request({
      method: 'POST',
      url: 'https://iwanttohelp.bim.assistcloud.services/volunteers/api/v1/recommended_needs',
      headers: {
      "authorization": `Bearer ${authToken}`,
      "referer": "https://iwanttohelp.bim.assistcloud.services/dashboard/recommended_needs/create",  
    },
      body:postData,
    }).then((response) => {
      expect(response.status).to.eq(201);
      idPostNeed=response.body.need.id;
    })
    );
  });
  
})


describe('Api testing: need', ()=>{
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it('Get a need',function (){
    cy.getToken(this.data.username,this.data.password).then((authToken)=>
    it('Get need',()=>{
      cy.request({
          method: 'GET',
          url:`https://iwanttohelp.bim.assistcloud.services/volunteers/api/v1/needs/${idPostNeed}`,
          headers:{
          'authorization': `Bearer ${authToken}`,
          'referer': 'https://iwanttohelp.bim.assistcloud.services/dashboard/recommended_needs/create',
          },
      }).then((response)=>{
          expect(response.status).to.eq(200);
      })
  }));
  });
});


describe('Api testing: need',()=>{
  before(function () {
    cy.fixture("log_data.json").then(function (data) {
      this.data = data;
    });
  });

  it('Delete a need:',function (){
    cy.getToken(this.data.username,this.data.password).then((authToken)=>
    cy.request({
      method:'DELETE',
      url:`https://iwanttohelp.bim.assistcloud.services/volunteers/api/v1/recommended_needs/${idPostNeed}`,
      headers:{
          "authorization": `Bearer ${authToken}` ,
          "referer": "https://iwanttohelp.bim.assistcloud.services/dashboard/recommended_needs",
       },
  }).then((response)=>{
      expect(response.status).to.eq(204);
  }));
  });
})