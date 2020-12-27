import React from 'react'
import Layout from '../../Components/Layout/Layout';
import VideoDisplay from '../../Components/VideoDisplay/VideoDisplay';
import SingleVideoDisplay from '../../Components/SingleVideoDisplay/SingleVideoDisplay';

const Home: React.FC = () => {
    return (
        <Layout blackBg={true} title="Video Streams">
            <SingleVideoDisplay />
        </Layout>
    )
}

export default Home;