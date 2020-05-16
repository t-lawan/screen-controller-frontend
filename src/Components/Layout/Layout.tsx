import * as React from "react";
import { Container } from "@material-ui/core";
import Navbar from "../Navbar/Navbar";
import { Helmet } from "react-helmet";
import FormModal from "../Modal/FormModal";

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
      <Container>
        <FormModal />
        <Navbar />
          {props.children}
      </Container>
    </>
  );
};

export default Layout;
