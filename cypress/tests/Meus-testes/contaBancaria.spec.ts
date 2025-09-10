describe('Criação da conta bancária', function () {
  beforeEach(() => {
    cy.loginByDbUser();
  });

  it("BA-001 Criar uma conta bancária com sucesso", function () {
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

  it("BA-002 Tentativa criar a conta sem preencher o campo de nome da conta", function () {
    cy.visit('/personal');

    cy.get('[data-test="sidenav-bankaccounts"] > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('[data-test="bankaccount-new"]').click();
    cy.get('#bankaccount-bankName-input').click();
    cy.get('#bankaccount-routingNumber-input').type('123456789');
    cy.get('#bankaccount-accountNumber-input').type('98765432100');

    cy.location("pathname").should("equal", "/bankaccounts/new");
    cy.get('#bankaccount-bankName-input-helper-text')
      .should('be.visible')
      .and('contain', 'Enter a bank name');

    cy.get('[data-test="bankaccount-submit"]')
      .should('be.disabled');
  });

  it("BA-003 Tentativa criar a conta sem preencher o campo de código bancário", function () {
    cy.visit('/personal');

    cy.get('[data-test="sidenav-bankaccounts"] > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('[data-test="bankaccount-new"]').click();
    cy.get('#bankaccount-bankName-input').type('Teste bank');
    cy.get('#bankaccount-routingNumber-input').click();
    cy.get('#bankaccount-accountNumber-input').type('98765432100');

    cy.location("pathname").should("equal", "/bankaccounts/new");
    cy.get('#bankaccount-routingNumber-input-helper-text')
      .should('be.visible')
      .and('contain', 'Enter a valid bank routing number');

    cy.get('[data-test="bankaccount-submit"]')
      .should('be.disabled');
  });


  it("BA-004 Tentativa criar a conta sem preencher o campo de número da conta", function () {
    cy.visit('/personal');

    cy.get('[data-test="sidenav-bankaccounts"] > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('[data-test="bankaccount-new"]').click();
    cy.get('#bankaccount-bankName-input').type('Teste bank');
    cy.get('#bankaccount-routingNumber-input').type('123456789');
    cy.get('#bankaccount-accountNumber-input').click();
    cy.get('#bankaccount-routingNumber-input').click();

    cy.location("pathname").should("equal", "/bankaccounts/new");
    cy.get('#bankaccount-accountNumber-input-helper-text')
      .should('be.visible')
      .and('contain', 'Enter a valid bank account number');

    cy.get('[data-test="bankaccount-submit"]')
      .should('be.disabled');
  });


  it("BA-005 Tentativa de criar a conta informando um nome com menos de 5 caracteres", function () {
    cy.visit('/personal');

    cy.get('[data-test="sidenav-bankaccounts"] > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('[data-test="bankaccount-new"]').click();
    cy.get('#bankaccount-bankName-input').type('Bank');
    cy.get('#bankaccount-routingNumber-input').type('123456789');
    cy.get('#bankaccount-accountNumber-input').type('98765432100')

    cy.location("pathname").should("equal", "/bankaccounts/new");
    cy.get('#bankaccount-bankName-input-helper-text')
      .should('be.visible')
      .and('contain', 'Must contain at least 5 characters');

    cy.get('[data-test="bankaccount-submit"]')
      .should('be.disabled');
  });

  it("BA-006 Tentativa de criar uma conta informando um código bancário com menos de 9 caracteres", function () {
    cy.visit('/personal');

    cy.get('[data-test="sidenav-bankaccounts"] > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('[data-test="bankaccount-new"]').click();
    cy.get('#bankaccount-bankName-input').type('Teste bank');
    cy.get('#bankaccount-routingNumber-input').type('12345678');
    cy.get('#bankaccount-accountNumber-input').type('98765432100')

    cy.location("pathname").should("equal", "/bankaccounts/new");
    cy.get('#bankaccount-routingNumber-input-helper-text')
      .should('be.visible')
      .and('contain', 'Must contain a valid routing number');

    cy.get('[data-test="bankaccount-submit"]')
      .should('be.disabled');
  });

  it("BA-007 Tentativa de criar uma conta informando um código bancário com mais de 9 caracteres", function () {
    cy.visit('/personal');

    cy.get('[data-test="sidenav-bankaccounts"] > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('[data-test="bankaccount-new"]').click();
    cy.get('#bankaccount-bankName-input').type('Teste bank');
    cy.get('#bankaccount-routingNumber-input').type('1234567890');
    cy.get('#bankaccount-accountNumber-input').type('98765432100')

    cy.location("pathname").should("equal", "/bankaccounts/new");
    cy.get('#bankaccount-routingNumber-input-helper-text')
      .should('be.visible')
      .and('contain', 'Must contain a valid routing number');

    cy.get('[data-test="bankaccount-submit"]')
      .should('be.disabled');
  });

  it("BA-008 Tentativa de criar uma conta informando um número de conta com menos de 9 caracteres", function () {
    cy.visit('/personal');

    cy.get('[data-test="sidenav-bankaccounts"] > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('[data-test="bankaccount-new"]').click();
    cy.get('#bankaccount-bankName-input').type('Teste bank');
    cy.get('#bankaccount-routingNumber-input').type('123456789');
    cy.get('#bankaccount-accountNumber-input').type('98767')

    cy.location("pathname").should("equal", "/bankaccounts/new");
    cy.get('#bankaccount-accountNumber-input-helper-text')
      .should('be.visible')
      .and('contain', 'Must contain at least 9 digits');

    cy.get('[data-test="bankaccount-submit"]')
      .should('be.disabled');
  });

  it("BA-009 Tentativa de criar uma conta informando informando um número de conta com mais de 12 caracteres", function () {
    cy.visit('/personal');

    cy.get('[data-test="sidenav-bankaccounts"] > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('[data-test="bankaccount-new"]').click();
    cy.get('#bankaccount-bankName-input').type('Teste bank');
    cy.get('#bankaccount-routingNumber-input').type('123456789');
    cy.get('#bankaccount-accountNumber-input').type('98765432109876543210')

    cy.location("pathname").should("equal", "/bankaccounts/new");
    cy.get('#bankaccount-accountNumber-input-helper-text')
      .should('be.visible')
      .and('contain', 'Must contain no more than 12 digits');

    cy.get('[data-test="bankaccount-submit"]')
      .should('be.disabled');
  });

  it("BA-010 Deletar uma conta", function () {
    cy.visit('/personal');

    cy.get('[data-test="sidenav-bankaccounts"] > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('[data-test="bankaccount-new"]').click();
    cy.get('#bankaccount-bankName-input').type('Teste bank');
    cy.get('#bankaccount-routingNumber-input').type('123456789');
    cy.get('#bankaccount-accountNumber-input').type('9876543210');
    cy.get('[data-test="bankaccount-submit"]').click();

    cy.location("pathname").should("equal", "/bankaccounts");
    cy.get('[data-test="bankaccount-list"]')
      .should('contain', 'Teste bank');

    cy.get('[data-test="bankaccount-delete"]').eq(1).click();
    cy.get('[data-test="bankaccount-list"]')
      .should('contain', 'Teste bank (Deleted)');
  });
});