import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import ReCAPTCHA from "react-google-recaptcha";

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
    watch,
  } = useForm<FormValues>();
  const [message, setMessage] = React.useState("");
  const password = watch("password");
  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);

  const onCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof FormValues];
      if (value instanceof FileList) {
        if (value.length > 0) formData.append(key, value[0]);
      } else if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
      } else {
        formData.append(key, value as string);
      }
    });
    if (captchaValue && captchaValue.trim() !== "") {
      formData.append("captcha", captchaValue);
    } else {
      setMessage("Please complete the CAPTCHA.");
      return; // Exit if CAPTCHA is not completed
    }
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
        setMessage(responseJson.message || "خطا در هنگام ثبت نام.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("فرم ارسال نشد. لطفا دوباره تلاش کنید.");
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
              <div className="p-2 bg-gray-100 text-right mt-2">
                <label htmlFor="fName">نام:</label>
                <input
                  {...register("fName", {
                    required: "وارد کردن نام الزامی است",
                  })}
                  type="text"
                  id="fName"
                />
                {errors.fName && (
                  <span className="text-red-500">{errors.fName.message}</span>
                )}
              </div>
              <div className="p-2 bg-gray-100 text-right mt-2">
                <label htmlFor="lName">نام خانوادگی:</label>
                <input
                  {...register("lName", {
                    required: "وارد کردن نام خانوادگی الزامی است",
                  })}
                  type="text"
                  id="lName"
                />
                {errors.lName && (
                  <span className="text-red-500">{errors.lName.message}</span>
                )}
              </div>
              <div className="p-2 bg-gray-100 text-right mt-2">
                <label htmlFor="fatherName">نام پدر:</label>
                <input
                  {...register("fatherName")}
                  type="text"
                  id="fatherName"
                />
              </div>
              <div className="p-2 bg-gray-100 text-right mt-2">
                <label htmlFor="mobile">شماره موبایل:</label>
                <input
                  {...register("mobile", {
                    required: "وارد کردن شماره موبایل الزامی است",
                  })}
                  type="tel"
                  id="mobile"
                />
                {errors.mobile && (
                  <span className="text-red-500">{errors.mobile.message}</span>
                )}
              </div>
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

              {/* Fields for birthdate */}
              <div className="flex bg-gray-100 mt-2 p-2">
                <div className="py-2">
                  <label htmlFor="birthDay">روز تولد:</label>
                  <select
                    {...register("birthDay", {
                      required: "انتخاب روز تولد الزامی است",
                    })}
                    id="birthDay"
                  >
                    <option value="">روز...</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  {errors.birthDay && (
                    <span className="text-red-500">
                      {errors.birthDay.message}
                    </span>
                  )}
                </div>
                <div className="py-2">
                  <label htmlFor="birthMonth">ماه تولد:</label>
                  <select {...register("birthMonth")} id="birthMonth">
                    {/* Assuming 1-12 represent months */}
                    {Array.from({ length: 12 }, (_, i) => (
                      <option value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <div className="py-2">
                  <label htmlFor="birthYear">سال تولد:</label>
                  <select {...register("birthYear")} id="birthYear">
                    {Array.from({ length: 100 }, (_, i) => (
                      <option value={1400 - i}>{1400 - i}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Fields for files */}
              <div className="p-2 bg-gray-100 text-right mt-2">
                <label htmlFor="insurancePic">تصویر بیمه ورزشی:</label>
                <input
                  {...register("insurancePic", {
                    required: "بارگذاری تصویر بیمه ورزشی الزامی است",
                  })}
                  type="file"
                  id="insurancePic"
                />
                {errors.insurancePic && (
                  <span className="text-red-500">
                    {errors.insurancePic.message}
                  </span>
                )}
              </div>
              <div className="p-2 bg-gray-100 text-right mt-2">
                <label htmlFor="melliCardPic">کپی کارت ملی:</label>
                <input
                  {...register("melliCardPic", {
                    required: "بارگذاری کپی کارت ملی الزامی است",
                  })}
                  type="file"
                  id="melliCardPic"
                />
                {errors.melliCardPic && (
                  <span className="text-red-500">
                    {errors.melliCardPic.message}
                  </span>
                )}
              </div>

              {/* Other fields */}
              <div className="p-2 bg-gray-100 text-right mt-2">
                <label htmlFor="password">رمز عبور:</label>
                <input
                  {...register("password", {
                    required: "رمز عبور نمی تواند خالی باشد",
                    minLength: {
                      value: 8,
                      message: "رمز عبور باید حداقل ۸ کاراکتر باشد",
                    },
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
                <label htmlFor="rePass">تکرار رمز عبور:</label>
                <input
                  {...register("rePass", {
                    validate: (value) =>
                      value === password || "رمزهای عبور مطابقت ندارند",
                    required: "تکرار رمز عبور نمی تواند خالی باشد",
                  })}
                  type="password"
                  id="rePass"
                />
                {errors.rePass && (
                  <span className="text-red-500">{errors.rePass.message}</span>
                )}
              </div>
              <div className="p-2 bg-gray-100 text-right mt-2">
                <ReCAPTCHA
                  sitekey="6LfpGCsqAAAAAK1IyClOCmeyZtpcfbGI4H4dAcjG"
                  onChange={onCaptchaChange}
                />
                {errors.captcha && (
                  <span className="text-red-500">{errors.captcha.message}</span>
                )}
              </div>
              <div className="py-2">
                <input
                  {...register("privacyPolicy", {
                    required: "پذیرش شرایط و قوانین الزامی است",
                  })}
                  type="checkbox"
                  id="privacyPolicy"
                />
                <label htmlFor="privacyPolicy">
                  شرایط و قوانین سایت را می پذیرم
                </label>

                {errors.privacyPolicy && (
                  <span className="text-red-500">
                    {errors.privacyPolicy.message}
                  </span>
                )}
              </div>
            </div>
            <div className="py-4 text-center">
              <input
                type="submit"
                value="ثبت نام"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              />
            </div>
            <p className="text-center text-green-500">{message}</p>
          </form>
          <DevTool control={control} />
        </div>
      </div>
    </div>
  );
};

export default Register;
