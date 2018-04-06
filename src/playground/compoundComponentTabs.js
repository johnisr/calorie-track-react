import React from 'react';
import styles from './styles.css';

const TabList = (props) => {
  const { activeIndex } = props;
  const children = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, {
      isActive: index === activeIndex,
      onActivate: () => {
        props.onActiveTab(index)
      }
    });
  });
  return (
    <div className="tabs">{children}</div>
  );
}

const Tab = (props) => {
  const isDisabled = props.isDisabled;
  const isActive = props.isActive;
  const style = isDisabled ? "tab tab--disabled" :
    isActive ? "tab tab--active" : "tab";
  return (
    <div
      className={style}
      onClick={isDisabled ? null : () => props.onActivate()}
    >
      {props.children}
    </div>
  );
}

const TabPanels = (props) => {
  const activeIndex = props.activeIndex;
  return (
    <div className="tabPanels">
      {props.children[activeIndex]}
    </div>
  );
}

const TabPanel = (props) => (
  <div>
    {props.children}
  </div>
)

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }
  selectTabIndex(activeIndex) {
    this.setState({ activeIndex });
  }
  
  render() {
    const activeIndex = this.state.activeIndex;
    const children = React.Children.map(this.props.children, (child) => {
      if (child.type === TabPanels) {
        return React.cloneElement(child, { activeIndex });
      } else if (child.type === TabList) {
        return React.cloneElement(child, {
          activeIndex,
          onActiveTab: (activeIndex) => {
            this.setState({ activeIndex });
          }
        });
      } else {
        return child;
      } 
    });
    return (
      <div>
        {children}
      </div>
    )
  }
}

const DataTabs = (props) => {
  const { data } = props;
  return (
    <Tabs>
      <TabList>
        {data.map(tab => (
          <Tab>{tab.label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {data.map(tab => (
          <TabPanel>{tab.description}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

class App extends React.Component {
  render(){
    return (
      <div>
        <Tabs>
          <TabList>
            <Tab>Tacos</Tab>
            <Tab isDisabled>Burritos</Tab>
            <Tab>Coconut Korma</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Tabs>
                <TabList>
                  <Tab>Tacos</Tab>
                  <Tab isDisabled>Burritos</Tab>
                  <Tab>Coconut Korma</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <p>Tacos are delicious</p>
                  </TabPanel>
                  <TabPanel>
                    <p>Sometimes a burrito is what you really need</p>
                  </TabPanel>
                  <TabPanel>
                    <p>Might be your best option</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
            <TabPanel>
              <p>Sometimes a burrito is what you really need</p>
            </TabPanel>
            <TabPanel>
              <p>Might be your best option</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    )
  }
}

export default App;