
import { User } from "../../../src/models";

const baseUrl = 'http://localhost:3000'

describe("Cadastro de usuário", function () {
  before(() => {
    cy.task("db:seed")

    cy.readFile('data/database-seed.json').then((data) => {
      const randomIndex = Math.floor(Math.random() * data.users.length)
      const randomUser = data.users[randomIndex]

      Cypress.env('user', randomUser)
    });
  });

  it("SU-001 Criar um cadastro válido", function () {
    cy.visit(`${baseUrl}/signup`);
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Williams');
    cy.get('#username').type('WillJohn29');
    cy.get('#password').type('JW29');
    cy.get('#confirmPassword').type('JW29');
    cy.get('[data-test="signup-submit"]').click();
    cy.location('pathname').should('equal', '/signin');
  });

  it("SU-002 Tentativa de cadastro sem preencher o campo Name", function () {
    cy.visit(`${baseUrl}/signup`);
    cy.get('#firstName').click();
    cy.get('#lastName').type('Williams');
    cy.get('#username').type('WillJohn29');
    cy.get('#password').type('JW29');
    cy.get('#confirmPassword').type('JW29');
    cy.get('#firstName-helper-text').should('be.visible').and('contain', 'First Name is required');
    cy.get('[data-test="signup-submit"]').should('be.disabled');
  });

  it("SU-003 Tentativa de cadastro sem preencher o campo Last Name", function () {
    cy.visit(`${baseUrl}/signup`);
    cy.get('#firstName').type('John');
    cy.get('#lastName').click();
    cy.get('#username').type('WillJohn29');
    cy.get('#password').type('JW29');
    cy.get('#confirmPassword').type('JW29');
    cy.get('#lastName-helper-text').should('be.visible').and('contain', 'Last Name is required');
    cy.get('[data-test="signup-submit"]').should('be.disabled');
  });

  it("SU-004 Tentativa de cadastro sem preencher o campo Username", function () {
    cy.visit(`${baseUrl}/signup`);
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Williams');
    cy.get('#username').click();
    cy.get('#password').type('JW29');
    cy.get('#confirmPassword').type('JW29');
    cy.get('#username-helper-text').should('be.visible').and('contain', 'Username is required');
    cy.get('[data-test="signup-submit"]').should('be.disabled');
  });

  it("SU-005 Tentativa de cadastro sem preencher o campo Password", function () {
    cy.visit(`${baseUrl}/signup`);
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Williams');
    cy.get('#username').type('WillJohn29');
    cy.get('#password').click();
    cy.get('#confirmPassword').type('JW29');
    cy.get('#password-helper-text').should('be.visible').and('contain', 'Enter your password');
    cy.get('#confirmPassword-helper-text').should('be.visible').and('contain', 'Password does not match');
    cy.get('[data-test="signup-submit"]').should('be.disabled');
  });

  it("SU-006 Tentativa de cadastro sem preencher o campo Confirm password", function () {
    cy.visit(`${baseUrl}/signup`);
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Williams');
    cy.get('#username').type('WillJohn29');
    cy.get('#confirmPassword').click();
    cy.get('#password').type('JW29');
    cy.get('#confirmPassword-helper-text').should('be.visible').and('contain', 'Confirm your password');
    cy.get('[data-test="signup-submit"]').should('be.disabled');
  });

  it("SU-007 Tentativa de cadastro sem preencher nenhum campo", function () {
    cy.visit(`${baseUrl}/signup`);
    cy.get('#firstName').click();
    cy.get('#lastName').click();
    cy.get('#username').click();
    cy.get('#password').click();
    cy.get('#confirmPassword').click();
    cy.get('#password').click();
    cy.get('#firstName-helper-text').should('be.visible').and('contain', 'First Name is required');
    cy.get('#lastName-helper-text').should('be.visible').and('contain', 'Last Name is required');
    cy.get('#username-helper-text').should('be.visible').and('contain', 'Username is required');
    cy.get('#password-helper-text').should('be.visible').and('contain', 'Enter your password');
    cy.get('#confirmPassword-helper-text').should('be.visible').and('contain', 'Confirm your password');
    cy.get('[data-test="signup-submit"]').should('be.disabled');
  });

  it("SU-008 Informar senha com menos de 4 dígitos", function () {
    cy.visit(`${baseUrl}/signup`);
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Williams');
    cy.get('#username').type('WillJohn29');
    cy.get('#password').type('J29');
    cy.get('#confirmPassword').type('J29')
    cy.get('#password-helper-text').should('be.visible').and('contain', 'Password must contain at least 4 characters');
    cy.get('[data-test="signup-submit"]').should('be.disabled');
  });

  it("SU-009 Informar uma senha diferente no campo de confirmação de senha", function () {
    cy.visit(`${baseUrl}/signup`);
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Williams');
    cy.get('#username').type('WillJohn29');
    cy.get('#password').type('JW29');
    cy.get('#confirmPassword').type('JW2900')
    cy.get('#confirmPassword-helper-text').should('be.visible').and('contain', 'Password does not match');
    cy.get('[data-test="signup-submit"]').should('be.disabled');
  });

  it("SU-010 Cadastrar um usuário já existente", function () {
    const user = Cypress.env('user')

    cy.visit(`${baseUrl}/signup`);
    cy.intercept('POST', '/users', {
      statusCode: 409,
      body: { message: 'Username already exists' }
    }).as('signupError');
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Williams');
    cy.get('#username').type(user.username);
    cy.get('#password').type('JW29');
    cy.get('#confirmPassword').type('JW29');
    cy.get('[data-test="signup-submit"]').click();
    cy.wait('@signupError').its('response.statusCode').should('eq', 409);
  });

  it("SU-011 Validar direcionamento para a página de login", function () {
    cy.visit(`${baseUrl}/signup`);
    cy.get('.MuiGrid-root > a').click();
    cy.url().should('include', '/signin');
    cy.location('pathname').should('equal', '/signin');

  });

});
