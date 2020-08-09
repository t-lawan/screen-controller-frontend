import * as React from "react";
import {
  Typography,
  Tabs,
  Tab,
  Box
} from "@material-ui/core";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

interface IVideoTabsState {
  index: number;
}

interface IVideoTabsProps {}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

interface ITab {
  label: string;
  video: string;
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
          <Typography>{children}</Typography>
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
const VideoTabs: React.FC = props => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  let tbs: ITab[] = [
    {
      label: "Stream One",
      video: "Video Player One"
    },
    {
      label: "Stream Two",
      video: "Video Player Two"
    },
    {
      label: "Stream Three",
      video: "Video Player Three"
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
          <VideoPlayer videoUrl={'http://admin:false.memory@192.168.0.25/ISAPI/Streaming/channels/102/httpPreview'} />
        </TabPanel>
      ))}

    </>
  );
};

export default VideoTabs;
