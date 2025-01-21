import { html, fixture, expect } from '@open-wc/testing';
import sinon, { stub } from 'sinon';
import '../src/SuccessAndError/Success.js';
import '../src/SuccessAndError/Error.js';
import { Router } from '@vaadin/router';
import { localize } from '@lion/localize';

describe('Success window ', () => {
    let el;

    before(async () => {
        el = await fixture(html`<loan-success></loan-success>`);
    });

    it('should check component accessibility', () => {
        expect(el).to.be.accessible;
    });

    it('should check header label', () => {
        const heading = el.shadowRoot.querySelector('h2');
        const paragraph = el.shadowRoot.querySelector('p');
        expect(heading).to.be.accessible;
        expect(paragraph).to.be.accessible;
        expect(paragraph.innerText).to.equal(localize.msg('change-language:scsDesc'));
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

    it('should check component accessibility', () => {
        expect(el).to.be.accessible;
    });

    it('should check header label', () => {
        const heading = el.shadowRoot.querySelector('h2');
        const paragraph = el.shadowRoot.querySelector('p');
        expect(heading).to.be.accessible;
        expect(paragraph).to.be.accessible;
        expect(paragraph.innerText).to.equal(localize.msg('change-language:errDesc'));
    });

    it('should check home button click', () => {
        const routerSpy = sinon.spy(Router, 'go')
        const homeBtn = el.shadowRoot?.querySelector('.home-btn');
        homeBtn.click();
        expect(routerSpy).to.have.called;
        expect(routerSpy.firstCall.args[0]).to.equal('/');
        routerSpy.restore();
    });
  });
