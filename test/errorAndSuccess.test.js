import { html, fixture, expect } from '@open-wc/testing';
import sinon, { stub } from 'sinon';
import '../src/SuccessAndError/Success.js';
import '../src/SuccessAndError/Error.js';
import { Router } from '@vaadin/router';

describe('Success window ', () => {
    let el;

    before(async () => {
        el = await fixture(html`<loan-success></loan-success>`);
    });

    it('check home button click', () => {
        const routerSpy = sinon.spy(Router, 'go')
        const homeBtn = el.shadowRoot?.querySelector('.home-btn');
        homeBtn.click();
        expect(routerSpy).to.have.called;
        expect(routerSpy.firstCall.args[0]).to.equal('/');
        routerSpy.restore();
    });

});

describe('error window', () => {
    let el;

    before(async () => {
        el = await fixture(html`<loan-error></loan-error>`);
    });

    it('check home button click', () => {
        const routerSpy = sinon.spy(Router, 'go')
        const homeBtn = el.shadowRoot?.querySelector('.home-btn');
        homeBtn.click();
        expect(routerSpy).to.have.called;
        expect(routerSpy.firstCall.args[0]).to.equal('/');
        routerSpy.restore();
    });
  });
