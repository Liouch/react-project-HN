import { useState, useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import NewContainer from "./Components/NewContainer";
import NewContainerRefactored from "./Components/NewContainerRefactored";


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRefactored />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;

const getLatestNewsId = async () => {
  const latestNewsIds = await fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
  );
  const latestNewsIdsJson = await latestNewsIds.json();
  return latestNewsIdsJson;
};
const AppRefactored = () => {
  const { isLoading, error, data, refetch } = useQuery(
    "newsIds",
    getLatestNewsId
  );

  const [page, setPage] = useState(0);
  const [newsNumber, setNewsNumber] = useState({
    start: 0,
    end: 0,
  });
  const [moreNews, setMoreNews] = useState(true);
  const loader = useRef(null);

  const handleObserver = (entities) => {
    console.log("I'm here");
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  const handleClickRefetch = () => {
    refetch();
  };

  const loadMoreNews = () => {
    setNewsNumber((prevNewsNumber) => ({
      ...prevNewsNumber,
      end: prevNewsNumber.end + 50,
    }));
  };

  useEffect(() => {
    loadMoreNews();
    if (newsNumber.end > data?.length) setMoreNews(false);
  }, [page]);

  useEffect(() => {
    console.log(loader);
    console.log("loader.current : " + loader.current);
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader?.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loader]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className="container">
      <button onClick={handleClickRefetch}>Reload news refactored</button>
      <div className="list">
        <ul>
          {data?.slice(newsNumber.start, newsNumber.end).map((id) => {
            return <NewContainerRefactored id={id} />;
          })}
        </ul>
      </div>
      <div className="loading-more" ref={loader}>
        <h2>hello!</h2>
      </div>

      {!moreNews && <h2>No more news</h2>}
    </div>
  );
};
