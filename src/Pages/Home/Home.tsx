import React from 'react'
import Layout from '../../Components/Layout/Layout';
import VideoTabs from '../../Components/Tabs/Tabs';

const Home: React.FC = () => {
    return (
        <Layout title="Video Streams">
            <VideoTabs />
        </Layout>
    )
}

export default Home;