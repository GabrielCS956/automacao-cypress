const baseUrl = 'http://localhost:3000'

describe('Login de usuário', () => {
  before(() => {
// Comando para popular a base de usuários
    cy.task("db:seed")
//Ler o arquivo com os dados de usuários e selecionar um aleatóriamente
    cy.readFile('data/database-seed.json').then((data) => {
      const randomIndex = Math.floor(Math.random() * data.users.length)
      const randomUser = data.users[randomIndex]

      Cypress.env('user', randomUser)
    });
  });

  it("SI-001 Login realizado com cadastro válido", () => {
    const user = Cypress.env('user')

    cy.visit(`${baseUrl}/signin`)

    cy.get('#username').type(user.username)
    cy.get('#password').type('s3cret')
    cy.get('[data-test="signin-submit"]').click()

    cy.location('pathname').should('equal', '/')
    cy.get('[data-test="sidenav-username"]')
      .should('be.visible')
      .and('contain', `@${user.username}`)
  });

  it("SI-002 Tentativa de login com usuário inválido", function () {
    cy.visit(`${baseUrl}/signin`);

    cy.get('#username').type('Invalid.user');
    cy.get('#password').type('s3cret');
    cy.get('[data-test="signin-submit"]').click();
    cy.get('.MuiAlert-message')
      .should('be.visible')
      .and('contain', 'Username or password is invalid');
  });

  it("SI-003 Tentativa de login com senha incorreta", function () {
    const user = Cypress.env('user');

    cy.visit(`${baseUrl}/signin`);

    cy.get('#username').type(user.username);
    cy.get('#password').type('invalidPassword');
    cy.get('[data-test="signin-submit"]').click();
    cy.get('.MuiAlert-message')
      .should('be.visible')
      .and('contain', 'Username or password is invalid');
  });

  it("SI-004 Tentativa de login sem preencher o usuário", function () {
    cy.visit(`${baseUrl}/signin`);

    cy.get('#username').click();
    cy.get('#password').type('s3cret');
    cy.get('#username-helper-text')
      .should('be.visible')
      .and('contain', 'Username is required');
    cy.get('[data-test="signin-submit"]').should('be.disabled');
  });

  it("SI-005 Tentativa de login sem preencher a senha", function () {
    const user = Cypress.env('user');

    cy.visit(`${baseUrl}/signin`);

    cy.get('#username').type(user.username);
    cy.get('[data-test="signin-submit"]').should('be.disabled');
  });

  it("SI-006 Validar funcionamento flag Remember me", function () {
    const user = Cypress.env('user');

    cy.visit(`${baseUrl}/signin`);

    cy.get('#username').type(user.username);
    cy.get('#password').type('s3cret');
    cy.get('.PrivateSwitchBase-input').click();
    cy.get('[data-test="signin-submit"]').click();

    cy.location("pathname").should("equal", "/");
    cy.getCookie("connect.sid").should("have.property", "expiry");

    cy.get('[data-test="sidenav-username"]').should('contain', `@${user.username}`);

    cy.reload();

    cy.location("pathname").should("not.equal", "/signin");
    cy.location("pathname").should("equal", "/");

    cy.get('[data-test="sidenav-username"]')
      .should('be.visible')
      .and('contain', `@${user.username}`);

  });

  it("SI-007 Validar direcionamento para a página de criação de cadastro", function () {
    cy.visit(`${baseUrl}/signin`);
    cy.get('[data-test="signup"]').click();
    cy.url().should('include', '/signup');
    cy.location('pathname').should('equal', '/signup');
  });

});