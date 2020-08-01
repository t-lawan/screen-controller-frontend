import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import {
  VideoLabelOutlined,
  EditOutlined,
  DeleteOutlined,
  PlaylistAdd
} from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IState } from "../../Store/reducer";
import { openModal } from "../../Store/actions";
import { EFormType } from '../../Enums/EFormType';
import { IUpdateScreenRequestBody } from '../../Interfaces/IRequestData';
import { IScreen } from '../../Interfaces/IScreen';
import ScreenForm from "../Forms/ScreenForm";
import AddVideoToPlaylistForm from "../Forms/AddVideoToPlaylistForm";

interface IScreenListState {
  screens: IScreen[];
}

interface IScreenListProps {
  openModal: Function;
  screens: IScreen[];
}
class ScreenList extends React.Component<IScreenListProps, IScreenListState> {
  constructor(props: IScreenListProps) {
    super(props);
  }

  addScreen = () => {
    this.props.openModal(<ScreenForm type={EFormType.ADD} />);
  };

  addVideoToPlaylist = (screen: IScreen) => {
    if (screen) {
      this.props.openModal(<AddVideoToPlaylistForm screen={screen} />);
    }
  }

  editScreen = (id: string | undefined) => {
    if (id) {
      this.props.openModal(<ScreenForm type={EFormType.EDIT} id={id} />);
    }
  };

  deleteScreen = async (screen: IScreen) => {
    if (screen.id) {
      let reqData: IUpdateScreenRequestBody = {
        ...screen,
        id: screen.id
      };
    }
  };
  render() {
    return (
      <>
        <Button onClick={() => this.addScreen()}>
          <p> Add Screen</p>
        </Button>

        <List>
          {this.props.screens.map((scr, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <VideoLabelOutlined />
              </ListItemIcon>
              <ListItemText primary={scr.local_ip_address} />
              <ListItemSecondaryAction>
                <Button onClick={() => this.addVideoToPlaylist(scr)}>
                  <PlaylistAdd />
                </Button>
                <Button onClick={() => this.editScreen(scr.id)}>
                  <EditOutlined />
                </Button>
                <Button onClick={() => this.deleteScreen(scr)}>
                  <DeleteOutlined />
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    open: state.modal_open,
    component: state.modal_component,
    screens: state.screens
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openModal: component => dispatch(openModal(component))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenList);
