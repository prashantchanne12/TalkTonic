'use client';

import { Tab, TabPanel } from './Tab';

const TabContent = () => {
  return (
    <Tab>
      <TabPanel title='Tab 1'>
        <p>Content for Tab 1</p>
      </TabPanel>
      <TabPanel title='Tab 2'>
        <p>Content for Tab 2</p>
      </TabPanel>
      <TabPanel title='Tab 3'>
        <p>Content for Tab 3</p>
      </TabPanel>
    </Tab>
  );
};

export default TabContent;
