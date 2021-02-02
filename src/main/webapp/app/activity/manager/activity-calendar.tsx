import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

import React from 'react';
import Scheduler from 'devextreme-react/scheduler';
import DevExpress from "devextreme";
import dxSchedulerScrolling = DevExpress.ui.dxSchedulerScrolling;

const data = [{
  text: "Website Re-Design Plan",
  startDate: new Date(2016, 4, 25, 9, 30),
  endDate: new Date(2016, 4, 25, 11, 30)
}, {
  text: "Book Flights to San Fran for Sales Trip",
  startDate: new Date(2016, 4, 25, 12, 0),
  endDate: new Date(2016, 4, 25, 13, 0)
}
];
const views = ["day", "week", "agenda"];
const scrolling: dxSchedulerScrolling = { mode: 'virtual' };

const ActivityCalendar = () => {
  return (
    <div>
      <Scheduler
        dataSource={data}
        showAllDayPanel={false}
        useDropDownViewSwitcher={true}
        defaultCurrentDate={new Date(2016, 4, 25)}
        defaultCurrentView="week"
        views={views as any}
        scrolling={scrolling}
      />
    </div>
  );
}
export default ActivityCalendar;
