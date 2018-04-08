import React from 'react';
import { connect } from 'react-redux';
import CurrentLog from './CurrentLog';
import EditLogTabs from './EditLogTabs';
import Header from '../components/Header';
import { history } from '../routers/AppRouter';

class EditLog extends React.Component {
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
            <h1>EDIT FOOD</h1>
          </section>
        </div>
        {
          this.isEmpty(this.props.currentLog) ? (
            <div className="row">
              <section className="section__center-start-end">
                <p>Select a Log from Log dashboard to edit</p>
              </section>
            </div>
          ) : (
            <div className="row">
              <section className="section__center-start-end">
                <CurrentLog history={history} />
              </section>
              <section className="section__center-start-end">
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