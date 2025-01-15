import { html, fixture, expect } from '@open-wc/testing';
import sinon, { stub} from 'sinon';
import { Header } from '../src/header/Header.js';
describe('loan-header', () => {
  // Write test cases inside this block
  let el, enBtn, nlBtn, localeChangedSpy;

  beforeEach(async () => {
    el = await fixture('<loan-header></loan-header>');
    enBtn = el.shadowRoot?.getElementById('en-GB');
    nlBtn = el.shadowRoot?.getElementById('nl-NL');
    localeChangedSpy = sinon.spy(el, 'localeChanged');
  });

  it('check the en-GB button on load', async() => {
  expect(enBtn.getAttribute('class')).to.contain('bg-btn-color');
  expect(nlBtn.getAttribute('class')).not.to.contain('bg-btn-color');
  expect(enBtn.getAttribute('class')).not.to.contain('btn-cursor');
  expect(nlBtn.getAttribute('class')).to.contain('btn-cursor');
  })

  it('check the nl-NL button Click', async() => {
    nlBtn.click()
    expect(localeChangedSpy.callCount).to.equal(1);
    expect(enBtn.getAttribute('class')).not.to.contain('bg-btn-color');
    expect(nlBtn.getAttribute('class')).to.contain('bg-btn-color');
    expect(enBtn.getAttribute('class')).to.contain('btn-cursor');
    expect(nlBtn.getAttribute('class')).not.to.contain('btn-cursor');
    })

    it('check the en-GB button Click', async() => {
      enBtn.click()
      expect(localeChangedSpy.callCount).to.equal(1);
      expect(enBtn.getAttribute('class')).to.contain('bg-btn-color');
      expect(nlBtn.getAttribute('class')).not.to.contain('bg-btn-color');
      expect(enBtn.getAttribute('class')).not.to.contain('btn-cursor');
      expect(nlBtn.getAttribute('class')).to.contain('btn-cursor');
      })
});
