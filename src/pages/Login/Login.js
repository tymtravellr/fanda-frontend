import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const from = location.state?.from?.pathname || "/";
  const [admin] = useAdmin(user);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => console.log(data);

  if (user) {
    const url = "https://quiet-refuge-20911.herokuapp.com/login";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("accessToken", data.token);
        if (admin) {
          navigate("/dashboard");
        } else {
          navigate(from, { replace: true });
        }
      });
  }

  if (loading) {
    return (
      <>
        <div className="">
          <Loading />
        </div>
      </>
    );
  }

  return (
    <div className="grid place-content-center mt-12">
      <div className="max-w-screen-md mx-auto p-5">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-600">
            Login To Your <span className="text-blue-500">Fanda</span> Account
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 mb-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-email"
              >
                Email Address
              </label>
              <input
                className={`appearance-none block w-full bg-gray-100 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                  errors.email?.type === "required"
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
                id="grid-email"
                type="email"
                placeholder="enter email"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 text-sm font-medium">
                  Email is required
                </p>
              )}
            </div>
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className={`appearance-none block w-full bg-gray-100 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white h-full  ${
                    errors.password?.type === "required" ||
                    errors.password?.type === "minLength"
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  id="grid-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  {...register("password", { required: true, minLength: 6 })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-lg"
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </button>
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm font-medium">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm font-medium">
                  Password should be 6 character
                </p>
              )}
            </div>
          </div>
          <p className="text-sm mt-1">
            Don't have an account,
            <span className="uppercase text-blue-500 font-semibold">
              <Link to="/register"> Register</Link>
            </span>
          </p>
          <div className="w-full text-center mt-4 mb-8">
            <button
              type="submit"
              className="btn-custom border-blue-400  text-blue-400 hover:bg-blue-500 hover:border-blue-500 bg-transparent"
            >
              Login
            </button>
          </div>
        </form>

        <div class="divider">OR</div>
        <div className="w-full text-center mt-4">
          <p className="mb-4">Continue With</p>
          <GoogleLogin />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Login;
