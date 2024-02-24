'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import {title} from "./../../components/primitives"
interface Article {
  url: string;
  urlToImage: string;
  title: string;
  description: string;
  source: {
    name: string;
  };
  publishedAt: string;
}

const Homepage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
		const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY; // Replace with your actual API key
      const url = `https://newsapi.org/v2/everything?q=business&apiKey=${apiKey}`;

      try {
        const response = await axios.get(url);
        setArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  const handleCardClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-wrap items-center justify-center">
      <h1 className={title()}>Top Buisness Headlines</h1>
      <div className="flex flex-wrap items-center justify-center">
        {articles.map((article, index) => (
          <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); handleCardClick(article.url) }}>
            <Card className="mx-2 my-4" style={{ maxWidth: '500px', width: '100%', height: '500px' }}>
              <CardHeader className="pb-2 pt-2 px-4 flex-col items-start">
                <h1 className="text-large uppercase font-bold">{article.title}</h1>
              </CardHeader>
              <CardBody className="overflow-visible pt-0">
                <img
                  className="object-cover rounded-t-xl"
                  src={article.urlToImage || '/images/placeholder.jpg'}
                  style={{ width: '100%', height: '300px' }} // Adjust the height as needed
                  alt="Article"
                />
                <p className="text-sm mt-2 px-4">{article.description}</p>
              </CardBody>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
