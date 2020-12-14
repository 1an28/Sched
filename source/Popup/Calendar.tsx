import React from "react";

import {ScheduleComponent, Month, Inject, ViewDirective, ViewsDirective, ICalendarExport, ICalendarImport} from '@syncfusion/ej2-react-schedule';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => 
    createStyles({
        root: {
            display: "flex",
            justifyContent: "space-around"
        },
        input: {
            display: 'none',
        },
        button: {
            marginBottom: 8
        }
    }),
);

const Calendar: React.FC = () => {
    const classes = useStyles();

    let scheduleObj: ScheduleComponent | null;

    const exprotOnClick = () => {
        scheduleObj?.exportToICalendar();
    };

    const uploadOnSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            scheduleObj?.importICalendar(event.target.files[0]);
        }
    }
    

    return (
        <div>
            <div className={classes.root}>
                <Button className={classes.button} variant="outlined" title='Export' onClick={exprotOnClick}>Export</Button>
                <input id="contained-button-file" type="file" accept=".ics" className={classes.input} onChange={uploadOnSelect}/>
                <label htmlFor="contained-button-file">
                    <Button className={classes.button} variant="outlined"> Choose file </Button>
                </label>
            </div>
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