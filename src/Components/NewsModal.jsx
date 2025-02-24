import React from 'react'
import './NewsModal.css'
import demoimg from '../assets/images/demo.jpg'

const NewsModal = ({show, article, onClose}) => {
  if(!show){
    return null
  }
  return (
    <div className='model-overlay'>
        <div className="model-content">
            <span className='close-button' onClick={onClose}>
                <i className="fa-solid fa-xmark"></i>
            </span>
            {article && (
              <>
              
              <img className='modelimg' src={article.image} alt={article.title} />
            <h2 className="modal-title">
{article.title}            </h2>
            <p className="modal-source">Source: {article.source.name}</p>
            <p className="modal-date">{new Date(article.publishedAt).toLocaleString('en-us',{month:'short', day:"2-digit", year: 'numeric', hour: '2-digit', minute: '2-digit'})}</p>
            <p className="modal-content-text">{article.content}</p>
            <a href={article.url} target='_blank' rel='noopener noreferrer' className="read-more-link">Read More</a>

              </>
            )}
           
        </div>
        
    </div>
  )
}

export default NewsModal