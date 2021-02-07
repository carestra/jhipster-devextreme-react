import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './booking.reducer';
import { IBooking } from 'app/shared/model/booking.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBookingProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Booking = (props: IBookingProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { bookingList, match, loading } = props;
  return (
    <div>
      <h2 id="booking-heading">
        <Translate contentKey="pacificApp.booking.home.title">Bookings</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="pacificApp.booking.home.createLabel">Create new Booking</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {bookingList && bookingList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="pacificApp.booking.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="pacificApp.booking.activityTitle">Activity Title</Translate>
                </th>
                <th>
                  <Translate contentKey="pacificApp.booking.activityDate">Activity Date</Translate>
                </th>
                <th>
                  <Translate contentKey="pacificApp.booking.activityId">Activity Id</Translate>
                </th>
                <th>
                  <Translate contentKey="pacificApp.booking.attendeeId">Attendee Id</Translate>
                </th>
                <th>
                  <Translate contentKey="pacificApp.booking.lastModifiedDate">Last Modified Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bookingList.map((booking, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${booking.id}`} color="link" size="sm">
                      {booking.id}
                    </Button>
                  </td>
                  <td>{booking.status}</td>
                  <td>{booking.activityTitle}</td>
                  <td>{booking.activityDate ? <TextFormat type="date" value={booking.activityDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{booking.activityId}</td>
                  <td>{booking.attendeeId}</td>
                  <td>
                    {booking.lastModifiedDate ? <TextFormat type="date" value={booking.lastModifiedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${booking.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${booking.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${booking.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="pacificApp.booking.home.notFound">No Bookings found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ booking }: IRootState) => ({
  bookingList: booking.entities,
  loading: booking.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
