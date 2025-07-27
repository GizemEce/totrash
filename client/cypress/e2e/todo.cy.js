// cypress/e2e/todo.cy.js

describe('Wastly Management - Full UI Flow', () => {
    it('shows login screen', () => {
        cy.visit('http://localhost:3000');
        cy.get('input[placeholder="Enter your email"]').should('exist');
        cy.get('input[placeholder="Enter your password"]').should('exist');
        cy.percySnapshot('Login screen');
    });

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('input[placeholder="Enter your email"]').type('test@rem.com');
        cy.get('input[placeholder="Enter your password"]').type('123456');
        cy.contains('LOGIN').click();
        cy.contains('Add Trash').should('exist');
    });

    it('adds a todo successfully', () => {
        const uniqueTask = `Trash ${Date.now()}`;
        cy.get('input[placeholder="What trash is on your mind?"]').type(uniqueTask);
        cy.contains('Add Trash').click();
        cy.contains(uniqueTask).should('exist');
        cy.percySnapshot('After adding todo');
    });


    it('shows error on empty todo submission', () => {
            cy.contains('Add Trash').click();
            cy.contains('Please type something!').should('exist');
            cy.percySnapshot('Show error message');
     });

    it('edits an existing todo', () => {
        const originalTask = `To be edited ${Date.now()}`;
        const updatedTask = `Updated item ${Date.now()}`;

        cy.get('input[placeholder="What trash is on your mind?"]').type(originalTask);
        cy.contains('Add Trash').click();
        cy.contains(originalTask).should('exist');

        cy.get('[data-testid^="edit-icon-"]').last().click();
        cy.get('input[placeholder="Edit trash"]').clear().type(updatedTask);
        cy.contains('Edit').click();

        cy.contains(updatedTask).should('exist');
        cy.contains(originalTask).should('not.exist')
        cy.percySnapshot('After editing todo');;
    });


    it('deletes an existing todo', () => {
        const deleteTask = `To be deleted ${Date.now()}`;
        
        cy.get('input[placeholder="What trash is on your mind?"]').type(deleteTask);
        cy.contains('Add Trash').click();
        cy.contains(deleteTask).should('exist');

        cy.get('[data-testid^="delete-icon-"]').last().click();
        cy.contains(deleteTask).should('not.exist');
        cy.percySnapshot('After deleting todo');
    });


});

afterEach(() => {
    cy.request('GET', 'http://localhost:5000/items').then((response) => {
        response.body.forEach(todo => {
        cy.request('DELETE', `http://localhost:5000/items/${todo.id}`);
        });
    });
});