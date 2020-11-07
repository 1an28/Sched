import React from 'react';
//import {browser} from 'webextension-polyfill-ts';

import Clock from "./Clock";
import Form from "./Form";
import Sched from "./Sched";

import './styles.scss';

/*
function openWebPage(url: string): Promise<Tabs.Tab> {
  return browser.tabs.create({url});
}
*/

const Popup: React.FC = () => {
  return (
    <section id="popup">
      <Clock />
      <Sched />
      <Form />
    </section>
  );
};

export default Popup;