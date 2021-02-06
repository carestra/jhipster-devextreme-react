import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ActivityUpdatePage from './activity-update.page-object';

const expect = chai.expect;
export class ActivityDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('pacificApp.activity.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-activity'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ActivityComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('activity-heading'));
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
    await navBarPage.getEntityPage('activity');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateActivity() {
    await this.createButton.click();
    return new ActivityUpdatePage();
  }

  async deleteActivity() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const activityDeleteDialog = new ActivityDeleteDialog();
    await waitUntilDisplayed(activityDeleteDialog.deleteModal);
    expect(await activityDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pacificApp.activity.delete.question/);
    await activityDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(activityDeleteDialog.deleteModal);

    expect(await isVisible(activityDeleteDialog.deleteModal)).to.be.false;
  }
}
