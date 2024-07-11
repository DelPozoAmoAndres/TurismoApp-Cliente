describe('Búsqueda de Actividades por Nombre', () => {
    beforeEach(() => {
        cy.visit('localhost:3000');
    });

    it('Filtra actividades por nombre', () => {
        cy.get('ion-button[router-link="/buscar"]').click();
        cy.wait(3000);
        cy.get('input[class="searchbar-input sc-ion-searchbar-ios"]').should('be.visible');
        cy.get('input[class="searchbar-input sc-ion-searchbar-ios"]').type('Ruta');
        cy.contains('Ruta del Cares').should('be.visible');
    });
});


describe('Filtros específicos', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/buscar');
    });

    it('Filtra actividades por precio máximo', () => {
        cy.get('ion-range')
            .then($slider => {
                const sliderBounds = $slider[0].getBoundingClientRect();
                const sliderX = sliderBounds.left + (sliderBounds.width / 2);
                const sliderY = sliderBounds.top + (sliderBounds.height / 2);
                const newSliderX = sliderX - 100;

                cy.wrap($slider)
                    .trigger('mousedown', { which: 1, clientX: sliderX, clientY: sliderY })
                    .trigger('mousemove', { which: 1, clientX: newSliderX, clientY: sliderY })
                    .trigger('mouseup', { force: true });

                cy.get('#ion-r-0').should('have.attr', 'value').and('not.eq', '123');
            });
        cy.contains('Añadir filtros').click();
        cy.get('ion-toast[message="Aplicados nuevos filtros"]').should('exist');
    });

    it('Filtra actividades por número de personas', () => {
        cy.get('ion-icon[style="background: var(--ion-color-primary);"]').first().click();
        cy.contains('Añadir filtros').click();
        cy.get('ion-toast[message="Aplicados nuevos filtros"]').should('exist');
    });

    it('Filtra actividades por puntuación mínima', () => {
        cy.get('ion-icon[style="background: var(--ion-color-primary);"]').last().click();
        cy.contains('Añadir filtros').click();
        cy.get('ion-toast[message="Aplicados nuevos filtros"]').should('exist');
    });

    it('Filtra actividades por idioma', () => {
        cy.get('ion-checkbox').last().click();
        cy.contains('Añadir filtros').click();
        cy.get('ion-toast[message="Aplicados nuevos filtros"]').should('exist');
    });

    it('Elimina los filtros aplicados', () => {
        cy.get('ion-checkbox').last().click();
        cy.contains('Añadir filtros').click();
        cy.get('ion-toast[message="Aplicados nuevos filtros"]').should('exist');
        cy.contains('ion-button', 'Eliminar filtros').click();
        cy.get('ion-toast[message="Eliminados todos los filtros"]').should('exist');
    });
});


