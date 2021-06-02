import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import storage from "../firebase/firebaseConfig";
import { uuid } from 'uuidv4';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Form, Input, Button, Upload, Switch} from "antd";
import VideoThumbnail from 'react-video-thumbnail';
import { useDispatch, useSelector } from "react-redux";

const UploadVideos = (props) => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  const [is_uploaded, setUploaded] = useState(true);
  const [titulo, setTitulo] = useState("");
  const [thumbnail, setTumbnail] = useState("none");
  const [descripcion, setDescripcion] = useState("");
  const [input, setInput] = React.useState(true);
  const { user: currentUser } = useSelector((state) => state.auth);


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
  }, []);



  function handleChange(e) {
    setFile(e.file.originFileObj);
  }

  const onSubmit = (e) =>  {
    var level;
    if (input){
        level = "Public"
    }
    else{
        level = "Private"
    }
    UserService.insertUpload(titulo, descripcion, url, thumbnail, level, currentUser.username)
}

const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    console.log(value)
    if (name === "titulo") {
        setTitulo(value);
    } else if (name === "descripcion") {
        setDescripcion(value);
    } 
  };


  const customUpload = async ({ onError, onSuccess, onProgress }) => {
    let fileId = uuid()
    const fileRef = storage.ref('demo').child(fileId)
    try {
      const image = fileRef.put(file, { customMetadata: { uploadedBy: "myName", fileName: file.name } })

      image.on(
        'state_changed',
        (snap) => onProgress({ percent: (snap.bytesTransferred / snap.totalBytes) * 100 }),
        (err) => onError(err),
        () => {onSuccess(null, image.metadata_); storage
            .ref("demo")
            .child(fileId)
            .getDownloadURL()
            .then((url) => {
              setFile(null);
              setURL(url);
              setUploaded(false);
            })}
      )
    } catch (e) {
      onError(e)
    }
  }


  return (
    <div style={{
        background: "#fff",
        padding: 24,
        minHeight: "80vh"
                  }} >
  <h3>Videos</h3>
    { content === "User Content." ? (
        <Form className="login-form" onFinish={onSubmit}>

                            <Form.Item>
                                <Input
                                    name="titulo"
                                    placeholder="Titulo"
                                    onChange={event => onChangeHandler(event)}
                                />
                            </Form.Item>
                            <Form.Item>
                                <h3>Descripcion</h3>
                                <Input
                                    name="descripcion"
                                    placeholder="Descripcion"
                                    onChange={event => onChangeHandler(event)}
                                />
                            </Form.Item>
                            <Switch
          checked={input}
          checkedChildren="Publico"
          unCheckedChildren="Privado"
          onChange={() => {
            setInput(!input);
          }}
        />


                            <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={handleChange}
      >
        <Upload accept="video/*" name="logo" listType="picture" customRequest={customUpload} >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
                            <Form.Item>
                                <Button
                                    disabled={is_uploaded}
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                style={{ marginRight: 10 }}
                                >
                                Subir
                                </Button>
                            </Form.Item>
                            

                        </Form>
                       
                              )
        :(
          <p>Not Logged</p> )}
      </div>
  );
}; 
export default UploadVideos;
