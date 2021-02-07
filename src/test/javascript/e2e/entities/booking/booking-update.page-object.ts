import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BookingUpdatePage {
  pageTitle: ElementFinder = element(by.id('pacificApp.booking.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  statusInput: ElementFinder = element(by.css('input#booking-status'));
  activityTitleInput: ElementFinder = element(by.css('input#booking-activityTitle'));
  activityDateInput: ElementFinder = element(by.css('input#booking-activityDate'));
  activityIdInput: ElementFinder = element(by.css('input#booking-activityId'));
  attendeeIdInput: ElementFinder = element(by.css('input#booking-attendeeId'));
  lastModifiedDateInput: ElementFinder = element(by.css('input#booking-lastModifiedDate'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return this.statusInput.getAttribute('value');
  }

  async setActivityTitleInput(activityTitle) {
    await this.activityTitleInput.sendKeys(activityTitle);
  }

  async getActivityTitleInput() {
    return this.activityTitleInput.getAttribute('value');
  }

  async setActivityDateInput(activityDate) {
    await this.activityDateInput.sendKeys(activityDate);
  }

  async getActivityDateInput() {
    return this.activityDateInput.getAttribute('value');
  }

  async setActivityIdInput(activityId) {
    await this.activityIdInput.sendKeys(activityId);
  }

  async getActivityIdInput() {
    return this.activityIdInput.getAttribute('value');
  }

  async setAttendeeIdInput(attendeeId) {
    await this.attendeeIdInput.sendKeys(attendeeId);
  }

  async getAttendeeIdInput() {
    return this.attendeeIdInput.getAttribute('value');
  }

  async setLastModifiedDateInput(lastModifiedDate) {
    await this.lastModifiedDateInput.sendKeys(lastModifiedDate);
  }

  async getLastModifiedDateInput() {
    return this.lastModifiedDateInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setStatusInput('status');
    expect(await this.getStatusInput()).to.match(/status/);
    await waitUntilDisplayed(this.saveButton);
    await this.setActivityTitleInput('activityTitle');
    expect(await this.getActivityTitleInput()).to.match(/activityTitle/);
    await waitUntilDisplayed(this.saveButton);
    await this.setActivityDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getActivityDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setActivityIdInput('activityId');
    expect(await this.getActivityIdInput()).to.match(/activityId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAttendeeIdInput('attendeeId');
    expect(await this.getAttendeeIdInput()).to.match(/attendeeId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setLastModifiedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getLastModifiedDateInput()).to.contain('2001-01-01T02:30');
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
