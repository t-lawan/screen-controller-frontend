import * as React from "react";
import { Container } from "@material-ui/core";
import Navbar from "../Navbar/Navbar";
import { Helmet } from "react-helmet";
import FormModal from "../Modal/FormModal";
import State from "../State/State";
import Communication from "../Communication/Communication";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

interface LayoutProps {
  children: any;
  title: string;
}
const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <>
      <Helmet>
        <title> {props.title} - Screen Controller </title>

      </Helmet>
      <State />
      <AudioPlayer />
      <Communication />
      <div>
        <FormModal />
        {/* <Navbar /> */}
          {props.children}
      </div>
    </>
  );
};

export default Layout;
