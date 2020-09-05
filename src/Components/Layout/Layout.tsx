import * as React from "react";
import { Container } from "@material-ui/core";
import Navbar from "../Navbar/Navbar";
import { Helmet } from "react-helmet";
import FormModal from "../Modal/FormModal";
import State from "../State/State";
import Communication from "../Communication/Communication";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import styled from 'styled-components'
interface LayoutProps {
  children: any;
  title: string;
  blackBg: boolean;
}
type TLayoutWrapper = {
  blackBg: boolean;
};
const LayoutWrapper = styled.div<TLayoutWrapper>`
  background: ${props => props.blackBg ? 'black' : 'white'};
  color: ${props => props.blackBg ? 'white' : 'black'};
  height: 100vh;
`
const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <>
      <Helmet>
        <title> {props.title} - Screen Controller </title>

      </Helmet>
      <State />
      <AudioPlayer />
      <Communication />
      <LayoutWrapper blackBg={props.blackBg}>
        <FormModal />
        {/* <Navbar /> */}
          {props.children}
      </LayoutWrapper>
    </>
  );
};

export default Layout;
