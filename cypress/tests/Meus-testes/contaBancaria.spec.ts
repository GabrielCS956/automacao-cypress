describe('Criação da conta bancária', function () {
  beforeEach(() => {
    cy.loginByDbUser();
  });

  it("SI-001 Login realizado com cadastro válido", function() {
    cy.visit('/personal');
    
    cy.get('[data-test="sidenav-bankaccounts"] > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('[data-test="bankaccount-new"]').click();
    cy.get('#bankaccount-bankName-input').type('Teste bank');
    cy.get('#bankaccount-routingNumber-input').type('123456789');
    cy.get('#bankaccount-accountNumber-input').type('98765432100');
    cy.get('[data-test="bankaccount-submit"]').click();

    cy.location("pathname").should("equal", "/bankaccounts");
    cy.get('.MuiGrid-grid-xs-12 > .MuiPaper-root > .css-9cyib4-MuiGrid-root > :nth-child(1) > .MuiTypography-root')
      .should('be.visible')
      .and('contain', 'Bank Accounts');
    cy.contains('Teste bank').should('be.visible');
    
  });
});