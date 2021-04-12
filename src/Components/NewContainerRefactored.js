import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

import NewInfo from "./NewInfo";

const getNewsInfo = async (newsId) => {
  console.log("id: " + newsId);
  const newsInfo = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`
  );
  const newsInfoJson = await newsInfo.json();

  return newsInfoJson;
};

function NewContainer(props) {
  const { id } = props;
  

  //console.log(idRefactored);
  const [newsInfo, setNewsInfo] = useState();

  

  const { isLoading, error, data } = useQuery(
    ["news", id],
    () => getNewsInfo(id)
  );


  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;
  return (
    <React.Fragment>
      <NewInfo newsInfo={data} />
    </React.Fragment>
  );
}

export default NewContainer;
