import React from 'react';
import VIDEO_ONE from '../../Assets/VIDEO_TWO.mp4';


interface VideoCanvasProps {
    [propName: string]: any;
}

interface VideoCanvasState {
    width: number;
    height: number;
}
export default class VideoCanvas extends React.Component <VideoCanvasProps, VideoCanvasState> {
    video;
    canvas;
    canvasContext;
    animation;
    alpha = 1;
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        }
        this.canvas = React.createRef();
    }
  componentDidMount() {
      this.setState({
          width: window.innerWidth - 100,
          height: window.innerHeight - 100
      })

      this.createVideoRef(VIDEO_ONE);
      this.setVideoCanvas()
      this.renderVideoToCanvas();
    // instantiate Video.js
  }

  createVideoRef = (url: string) => {
      this.video = document.createElement('video');
      this.video.setAttribute('autoPlay', '1')
      this.video.setAttribute('width', '1')
      this.video.setAttribute('height', '1');
      this.video.setAttribute('display', 'none');
      this.video.setAttribute('crossorigin', 'anonymous');

      let source = document.createElement('source');
      source.setAttribute('src', url);
      source.setAttribute('type', 'video/mp4');
      this.video.appendChild(source);
  }

  setVideoCanvas = () => {
    this.canvasContext = this.canvas.current.getContext('2d');
  }
 
  renderVideoToCanvas = () => {
      this.canvasContext.drawImage(
          this.video,
          0,
          0,
          this.state.width,
          this.state.height
      )
    
      if(this.video.currentTime/this.video.duration> 0.2 && this.alpha > 0) {
            // this.alpha = this.alpha - 0.05
            this.alpha = 0
            this.canvasContext.globalAlpha = this.alpha;
      }

      console.log('VIDEO', this.video.currentTime/this.video.duration)
      this.animation = requestAnimationFrame(this.renderVideoToCanvas)
  }

  startRender = () => {
  }


 
  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>	
          <canvas ref={this.canvas} width={this.state.width} height={this.state.height} />
      </div>
    )
  }
}