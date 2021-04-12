/* import { useState, useEffect, useRef } from "react";
import NewContainer from "./Components/NewContainer";

function App() {
  const [newsIds, setNewsIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    state: false,
    message: '',
  });
  const [page, setPage] = useState(0);
  const [newsNumber, setNewsNumber] = useState({
    start: 0,
    end: 0,
  });
  const [moreNews, setMoreNews] = useState(true)
  const loader = useRef(null);


  const getLatestNewsId = async () => {
    const latestNewsIds = await fetch(
      //"https://hacker-news.firebaseio.com/v0/newstories"
      "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
    );
    //console.log(latestNewsIds);
    if (!latestNewsIds.ok) {
      setError({
        state: true,
        message: `HTTP error! status: ${latestNewsIds.status}`
      })
      //throw new Error(`HTTP error! status: ${latestNewsIds.status}`);
      
      
    } else {
      const latestNewsIdsJson = await latestNewsIds.json();
      setNewsIds(latestNewsIdsJson);
      setLoading(false);
    }

    //console.log("4 I'm fourth?");
  };

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  const loadMoreNews = () => {
    setNewsNumber((prevNewsNumber) => ({
      ...prevNewsNumber,
      end: prevNewsNumber.end + 50,
    }));
    
  };

  useEffect(() => {
    getLatestNewsId().catch((e) => {
      setError({
        state: true,
        message: "There has been a problem with the fetch operation: " + e.message
      })
    });

    //console.log("3 I'm third");

    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  useEffect(() => {
    loadMoreNews();
    //console.log(newsNumber);
    //console.log("page: " + page);
    //console.log("newsNumber: " + newsNumber.end)
    //console.log("news length:" + newsIds.length)
    if (newsNumber.end > newsIds.length) setMoreNews(false)
    
  }, [page]);
  //console.log("1 I'm first");
  
  return (
    <div className="container">
      <button onClick={getLatestNewsId}>Reload news</button>
      {error.state && (<h2>
        {error.message}
        </h2>)
      }
      <ol style={{minHeight: "100vh"}}>
        {loading && !error.state
          ? "Loading..."
          : newsIds?.slice(newsNumber.start, newsNumber.end).map((id) => {
              return <NewContainer id={id} key={id} />;
            })}
      </ol>
      <div className="loading-more" ref={loader} ></div>
      {console.log("more news: " + moreNews)}
      {(!moreNews) && <h2>No more news</h2>}
      
    </div>
  );
}

export default App;
 */