import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../Axios";

function View_user() {
  const { id } = useParams();
  const [user, setUser] = React.useState({});
  const getUser = async () => {
    let response = await Axios.get(`/users/${id}`);
    setUser(response.data.user);
  };
  console.log(user);
  useEffect(() => {
    getUser();
  }, []);
  return <div className="container">{/* user report with graph */}
    
  </div>;
}

export default View_user;
