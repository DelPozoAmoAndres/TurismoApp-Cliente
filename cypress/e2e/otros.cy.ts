describe('Cambiar idioma', () => {
    beforeEach(() => {
        cy.visit('localhost:3000');
    });

    it('Debería cambiar el idioma a inglés', () => {
        cy.get('ion-select').click();
        cy.get('ion-item').first().click();
        cy.get('ion-select').contains('English');
    });

    it('Debería cambiar el idioma a francés', () => {
        cy.get('ion-select').click();
        cy.get('ion-item').last().click();
        cy.get('ion-select').contains('Français');
    });
});

describe('Cambiar tema', () => {
    beforeEach(() => {
        cy.visit('localhost:3000');
    });
    it('Debería cambiar el tema', () => {
        cy.contains('ion-button', "Cambiar tema").click();
        cy.get('body').should('have.class', 'dark');
        cy.contains('ion-button', "Cambiar tema").click();
        cy.get('body').should('not.have.class', 'dark');
    });
});