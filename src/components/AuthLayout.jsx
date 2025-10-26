import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const authStatus = useSelector((store) => store.auth.status);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (authStatus && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setloading(false);
  }, [authStatus, authentication, navigate]);
  return loading ? <h1>Loading...</h1> : <>{children}</>;
};

export default Protected;
