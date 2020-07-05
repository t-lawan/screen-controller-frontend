import React from 'react'
import Layout from '../../Components/Layout/Layout';
import VideoPlayerPlaylist from '../../Components/VideoPlayerPlaylist/VideoPlayerPlaylist';

const Videos: React.FC = () => {
    return (
        <Layout title="Video Player">
            <VideoPlayerPlaylist />
        </Layout>
    )
}

export default Videos;
