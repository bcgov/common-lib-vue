// https://on.cypress.io/api

describe("component tests", () => {
  before(() => {
    cy.fixture("sample.pdf").as("samplePDF");
  });

  it("[FileUploader] successfully loads PDFs", () => {
    cy.get("@samplePDF").should("exist");

    cy.visit("/");
    cy.get("[id=components-fileuploader]").click();
    cy.getIframeBody().find('[class*="add-link"]', { timeout: 20000 }).first().should("exist");

    cy.get("[id=set-id]").click();
    cy.get("[id=control-id]").type("asdf");

    cy.getIframeBody().find('[id="asdf"]').selectFile("@samplePDF", { force: true });
    cy.getIframeBody()
      .find('[class*="thumbnail-image-container"]', { timeout: 20000 })
      .first()
      .should("exist");
    cy.getIframeBody().find('[class*="item-list"]').first().children().should("have.length", 3);
  });
});
