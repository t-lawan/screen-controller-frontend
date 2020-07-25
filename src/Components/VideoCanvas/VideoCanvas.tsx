import React from "react";
import VIDEO_ONE from "../../Assets/VIDEO_ONE.mp4";
import VIDEO_TWO from "../../Assets/VIDEO_TWO.mp4";
import VIDEO_THREE from "../../Assets/VIDEO_THREE.mp4";
import styled from 'styled-components';

const DivWrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    height: 90vh;
    width: 100vw;
`
interface VideoCanvasProps {
  [propName: string]: any;
}

interface VideoCanvasState {
  width: number;
  height: number;
  index: number;
}
export default class VideoCanvas extends React.Component<
  VideoCanvasProps,
  VideoCanvasState
> {
  video;
  canvas: React.RefObject<HTMLCanvasElement>;
  canvasContext: CanvasRenderingContext2D | null = null;
  animation;
  alpha = 1;
  blur = 100;
  grayscale = 100;
  index = 0;

  playlist = [VIDEO_ONE, VIDEO_TWO, VIDEO_THREE];

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      index: 0
    };
    this.canvas = React.createRef();
  }
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });

    this.createVideoElement();
    this.setVideoCanvasContext();
  }

  createVideoElement = () => {
    if(this.video) {
        this.video.remove()
    }
    this.video = document.createElement("video");
    this.video.setAttribute("autoPlay", "false");
    this.video.setAttribute("width", "1");
    this.video.setAttribute("height", "1");
    this.video.setAttribute("display", "none");
    this.video.setAttribute("mute", "1");
    this.video.setAttribute("crossorigin", "anonymous");

    let source = document.createElement("source");
    source.setAttribute("src", this.playlist[this.index]);
    source.setAttribute("type", "video/mp4");
    this.video.appendChild(source);
  };

  setPlaylist = () => {};

  setVideoCanvasContext = () => {
      if(this.canvas && this.canvas.current) {
        this.canvasContext = this.canvas.current.getContext("2d");
      }
  };

  fadeOut = () => {
    if(this.blur < 100) {
        this.blur = this.blur + 5;
    }
    this.updateFilter();
  }

  fadeIn = () => {
      if(this.blur > 5) {
        this.blur = this.blur - 5;
      }
    this.updateFilter();
  }

  updateFilter = () => {
    if(this.canvasContext) {
        this.canvasContext.filter = `blur(${this.blur}%) grayscale${this.grayscale}%}`;
    }
  }
 
  startPlaylist = () => {
    this.startRender();
  };

  renderVideoToCanvas = () => {
    if(this.canvasContext) {
        this.canvasContext.drawImage(
            this.video,
            0,
            0,
            this.state.width,
            this.state.height
        );
    }
  };

  incrementVideoIndex = () => {
    if (this.index + 1 === this.playlist.length) {
        this.index = 0;
    } else {
        this.index = this.index + 1;
    }
  };

  startRender = () => {
    this.video.play();
    let percent = this.video.currentTime/this.video.duration;

    if(percent < 0.05) {
        this.fadeIn();
    }
    this.renderVideoToCanvas()

    if(percent > 0.90) {
        this.fadeOut();
    }

    if (percent >= 0.99) {
        this.incrementVideoIndex()
        this.video.pause()
        this.createVideoElement()
    }

    this.animation = requestAnimationFrame(this.startRender);
  };

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <DivWrapper>
        <canvas
          onClick={this.startPlaylist}
          ref={this.canvas}
          width={this.state.width}
          height={this.state.height}
        />
      </DivWrapper>
    );
  }
}
