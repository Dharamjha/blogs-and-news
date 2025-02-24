import React from 'react';
import './BlogsModal.css';

const BlogsModal = ({ show, blog, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button 
          className="modal-close-button"
          onClick={onClose}
        >
          ✕
        </button>
        
        <div className="image-container">
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="modal-image"
            />
          )}
          <div className="image-overlay" />
        </div>

        <div className="content-container">
          <h2 className="modal-title">
            {blog.title}
          </h2>
          
          <div className="modal-content">
            {blog.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsModal;