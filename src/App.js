import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import logo from './images/newsLogo.png';

import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards.js';
import useStyles from './styles.js';

const alankey = '64370f4c903e66c5b517887fefa45c1b2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
  
    const classes = useStyles();
  
    useEffect(() => {
      alanBtn({
        key: '64370f4c903e66c5b517887fefa45c1b2e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: ({ command, articles, number }) => {
          if (command === 'newHeadlines') {
            setNewsArticles(articles);
          } else if (command === 'open') {
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
            const article = articles[parsedNumber - 1];
  
            if (parsedNumber > articles.length) {
              alanBtn().playText('Please try that again...');
            } else if (article) {
              window.open(article.url, '_blank');
            } 
          }
        }
      });
    }, []);

    return (
        <div>
            <div className={classes.logoContainer}>
                <img src={logo} className={classes.alanLogo} alt="News Logo" />
            </div>
            <NewsCards articles={newsArticles} />
        </div>
    );
}

export default App;
