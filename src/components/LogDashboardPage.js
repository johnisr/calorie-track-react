import React from 'react';
import LogList from './LogList';
import LogListFilters from './LogListFilters';
import Header from '../components/Header';
import { history } from '../routers/AppRouter';

export const LogDashboardPage = () => (
  <div className="container">
    <div className="row">
      <section className="section__full-start-end">
        <Header history={history}/>
      </section>
      <section className="section__center-start-end">
        <LogListFilters />
      </section>
      <section className="section__center-start-end">
        <LogList history={history}/>
      </section>
    </div>
  </div>
);

export default LogDashboardPage;