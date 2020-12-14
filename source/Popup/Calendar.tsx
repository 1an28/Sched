import React from "react";

import {ScheduleComponent, Month, Inject, ViewDirective, ViewsDirective, ICalendarExport, ICalendarImport} from '@syncfusion/ej2-react-schedule';

let scheduleObj: ScheduleComponent | null;

export const exportOnClick = () => {
    scheduleObj?.exportToICalendar();
};

export const uploadOnSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        scheduleObj?.importICalendar(event.target.files[0]);
    }
}

const Calendar: React.FC = () => {
    return (
        <div>
            <ScheduleComponent height='350px' selectedDate={new Date()} currentView="Month" ref={schedule => scheduleObj = schedule}>
                <ViewsDirective>
                    <ViewDirective option="Month"/>
                </ViewsDirective>
                <Inject services={[Month, ICalendarExport, ICalendarImport]} />
            </ScheduleComponent>
        </div>
    );
};

export default Calendar;