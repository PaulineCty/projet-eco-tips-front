import { useState, useEffect } from 'react';
import axios from 'axios';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://www.actu-environnement.com/flux/rss/environnement/',
      )
      .catch((err) => {
        setError('Le news feed n\'est pas accessible.');
      })
      .then((data) => new window.DOMParser().parseFromString(data.data, 'text/xml'))
      .then((data) => {
        const items = data.querySelectorAll('item');

        const parsedArticles = [];
        items.forEach((el, index) => {
          if (index < 4) { // display only the 4 latests articles
            const article = {
              title: el
                .querySelector('title')
                .innerHTML.replace('<![CDATA[', '')
                .replace(']]>', ''),
              link: el.querySelector('link').innerHTML,
              description: el
                .querySelector('description')
                .innerHTML.replace('<![CDATA[', '')
                .replace(']]>', ''),
              pubDate: el
                .querySelector('pubDate')
                .innerHTML.replace('<![CDATA[', '')
                .replace(']]>', ''),
              image: el
                .querySelector('image')
                .innerHTML.replace('<url>', '')
                .replace('</url>', ''),
              category: el
                .querySelector('category')
                .innerHTML.replace('<![CDATA[', '')
                .replace(']]>', ''),
              author: el
                .querySelector('author')
                .innerHTML.replace('/[', '')
                .replace('/ Actu-Environnement', ''),
            };

            parsedArticles.push(article);
          }
        });
        setArticles(parsedArticles);
      });
  }, []);

  if (error) {
    return (
      <div className="flex flex-col self-start">
        <h1 className="text-lg p-2 shadow-md text-white font-extrabold bg-gradient-to-r to-green-600 from-green-800 border-b-4 border-green-600 rounded-t-lg">
          <span className="inset-text-shadow pl-0.5">Eco-Articles</span>
        </h1>
        <div>
          <p className=" bg-white shadow-md">
            {error}
          </p>
        </div>

      </div>
    );
  }

  return (
    <div className="grid-cols-2 place-content-center">
      <h1 className="text-lg p-2 shadow-md text-white font-extrabold bg-gradient-to-r to-green-400 from-emerald-600 opacity-80 border-b-4 border-green-500 rounded-t-lg">
        <span className="inset-text-shadow">Eco-Articles</span>
      </h1>
      <div className="grid grid-cols-2 self-start gap-4 max-w-lg mt-2">
        {articles.map((article) => (
          <div key={article.link} className="p-2 bg-white rounded-md drop-shadow-md hover:drop-shadow-xl box-border h-100 w-60 border-4 ... ">
            <h2 className="font-bold text-start text-sm ">{article.title}</h2>
            <p className="text-xs text-center pt-2">
              {article.category}
              {' '}
              par
              {' '}
              {article.author}

            </p>
            <img className="object-contain mb-3" src={article.image} alt={article.image} />

            <div className="text-sm line-clamp-3">{article.description}</div>
            <p className="text-xs ">{article.copyright}</p>
            <a className="mt-10 text-xs underline decoration-green-500" href={article.link} target="_blank" rel="noreferrer">
              Lire la suite
            </a>
          </div>
        ))}
      </div>

    </div>

  );
}

export default ArticleList;
