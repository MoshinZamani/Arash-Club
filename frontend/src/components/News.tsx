import React, { useEffect, useState } from "react";
import NewsTable from "./NewsTable";
import AddNewsForm from "./AddNewsForm";

interface NewsItem {
  id: number;
  title: string;
  description: string;
}

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    getAllNews();
  }, []);

  const getAllNews = async () => {
    try {
      const response = await fetch("http://localhost:5000/news");
      const data = await response.json();
      setNews(data.news);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/news/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNews(news.filter((item) => item.id !== id));
      } else {
        console.error("Failed to delete news item.");
      }
    } catch (error) {
      console.error("Error deleting news item:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <NewsTable news={news} onDelete={handleDelete} />
      <AddNewsForm setNews={setNews} news={news} />
    </div>
  );
};

export default News;
