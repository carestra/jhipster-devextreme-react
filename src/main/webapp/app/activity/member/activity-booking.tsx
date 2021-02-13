import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import DevExpress from "devextreme";
import dxSchedulerScrolling = DevExpress.ui.dxSchedulerScrolling;
import Scheduler from 'devextreme-react/scheduler';
import CustomStore from "devextreme/data/custom_store";

import React, {useEffect} from 'react';
import {RouteComponentProps} from "react-router-dom";
import {Translate} from "react-jhipster";
import {connect} from "react-redux";
import {Alert, Col, Row} from 'reactstrap';

import {IRootState} from "app/shared/reducers";
import {getLoginUrl} from "app/shared/util/url-utils";
import {getSession} from "app/shared/reducers/authentication";
import {
  createEntity,
  deleteEntity,
  getEntities,
  getEntity,
  updateEntity
} from "app/entities/activity/activity.reducer";
import {Button} from "devextreme-react";
import notify from "devextreme/ui/notify";

export interface IActivityBookingProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}
const ActivityBooking = (props: IActivityBookingProp) => {
  // get session when we move to/from home
  // session will populate token to use when calling rest-api.
  useEffect(() => {
    if (!props.isAuthenticated) {
      props.getSession();
    }
  }, []);

  // load eventList after authentication success
  useEffect(() => {
    if (props.isAuthenticated && !props.activityUpdating) {
      // TODO: this call will get all activities, refactor to use a date range!
      // It should get activities for past-present-future month of current date.
      // When changing date (prev/next month) it should increase the date range with one more month (past/future month).
      props.getEntities();
    }
  }, [props.isAuthenticated, props.activityUpdating]);


  const {account, activityEntities} = props;

  const views = ["week", "agenda"];
  const scrolling: dxSchedulerScrolling = { mode: 'virtual' };

  const mapToJson = delta => JSON
    .parse(JSON.stringify(delta), (k, v) => k === 'startDate' || k === 'endDate' ? new Date(v).toISOString() : v);

  const mapAppointmentData = activity => ({
    id: activity.id,
    text: activity.title,
    startDate: activity.startDate,
    endDate: activity.endDate,
    recurrenceRule: activity.recurrenceRule
  });

  const mapFromAppointmentData = appointment => ({
    id: appointment.id,
    title: appointment.text,
    startDate: appointment.startDate,
    endDate: appointment.endDate,
    recurrenceRule: appointment.recurrenceRule
  });

  const schedulerDataSource = {
    store: new CustomStore({
      load() {
        return activityEntities.map(mapAppointmentData);
      },
      byKey(id) {
        window.console.log("## byKey:", id);
        return props.getEntity(id);
      },
      insert(added) {
        window.console.log("## added:", mapFromAppointmentData(added));
        const toBeAdded = mapToJson(mapFromAppointmentData(added));
        return props.createEntity(toBeAdded);
      },
      remove(removed) {
        window.console.log("## remove:", removed.id, removed);
        return  props.deleteEntity(removed.id);
      },
      update(currentActivity, updatedActivity) {
        const formatted = mapToJson(mapFromAppointmentData(updatedActivity));
        window.console.log("## update: current - updated", currentActivity, formatted);
        return props.updateEntity(formatted);
      }
    })
  }

  function Appointment(model) {
    const { appointmentData } = model.data;

    function okClicked(e) {
      notify('The OK button was clicked');
    }

    return (
      <div className="showtime-preview">
        <div> {appointmentData.text}

          <Button
            text="OK"
            onClick={okClicked}
          />
        </div>
        <div>
          {appointmentData.startDate}
          {' - '}
          {appointmentData.endDate }
        </div>
      </div>
    );
  }

  function preventOpenComponent(e) {
    e.cancel = true;
  }

  function openBookingTooltip(e) {
    e.cancel = true;

    const appointmentData = e.appointmentData;

    return (
      <div>
        <div>
          {appointmentData.text}
        </div>
      </div>
    )
  }

  return (
    <Row>
      <Col md="9">
        <h2>
          Here you can book for activities!
        </h2>
        <div>
          {account && account.login ? (
            <Scheduler
              editing={false}
              dataSource={schedulerDataSource}
              showAllDayPanel={false}
              useDropDownViewSwitcher={true}
              defaultCurrentDate={new Date()}
              defaultCurrentView="week"
              views={views as any}
              scrolling={scrolling}
              startDayHour={7}
              endDayHour={23}
              cellDuration={60}
              firstDayOfWeek={1}
              shadeUntilCurrentTime={true}
              onAppointmentDblClick={preventOpenComponent}
              onCellClick={preventOpenComponent}
              onAppointmentClick={openBookingTooltip}
            />) : (
            <div>
              <Alert color="warning">
                This is a restricted area, you need to
                <a href={getLoginUrl()} className="alert-link">
                  <Translate contentKey="global.messages.info.authenticated.link">sign in</Translate>
                </a>
                before accessing this area.
              </Alert>
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
}


const mapStateToProps = ({authentication, activity}: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  activityEntities: activity.entities,
  activityUpdating: activity.updating
});

const mapDispatchToProps = {
  getSession,
  getEntities,
  getEntity,
  updateEntity,
  createEntity,
  deleteEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ActivityBooking);
