/// <reference types="Cypress" />
const { Section1 } = require('../objects/section-1')

describe.skip('Section 1 - DOM Tables', () => {
 
   before(() => {

      cy.visit('/')

      cy
        .contains('Section 1')
          .click()
    })

    it('Assert that the table is not visible', () => {

      cy
        .get(Section1.elements.showTableButton)
          .should('be.visible');

      cy
        .get(Section1.elements.mainTable)
          .should('not.be.visible');
        
    })
    
    it('Assert that the table is visible after clicking on the button', () => {

      cy
        .get(Section1.elements.showTableButton
            ).should('be.visible')
              .click()

      cy
        .get(Section1.elements.mainTable)
          .should('be.visible');
        
    }),

    it('Assert that the table is 5 columns wide', () => {

      cy
        .get('.table-header > th')
          .then(columns => {
            expect(columns).to.have.length(5)
        })

    }),

    it('Assert that the table is 10 rows long, excluding the first (header) row', () => {

     cy
      .get('table > tbody > tr:not(:first-child)')
        .then(rows => {
          expect(rows).to.have.length(10)
      })     
   
    }),

    it('Assert that at least 5 entries have the role "user"', () => {

      var target = 'user'
      cy.get('table > tbody > tr:not(:first-child)> th:nth-child(5)').then($el => {
        cy.wrap($el).then($els => {
            expect($els.filter(index => $els.eq(index).is(`:contains(${target})`)))
              .to.have.length.above(4)
        })
      })
    }),


    it('Assert there are exactly 3 people older than 60 years old', () => {

      const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

                  var list = []
                  cy.get('table > tbody > tr:not(:first-child)> th:nth-child(4)').each(($el, index) => {

                    if (getAge($el.text()) > 60) {
                      list.push($el.text())              
                    }

                  }).then(() => {
                    cy.log(list)
                    let length = list.length;
                    expect(length).to.equal(3)
                  })

        })

}),

describe('Section 1 - DOM Forms', () => {
 
  before(() => {

     cy.visit('/')

     cy
       .contains('Section 1')
         .click()
   })

   it('Assert that the form is not visible', () => {

     cy
       .get('[data-test=signup-form]')
         .should('not.be.visible');
       
   })
   
   it('After clicking the "Show form" button, assert that the form is visible', () => {

     cy
       .get('[data-test=form-toggle-button]')
        .should('be.visible')
             .click()

     cy
       .get('[data-test=signup-form]')
       .should('be.visible');
       
   }),

   it('Fill in the "Name" and "Age" inputs, and assert that both inputs are filled', () => {

    cy
      .get('[data-test=full-name-input]')
        .type('Alay Care').should('be.visible')
        .invoke('val')
        .should('not.be.empty');

   cy
      .get('[data-test=age-input]')
        .type('18').should('be.visible')
        .invoke('val')
        .should('not.be.empty');      

   }),

   it('Select "Female" from the select option, and assert that the value is "female"', () => {

    cy
     .get('[data-test=gender-select]')
       .select('Female')
        .should('have.value', 'female')
  
   }),

   it('Tick the "Nurse" checkbox and assert that the value "nurse" is true', () => {

    cy.get('[data-test=nurse-input]')
      .check()
        .should('be.checked')
          .invoke('attr', 'name')
            .should('eq', 'nurse')

  }),

   it('Click on the "Submit" button and assert that there is an alert window showing with the text "Form submitted!"', () => {
     
      cy.get('[data-test=submit-btn]').should('be.visible').click()

      cy.on('window:alert', (text) => {
        expect(text).to.contains('Form submitted!');
      });

  })

})