import React, { useEffect, useState } from 'react'
import VideosList from './components/VideosList'
import { getVideos, searchVideos } from '../../services/api/videos'

const HomeScreens = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  // to fetch all the videos list 
  const fetchVideosHandler = () => {
    setLoading(true)
    getVideos()
      .then((res) => {
        setVideos(res?.data?.videos)
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
  }

  const searchInput = (event) => {
    if (event?.target?.length === 0) {

    }
    setSearchQuery(event?.target?.value)
  }

  const searchVideosHandler = () => {
    setLoading(true)
    setIsSearching(true)
    searchVideos({ searchQuery })
      .then((res) => {
        setSearchResults(res?.data?.videos)
      }).catch((err) => {
        console.log("search error", err)
        setIsSearching(false)
        fetchVideosHandler()
      }).finally(() => {
        setLoading(false)
      })
  }


  const clearSearchHandler = () => {
    setIsSearching(false)
    setSearchResults([])
    setSearchQuery("")
    fetchVideosHandler()
  }
  useEffect(() => {
    fetchVideosHandler()
  }, [])

  return (
    <div className='main-content-page home-screen-wrapper'>
      <div className="home-header-search">
        <span className="home-header">Select Languages</span>
        <span className="search-wrapper">
          <input placeholder='Search here' onChange={searchInput} value={searchQuery} type="text" className='search-input'/>
          <button onClick={() => searchVideosHandler()} className="search-button">Search</button>
          {isSearching &&
            <button onClick={() => clearSearchHandler()} className="clear-search-button">Clear Search</button>
          }
        </span>
      </div>

      <VideosList isSearching={isSearching} videos={isSearching ? searchResults : videos} loading={loading} />

    </div>
  )
}

export default HomeScreens