import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BookingUpdatePage from './booking-update.page-object';

const expect = chai.expect;
export class BookingDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('pacificApp.booking.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-booking'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BookingComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('booking-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('booking');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBooking() {
    await this.createButton.click();
    return new BookingUpdatePage();
  }

  async deleteBooking() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const bookingDeleteDialog = new BookingDeleteDialog();
    await waitUntilDisplayed(bookingDeleteDialog.deleteModal);
    expect(await bookingDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pacificApp.booking.delete.question/);
    await bookingDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(bookingDeleteDialog.deleteModal);

    expect(await isVisible(bookingDeleteDialog.deleteModal)).to.be.false;
  }
}
