// https://on.cypress.io/api

describe("component tests", () => {
  it("[FileUploader] successfully loads PDFs (no zoom example)", () => {
    cy.fixture("sample.pdf").as("samplePDF");
    cy.get("@samplePDF").should("exist");

    cy.visit("/iframe.html?id=components-fileuploader--no-zoom-example");
    //wait for component to fully load
    cy.get('[class*="add-link"]', { timeout: 20000 }).first().should("exist");
    //upload PDF
    cy.get('[data-cy="FileUploaderModelValueInput"]', { timeout: 20000 }).selectFile("@samplePDF", {
      force: true,
    });

    //check that PDF thumbnail loaded
    cy.get('[class*="thumbnail-image-container"]', { timeout: 20000 }).first().should("exist");
    cy.get('[class*="item-list"]').first().children().should("have.length", 3);

    //check that ZoomPortal works
    cy.get('[class*="thumbnail-image-container"]').first().click();
    //no-zoom example-- a page modal should not be created
    cy.get('[data-cy="-sample2.pdf.page-1modal"]').should("not.exist");
  });

  it("[FileUploader] successfully loads PDFs (zoom example)", () => {
    cy.fixture("sample2.pdf").as("samplePDF");
    cy.get("@samplePDF").should("exist");

    cy.visit("/iframe.html?id=components-fileuploader--zoom-example");
    //wait for component to fully load
    cy.get('[class*="add-link"]', { timeout: 20000 }).first().should("exist");
    //upload PDF
    cy.get('[data-cy="FileUploaderModelValueInput"]', { timeout: 20000 }).selectFile("@samplePDF", {
      force: true,
    });

    //check that PDF thumbnail loaded
    cy.get('[class*="thumbnail-image-container"]', { timeout: 20000 }).first().should("exist");
    cy.get('[class*="item-list"]').first().children().should("have.length", 3);

    //check that ZoomPortal works
    cy.get('[class*="thumbnail-image-container"]').first().click();
    cy.get('[data-cy="-sample2.pdf.page-1modal"]', { timeout: 20000 }).should("exist");
    cy.get('[data-cy="-sample2.pdf.page-1close"]').click();
    cy.get('[data-cy="-sample2.pdf.page-1modal"]').should("not.exist");
  });
});
