import { html, fixture, expect } from '@open-wc/testing';
import sinon, { stub } from 'sinon';
import '../src/Customer/Customer-details.js';
import { Router } from '@vaadin/router';

describe('customer details', () => {
  let el;
  before(async () => {
    el = await fixture(html`<customer-details></customer-details>`);
  })

  it('Check back button click', () => {
      const spy = sinon.spy(Router, 'go');
      el.shadowRoot.getElementById('back-btn').click();
      expect(spy).to.have.called;
      expect(spy.firstCall.args[0]).to.equal('/emidetails')
  });

  xit('check next button click - success post request with the inputs', ()=>{
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
