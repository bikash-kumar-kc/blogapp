import React, { useState } from "react";
import authenservice from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import { Button, Input, Logo } from "./index";
import { login as authlogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  

  const { mutate, error:iserror } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: authenservice.loginUser,
    onSuccess: async (session) => {
        navigate("/");
        const userData = await authenservice.getCurrentUser();
        if (userData) {
           dispatch(authlogin(userData))
        };
     
    },
  });

  const login = (data) => {
   
    if (data) mutate(data);
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        
        {iserror && <p className="text-red-600 mt-8 text-center">{iserror.message}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              type="email"
              placehoder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placehoder="Enter your password"
              {...register("password", {
                required: true,
                min: 8,
              })}
            />

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
