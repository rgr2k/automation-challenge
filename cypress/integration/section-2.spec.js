const { Section2 } = require('../objects/section-2')

describe('Section 2 - API Interactions', () => {
  before(() => {

    cy.visit('/')

    cy
      .contains(Section2.literals.SECTION_2)
        .click()
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

})
