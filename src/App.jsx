import React, { useEffect, useState } from "react";
import News from "./Components/News";
import Blogs from "./Components/Blogs";

function App() {
  const [shownews, setShownews] = useState(true);
  const [showblogs, setShowblogs] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectpost, setSelectpost] = useState(null);
  const [isediting, setIsediting] = useState(false);

  useEffect(() => {
    const savedblogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    setBlogs(savedblogs);
  }, []);

  const handlecreateblog = (newblog, isediting) => {
    const updatedblogs = isediting
      ? blogs.map((blog) => (blog === selectpost ? newblog : blog))
      : [...blogs, newblog];
    setBlogs(updatedblogs);
    localStorage.setItem("blogs", JSON.stringify(updatedblogs));
    setIsediting(false);
    setSelectpost(null);
    return updatedblogs;
  };

  const handleeditedblog = (blog) => {
    setSelectpost(blog);
    setIsediting(true);
    setShownews(false);
    setShowblogs(true);
  };

  const handledeleteblog = (blogtodelete) => {
    setBlogs((blogs) => {
      const updatedblogs = blogs.filter((blog) => blog !== blogtodelete);
      localStorage.setItem("blogs", JSON.stringify(updatedblogs));
      return updatedblogs;
    });
  };

  const handleShowBlogs = () => {
    setShownews(false);
    setShowblogs(true);
  };

  const handleBackToNews = () => {
    setShownews(true);
    setShowblogs(false);
    setIsediting(false);
    setSelectpost(null);
  };

  return (
    <div className="container">
      <div className="news-blogs-app">
        {shownews && (
          <News
            onShowBlogs={handleShowBlogs}
            blogs={blogs}
            oneditblog={handleeditedblog}
            onDeleteblog={handledeleteblog}
          />
        )}
        {showblogs && (
          <Blogs
            onBack={handleBackToNews}
            oncreateblog={handlecreateblog}
            isediting={isediting}
            editpost={selectpost}
          />
        )}
      </div>
    </div>
  );
}

export default App;