import React, { useState } from "react";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
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

    const formCss: React.CSSProperties = {
        display: "flex",
        justifyContent: "safe center",
    }

    return(
        <div style = {formCss}>
            <MuiPickersUtilsProvider utils = {DateFnsUtils}>
                <TimePicker autoOk value={addItem.beginTime} onChange={BeginHandleChange}/>
                <TimePicker autoOk value={addItem.endTime} onChange={EndHandleChange}/>
                <IconButton onClick = {() => props.addTask(addItem)}>
                    <MaterialIcon icon='add_task'/>
                </IconButton>
            </MuiPickersUtilsProvider>
        </div>
    );
};

export default Form;