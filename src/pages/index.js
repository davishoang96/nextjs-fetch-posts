import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import PostDetails from '../components/PostDetail';
import PostList from '../components/PostList';
import Pagination from '../components/Pagination';

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const POSTS_PER_PAGE = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data);
        setLoadingPosts(false);
      } catch (error) {
        setError(error.message);
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  const fetchPostDetails = async (postId) => {
    setLoadingDetails(true);
    setError(null);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      if (!response.ok) throw new Error('Failed to fetch post details');
      const data = await response.json();
      setSelectedPost(data);
      setLoadingDetails(false);
    } catch (error) {
      setError(error.message);
      setLoadingDetails(false);
    }
  };

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container my-4">
      <header>
        <h1 className="text-center mb-4">Post Viewer</h1>
      </header>
      <section>
        <h2>Posts</h2>
        <PostList
          posts={currentPosts}
          fetchPostDetails={fetchPostDetails}
          loadingPosts={loadingPosts}
          error={error}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </section>
      <section>
        <h2>Post Details</h2>
        <PostDetails
          selectedPost={selectedPost}
          loadingDetails={loadingDetails}
          error={error}
        />
      </section>
    </div>
  );
}

export default App;
