import React from 'react'
import Layout from '../../Components/Layout/Layout';
import VideoDisplay from '../../Components/VideoDisplay/VideoDisplay';

const Home: React.FC = () => {
    return (
        <Layout blackBg={true} title="Video Streams">
            <VideoDisplay />
        </Layout>
    )
}

export default Home;