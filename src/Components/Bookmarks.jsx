import React from 'react'
import './Bookmarks.css'
import noimg from '../assets/images/no-img.png'
const Bookmarks = ({show, bookmarks, onClose, onselectarticle, ondeletebookmark, }) => {

  if(!show){
    return null
  }
  return (
    <div className='model-overlay'>
        <div className="model-content">
            <span className="close-button" onClick={onClose}>
                <i className="fa-solid fa-xmark">
                    
                </i>
            </span>
            <h2 className='bookmarks-heading'>Bookmarked News</h2>
            <div className="bookmarks-list">
              {bookmarks.map((article,index) => (<div className="bookmark-item" key={index} onClick={() => onselectarticle(article)}>
              <img src={article.image || noimg} alt={article.title} />
              <h3>{article.title}</h3>
              <span className='deletebtn' onClick={(e) => {e.stopPropagation(); ondeletebookmark(article)}}>
                <i className="fa-regular fa-circle-xmark"></i>
              </span>
            </div>))}
    
            </div>
        </div>
        
    </div>
  )
}

export default Bookmarks