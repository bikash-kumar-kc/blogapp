import React from "react";
import { useDispatch } from "react-redux";
import authenservice from "../../appwrite/auth";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: authenservice.logoutUser,
    onSuccess: (data) => {
        dispatch(logout());
        navigate("/");
    },
  });

  const {mutate:deletesession} = useMutation({
    mutationKey:["delete-session"],
    mutationFn:authenservice.deleteCurrentSession,
    onSuccess:()=>{
      console.log("session delete")
    }
  });
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={() =>{
mutate()
deletesession()
      } }
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
