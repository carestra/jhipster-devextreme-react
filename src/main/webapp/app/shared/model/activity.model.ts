import { Moment } from 'moment';

export interface IActivity {
  id?: string;
  title?: string;
  startDate?: string;
  endDate?: string;
  recurrenceRule?: string;
}

export const defaultValue: Readonly<IActivity> = {};
