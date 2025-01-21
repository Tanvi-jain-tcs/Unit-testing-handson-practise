import { html, fixture, expect } from '@open-wc/testing';
import '../loan-application.js';

describe('LoanApplication', () => {
    let el;
    before(async () => {
        el = await fixture(html`<loan-application></loan-application>`);
    });

    it('should check component accessibility', () => {
        expect(el).to.be.accessible;
    });

    it('should check for counter value', () => {
        expect(el.counter).to.equal(5);
    })
});
