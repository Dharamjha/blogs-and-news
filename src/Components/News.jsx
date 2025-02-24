import React, { useEffect, useState } from 'react'
import Weather from './Weather'
import Calendar from './Calendar'
import './News.css'
import userImg from '../assets/images/userimg.jpeg'
import noimg from '../assets/images/no-img.png'



import axios from 'axios'
import NewsModal from './NewsModal'
import Bookmarks from './Bookmarks'
import Blogsmodal from './Blogsmodal'

const categories = ["general", "world", "business", "technology", "entertainment", "sports", "science", "health", "nation"]

const News = ({onShowBlogs, blogs, oneditblog, onDeleteblog}) => {

    const [headline, setHeadline] = useState(null);
    const [news, setNews] = useState([]);
    const [selectcategory, setSelectedcategory] = useState("general")
    const [searchinput, setSearchinput] = useState("")
    const [searchquery, setSearchquery] = useState("")
    const [showmodal, setShowmodal] = useState(false)
    const [selectedarticle, setSelectedarticle] = useState(null)
    const [bookmarks, setBookmarks] = useState([])
    const [showbookmarksmodel, setShowbookmarksmodel] = useState(false)
    const [selectedpost, setSelectedpost] = useState(null)
    const [showblogsmodel, setShowblogsmodel] = useState(false)


   useEffect(() => {
       const fetchnews = async () => {
        let url = `https://gnews.io/api/v4/top-headlines?category=${selectcategory}&lang=en&apikey=c93126c9af6fef0aeb2b833331e51239`

        if(searchquery){
            url = `https://gnews.io/api/v4/search?q=${searchquery}&lang=en&apikey=c93126c9af6fef0aeb2b833331e51239`
        }
        const response = await axios.get(url)
        const fetchednews = response.data.articles;

        fetchednews.forEach((article) => {
            if(!article.image){
                article.image = noimg
            }
        })

        setHeadline(fetchednews[0]);
        setNews(fetchednews.slice(1,7))
        
        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []
        setBookmarks(savedBookmarks)
       }

       fetchnews();
   }, [selectcategory, searchquery])

   const handlecategory = (e, category) => {
    e.preventDefault()
    setSelectedcategory(category)
   }

   const handlesearch = (e) => {
    e.preventDefault()
    setSearchquery(searchinput)
    setSearchinput('')
   }

   const handlearticleclick = (article) => {
         setSelectedarticle(article)
         setShowmodal(true)
   }
   const handlebookmarkclick = (article) => {
       setBookmarks((prevbookmarks) => {
        const updatebookmarks = prevbookmarks.find((bookmark) => bookmark.title === article.title) ? prevbookmarks.filter((bookmark) => bookmark.title !== article.title): [...prevbookmarks, article]
        localStorage.setItem("bookmarks", JSON.stringify(updatebookmarks))
        return updatebookmarks
       })
   }

   const handleblogclick = (blog) => {
          setSelectedpost(blog)
          setShowblogsmodel(true)
   }
      
       const closeblogmodal = () => {
        setShowblogsmodel(false)
        setSelectedpost(null)
       }

  return (
    <div className='news'>
        <header className="news-header">
            <h1 className='logo'>The Daily Scoop</h1>
            <div className="searchbar">
                <form onSubmit={handlesearch}>
                    <input type="text" placeholder='Search News.....' value={searchinput} onChange={(e) => setSearchinput(e.target.value)} />
                    <button type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </div>
        </header>
        <div className="news-content">
            <div className="navbar">
                <div className="user" onClick={onShowBlogs}>
                    <img src={userImg} alt="User Image" />
                    <p>Dharam's Blog</p>
                </div>
                <nav className='categories'>
                    <h1 className='navheading'>CATEGORIES</h1>
                    <div className="navlinks">
                        {categories.map((category) => ( <a href="#" className='navlink' key={category} onClick={(e)=> handlecategory(e,category)}>
                            {category}
                        </a>
))}
                        <a href="#" className='navlink' onClick={() => setShowbookmarksmodel(true)}>Bookmarks <i className="fa-solid fa-bookmark"></i></a>

                    </div>
                </nav>
            </div>
            <div className="news-section">
                <div className="headline" onClick={() => handlearticleclick(headline)}>
                {headline ? (
        <>
            <img src={headline.image || noimg} alt={headline.title} />
            <h2 className='headlinetitle'> {headline.title} <i className={`${bookmarks.some((bookmark) => bookmark.title === headline.title)?"fa-solid" : "fa-regular"} fa-bookmark bookmark`} onClick={(e) =>{
                e.stopPropagation()
                handlebookmarkclick(headline)
            }}></i></h2>
        </>
    ) : (
        <p>Loading headline...</p>
    )}
                </div>
                <div className="news-grid">
                    {news.map((article,index) => (
                             <div onClick={() => handlearticleclick(article)} key={index} className="newsgriditem">
                             <img src={article.image || noimg} alt={article.title} />
                             <h3> {article.title} <i className={`${bookmarks.some((bookmark) => bookmark.title === article.title)?"fa-solid" : "fa-regular"} fa-bookmark bookmark`} onClick={(e) =>{
                e.stopPropagation()
                handlebookmarkclick(article)
            }}></i></h3>
                         </div>
                    ))}
                    
                    
                </div>
            </div>
            <NewsModal show={showmodal} article = {selectedarticle} onClose={() => setShowmodal(false)}/>
                <Bookmarks show= {showbookmarksmodel} bookmarks = {bookmarks} onClose = {() => setShowbookmarksmodel(false)} onselectarticle = {handlearticleclick} ondeletebookmark = {handlebookmarkclick}/>
            <div className="my-blogs">
                <h1 className='myblogsheading'>My Blogs</h1>
                <div className="blogsposts">
                    {blogs.map((blog, index) => (
                        <div key={index} className="blogpost" onClick={() => handleblogclick(blog)}>
                         <img src={blog.image || noimg} alt={blog.title}/>
                         <h3>{blog.title}</h3>
                         <div className="postbuttons">
                            <button className="editpost" onClick={() => oneditblog(blog)}>
                                <i className="bx bxs-edit"></i>
                            </button>
                            <button className="deletepost" onClick={(e) => { 
                                e.stopPropagation()
                                onDeleteblog(blog)
                                }}>
                                <i className="bx bx-x-circle"></i>
                            </button>

                        </div>
                        </div>
                    ))}
                    </div>
                    {selectedpost && showblogsmodel && (
                       <Blogsmodal show = {showblogsmodel} blog={selectedpost} onClose={closeblogmodal}/>
                    )}
                    
                    </div>
            <div className="weather-calender">
            <Weather/>
            <Calendar/>
            </div>
        </div>
        <footer className="news-footer">
            <p>
                <span>The Daily Scoop</span>
                </p>
                <p>&copy; All Right Reserved. By Dharam Nath Jha</p>
            
        </footer>
    </div>
  )
}

export default News