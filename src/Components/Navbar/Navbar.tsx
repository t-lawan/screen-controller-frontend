import * as React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import {Menu} from '@material-ui/icons'
import { Link } from 'react-router-dom';
import styled from "styled-components";


const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
`
interface INavbarState {
    
}

interface INavbarProps {

}
export default class Navbar extends React.Component<INavbarProps, INavbarState> {
    constructor(props: INavbarProps) {
        super(props);
    }
    render() {
        return (
            <AppBar position="static">
              <Toolbar>
              <NavLink to={'/'}> 
                <Typography variant="h6">Screen Controller</Typography>
              </NavLink>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                >
                    <Menu />
                </IconButton>
                <NavLink to={'/admin'}> 
                  <Button color="inherit"> Admin </Button>
                </NavLink>
              </Toolbar>
            </AppBar>
          );
    
        }
};

// export default Navbar;
