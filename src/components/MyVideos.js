import React, { useState, useEffect, useLayoutEffect } from "react";
import { Card, Row, Col } from 'antd';
import UserService from "../services/user.service";
import { Link } from "react-router-dom";
import VideoThumbnail from 'react-video-thumbnail';
import { useSelector } from "react-redux";


const MyVideos = (props) => {
    const { user: currentUser } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
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
    console.log(currentUser.username)
    UserService.showMyvideos(currentUser.username).then(
      (response) => {
        SetVideos(response.data);
      })

    
    
  }, []);
  useLayoutEffect(() => {
    

    
  }, []);

  return (
    <div style={{
      background: "#fff",
      padding: 24,
      minHeight: "80vh"
                }} >
                 <Row gutter={16}>
                 {videos.map( video =>
                  <Col span={4}>
                  <Link to={"/video/" + video.id}>
                  <Card 
                              bordered={true}
                              hoverable
                              cover={<div style={{
                                height: "200px",
                                width: "450px",
                                overflow: "hidden"
                              }}><VideoThumbnail
        videoUrl={video.url}
        width={400}
        height={200}
        /></div>}>
                              <Meta title={video.titulo} description={video.descripcion} />
                              </Card>
                              </Link>

                  </Col>)}

                 </Row>
 


      </div>
  );
};

export default MyVideos;
