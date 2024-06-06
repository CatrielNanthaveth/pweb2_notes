describe('Make login actions', () => {

    beforeEach(() => {
        cy.visit('https://notes-front-iota.vercel.app/login');
    });

    it('Log in successfully', () => {
        cy.get('input[type="email"]').type('admin@notes.com');
        cy.get('input[type="password"]').type('antezana247');
        cy.get('button').contains('Log in').click();
        cy.contains('Welcome!');
    })

    it('Log in unsuccessfully', () => {
        cy.get('input[type="email"]').type('no-pass@notes.com');
        cy.get('input[type="password"]').type('antezana247');
        cy.get('button').contains('Log in').click();
        cy.contains('Error');
    })
})