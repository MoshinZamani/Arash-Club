import React from "react";

interface NewsItem {
  id: number;
  title: string;
  description: string;
}

interface NewsTableProps {
  news: NewsItem[];
  onDelete: (id: number) => void;
}

const NewsTable: React.FC<NewsTableProps> = ({ news, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      {news.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          هیچ خبری برای نمایش وجود ندارد.
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                عنوان
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                شرح
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">حذف</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onDelete(item.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NewsTable;
