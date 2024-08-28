import { useState } from "react";

interface NewsItem {
  id: number;
  title: string;
  description: string;
}

interface AddNewsFormProps {
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  news: NewsItem[];
}

const AddNewsForm: React.FC<AddNewsFormProps> = ({ setNews, news }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleAddNews = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      alert("Please fill in both the title and description.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await fetch("http://localhost:5000/news", {
        method: "POST",

        body: formData,
      });

      if (response.ok) {
        const newItem: NewsItem = await response.json();
        setNews([...news, newItem]);
        setTitle("");
        setDescription("");
      } else {
        console.error("Failed to add news item.");
      }
    } catch (error) {
      console.error("Error adding news item:", error);
    }
  };

  return (
    <form onSubmit={handleAddNews} className="mt-8">
      <h2 className="text-xl font-semibold mb-4">اضافه کرن خبر</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          عنوان :
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          شرح :
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        اضافه کردن خبر
      </button>
    </form>
  );
};

export default AddNewsForm;
