import React, { useState } from "react";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import MaterialIcon from '@material/react-material-icon';
import IconButton from '@material/react-icon-button';

//import {browser} from 'webextension-polyfill-ts';

type Task = {
    beginTime: Date,
    endTime: Date
};

type Props = {
    addTask: (addItem: Task) => void;
}

const Form: React.FC<Props> = (props) => {
    const [addItem, setAddItem] = useState<Task>({beginTime: new Date, endTime: new Date});
    
    const BeginHandleChange = ( date: MaterialUiPickersDate ) => {
        if (date) {
            setAddItem({beginTime: date, endTime: addItem.endTime});
        };
    };

    const EndHandleChange = ( date: MaterialUiPickersDate ) => {
        if (date) {
            setAddItem({beginTime: addItem.beginTime, endTime: date});
        };
    };

    const flexCss: React.CSSProperties = {
        display: "flex"
    }

    const buttonCss: React.CSSProperties = {
        margin: "auto"
    }

    return(
        
        <div style = {flexCss} >
            <div>
                <MuiPickersUtilsProvider utils = {DateFnsUtils}>
                    <DateTimePicker
                      value={addItem.beginTime}
                      onChange={BeginHandleChange}
                      inputVariant = "outlined"
                      label = "BEGIN"
                      disablePast
                      minDate={new Date}
                      helperText=" "
                    />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils = {DateFnsUtils}>
                    <DateTimePicker
                      value={addItem.endTime}
                      onChange={EndHandleChange}
                      inputVariant = "outlined"
                      label = "END"
                      disablePast
                      minDate={new Date(addItem.beginTime)}
                    />
                </MuiPickersUtilsProvider>
            </div>
            <IconButton style = {buttonCss} onClick = {() => props.addTask(addItem)}  >
                <MaterialIcon icon='add_task'/>
            </IconButton>
        </div>
    );
};

export default Form;