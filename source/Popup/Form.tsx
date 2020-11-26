import React, { useState } from "react";
import {TextField, Button, Icon} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type Task = {
    beginTime: Date,
    endTime: Date
};

type Props = {
    addTask: (addItem: Task) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
        },
        textField: {
            margin: theme.spacing(1),
            width: "100%",
        },
        button: {
            margin: theme.spacing(1),
            fontSize: "large",
            width: "100%",
        },
    }),
);

const Form: React.FC<Props> = (props) => {
    const classes = useStyles();
    const [addItem, setAddItem] = useState<Task>({beginTime: new Date, endTime: new Date});

    const BeginDateHandle = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        if (event.target.value) {
            const date = event.target.value.split('-').map(Number);
            setAddItem({beginTime: new Date(date[0], date[1] - 1, date[2], addItem.beginTime.getHours(), addItem.beginTime.getMinutes()) , endTime: addItem.endTime});
        };
    };
    const BeginTimeHandle = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        if (event.target.value) {
            const date = event.target.value.split(':').map(Number);
            setAddItem({beginTime: new Date(addItem.beginTime.getFullYear(), addItem.beginTime.getMonth(), addItem.beginTime.getDate(), date[0], date[1]) , endTime: addItem.endTime});
        };
    };
    const EndDateHandle = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        if (event.target.value) {
            const date = event.target.value.split('-').map(Number);
            setAddItem({beginTime: addItem.beginTime , endTime: new Date(date[0], date[1] - 1, date[2], addItem.endTime.getHours(), addItem.endTime.getMinutes())});
        };
    };
    const EndTimeHandle = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        if (event.target.value) {
            const date = event.target.value.split(':').map(Number);
            setAddItem({beginTime: addItem.beginTime , endTime: new Date(addItem.endTime.getFullYear(), addItem.endTime.getMonth(), addItem.endTime.getDate(), date[0], date[1])});
        };
    };
    
    return(
        
        <div>
            <form className={classes.container}>
                <TextField
                  label="Begin Date"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange = {BeginDateHandle}
                />
            </form>
            <form className={classes.container}>
                <TextField
                  label="Begin Time"
                  type="time"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange = {BeginTimeHandle}
                />
            </form>
            <form className={classes.container}>
                <TextField
                  label="End Date"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange = {EndDateHandle}
                />
            </form>
            <form className={classes.container}>
                <TextField
                  label="End Time"
                  type="time"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange = {EndTimeHandle}
                />
            </form>
            <div className = {classes.container}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  endIcon={<Icon>send</Icon>}
                  onClick = {() => props.addTask(addItem)}
                >
                    Send
                </Button>
            </div>
        </div>
    );
};

export default Form;