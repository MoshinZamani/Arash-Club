import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Course = {
  id: number;
  event_date: string;
  course_name: string;
  coach: string;
  capacityLeft: number;
  capacity: number;
  price: number;
};

type Student = {
  first_name: string;
  last_name: string;
  national_id: string;
};

function Admin() {
  const [userName, setUserName] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [message, setMessage] = useState<string>("");

  const [courses, setCourses] = useState<Course[]>([]);
  const [tab, setTab] = useState<1 | 2 | 3>(1);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllStudents = async () => {
      const response = await fetch("http://localhost:5000/students");
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const result = await response.json();
      setStudents(result.students);
    };
    const getAllCourses = async () => {
      const response = await fetch("http://localhost:5000/courses");
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const result = await response.json();
      setCourses(result.courses);
    };

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
      setUserName(`${userData.first_name} ${userData.last_name}`);
      getAllCourses();
      getAllStudents();
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("http://localhost:5000/admin/1", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        form.reset();
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const register = (
    <div className="mt-4 text-right">
      <form onSubmit={handleRegisterSubmit}>
        <div>
          <label htmlFor="course">انتخاب دوره :</label>
          <select className="bg-white" id="course" name="course">
            <option value="">----</option>
            {courses.map((course) => (
              <option value={course.id}>{course.course_name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="melliCode">کد ملی :</label>
          <select className="bg-white" id="melliCode" name="melliCode">
            <option value="">----</option>
            {students.map((student) => (
              <option value={student.national_id}>
                {student.first_name +
                  " " +
                  student.last_name +
                  " - " +
                  student.national_id}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          type="submit"
        >
          ثبت نام
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );

  const news = (
    <div className="mt-4 text-right">
      <form action="/admin/2" method="post">
        <div>
          <label htmlFor="title">عنوان :</label>
          <input className="bg-white" name="title" id="title" type="text" />
        </div>
        <div>
          <label htmlFor="desc">شرح :</label>
          <input className="bg-white" name="desc" id="desc" type="text" />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          type="submit"
        >
          ثبت نام
        </button>
      </form>
    </div>
  );

  const course = (
    <div className="mt-4 text-right">
      <form action="/admin/3" method="post">
        <div>
          <label htmlFor="title">course :</label>
          <input className="bg-white" name="title" id="title" type="text" />
        </div>
        <div>
          <label htmlFor="desc">شرح :</label>
          <input className="bg-white" name="desc" id="desc" type="text" />
        </div>

        <button className="bg-blue-500" type="submit">
          ثبت نام
        </button>
      </form>
    </div>
  );

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
          <div>{tab === 1 ? register : tab === 2 ? news : course}</div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
