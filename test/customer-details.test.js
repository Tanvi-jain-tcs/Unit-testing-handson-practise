import { html, fixture, expect } from '@open-wc/testing';
import sinon, { stub } from 'sinon';
import '../src/Customer/Customer-details.js';
import { Router } from '@vaadin/router';
import { localize } from '@lion/localize';

describe('customer details', () => {
  let el;
  before(async () => {
    el = await fixture(html`<customer-details></customer-details>`);
  })

  it('should check component accessibility', () => {
    const heading = el.shadowRoot.querySelector('h2');
    expect(el).to.be.accessible;
    expect(heading).to.be.accessible;
  });

  it('should check header label', () => {
    const heading = el.shadowRoot.querySelector('h2');
    expect(el).to.be.accessible;
    expect(heading.innerText).to.equal(localize.msg('change-language:customer'));
  });

  it('should check inputs', () => {
    const firstName = el.shadowRoot.getElementById('first_name');
    const lastName = el.shadowRoot.getElementById('last_name');
    const dob = el.shadowRoot.getElementById('dateof_birth');
    const email = el.shadowRoot.getElementById('email');
    const mobile = el.shadowRoot.getElementById('mobile_number');
    const monthlysalary = el.shadowRoot.getElementById('monthly_salary');
    const emi = el.shadowRoot.getElementById('EMIs_amount');
    expect(firstName.label).to.equal(localize.msg('change-language:firstname'));
    expect(lastName.label).to.equal(localize.msg('change-language:lastname'));
    expect(dob.label).to.equal(localize.msg('change-language:dateofbirth'));
    expect(email.label).to.equal(localize.msg('change-language:email'));
    expect(mobile.label).to.equal(localize.msg('change-language:mobilenumber'));
    expect(monthlysalary.label).to.equal(localize.msg('change-language:monthlysalary'));
    expect(emi.label).to.equal(localize.msg('change-language:previousemi'));
  });

  it('should check back button click', () => {
      const spy = sinon.spy(Router, 'go');
      el.shadowRoot.getElementById('back-btn').click();
      expect(spy).to.have.called;
      expect(spy.firstCall.args[0]).to.equal('/emidetails')
  });

  xit('should check next button click - success post request with the inputs', ()=>{
      const spy = sinon.spy(window, 'fetch');
      el.shadowRoot.getElementById('first_name').value = 'John';
      el.shadowRoot.getElementById('last_name').value = 'Max';
      el.shadowRoot.getElementById('dateof_birth').value = '17/01/2007';
      el.shadowRoot.getElementById('email').value = 'John-max@gmail.com';
      el.shadowRoot.getElementById('mobile_number').value = '9123456789';
      el.shadowRoot.getElementById('monthly_salary').value = '10000';
      el.shadowRoot.getElementById('EMIs_amount').value = '100';
      el.shadowRoot.getElementById('terms').value = '';

      const nextBtn = el.shadowRoot?.getElementById('nextbtn');
      nextBtn.click();
      expect(spy.args[0][1].method).to.equal('POST');
      expect(spy.args[0][1].body).deep.equal({
        "first_name": "John",
        "last_name": "Max",
        "dateof_birth": "2007-01-17",
        "email": "John-max@gmail.com",
        "mobile_number": "9123456789",
        "monthly_salary": 10000,
        "EMIs_amount": 100,
        "terms": [
          ""
        ]});
      expect(spy).to.have.called;
      spy.restore();
    });
  
}); 
