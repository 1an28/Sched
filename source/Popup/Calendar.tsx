import React from "react";

import {ScheduleComponent, Day, Week, WorkWeek, Month, Inject} from '@syncfusion/ej2-react-schedule';

const Calendar: React.FC = () => {
    return (
        <div className='control-wrapper'>
            <ScheduleComponent height='350px' selectedDate={new Date()}>
                <Inject services={[Day, Week, WorkWeek, Month]} />
            </ScheduleComponent>
        </div>
    );
};

export default Calendar;