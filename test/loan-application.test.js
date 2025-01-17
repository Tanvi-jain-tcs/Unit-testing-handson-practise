import { html, fixture, expect } from '@open-wc/testing';
import sinon, { stub } from 'sinon';
import '../loan-application.js';

describe('LoanApplication', () => {
    let el;
    before(async () => {
        el = await fixture(html`<loan-application></loan-application>`);
    });

    it('check for counter value', () => {
        expect(el.counter).to.equal(5);
    })
});
