const Section2 = {
  /**
   * A literal is considered static, stable strings (eg. titles, form labels, ...)
   */
  literals: {
    SAMPLE_LITERAL: 'This is a sample literal. You can safely delete it.',
    SECTION_2: 'Section 2',
    ABNORMAL_TEXT: 'Abnormally long network call!',
    LOCAL_PATH: '/Users/rgr2k/Downloads'
  },

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    sampleElement: '[data-test=sample-element-to-be-safely-deleted]',
    networkCallButton: '[data-test=network-call-button]',
    accessTabsHref: 'div > div > div:nth-child(3) > a',
    downloadButton: '[data-test=file-download-button]'
  },

  /**
   * An action should be pretty self explanatory! It consists of all the method performing
   * a particular action from clicking a simple button to doing complex assertions.
   */
  actions: {
    /**
     * Example of action.
     * In this example, we are grabbing a sample element, clicking on it and asserting the api answer.
     *
     * This is only used as an example and can be safely deleted.
     */
    assertSampleApiResponse () {
      cy.server()
      cy.wait('/endpoint').as('endpoint')

      cy.get(Section2.elements.sampleElement).click()
      // ... An api call to "/endpoint" performed on the app.
      cy.wait('@endpoint').should((request) => {
        expect(request.status).to.eq(200)
      })
    },
  },
}

module.exports = { Section2 }
