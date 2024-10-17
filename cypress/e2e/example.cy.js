// https://on.cypress.io/api

describe("component tests", () => {
  before(() => {
    cy.fixture("sample.pdf").as("samplePDF");
  });

  it("[FileUploader] successfully loads PDFs", () => {
    cy.get("@samplePDF").should("exist");

    cy.visit("/");
    //select FileUploader component from component list
    cy.get("[id=components-fileuploader]").click();

    //wait for component to fully load
    cy.getIframeBody().find('[class*="add-link"]', { timeout: 20000 }).first().should("exist");

    //set id, cypressId on FileUploader component for easier matching
    cy.get("[id=set-id]").click();
    cy.get("[id=control-id]").type("asdf");

    //upload PDF
    cy.getIframeBody().find('[id="asdf"]').selectFile("@samplePDF", { force: true });

    //check that PDF thumbnail loaded
    cy.getIframeBody()
      .find('[class*="thumbnail-image-container"]', { timeout: 20000 })
      .first()
      .should("exist");
    cy.getIframeBody().find('[class*="item-list"]').first().children().should("have.length", 3);

    //check that ZoomPortal works
    cy.get('[id="set-isZoomPortalEnabled"]').click();
    cy.get('[id="control-isZoomPortalEnabled"]').first().check();
    cy.getIframeBody().find('[class*="thumbnail-image-container"]').first().click();
    cy.getIframeBody()
      .find('[data-cy="asdf-sample.pdf.page-1modal"]', { timeout: 20000 })
      .should("exist");
    cy.getIframeBody().find('[data-cy="asdf-sample.pdf.page-1close"]').click();
    cy.getIframeBody().find('[data-cy="asdf-sample.pdf.page-1modal"]').should("not.exist");
  });
});
