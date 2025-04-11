import {getStartedBtn} from "../../support/mapping/landing.page"
import { ownerAndOperatorRole, renterRole, brokerRole } from "../../support/mapping/getStarted.page"
import { howManyUnitsHeader, backButton } from "../../support/mapping/ownerAndOperator.page"
import { renterForm, backBtn } from "../../support/mapping/renter.page"
import { btnBack, brokerForm } from "../../support/mapping/broker.page"

describe('Testing get started flow', () => {
    beforeEach(()=> {
        cy.visit("https://www.theguarantors.com/")
        cy.get(getStartedBtn).first().click()
    })

    it('Validate roles options butons', () => {
        cy.get(ownerAndOperatorRole).should('be.visible')
        cy.get(renterRole).should('be.visible')
        cy.get(brokerRole).should('be.visible')
    })

})

describe('Testing get started Back button flow', () => {
    beforeEach(() => {
        cy.visit('https://www.theguarantors.com/get-started')
    })

    it('[BUG] - Validate Owner & Operator Back button flow', () => {
        // bug in this scenario
        cy.get(ownerAndOperatorRole).click()
        cy.origin('https://propertymanager.theguarantors.com',
            {args:{howManyUnitsHeader, backButton}},
            ({howManyUnitsHeader, backButton}) => {
            cy.get(howManyUnitsHeader).should('be.visible')
            cy.get(backButton).click()
            cy.url().should('include', 'https://www.theguarantors.com/get-started')
        })
    })

    it('Validate Renter Back button flow', () => {
        cy.get(renterRole).click()
        cy.origin('https://qualify.theguarantors.com/',
            {args:{renterForm, backBtn}},
            ({renterForm, backBtn}) => {
            cy.get(renterForm).should('be.visible')
            cy.get(backBtn).click()
        })
        cy.url().should('include', 'https://www.theguarantors.com/get-started')
    })

    it('Validate Broker Back button flow', () => {
        cy.get(brokerRole).invoke('removeAttr', 'target') // the invoke won't let the button open a new tab
        .click()
        cy.origin('https://propertymanager.theguarantors.com/',
            {args:{btnBack, brokerForm}},
            ({btnBack, brokerForm}) => {
            cy.get(brokerForm).should('be.visible')
            cy.get(btnBack).click()
            cy.get(btnBack).click()
        })
        cy.url().should('include', 'https://www.theguarantors.com/get-started')
    })

})