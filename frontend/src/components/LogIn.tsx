import React from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

type LoginFormValues = {
  melliCode: string;
  password: string;
  captcha: string;
};

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>();
  const [message, setMessage] = React.useState("");
  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const onCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const onSubmit = async (data: LoginFormValues) => {
    if (!captchaValue || captchaValue.trim() === "") {
      setMessage("Please complete the CAPTCHA.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: new URLSearchParams({
          ...data,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        // Store token and user info
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        console.log(result.user);
        if (result.user.type === "student") {
          navigate("/dashboard");
        } else {
          navigate("/admin");
        }
      } else {
        setMessage(result.error || "Login failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred. Please try again.");
    }
    reset();
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex justify-center bg-gray-100 w-3/4 mt-24 mb-4 py-8">
        <div className="bg-white w-1/2">
          <header className="py-4 text-right pr-4">
            <h2>ورود به سیستم</h2>
            <p>لطفاً برای دسترسی به حساب کاربری خود وارد شوید.</p>
          </header>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="register-main text-right px-8">
              <div className="p-2 bg-gray-100 text-right mt-2">
                <label htmlFor="melliCode">کد ملی:</label>
                <input
                  {...register("melliCode", {
                    required: "وارد کردن کد ملی الزامی است",
                  })}
                  type="text"
                  id="melliCode"
                />
                {errors.melliCode && (
                  <span className="text-red-500">
                    {errors.melliCode.message}
                  </span>
                )}
              </div>
              <div className="p-2 bg-gray-100 text-right mt-2">
                <label htmlFor="password">رمز عبور:</label>
                <input
                  {...register("password", {
                    required: "وارد کردن رمز عبور الزامی است",
                  })}
                  type="password"
                  id="password"
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="p-2 bg-gray-100 text-right mt-2">
                <ReCAPTCHA
                  sitekey="6LfpGCsqAAAAAK1IyClOCmeyZtpcfbGI4H4dAcjG"
                  onChange={onCaptchaChange}
                />
              </div>
              <div className="py-4 text-center">
                <input
                  type="submit"
                  value="ورود"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                />
              </div>
              <p className="text-center text-green-500">{message}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
