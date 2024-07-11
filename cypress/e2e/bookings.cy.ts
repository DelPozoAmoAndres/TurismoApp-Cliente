const getIframe = () => {
    return cy.get('div[class="StripeElement"]').find('div').find('iframe').its('body').then(cy.wrap)
}

describe('Book policy accept', () => {
    it('passes', () => {
        cy.visit('localhost:3000')
        cy.contains('ion-button', 'Cuenta').click();

        cy.get('input[type="email"]').type('test123@test123.es');
        cy.get('input[type="password"]').type('12345678');
        cy.get('ion-button[type="submit"]').click();
        cy.get('ion-toast[message="Inicio de sesión correcto."]').should('exist');

        cy.get('ion-button[router-link="/activity/663268eecf57eec9a7bbefcb"]').click();
        cy.contains('ion-button', "Ver disponibilidad").click();
        cy.get('ion-icon').last().click();

        cy.contains('ion-button', "Español")
        cy.contains('ion-button', "Reservar").click()
        cy.get('ion-checkbox').click()
        cy.get('ion-button[type="submit"]').should('not.be.disabled')
    })
})
describe('Book policy not accepted', () => {
    it('passes', () => {
        cy.visit('localhost:3000')
        cy.contains('ion-button', 'Cuenta').click();

        cy.get('input[type="email"]').type('test123@test123.es');
        cy.get('input[type="password"]').type('12345678');
        cy.get('ion-button[type="submit"]').click();
        cy.get('ion-toast[message="Inicio de sesión correcto."]').should('exist');

        cy.get('ion-button[router-link="/activity/663268eecf57eec9a7bbefcb"]').click();
        cy.contains('ion-button', "Ver disponibilidad").click();
        cy.get('ion-icon').last().click();

        cy.contains('ion-button', "Español")
        cy.contains('ion-button', "Reservar").click()
        cy.get('ion-button[type="submit"]').should('not.be.enabled')
    })
})
