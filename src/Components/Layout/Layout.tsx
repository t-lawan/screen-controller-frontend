import * as React from "react";
import { Container } from "@material-ui/core";
import Navbar from "../Navbar/Navbar";
import { Helmet } from "react-helmet";
import FormModal from "../Modal/FormModal";
import State from "../State/State";
import Communication from "../Communication/Communication";

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
      <Communication />
      <Container>
        <FormModal />
        <Navbar />
          {props.children}
      </Container>
    </>
  );
};

export default Layout;
