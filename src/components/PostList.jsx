import React from 'react';

function PostList({ posts, fetchPostDetails, loadingPosts, error }) {
  if (loadingPosts) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-md-4 mb-4">
            <div
              className="card h-100"
              onClick={() => fetchPostDetails(post.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body.slice(0, 50)}...</p> {/* Preview of the post body */}
                <button className="btn btn-primary">Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
