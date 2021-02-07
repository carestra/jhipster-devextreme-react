import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BookingComponentsPage from './booking.page-object';
import BookingUpdatePage from './booking-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Booking e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bookingComponentsPage: BookingComponentsPage;
  let bookingUpdatePage: BookingUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    bookingComponentsPage = new BookingComponentsPage();
    bookingComponentsPage = await bookingComponentsPage.goToPage(navBarPage);
  });

  it('should load Bookings', async () => {
    expect(await bookingComponentsPage.title.getText()).to.match(/Bookings/);
    expect(await bookingComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Bookings', async () => {
    const beforeRecordsCount = (await isVisible(bookingComponentsPage.noRecords)) ? 0 : await getRecordsCount(bookingComponentsPage.table);
    bookingUpdatePage = await bookingComponentsPage.goToCreateBooking();
    await bookingUpdatePage.enterData();

    expect(await bookingComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(bookingComponentsPage.table);
    await waitUntilCount(bookingComponentsPage.records, beforeRecordsCount + 1);
    expect(await bookingComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await bookingComponentsPage.deleteBooking();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(bookingComponentsPage.records, beforeRecordsCount);
      expect(await bookingComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(bookingComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
