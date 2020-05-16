import React from 'react'
import Layout from '../../Components/Layout/Layout';
import AdminTabs from '../../Components/Tabs/AdminTabs';

const Admin: React.FC = () => {
    return (
        <Layout title="Admin">
            <AdminTabs />
        </Layout>
    )
}

export default Admin;