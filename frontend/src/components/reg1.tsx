import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  fName: string;
  lName: string;
  insuranceExpiryDay: string;
  insuranceExpiryMonth: string;
  insuranceExpiryYear: string;
  fatherName: string;
  mobile: string;
  melliCode: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  insurancePic: FileList;
  melliCardPic: FileList;
  password: string;
  rePass: string;
  captcha: string;
  privacyPolicy: boolean;
};

const Register = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const [message, setMessage] = React.useState("");

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof FormValues]; // This line asserts that key is a key of FormValues
      if (value instanceof FileList) {
        if (value.length > 0) formData.append(key, value[0]);
      } else if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: formData,
      });
      const responseJson = await response.json();
      if (response.ok) {
        setMessage("ثبت نام با موفقیت انجام شد!");
        reset(); // Reset form after successful registration
      } else {
        setMessage(responseJson.message || "خطا در هنگام ثبت نام رخ داد.");
      }
    } catch (error) {
      console.error("خطا در ارسال فرم:", error);
      setMessage("ارسال فرم با شکست مواجه شد. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex justify-center bg-gray-100 w-3/4 mt-24 mb-4 py-8">
        <div className="bg-white w-1/2">
          <header className="py-4 text-right pr-4">
            <h2>عضویت در باشگاه</h2>
            <p>جهت استفاده از امکانات باشگاه عضو شوید</p>
          </header>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="register-main text-right px-8">
              <div>
                <label htmlFor="fName">نام:</label>
                <input
                  type="text"
                  {...register("fName", {
                    required: "وارد کردن نام الزامی است",
                  })}
                />
                {errors.fName && (
                  <p className="text-red-500">{errors.fName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="lName">نام خانوادگی:</label>
                <input
                  type="text"
                  {...register("lName", {
                    required: "وارد کردن نام خانوادگی الزامی است",
                  })}
                />
                {errors.lName && (
                  <p className="text-red-500">{errors.lName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="fatherName">نام پدر:</label>
                <input type="text" {...register("fatherName")} />
              </div>
              <div>
                <label htmlFor="mobile">موبایل:</label>
                <input
                  type="tel"
                  {...register("mobile", {
                    required: "وارد کردن شماره موبایل الزامی است",
                  })}
                />
                {errors.mobile && (
                  <p className="text-red-500">{errors.mobile.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="melliCode">کد ملی:</label>
                <input type="text" {...register("melliCode")} />
              </div>
              <div>
                <label htmlFor="insurancePic">عکس بیمه:</label>
                <input
                  type="file"
                  {...register("insurancePic", {
                    required: "ارسال عکس بیمه الزامی است",
                  })}
                />
                {errors.insurancePic && (
                  <p className="text-red-500">{errors.insurancePic.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="melliCardPic">عکس کارت ملی:</label>
                <input type="file" {...register("melliCardPic")} />
              </div>
              <div>
                <label htmlFor="password">رمز عبور:</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "تعیین رمز عبور الزامی است",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="rePass">تکرار رمز عبور:</label>
                <input type="password" {...register("rePass")} />
              </div>
              <div>
                <label htmlFor="captcha">کپچا:</label>
                <input
                  type="text"
                  {...register("captcha", {
                    required: "وارد کردن کپچا الزامی است",
                  })}
                />
                {errors.captcha && (
                  <p className="text-red-500">{errors.captcha.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="privacyPolicy">قبول قوانین و مقررات:</label>
                <input type="checkbox" {...register("privacyPolicy")} />
              </div>
              <input type="submit" value="ثبت نام" />
            </div>
            {message && <p>{message}</p>}
          </form>
          <DevTool control={control} />
        </div>
      </div>
    </div>
  );
};

export default Register;
