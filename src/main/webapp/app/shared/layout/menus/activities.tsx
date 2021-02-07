import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import {Translate, translate} from 'react-jhipster';
import {NavDropdown} from './menu-components';

export interface IActivitiesMenuProps {
  isAdmin: boolean;
}

export const ActivitiesMenu = (props: IActivitiesMenuProps) => {
  const {isAdmin} = props;

  return (
    <NavDropdown
      icon="th-list"
      name={translate('global.menu.activities.main')}
      id="activity-menu"
      style={{maxHeight: '80vh', overflow: 'auto'}}
    >
      <MenuItem icon="asterisk" to="/activities/member/booking">
        <Translate contentKey="global.menu.activities.activity.booking"/>
      </MenuItem>
      {
        isAdmin &&
        <MenuItem icon="asterisk" to="/activities/manager/calendar">
          <Translate contentKey="global.menu.activities.manage.activity"/>
        </MenuItem>
      }
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </NavDropdown>
  );
}
