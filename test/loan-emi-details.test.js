import { html, fixture, expect } from '@open-wc/testing';
import sinon, { stub } from 'sinon';
import '../src/LoanEMIDetails/LoanEMIDetails.js';
import { Router } from '@vaadin/router';
import { localize } from '@lion/localize';

describe('Loan EMI details', () => {
    let el, routerSpy;
    beforeEach(async () => {
        el = await fixture(html`<loanemi-details></loanemi-details>`);
        routerSpy = sinon.spy(Router, 'go');
    })
    afterEach(async () => {
        routerSpy.restore();
    })

    it('should check component accessibility', () => {
        expect(el).to.be.accessible;
    });

    it('should check heading', () => {
        const heading = el.shadowRoot.querySelector('h2');
        expect(heading).to.be.accessible;
        expect(heading.innerText).to.equal('EMI Details');
    });

    it('should check button', () => {
        const button = el.shadowRoot.querySelectorAll('lion-button');
        expect(button).to.be.accessible;
        expect(button.length).to.equal(2);
    });

    it('should check component heading', async () => {
        const h2 = el.shadowRoot.querySelector('h2');
        expect(h2).to.exist;
        expect(h2.textContent).to.equal('EMI Details');
    });

    it('check cancel button click', async () => {
        const cancelBtn = el.shadowRoot?.querySelector('.cancel-btn');
        cancelBtn.click();
        expect(routerSpy).to.have.called;
        expect(routerSpy.firstCall.args[0]).to.equal('/details')
    });

    it('check continue button click', async () => {
        const continueBtn = el.shadowRoot?.querySelector('.continue-btn');
        continueBtn.click();
        expect(routerSpy).to.have.called;
        expect(routerSpy.firstCall.args[0]).to.equal('/customer')
    });
});