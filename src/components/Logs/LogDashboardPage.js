import React from 'react';
import LogListContainer from './LogList/LogListContainer';
import LogListFilters from './LogListFilters/LogListFilters';
import Header from '../Header/Header';
import { history } from '../../routers/AppRouter';

export const LogDashboardPage = () => (
  <div className="container">
    <div className="row">
      <section className="section__full-start-end">
        <Header history={history}/>
      </section>
      <section className="section__center-start-end">
        <LogListFilters />
      </section>
      <section className="section__center-6-start-end margin-bottom-large">
        <LogListContainer history={history}/>
      </section>
    </div>
  </div>
);

export default LogDashboardPage;