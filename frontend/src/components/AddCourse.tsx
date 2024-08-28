import React from "react";

import { useState } from "react";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [coach, setCoach] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const courseData = {
      title,
      coach,
      price: parseFloat(price),
      capacity: parseInt(capacity),
      event_date: eventDate,
    };

    try {
      const response = await fetch("http://localhost:5000/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        alert("دوره با موفقیت اضافه شد.");
        // Clear form fields after successful submission
        setTitle("");
        setCoach("");
        setPrice("");
        setCapacity("");
        setEventDate("");
      } else {
        alert("خطا در افزودن دوره.");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      alert("خطا در افزودن دوره.");
    }
  };

  const content = (
    <div className="mt-4 text-right">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-bold mb-2">
            نام دوره:
          </label>
          <input
            className="bg-white shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="title"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="coach" className="block text-sm font-bold mb-2">
            مربی:
          </label>
          <input
            className="bg-white shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="coach"
            id="coach"
            type="text"
            value={coach}
            onChange={(e) => setCoach(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-bold mb-2">
            قیمت:
          </label>
          <input
            className="bg-white shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="price"
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="capacity" className="block text-sm font-bold mb-2">
            ظرفیت:
          </label>
          <input
            className="bg-white shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="capacity"
            id="capacity"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventDate" className="block text-sm font-bold mb-2">
            تاریخ رویداد:
          </label>
          <input
            className="bg-white shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="eventDate"
            id="eventDate"
            type="text"
            value={eventDate}
            placeholder="YYY-MM-DD"
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          افزودن دوره
        </button>
      </form>
    </div>
  );

  return content;
}

export default AddCourse;
