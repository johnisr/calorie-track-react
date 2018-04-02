import React from 'react';
import LogList from './LogList';

const LogDashboardPage = (props) => (
  <div>
    <LogList history={props.history}/>
  </div>
);

export default LogDashboardPage;