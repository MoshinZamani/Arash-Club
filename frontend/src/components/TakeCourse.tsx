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

function Course() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [takenCourses, setTakenCourses] = useState<Course[]>([]);
  const [notTakenCourses, setNotTakenCourses] = useState<Course[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const getAllStudents = async () => {
      const response = await fetch("http://localhost:5000/students");
      if (!response.ok) {
        throw new Error("Failed to fetch students");
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

    try {
      getAllStudents();
      getAllCourses();
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleRegisterSubmit = (e, tabId) => {
    e.preventDefault();
    // Handle the course registration here
  };

  const handleChange = async (e) => {
    const nationalId = e.target.value;
    setSelectedStudent(nationalId);

    if (nationalId) {
      try {
        // Fetch courses taken by the student
        const response = await fetch(
          `http://localhost:5000/courses/${nationalId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch taken courses");
        }
        const result = await response.json();

        setTakenCourses(result.taken_courses);
        setNotTakenCourses(result.available_courses);
      } catch (error) {
        console.error("Error fetching student courses:", error);
        setMessage("Error fetching courses for the selected student.");
      }
    } else {
      setTakenCourses([]);
      setNotTakenCourses([]);
    }
  };

  const handleAddCourse = async (courseId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/students/${selectedStudent}/courses/${courseId}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        // Update the lists after adding the course
        const addedCourse = notTakenCourses.find(
          (course) => course.id === courseId
        );
        setTakenCourses([...takenCourses, addedCourse!]);
        setNotTakenCourses(
          notTakenCourses.filter((course) => course.id !== courseId)
        );
        setMessage("دوره با موفقیت اضافه شد.");
      } else {
        throw new Error("Failed to add course");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      setMessage("Error adding the course.");
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/students/${selectedStudent}/courses/${courseId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Update the lists after deleting the course
        const deletedCourse = takenCourses.find(
          (course) => course.id === courseId
        );
        setTakenCourses(
          takenCourses.filter((course) => course.id !== courseId)
        );
        setNotTakenCourses([...notTakenCourses, deletedCourse!]);
        setMessage("دوره با موفقیت حذف شد.");
      } else {
        throw new Error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      setMessage("Error deleting the course.");
    }
  };

  const content = (
    <div className="mt-4 text-right">
      <form onSubmit={(e) => handleRegisterSubmit(e, 1)}>
        <div>
          <label htmlFor="melliCode">کد ملی :</label>
          <select
            className="bg-white"
            id="melliCode"
            name="melliCode"
            onChange={handleChange}
            value={selectedStudent}
          >
            <option value="">----</option>
            {students.map((student) => (
              <option key={student.national_id} value={student.national_id}>
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

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">دوره‌های گرفته شده</h2>
        {takenCourses.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  نام دوره
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاریخ رویداد
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  مربی
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {takenCourses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {course.course_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.event_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.coach}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">هیچ دوره‌ای گرفته نشده است.</p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">دوره‌های موجود</h2>
        {notTakenCourses.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  نام دوره
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاریخ رویداد
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  مربی
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ظرفیت باقیمانده
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notTakenCourses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {course.course_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.event_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.coach}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.capacityLeft}/{course.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button
                      onClick={() => handleAddCourse(course.id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      اضافه
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">هیچ دوره‌ی جدیدی موجود نیست.</p>
        )}
      </div>
    </div>
  );

  return content;
}

export default Course;
