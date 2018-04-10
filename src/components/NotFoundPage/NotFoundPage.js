import React from 'react';
import Header from '../Header/Header';
import { history } from '../../routers/AppRouter';

const NotFound = () => (
  <div className="row">
    <section className="section__full-start-end">
      <Header history={history}/>
    </section>
    <section className="section__center-start-end">
      <h1 className="heading-secondary editLog__header">Page Not Found</h1>
    </section>
  </div>
);

export default NotFound;

