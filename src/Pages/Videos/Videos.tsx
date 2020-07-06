import React from 'react'
import Layout from '../../Components/Layout/Layout';
import VideoCanvas from '../../Components/VideoCanvas/VideoCanvas';

const Videos: React.FC = () => {
    const videoJsOptions = {
        autoplay: true,
        controls: true,
        fluid: false,
        fullscreen: {options: {navigationUI: 'show'}},
        sources: [{
            src: 'https://marie-leuder.s3.eu-west-2.amazonaws.com/dave.mp4',
            type: 'video/mp4'
        }]
    }
    return (
        <Layout title="Video Player">
            <VideoCanvas />
            {/* <VideoPlaylist {...videoJsOptions}/> */}
        </Layout>
    )
}

export default Videos;
