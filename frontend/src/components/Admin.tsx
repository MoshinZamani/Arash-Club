import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TakeCourse from "./TakeCourse";
import News from "./News";
import AddCourse from "./AddCourse";

function Admin() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [tab, setTab] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const userData = JSON.parse(user);
      // setUserName(`${userData.first_name} ${userData.last_name}`);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col justify-center items-center bg-gray-100 w-3/4 py-8">
        <div className="w-full">
          <header className="py-4 text-right pr-4 bg-gray-100">
            <h2>{userName || "کاربر"} خوش آمدید </h2>
            <button
              className="bg-red-500 mt-2 hover:bg-red-700"
              onClick={handleLogout}
            >
              خروج
            </button>
          </header>
        </div>
        <div className="flex flex-col items-center w-3/4">
          <div className="flex justify-around">
            <div>
              <h3
                className="bg-white border-2 border-gray-600 rounded-md py-4 px-8"
                onClick={() => setTab(1)}
              >
                ثبت نام
              </h3>
            </div>
            <div>
              <h3
                className="bg-white border-2 border-gray-600 rounded-md py-4 px-8"
                onClick={() => setTab(2)}
              >
                اخبار
              </h3>
            </div>
            <div>
              <h3
                className="bg-white border-2 border-gray-600 rounded-md py-4 px-8"
                onClick={() => setTab(3)}
              >
                دوره ها
              </h3>
            </div>
          </div>
          <div>
            {tab === 1 ? <TakeCourse /> : tab === 2 ? <News /> : <AddCourse />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
