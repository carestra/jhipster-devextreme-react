import { Moment } from 'moment';

export interface IBooking {
  id?: string;
  status?: string;
  activityTitle?: string;
  activityDate?: string;
  activityId?: string;
  attendeeId?: string;
  lastModifiedDate?: string;
}

export const defaultValue: Readonly<IBooking> = {};
