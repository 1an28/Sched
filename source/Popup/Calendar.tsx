import React from "react";

import {ScheduleComponent, Month, Inject, ViewDirective, ViewsDirective} from '@syncfusion/ej2-react-schedule';

const Calendar: React.FC = () => {
    return (
        <div className='control-wrapper'>
            <ScheduleComponent height='350px' selectedDate={new Date()} currentView="Month" >
                <ViewsDirective>
                    <ViewDirective option="Month"/>
                </ViewsDirective>
                <Inject services={[Month]} />
            </ScheduleComponent>
        </div>
    );
};

export default Calendar;