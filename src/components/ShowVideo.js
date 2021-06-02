import React, { useState, useEffect, useLayoutEffect } from "react";
import { Card, Row, Col } from 'antd';
import UserService from "../services/user.service";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import ReactWebMediaPlayer from 'react-web-media-player';
import ButtonGroup from "antd/lib/button/button-group";
import { Layout } from "antd";
import { Form, Input, Button } from "antd";
const Showvideo = (props) => {
  const [content, setContent] = useState("");
  const { id } = useParams()
  const { Content } = Layout;
  const { Meta } = Card;
  const [videos, SetVideos ] = useState([])

  
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

      }
      
      
    );
    
    UserService.showVideosID().then(
        (response) => {
          console.log(response.data)
          SetVideos(response.data);
        })
  
    
    
  }, []);


  return (
    
   
                <Content style={{ padding: "0 50px", marginTop: 40 }}>
                    <div
                        style={{
                            background: "#fff",
                            padding: 24,
                            minHeight: "80vh"
                        }}
                    >
                    <div>
        {videos.filter(videoss => videoss.id.includes(id)).map(video => (

            <Card title={video.titulo} bordered={false}>,
            <ReactWebMediaPlayer
        title={video.titulo}
        video={video.url} 
        height={700} width={1200}  />,<Meta description={video.descripcion} /></Card>
            ))}
            

            </div>
                    <ButtonGroup><Button key="delete" type="primary" danger>Eliminar</Button></ButtonGroup>

                    </div>
                   
                </Content>


  );
};

export default Showvideo;
