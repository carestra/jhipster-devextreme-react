import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ActivityComponentsPage from './activity.page-object';
import ActivityUpdatePage from './activity-update.page-object';
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

describe('Activity e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let activityComponentsPage: ActivityComponentsPage;
  let activityUpdatePage: ActivityUpdatePage;

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
    activityComponentsPage = new ActivityComponentsPage();
    activityComponentsPage = await activityComponentsPage.goToPage(navBarPage);
  });

  it('should load Activities', async () => {
    expect(await activityComponentsPage.title.getText()).to.match(/Activities/);
    expect(await activityComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Activities', async () => {
    const beforeRecordsCount = (await isVisible(activityComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(activityComponentsPage.table);
    activityUpdatePage = await activityComponentsPage.goToCreateActivity();
    await activityUpdatePage.enterData();

    expect(await activityComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(activityComponentsPage.table);
    await waitUntilCount(activityComponentsPage.records, beforeRecordsCount + 1);
    expect(await activityComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await activityComponentsPage.deleteActivity();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(activityComponentsPage.records, beforeRecordsCount);
      expect(await activityComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(activityComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
