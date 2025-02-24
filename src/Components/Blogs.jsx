import React, { useEffect, useState } from 'react';
import userimg from '../assets/images/userimg.jpeg';
import noimg from '../assets/images/no-img.png';
import './Blogs.css';

const Blogs = ({ onBack, oncreateblog, isediting, editpost }) => {
  const [showform, setShowform] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [titlevalid, setTitlevalid] = useState(true);
  const [contentvalid, setContentvalid] = useState(true);
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
        if(isediting && editpost){
          setImage(editpost.image)
          setTitle(editpost.title)
          setContent(editpost.content)
          setShowform(true)
        }else {
          setImage(null)
          setTitle("")
          setContent("")
          setShowform(false)
        }
  },[isediting, editpost])

  const handleimagechange = (e) => {
    const file = e.target.files[0]

    const maxsize = 1 * 1024 * 1024

    if(file.size > maxsize){
        alert("file size exceeds 1 MB")
        return
    }
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImageUploaded(true);
        setTimeout(() => {
          setImageUploaded(false);
        }, 3000);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handletitlechange = (e) => {
    setTitle(e.target.value);
    setTitlevalid(true);
  };

  const handlecontentchange = (e) => {
    setContent(e.target.value);
    setContentvalid(true);
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      if (!title) setTitlevalid(false);
      if (!content) setContentvalid(false);
      return;
    }

    const newBlog = {
      image: image || noimg,
      title,
      content,
    };

    oncreateblog(newBlog, isediting);
    setSubmitted(true);

    setTimeout(() => {
      setImage(null);
      setTitle('');
      setContent('');
      setShowform(false);
      setSubmitted(false);
      onBack();
    }, 3000);
  };

  return (
    <div className="blogs">
      <div className="blogs-left">
        <img src={userimg} alt="user" />
      </div>
      <div className="blogs-right">
        {!showform && !submitted && (
          <button className="create-post-btn" onClick={() => setShowform(true)}>
            Create New Post
          </button>
        )}
        {submitted && (
          <div className="submission-overlay">
            <div className="submission-content">
              <i className="bx bx-check-circle"></i>
              <p>Post Submitted Successfully!</p>
            </div>
          </div>
        )}
        <div className={`blogsrightform ${showform ? 'visible' : 'hidden'}`}>
          <h1>{isediting ? "Edit Post" : "New Post"}</h1>
          <form onSubmit={handlesubmit}>
            <div className="imgupload">
              <label htmlFor="file-upload" className="custom-file-upload">
                <i className="bx bx-upload"></i>
                Choose File
              </label>
              <input 
                type="file" 
                id="file-upload" 
                onChange={handleimagechange}
                accept="image/*"
              />
              {imageUploaded && (
                <p className="upload-success">Image uploaded successfully!</p>
              )}
            </div>

            {image && (
              <div className="image-preview-container">
                <img src={image} alt="Preview" className="preview-image" />
              </div>
            )}

            <input
              value={title}
              onChange={handletitlechange}
              type="text"
              placeholder="Add Title (Max 60 Characters)"
              className={`titleinput ${!titlevalid ? 'invalid' : ''}`}
              maxLength={60}
            />
            <textarea
              value={content}
              onChange={handlecontentchange}
              className={`textinput ${!contentvalid ? 'invalid' : ''}`}
              placeholder="Add Text"
            />
            <button type="submit" className="submitbtn">
              {isediting ? "Update Post" : "Submit Button"}
            </button>
          </form>
        </div>

        <button onClick={onBack} className="blogsclosebtn">
          Back <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Blogs;