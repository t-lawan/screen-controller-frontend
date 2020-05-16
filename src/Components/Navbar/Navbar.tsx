import * as React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import {Menu} from '@material-ui/icons'

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
                <Typography variant="h6">Screen Controller</Typography>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                >
                    <Menu />
                </IconButton>
                <Button color="inherit"> Admin </Button>
              </Toolbar>
            </AppBar>
          );
    
        }
};

// export default Navbar;
