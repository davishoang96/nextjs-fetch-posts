import React from 'react';

function PostDetails({ selectedPost, loadingDetails, error }) {
  if (loadingDetails) {
    return <p>Loading post details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return selectedPost ? (
    <div>
      <h3>{selectedPost.title}</h3>
      <p>{selectedPost.body}</p>
    </div>
  ) : (
    <p>Select a post to view details</p>
  );
}

export default PostDetails;
