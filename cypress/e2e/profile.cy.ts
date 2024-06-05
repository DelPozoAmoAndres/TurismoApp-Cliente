describe('Editar Perfil', () => {
    beforeEach(() => {
        cy.visit('localhost:3000');
        cy.contains('ion-button', 'Cuenta').click();
        cy.get('input[type="email"]').type('test123@test123.es');
        cy.get('input[type="password"]').type('12345678');
        cy.get('ion-button[type="submit"]').click();
        cy.contains('ion-button', 'Área personal').click();
    });

    it('debería mostrar la información del perfil correctamente', () => {
        cy.contains('test123@test123.es');
    });

    it('debería permitir editar la información del perfil', () => {
        cy.get('ion-button[id="665e6c4259720efa4b7aedd7"]').click();
        cy.get('input[placeholder="Introduzca nombre y apellidos"]').clear().type('hola' + Math.random());
        cy.contains('Guardar cambios').click();
        cy.get('ion-toast[message="Cambios guardados correctamente"]').should('exist');

    });

    it('debería permitir cambiar la contraseña', () => {
        cy.get('ion-button[id="password-change-modal"]').click();
        cy.get('input[placeholder="Introduzca tu contraseña actual"]').type('12345678');
        cy.get('input[placeholder="Introduzca una contraseña"]').type('12345678');
        cy.get('input[placeholder="Introduzca la nueva contraseña de nuevo"]').type('12345678');
        cy.get('ion-button').last().click();
        cy.get('ion-toast[message="Contraseña cambiada correctamente"]').should('exist');
    });

    // Puedes agregar más pruebas según tus necesidades

});