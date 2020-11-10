import React from 'react';
//import {browser} from 'webextension-polyfill-ts';
import Clock from "./Clock";
import Form from "./Form";
import Sched from "./Sched";
import './styles.scss';
import {useTasks} from "./useTasks";

/*
function openWebPage(url: string): Promise<Tabs.Tab> {
  return browser.tabs.create({url});
}
*/

const Popup: React.FC = () => {

    const {tasks, addTask, deleteTask} = useTasks();

    return (
        <section id="popup">
        <Clock tasks = {tasks}/>
        <Sched tasks = {tasks} deleteTask = {deleteTask}/>
        <Form addTask = {addTask}/>
        </section>
    );
};

export default Popup;