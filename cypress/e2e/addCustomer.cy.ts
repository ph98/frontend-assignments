/// <reference types="Cypress" />

describe('Should be able to add new customer', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  after(() => {

  });
  it('Should be able to add new customer', () => {
    cy.contains(/add/i).click();
    cy.get('#customerName').type('Parham');
    cy.get('#customerEmail').type('test@test.com');
    cy.get('#country').click();
    cy.get('#country').type('Swed');
    cy.get('.rc-virtual-list-holder-inner').find('[title=Sweden]').should('be.visible');
    cy.get('.rc-virtual-list-holder-inner').find('[title=Sweden]').click();
    cy.get('#age').type('42.1');
    cy.get('#annualSalary').type('50000');
    cy.get('#carPurchaseAmount').type('10000');
    cy.get('#creditCardDebt').type('50000');
    cy.get('#netWorth').type('500000');
    cy.get('form').submit();
    cy.get('form').contains('Gender is required!').should('be.visible');
    cy.get('#gender').click();
    cy.get('.rc-virtual-list-holder-inner').contains(/male/i).click();
    cy.get('form').submit();

    cy.get('[data-row-key="test@test.com"] > :nth-child(1)').should('be.visible');
    cy.get('[data-row-key="test@test.com"] > :nth-child(1)').should('contain.text', 'Parham');
  });
});
