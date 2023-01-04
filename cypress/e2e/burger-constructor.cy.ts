/* eslint-disable no-undef, testing-library/await-async-utils */
describe('Проверка конструктора бургеров', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');

        cy.setCookie('accessToken', 'testAccessToken');
        cy.setCookie('refreshToken', 'testRefreshToken');

        cy.visit('http://localhost:3000/');
        cy.viewport(2560, 1440);
    });

    afterEach(() => {
        cy.clearCookies();
    });

    it('Проверка корректной отрисовки загруженных ингредиентов', () => {
        cy.wait('@getIngredients').its('response.body.data').then((data) => {
            data.forEach((item) => {
                cy.contains('[class^="burger-ingredients_component"]', item.name).should('exist');
            });
        });
    });

    it('Проверка открытия модального окна ингредиента', () => {
        cy.wait('@getIngredients').then(() => {
            cy.get('[class^="burger-ingredients-item_component"]').each((element) => {
                const name = element.find('[class^="burger-ingredients-item_name"]').text();

                cy.get(element).find('[class^="burger-ingredients-item_link"]').click();

                cy.get('[class^="ingredient-details_component"]')
                    .find('[class^="ingredient-details_name"]').should('have.text', name);

                cy.get('[class^="modal_component"]').find('[class^="modal_close"]').click();

                cy.get('[class^="modal_component"]').should('not.exist');
            });
        });
    });

    it('Проверка перемещения ингредиентов в конструктор и оформления заказа', () => {
        cy.wait('@getIngredients').then(() => {
            cy.get('[class^="burger-constructor_component"]').find('.panel').as('panel');

            cy.get('[class^="burger-ingredients-item_component"]').each((element) => {
                const name = element.find('[class^="burger-ingredients-item_name"]').text();
                const category = element.parents('[class^="burger-ingredients_category"]');
                const categoryName = category.find('h2').text();

                cy.get(element).trigger('dragstart');
                cy.get('@panel').trigger('drop');

                if (categoryName === 'Булки') {
                    cy.get('@panel').find('.constructor-element_pos_top')
                        .find('.constructor-element__text').should('have.text', `${name} (верх)`);
                    cy.get('@panel').find('.constructor-element_pos_bottom')
                        .find('.constructor-element__text').should('have.text', `${name} (низ)`);
                } else {
                    cy.get('@panel').find('[class^="burger-constructor-item_component"]').last()
                        .find('.constructor-element__text').should('have.text', name);
                }
            });

            cy.get('[class^="burger-constructor_total"]').find('button')
                .should('not.be.disabled').click();

            cy.wait('@postOrder').then(() => {
                cy.get('[class^="order-details_component"]')
                    .find('[class^="order-details_number"]').should('have.text', '25200');

                cy.get('[class^="modal_component"]').find('[class^="modal_close"]').click();

                cy.get('[class^="modal_component"]').should('not.exist');
            });
        });
    });
});