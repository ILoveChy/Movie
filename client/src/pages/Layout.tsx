import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import MovieList from './movie/MovieList'
import AddMovie from './movie/AddMovie'
import UpdateMovie from './movie/UpdateMovie'
import Home from './Home'
import { Layout, Menu } from 'antd'
import {
  UnorderedListOutlined,
  AppstoreAddOutlined,
  EditOutlined,
} from '@ant-design/icons';

import './Layout.css'
const { Header, Sider, Content } = Layout
export default function LayoutPage() {
  return (
    <div className="container">
      <Layout>
        <Header className="header">

          <NavLink to="/">猫眼电影管理系统</NavLink>
        </Header>
        <Layout>
          <Sider>
            <Menu
              mode="vertical"
              theme="dark"
            >
              <Menu.Item key="1">
                <UnorderedListOutlined />
                <NavLink to="/movie">电影列表</NavLink>
              </Menu.Item>
              <Menu.Item key="2">

                <AppstoreAddOutlined />
                <NavLink to="/movie/add">添加电影</NavLink>
              </Menu.Item>
              <Menu.Item key="3">
                <EditOutlined />
                <NavLink to="/movie/update/asdasd">修改电影</NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content>
            <div className="main">
              <Route exact path="/" component={Home} />
              <Route path="/movie" exact component={MovieList} />
              <Route path="/movie/add" component={AddMovie} />
              <Route path="/movie/update/:id" component={UpdateMovie} />
            </div>
          </Content>
        </Layout>
      </Layout>

    </div>
  )
}
