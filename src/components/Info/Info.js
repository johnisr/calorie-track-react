import React from 'react';
import Header from '../Header/Header';
import GraphsContainer from './GraphsContainer/GraphsContainer';
import { history } from '../../routers/AppRouter';

const Info = () => (
  <div className="container">
  <div className="row">
    <section className="section__full-start-end">
      <Header history={history}/>
    </section>
    <section className="section__center-start-end">
      <GraphsContainer />
    </section>
  </div>
  </div> 
);

export default Info;
