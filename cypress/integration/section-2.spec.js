/// <reference types="Cypress" />
const { Section2 } = require('../objects/section-2')

describe('Section 2 - API Interactions', () => {
  before(() => {

    cy.visit('/')

    cy
      .contains(Section2.literals.SECTION_2)
        .click()

        console.log('bla')
  })

  it('Http: Waiting for network calls', () => {

    cy.intercept({
      method: 'GET',
      url: '/todos/1'
    }).as('getTodos');

    cy.get(Section2.elements.networkCallButton) 
      .should('be.visible')
        .click()

      cy.wait('@getTodos').then((resp) => {

          expect(resp.response.statusCode).to.eq(200)
          expect(resp.response.body, 'response body').to.deep.equal({            
            id: 1,
            title:  Section2.literals.ABNORMAL_TEXT,
          })
        })

    cy.on('window:alert', (text) => {
      expect(text).to.contains(Section2.literals.ABNORMAL_TEXT);

    });
  })

}),

describe('Section 2 - Browser API: Opening a new tab', () => {
  before(() => {

    cy.visit('/')

    cy
      .contains(Section2.literals.SECTION_2)
        .click()
  })

  it('Assert that the button does what its supposed to do', () => {

    cy.get(Section2.elements.accessTabsHref) 
      .click()
        .should('have.attr', 'href', '/')
          .should('have.attr', 'target', '_blank')
            .should('have.attr', 'rel', 'noopener noreferrer')
           
    })

}),


describe('Section 2 - Browser API: Downloading a file', () => {
  before(() => {

    cy.visit('/')

    cy
      .contains(Section2.literals.SECTION_2)
        .click()
  })

  it('Assert that the button does what its supposed to do', () => {

    const path = require("path");
    const downloadsFolder = Cypress.config(Section2.literals.LOCAL_PATH);

    cy.get(Section2.elements.downloadButton) 
      .click()
        .should('have.attr', 'download')
          .and('equal', 'true')

    
    cy.readFile(path.join(String(downloadsFolder), "javascript-logo.png")).should("exist");

    })

})