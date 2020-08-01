import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { IVideo } from "../../Interfaces/IVideo";
import { EVideoType } from "../../Enums/EVideoType";
import {
  OndemandVideoOutlined,
  VideocamOutlined,
  EditOutlined,
  DeleteOutlined
} from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IState } from "../../Store/reducer";
import { openModal } from "../../Store/actions";
import VideoForm from "../Forms/VideoForm";
import { EFormType } from '../../Enums/EFormType';
import RequestManager from "../../Utils/RequestManager";
import { IUpdateVideoRequestBody } from "../../Interfaces/IRequestData";

interface IVideoListState {
  videos: IVideo[];
}

interface IVideoListProps {
  openModal: Function;
  videos: IVideo[];
}
class VideoList extends React.Component<IVideoListProps, IVideoListState> {
  constructor(props: IVideoListProps) {
    super(props);
    this.state = {
      videos: [...this.props.videos]
    };
  }


  componentDidMount() {
    let videos = [...this.props.videos]
    this.setState({
      videos: videos
    });
  }

  addVideo = () => {
    this.props.openModal(<VideoForm type={EFormType.ADD} />);
  };

  editVideo = (id: string | undefined) => {
    if (id) {
      this.props.openModal(<VideoForm type={EFormType.EDIT} id={id} />);
    }
  };

  deleteVideo = async (video: IVideo) => {
    if (video.id) {
      let reqData: IUpdateVideoRequestBody = {
        id: video.id,
        title: video.title,
        video_type: video.video_type,
        uri: video.uri
      };
      await RequestManager.deleteVideo(reqData).then(r => {
      });
    }
  };
  render() {
    return (
      <>
        <Button onClick={() => this.addVideo()}>
          <p> Add Video</p>
        </Button>

        <List>
          {this.props.videos.map((vid, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                {vid.video_type === EVideoType.FILE ? (
                  <OndemandVideoOutlined />
                ) : (
                  <VideocamOutlined />
                )}
              </ListItemIcon>
              <ListItemText primary={vid.title} />
              <ListItemSecondaryAction>
                <Button onClick={() => this.editVideo(vid.id)}>
                  <EditOutlined />
                </Button>
                <Button onClick={() => this.deleteVideo(vid)}>
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
    videos: state.videos
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
)(VideoList);
