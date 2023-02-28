/// <reference types="cypress" />
import "cypress-localstorage-commands";

describe('Bingo', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('FRONTEND_URL'))
    })

    it('should see login page', () => {

        cy.contains('This is the tale of...');
        cy.location('pathname').should('include', 'login')
        cy.get('[data-test=new-user-button]').should('have.text', 'Play')

    })

    it('should be able to login', () => {

        cy.intercept('POST', '**/auth', {fixture: 'login.json'}).as('newUser')
        const newItem = 'Feed';
        cy.get('[data-test=new-user-field]').type(`${newItem}{enter}`)
        cy.wait('@newUser')

        cy.location('pathname').should('include', '/')
        cy.contains('Bingo');
        cy.then(() => cy.log({...localStorage}))
        cy.getAllLocalStorage().should((ls) => {
            expect(JSON.parse(localStorage.getItem('state')).user_id).to.eq('HashID')
        })
        cy.saveLocalStorage()
    })

    it('can create new board', () => {
        cy.restoreLocalStorage()
        cy.intercept('POST', '**/board', {fixture: 'board.json'}).as('newBoard')

        cy.get('[data-test=new-board]').click()
        cy.wait('@newBoard')
        cy.saveLocalStorage()
    })

    it('can persist board', () => {
        cy.restoreLocalStorage()

        cy.intercept('GET', '**/board/**', {fixture: 'easy_board.json'}).as('fetchBoard')

        cy.wait('@fetchBoard')
        cy.get('[data-test=cell-1]').should('contain', '1')
        cy.get('[data-test=cell-FREE]').should('contain', 'FREE')
        cy.get('[data-test=cell-24]').should('contain', '24')

    });

    it('win with perfect score', () => {
        cy.restoreLocalStorage()

        cy.intercept('GET', '**/board/**', {fixture: 'easy_board.json'}).as('fetchBoard')
        cy.intercept('GET', '**/board/over/**', '{"score": "75"}').as('overBoard')
        cy.intercept('PUT', '**/board/**', '1').as('updateBoard')

        let interceptCount = 0;

        cy.intercept('GET', '**/board/next/**', (req) => {
            interceptCount += 1
            req.reply(200, `${interceptCount}`)

        }).as('newNumber');

        cy.wait('@fetchBoard')

        let nextNumberValue = 0;
        for (let i = 0; i < 24; i++) {
            cy.get('[data-test=new-number-button]').click()
            cy.wait('@newNumber')
            cy.get('[data-test="new-number"]').then(($value) => {
                nextNumberValue = $value.text()
            })

            cy.then(() => {
                cy.log(nextNumberValue)
                cy.get('[data-test=cell-' + nextNumberValue + ']').click();
            })
            cy.wait('@updateBoard')
        }

        cy.wait('@overBoard')
        cy.contains('Game Over: 75 points')
    })

    it('lose', () => {

        cy.restoreLocalStorage()

        let interceptCount = 0;
        cy.intercept('GET', '**/board/**', {fixture: 'easy_board.json'}).as('fetchBoard')
        cy.intercept('PUT', '**/board/**', '1').as('updateBoard')
        cy.intercept('GET', '**/board/next/**', (req) => {
            interceptCount += 1
            if(interceptCount > 100){
                interceptCount = '';
            }
            req.reply(200, `${interceptCount}`)

        }).as('newNumber');

        cy.wait('@fetchBoard')

        for (let i = 0; i <= 100; i++) {
            cy.get('[data-test=new-number-button]').click()
            cy.wait('@newNumber')
        }
        cy.wait('@updateBoard')
        cy.contains('Game Over: You Lost!')
    })

    it('signout', () => {
        cy.visit(`${Cypress.env('FRONTEND_URL')}signout`)

        cy.getAllLocalStorage().should((ls) => {
            expect(JSON.parse(localStorage.getItem('state'))).to.eq(null)
        })
    })

    it('visit leaderboard', () => {
        cy.visit(`${Cypress.env('FRONTEND_URL')}leaderboard`)

        cy.intercept('GET', '**/leaderboard', {fixture: 'leaderboard.json'}).as('fetchLeaderboard')
        cy.wait('@fetchLeaderboard')
        cy.contains('Score');
    })
})