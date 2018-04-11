import React from 'react';
import { connect } from 'react-redux';
import CurrentLogContainer from './CurrentLogContainer/CurrentLogContainer';
import EditLogTabs from './EditLogTabs/EditLogTabs';
import Header from '../Header/Header';
import { history } from '../../routers/AppRouter';

export class EditLog extends React.Component {
  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <section className="section__full-start-end">
            <Header history={history}/>
          </section>
          <section className="section__center-start-end">
            <h1 className="heading-secondary center-text margin-bottom-small">Edit Log</h1>
          </section>
        </div>
        {
          this.isEmpty(this.props.currentLog) ? (
            <div className="row">
              <section className="section__center-start-end">
                <p className="heading-tertiary center-text margin-bottom-small">Select a Log from Log dashboard to edit</p>
              </section>
            </div>
          ) : (
            <div className="row">
              <section className="section__center-start-end">
                <CurrentLogContainer history={history} />
              </section>
              <section className="section__center-start-end margin-bottom-large">
                <EditLogTabs />
              </section>
            </div>
          )
        }
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  currentLog: state.currentLog,
});

export default connect(mapStateToProps)(EditLog);