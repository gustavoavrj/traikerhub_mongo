import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div style={{
      background: "#fff",
      padding: 24,
      minHeight: "80vh"
                }} >
      <header className="jumbotron">
        <h3>
          <strong>Bienvenido {currentUser.username}</strong>
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      
    </div>
  );
};

export default Profile;
