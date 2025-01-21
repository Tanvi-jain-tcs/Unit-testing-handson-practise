import { html, fixture, expect } from '@open-wc/testing';
import sinon, { stub} from 'sinon';
import { Header } from '../src/header/Header.js';
import { localize } from '@lion/localize';
describe('loan-header', () => {
  let el, enBtn, nlBtn, localeChangedSpy;

  beforeEach(async () => {
    el = await fixture('<loan-header></loan-header>');
    enBtn = el.shadowRoot?.getElementById('en-GB');
    nlBtn = el.shadowRoot?.getElementById('nl-NL');
    localeChangedSpy = sinon.spy(el, 'localeChanged');
  });

  afterEach(() => {
    localeChangedSpy.restore();
  });

  it('should check component accessibility', () => {
    expect(el).to.be.accessible;
  });

  it('should check header label', () => {
      const paragraph = el.shadowRoot.querySelector('p');
      expect(paragraph).to.be.accessible;
      expect(paragraph.innerText).to.equal(localize.msg('change-language:heading'));
  });

  it('should check button', () => {
    const button = el.shadowRoot.querySelectorAll('button');
    expect(button).to.be.accessible;
    expect(button.length).to.equal(2);
  });

  it('should check the active en-GB button on load', async() => {
  expect(enBtn.getAttribute('class')).to.contain('bg-btn-color');
  expect(nlBtn.getAttribute('class')).not.to.contain('bg-btn-color');
  expect(enBtn.getAttribute('class')).not.to.contain('btn-cursor');
  expect(nlBtn.getAttribute('class')).to.contain('btn-cursor');
  })

  it('should check the nl-NL button Click', async() => {
    nlBtn.click()
    expect(localeChangedSpy.callCount).to.equal(1);
    expect(enBtn.getAttribute('class')).not.to.contain('bg-btn-color');
    expect(nlBtn.getAttribute('class')).to.contain('bg-btn-color');
    expect(enBtn.getAttribute('class')).to.contain('btn-cursor');
    expect(nlBtn.getAttribute('class')).not.to.contain('btn-cursor');
    })

  it('should check the en-GB button Click', async() => {
    enBtn.click()
    expect(localeChangedSpy.callCount).to.equal(1);
    expect(enBtn.getAttribute('class')).to.contain('bg-btn-color');
    expect(nlBtn.getAttribute('class')).not.to.contain('bg-btn-color');
    expect(enBtn.getAttribute('class')).not.to.contain('btn-cursor');
    expect(nlBtn.getAttribute('class')).to.contain('btn-cursor');
    })
});
