import React, { useState, useEffect } from "react";

import NewInfo from "./NewInfo";

function NewContainer(props) {
  const { id } = props;

  const [newsInfo, setNewsInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    state: false,
    message: '',
  })

  const getNewsInfo = async () => {
    const NewsInfoResponse = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    if (!NewsInfoResponse.ok) {
      setError({
        state: true,
        message: `HTTP error! status: ${NewsInfoResponse.status}`
      })
      //throw new Error(`HTTP error! status: ${latestNewsIds.status}`);
      
      
    } else {
    const NewsInfoResponseJson = await NewsInfoResponse.json();

    setNewsInfo(NewsInfoResponseJson);
    setLoading(false);
    }
  };

  useEffect(() => {
    getNewsInfo().catch((e) => {
      setError({
        state: true,
        message: "There has been a problem fetching the news info: " + e.message
      })
      console.log(
        "There has been a problem fetching the news info: " + e.message
      );
    });
  }, []);

  return (
    <React.Fragment>
      {error.state && (<h2>
        {error.message}
        </h2>)
      }
      {loading && !error.state ? "" : <NewInfo newsInfo={newsInfo} />}
    </React.Fragment>
  );
}

export default NewContainer;
