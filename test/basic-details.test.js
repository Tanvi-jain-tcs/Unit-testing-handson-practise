import { html, fixture, expect } from '@open-wc/testing';
import sinon, { stub } from 'sinon';
import '../src/LoanBasicDetails/BasicDetails.js';
import { Router } from '@vaadin/router';

describe('Basic details', () => {
  let el;
  before(async () => {
    el = await fixture(html`<basic-details></basic-details>`);
  });
  
  it('check initial values', () => {
    expect(el.amount).to.equal(10000);
    expect(el.range).to.equal(2);
    expect(el.emiCalc).to.equal(0);
  });

  it("check previous button click", () => {
    const routerSpy = sinon.spy(Router, 'go');
    const prevBtn = el.shadowRoot?.querySelector('.btn-previous');
    prevBtn.click();
    expect(routerSpy).to.have.called;
    expect(routerSpy.firstCall.args[0]).to.equal('/')
    routerSpy.restore();
  });

  it('check amount renders in words', () => {
    const spy = sinon.spy(el, '_numToWord');
    const amtInput = el.shadowRoot.querySelector('.amount');
    el._numToWord();
    amtInput.value = 10000;
    expect(spy).to.have.called
    expect(el.shadowRoot.querySelector('#word').innerHTML.trim()).to.equal('ten thousand');
    spy.restore();
  });

  it('check next button click - success post request with the inputs', ()=>{
    const spy = sinon.spy(window, 'fetch');
    el.shadowRoot.querySelector('.type').value = 'Home Loan';
    el.shadowRoot.querySelector('.amount').value = '200000';
    el.shadowRoot.querySelector('.period').value = '10';
    const nextBtn = el.shadowRoot?.querySelector('.btn-next');
    nextBtn.click();
    expect(spy.args[0][1].method).to.equal('POST');
    expect(spy.args[0][1].body).deep.equal('{"name":"Home Loan","amount":"200000","period":"10"}');
    expect(spy).to.have.called;
    spy.restore();
  });

  it('check next button click - error post request - amount is less than 10K', ()=>{
    const spy = sinon.spy(window, 'fetch');
    el.shadowRoot.querySelector('.type').value = 'Home Loan';
    el.shadowRoot.querySelector('.amount').value = '8000';
    el.shadowRoot.querySelector('.period').value = '10';
    const nextBtn = el.shadowRoot?.querySelector('.btn-next');
    nextBtn.click();
    expect([...el.shadowRoot.querySelector('.amount').classList].indexOf('e-handle')).to.not.equal(-1);
    expect(spy).to.not.have.called;
    spy.restore();
  });
});
