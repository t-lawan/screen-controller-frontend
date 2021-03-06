import * as React from "react";
import styled from "styled-components";
import "../../video.css";
import Video from "../../Assets/Video.mp4";
import { Player, ControlBar, LoadingSpinner } from "video-react";
import { EVideoAspectRatio } from "../../Enums/EVideoAspectRatio";
import { IState } from "../../Store/reducer";
import { connect } from "react-redux";
import { IVideo } from "../../Interfaces/IVideo";

// import IntroGiseleLivestreamOne from '../../Assets/1_intro_gisellelivestream1.mp4'
// import IntroGiseleLivestreamTwo from '../../Assets/1_intro_gisellelivestream2.mp4'
// import IntroGiseleLivestreamThree from '../../Assets/1_intro_gisellelivestream3.mp4'
// import IntroGiseleLivestreamFour from '../../Assets/1_intro_gisellelivestream4.mp4'
// import IntroGiseleLivestreamFive from '../../Assets/1_intro_gisellelivestream5.mp4'

// import IntroLeonidaLivestreamOne from '../../Assets/1_intro_leonidalivestream1.mp4'
// import IntroLeonidaLivestreamTwo from '../../Assets/1_intro_leonidalivestream2.mp4'
// import IntroLeonidaLivestreamThree from '../../Assets/1_intro_leonidalivestream3.mp4'
// import IntroLeonidaLivestreamFour from '../../Assets/1_intro_leonidalivestream4.mp4'
// import IntroLeonidaLivestreamFive from '../../Assets/1_intro_leonidalivestream5.mp4'

// import IntroMS3Dance from '../../Assets/1_intro_MS3_dance.mp4';
// import IntroMS4GiselleVHS from '../../Assets/1_intro_MS4_gisellevhs.mp4';
// import IntroMS5LeonidaVHS from '../../Assets/1_intro_MS5_leonidavhs.mp4';


// const VideoMap = {
//   '1_intro_gisellelivestream1': IntroGiseleLivestreamOne,
//   '1_intro_gisellelivestream2': IntroGiseleLivestreamTwo,
//   '1_intro_gisellelivestream3': IntroGiseleLivestreamThree,
//   '1_intro_gisellelivestream4': IntroGiseleLivestreamFour,
//   '1_intro_gisellelivestream5': IntroGiseleLivestreamFive,

//   '1_intro_leonidalivestream1': IntroLeonidaLivestreamOne,
//   '1_intro_leonidalivestream2': IntroLeonidaLivestreamTwo,
//   '1_intro_leonidalivestream3': IntroLeonidaLivestreamThree,
//   '1_intro_leonidalivestream4': IntroLeonidaLivestreamFour,
//   '1_intro_leonidalivestream5': IntroLeonidaLivestreamFive,

//   '1_intro_MS3dance': IntroMS3Dance,
//   '1_intro_MS4_gisellevhs': IntroMS4GiselleVHS,
//   '1_intro_MS5_leonidavhs': IntroMS5LeonidaVHS,

//   'blank': Blank
// }

const VideoPlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .video-react-big-play-button {
    display: none;
  }
`;

const Text = styled.h5`
  margin: 0;
`;

const StyledPlayer = styled(Player)`
  /* align-self: ${props => (props.isLeft ? "self-end" : "center")}; */
`;
type TLabel = {
  marginLeft?: string;
  marginTop?: string;
};

const Label = styled.h1<TLabel>`
  position: absolute;
  align-self: flex-end;
  // color: red;
  // margin-left: ${props => props.marginLeft};
  // margin-top: ${props => props.marginTop};
`;

interface IVideoPlayerState {
  isPlaying: boolean;
  videoUrl?: string;
}

const HiddenSpinner = styled(LoadingSpinner)`
  display: none !important;
`

interface IVideoPlayerProps {
  videoUrl?: string;
  width: number;
  height: number;
  isPlaying: boolean;
  aspectRatio: EVideoAspectRatio;
  isLive?: boolean;
  text?: string;
  id?: string;
  videos?: IVideo[];
}

class VideoPlayer extends React.Component<
  IVideoPlayerProps,
  IVideoPlayerState
> {
  player;
  constructor(props: IVideoPlayerProps) {
    super(props);
    this.state = {
      isPlaying: false
    };
    this.player = React.createRef();
  }

  componentDidUpdate(prevProps: IVideoPlayerProps) {
    if (this.props.isPlaying !== prevProps.isPlaying) {
      if (this.state.isPlaying) {
        this.player.pause();
        this.setState({
          isPlaying: false
        });
      } else {
        this.player.play();
        this.setState({
          isPlaying: true
        });
      }
    }

    if (this.props.id && prevProps.id !== this.props.id) {
      if (this.props.videos) {
        let video: IVideo | undefined = this.props.videos.find(vid => {
          return vid.id === this.props.id;
        });

        if (video) {
          this.setState({
            videoUrl: video.uri
          })
        }
      }
    }
  }
  render() {
    let width =
      this.props.height *
      (this.props.aspectRatio === EVideoAspectRatio.LANDSCAPE
        ? 16 / 9
        : 9 / 16);
    return (
      <VideoPlayerWrapper>
        {this.props.isLive ? (
          <img
            height={this.props.height}
            width={width}
            src="http://admin:false.memory@192.168.0.25/h264/ch1/main/av_stream"
          />
        ) : null}
        {!this.props.isLive ? (
          <StyledPlayer
            aspectRatio={
              this.props.aspectRatio ? this.props.aspectRatio : "auto"
            }
            ref={player => (this.player = player)}
            muted={true}
            fluid={false}
            height={this.props.height}
            preload={"metadata"}
            src={this.state.videoUrl ? `https://dm0cfdicfoqce.cloudfront.net/${this.state.videoUrl}` : 'https://dm0cfdicfoqce.cloudfront.net/blank.mp4'}
            loop={false}
            autoPlay={true}
          >
            <ControlBar disableCompletely={true} className="my-class" />
            <HiddenSpinner />
          </StyledPlayer>
        ) : null}
        {/* <Text>{this.props.text ? this.props.text : "placeholders"}</Text> */}
      </VideoPlayerWrapper>
    );
  }
}
const mapStateToProps = (state: IState) => {
  return {
    videos: state.videos
  };
};

export default connect(
  mapStateToProps,
  null
)(VideoPlayer);
