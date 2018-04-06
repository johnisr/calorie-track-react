import React from 'react';
import styles from './styles.css';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }
  selectTabIndex(activeIndex) {
    this.setState({ activeIndex });
  }
  renderTabs() {
    return this.props.data.map((tab, index) => {
      const isActive = this.state.activeIndex === index;
      const isDisabled = this.props.disabled.indexOf(index) !== -1;
      return (
        <div
          className={isDisabled ? "tab tab--disabled" : 
            isActive ? "tab tab--active" : "tab"}
          key={tab.label}
          onClick={isDisabled ? null : () => this.selectTabIndex(index)}
        >{tab.label}</div>
      )
    });
  }
  renderPanel() {
    const tab = this.props.data[this.state.activeIndex];
    return (
      <div>
        {tab.description}
      </div>
    )
  }
  render() {
    const tabs = (
      <div className="tabs">
        {this.renderTabs()}
      </div>
    );
    const panel = (
      <div className="tabPanels">
        {this.renderPanel()}
      </div>
    );
    return (
      <div>
        {
          this.props.tabsOnBottom ? [panel, tabs] : [tabs, panel]
        }
      </div>
    )
  }
}

class App extends React.Component {
  render(){
    const tabData = [
      {
        label: 'Tacos',
        description: <p>Tacos are delicious</p>
      },
      {
        label: 'Burritos',
        description: <p>Sometimes a burrito is what you really need</p>
      },
      {
        label: 'Coconut Korma',
        description: <p>Might be your best option</p>
      },
    ];

    return (
      <div>
        <Tabs disabled={[ 1 ]} tabsOnBottom={true} data={tabData} />
      </div>
    )
  }
}

export default App;