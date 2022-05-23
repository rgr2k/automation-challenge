const Section1 = {
  /**
   * A literal is considered static, stable strings (eg. titles, form labels, ...)
   */
  literals: {
    SAMPLE_LITERAL: "This is a sample literal. You can safely delete it.",
    USER: "user",
    SECTION_1: "Section 1",
    FEMALE: "Female",
    FEMALE_LOWERCASE: "female",
    NURSE: "nurse",
    FORM_WINDOW_ALERT_TEXT: "Form submitted!",
  },

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    sampleElement: "[data-test=sample-element-to-be-safely-deleted]",
    showTableButton: "[data-test=table-toggle-button]",
    mainTable: "[data-test=user-table]",
    columnHeader: ".table-header > th",
    TableExcHeader: "table > tbody > tr:not(:first-child)",
    ColumnUser: "table > tbody > tr:not(:first-child)> th:nth-child(5)",
    ColumnDate: "table > tbody > tr:not(:first-child)> th:nth-child(4)",
    MainForm: "[data-test=signup-form]",
    ShowFormButton: "[data-test=form-toggle-button]",
    InputName: "[data-test=full-name-input]",
    InputAge: "[data-test=age-input]",
    SelectGender: "[data-test=gender-select]",
    NurseCheck: "[data-test=nurse-input]",
    SubmitButton: "[data-test=submit-btn]",
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
    assertSampleApiResponse() {
      cy.server();
      cy.wait("/endpoint").as("endpoint");

      cy.get(Section1.elements.sampleElement).click();
      // ... An api call to "/endpoint" performed on the app.
      cy.wait("@endpoint").should((request) => {
        expect(request.status).to.eq(200);
      });
    },
  },
};

module.exports = { Section1 };
