import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import { PageHeader, Button, Menu, Layout } from "antd";
import { SettingOutlined } from '@ant-design/icons';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Videos from "./components/Videos";
import MyVideos from "./components/MyVideos";
import UploadVideos from "./components/UploadVideo";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";
import Showvideo from "./components/ShowVideo";

const App = () => {
  const { SubMenu } = Menu;
  const { Content } = Layout;
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
    <Layout style={{ height: "100vh",backgroundImage: "URL(https://wallpaperaccess.com/full/752715.jpg)"}}>
    <PageHeader style={{
        border: "1px solid rgb(235, 237, 240)"
    }}
    title={<Link to={"/"} className="navbar-brand">TrailerHub</Link>}
    subTitle="Your trailer site!"
    extra={[
            <Menu Menu style={{ width: 256 }} mode="horizontal">
              { currentUser ? (
                <SubMenu key="sub1" icon={<SettingOutlined />} title={currentUser.username}>
                <Menu.ItemGroup title="Account">
                  <Menu.Item key="1"><Link to="/home">Inicio</Link></Menu.Item>
                  <Menu.Item key="2"><Link to="/upload">Subir video</Link></Menu.Item>
                  <Menu.Item key="3"><Link to="/videos">Mis videos</Link></Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Settings">
                  <Menu.Item key="4"><Link to={"/profile"} >Profile</Link></Menu.Item>
                  <Menu.Item key="5"><Button href="/login" onClick={logOut} key="logout" type="primary">Cerrar Sesión</Button></Menu.Item>
                </Menu.ItemGroup>
                </SubMenu>
          ) : (
            <SubMenu key="sub1" icon={<SettingOutlined />} title="Acceder">
                <Menu.ItemGroup title="Acceso">
                  <Menu.Item key="1"><Button key="login" type="primary"><Link to={"/login"} >
                  Login
                </Link></Button></Menu.Item>
                  <Menu.Item key="2"><Button key="register" type="primary"><Link to={"/register"} >
                  Sign Up
                </Link></Button></Menu.Item>
                </Menu.ItemGroup>
                </SubMenu>
          )}

          </Menu>
           
      ]}

/>
<Content style={{ padding: "0 50px", marginTop: 40 }}>
                    
          <Switch>
          { currentUser ? (
            <Route exact path={["/", "/home"]} component={Videos} />)
            :(<Route exact path={["/", "/home"]} component={Home} />)}
            <Route exact path="/login" component={Login} />
            <Route path="/videos" component={MyVideos} />
            <Route exact path="/video/:id" component={Showvideo} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/upload" component={UploadVideos} />
          </Switch>,
          </Content>
        </Layout>
    </Router>     
  );
};

export default App;
