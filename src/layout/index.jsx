import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import './index.scss'
import { renderAppRoutes } from '@/router'
import MySider from './components/Sider'

const { Header, Content, Footer } = Layout;

function LayoutComponent() {
  
  return <Layout>
    <MySider />
    <Layout>
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Switch>
            { renderAppRoutes().concat(<Route path='*' key={404} render={() => <Redirect to='/404' /> }  />) }
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
}

export default LayoutComponent