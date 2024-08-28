import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Course = {
  id: number;
  event_date: string;
  course_name: string;
  coach: string;
  capacityLeft: number;
  capacity: number;
  price: number;
  grade: string | null;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [takenCourses, setTakenCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function getCourses(melliCode: string) {
      try {
        const response = await fetch(
          `http://localhost:5000/courses/${melliCode}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const result = await response.json();
        console.log(result.taken_courses);
        setAvailableCourses(result.available_courses || []);
        setTakenCourses(result.taken_courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Redirect to login if no token
      return;
    }

    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login"); // Redirect to login if no user info
      return;
    }

    try {
      const userData = JSON.parse(user);
      getCourses(userData.melliCode);
      setUserName(`${userData.first_name} ${userData.last_name}`);
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
      <div className="flex flex-col justify-center items-center bg-gray-100 w-3/4 mb-4 py-8">
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
        <div className="flex flex-col w-3/4">
          <div className="mb-6">
            <header>
              <h2 className="text-center text-white font-bold py-2">
                دوره های ثبت نام شده
              </h2>
            </header>
            <table className="min-w-full bg-white border border-gray-300 mt-2">
              <thead>
                <tr className="bg-gray-100 text-center">
                  <th className="border border-gray-300 p-2">
                    تاریخ برگزاری دوره
                  </th>
                  <th className="border border-gray-300 p-2">نام دوره</th>
                  <th className="border border-gray-300 p-2">مدرس</th>
                  <th className="border border-gray-300 p-2">نمره</th>
                </tr>
              </thead>
              <tbody>
                {takenCourses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      شما در هیچ دوره ای ثبت نام نکرده اید
                    </td>
                  </tr>
                ) : (
                  takenCourses.map((course) => (
                    <tr key={course.id}>
                      <td className="border border-gray-300 p-2">
                        {course.event_date}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {course.course_name}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {course.coach}
                      </td>
                      {course.grade ? (
                        <td className="border border-gray-300 p-2">
                          {course.grade}
                        </td>
                      ) : (
                        <td className="border border-gray-300 p-2">
                          نمره ای ثبت نشده
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div>
            <header>
              <h2 className="text-center text-white font-bold py-2">
                دوره های ثبت نام نشده
              </h2>
            </header>
            <table className="min-w-full bg-white border border-gray-300 mt-2">
              <thead>
                <tr className="bg-gray-100 text-center">
                  <th className="border border-gray-300 p-2">
                    تاریخ برگزاری دوره 1347
                  </th>
                  <th className="border border-gray-300 p-2">نام دوره</th>
                  <th className="border border-gray-300 p-2">مدرس</th>
                  <th className="border border-gray-300 p-2">ظرفیت</th>
                  <th className="border border-gray-300 p-2">قیمت (ریال)</th>
                </tr>
              </thead>
              <tbody>
                {availableCourses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      هیچ دوره ای برای ثبت نام موجود نیست
                    </td>
                  </tr>
                ) : (
                  availableCourses.map((course) => (
                    <tr key={course.id}>
                      <td className="border border-gray-300 p-2 text-center">
                        {course.event_date}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {course.course_name}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {course.coach}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {course.capacity}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {course.price}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="font-bold py-2">
          <p>
            برای کسب اطلاعات بیشتر و ثبت نام با شماره ۰۹۱۲۶۵۴۷۶۳۲ آقای آرش فلاح
            تماس بگیرید.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
