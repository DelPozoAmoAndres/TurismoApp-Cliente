describe('Nombre y apellidos error', () => {
    it('passes', () => {
        cy.visit('localhost:3000')
        cy.contains('ion-button', 'Cuenta').click();

        cy.contains('ion-text', 'Regístrate aquí').click();
        cy.wait(1000);

        cy.get('input[placeholder="Introduzca nombre y apellidos"]').type('Test');
        cy.get('input[placeholder="Introduzca email"]').type('test');
        cy.contains('div', "Debe introducir mínimo 8 caracteres").should('exist');
    })
})

describe('Contraseña error', () => {
    it('passes', () => {
        cy.visit('localhost:3000')
        cy.contains('ion-button', 'Cuenta').click();

        cy.contains('ion-text', 'Regístrate aquí').click();
        cy.wait(1000);
        cy.get('input[placeholder="Introduzca una contraseña"]').type('1234');
        cy.get('input[placeholder="Introduzca la nueva contraseña de nuevo"]').type('12345678');
        cy.contains('div', "Debe introducir mínimo 8 caracteres").should('exist');
    })
})

describe('Contraseña no coincide error', () => {
    it('passes', () => {
        cy.visit('localhost:3000')
        cy.contains('ion-button', 'Cuenta').click();

        cy.contains('ion-text', 'Regístrate aquí').click();
        cy.wait(1000);

        cy.get('input[placeholder="Introduzca una contraseña"]').type('12345678');
        cy.get('input[placeholder="Introduzca la nueva contraseña de nuevo"]').type('123456789');
        cy.contains('div', "Las contraseñas no coinciden").should('exist');
    })
})

describe('Correct signup testing all error messages', () => {
    it('passes', () => {
        cy.visit('localhost:3000')
        cy.contains('ion-button', 'Cuenta').click();

        cy.contains('ion-text', 'Regístrate aquí').click();
        cy.wait(1000);
        cy.get('input[placeholder="Introduzca nombre y apellidos"]').type('Test');
        cy.get('input[placeholder="Introduzca email"]').type('test');
        cy.contains('div', "Debe introducir mínimo 8 caracteres").should('exist');
        cy.get('input[placeholder="Introduzca nombre y apellidos"]').type(' Test Test');
        cy.contains('div', "Debe introducir un correo electrónico válido").should('exist');
        cy.get('input[placeholder="Introduzca email"]').type('@test.es');
        cy.get('input[placeholder="Introduzca una contraseña"]').type('1234');
        cy.get('input[placeholder="Introduzca la nueva contraseña de nuevo"]').type('12345678');
        cy.contains('div', "Debe introducir mínimo 8 caracteres").should('exist');
        cy.contains('div', "Las contraseñas no coinciden").should('exist');
        cy.get('input[placeholder="Introduzca una contraseña"]').type('12345678');
        cy.get('input[placeholder="Introduzca la nueva contraseña de nuevo"]').type('12345678');
        cy.contains('ion-button', "Registrarse").click();
        cy.get('ion-toast[message="Usuario registrado correctamente"]').should('exist');
        cy.wait(1000);
        cy.visit('localhost:3000/perfil');
        cy.contains('ion-button', 'Eliminar cuenta').click();
        cy.get('button[class="alert-button ion-focusable ion-activatable alert-button-role-accept sc-ion-alert-md"]').click();
        cy.get('ion-toast[message="Cuenta eliminada correctamente"]').should('exist');
    })
})