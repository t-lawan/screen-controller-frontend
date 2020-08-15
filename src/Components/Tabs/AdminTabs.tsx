import * as React from "react";
import {
  Typography,
  Tabs,
  Tab,
  Box
} from "@material-ui/core";
import VideoList from "../Lists/VideoList";
import ScreenList from "../Lists/ScreenList";
import Controls from "../Controls/Controls";

interface IAdminTabsState {
  index: number;
}

interface IAdminTabsProps {}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

interface ITab {
  label: string;
  display: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}
const AdminTabs: React.FC = props => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  let tbs: ITab[] = [
    {
      label: "Videos",
      display: (<VideoList />)
    },
    {
      label: "Screens",
      display: (<ScreenList />)
    },
    {
      label: "Controls",
      display: (<Controls />)
    }
  ];

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Video Navigation Bar"
      >
        {tbs.map((tb, index) => (
          <Tab key={index} {...a11yProps(index)} label={tb.label} />
        ))}
      </Tabs>
      {tbs.map((tb, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tb.display}
        </TabPanel>
      ))}

    </>
  );
};

export default AdminTabs;
