import React, { useState, useEffect } from 'react';
import { getTopHeadlines } from '../services/NewsService';

const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('technology');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    fetchNews();
  }, [category, page]);

  const fetchNews = async () => {
    const data = await getTopHeadlines(category, page);
    setArticles(data.articles);
    setTotalResults(data.totalResults);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handleNextPage = () => {
    if (page * 10 < totalResults) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className='w-full px-3 py-5'>
      <h1 className='text-2xl md:text-3xl text-center mb-4 font-bold'>News Articles</h1>
      <div className='flex flex-wrap gap-2 my-4 items-center justify-center'>
        {categories.map((cat) => (
          <button
            className={`px-3 py-1 md:px-4 md:py-2 rounded-md text-white font-medium capitalize ${category === cat ? 'bg-blue-600' : 'bg-gray-500'}`} // Responsive padding
            key={cat}
            onClick={() => handleCategoryChange(cat)}>
            {cat}
          </button>
        ))}
      </div>
      <div className='w-full flex flex-col gap-4 items-center'>
        {articles.map((article, index) => (
          <div className='w-[90%]  flex flex-col  md:flex-row border   border-gray-200 rounded-lg overflow-hidden md:shadow-md' key={index}>
            <div className='md:w-[40%]'>
              <img className='w-full h-[40vh] md: rounded-t-lg md:rounded-none md:rounded-l-lg' src={article.urlToImage} alt={article.title} />
            </div>
            <div className='flex flex-col md:w-[60%] gap-3 object-cover p-6 bg-black text-white'>
              <h2 className='text-lg md:text-xl font-semibold'>{article.title}</h2>
              <p className='text-gray-400'>{article.description}</p>
              <a className='text-blue-500 hover:text-blue-700' href={article.url} target="_blank" >Read more</a>
            </div>
          </div>
        ))}
      </div>
      <div className='flex gap-3 mt-4 justify-center'>
        <button className='px-3 py-1 md:px-4 md:py-2 bg-green-600 rounded-md text-white hover:bg-green-700' onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <button className='px-3 py-1 md:px-4 md:py-2 bg-red-700 rounded-md text-white hover:bg-red-800' onClick={handleNextPage} disabled={page * 10 >= totalResults}>
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsList;
