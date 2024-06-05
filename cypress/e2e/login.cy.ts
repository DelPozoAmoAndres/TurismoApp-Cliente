describe('Empty email and password login', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
    cy.contains('ion-button', 'Cuenta').click();
    cy.get('ion-button[type="submit"]').should('not.be.enabled');
  })
})

describe('Invalid email format login', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
    cy.contains('ion-button', 'Cuenta').click();

    cy.get('input[type="email"]').type('invalidemail');
    cy.get('input[type="password"]').type('12345678');
    cy.get('ion-button[type="submit"]').click();
    cy.get('ion-toast[message="Credenciales incorrectas."]').should('exist');
  })
})

describe('Incorrect password login', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
    cy.contains('ion-button', 'Cuenta').click();

    cy.get('input[type="email"]').type('test@test.es');
    cy.get('input[type="password"]').type('incorrectpassword');
    cy.get('ion-button[type="submit"]').click();
    cy.get('ion-toast[message="Credenciales incorrectas."]').should('exist');
  })
})

describe('Correct login', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
    cy.contains('ion-button', 'Cuenta').click();

    cy.get('input[type="email"]').type('test123@test123.es');
    cy.get('input[type="password"]').type('12345678');
    cy.get('ion-button[type="submit"]').click();
    cy.get('ion-toast[message="Inicio de sesión correcto."]').should('exist');
  })
})