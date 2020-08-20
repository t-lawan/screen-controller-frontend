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
import { IAudio } from '../../Interfaces/IAudio';
import AudioForm from "../Forms/AudioForm";

interface IAudioListState {
  audio: IAudio[];
}

interface IAudioListProps {
  openModal: Function;
  audio: IAudio[];
}
class AudioList extends React.Component<IAudioListProps, IAudioListState> {
  constructor(props: IAudioListProps) {
    super(props);
  }

  addAudio= () => {
    this.props.openModal(<AudioForm type={EFormType.ADD} />);
  };

  editAudio = (id: string | undefined) => {
    if (id) {
      this.props.openModal(<AudioForm type={EFormType.EDIT} id={id} />);
    }
  };

  render() {
    return (
      <>
        <Button onClick={() => this.addAudio()}>
          <p> Add Audio </p>
        </Button>

        <List>
          {this.props.audio.map((scr, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <VideoLabelOutlined />
              </ListItemIcon>
              <ListItemText primary={scr.title} />
              <ListItemSecondaryAction>
                <Button onClick={() => this.editAudio(scr.id)}>
                  <EditOutlined />
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
    audio: state.audio
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
)(AudioList);
