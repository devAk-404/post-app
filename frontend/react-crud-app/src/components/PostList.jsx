import { useEffect, useState, useCallback, useRef } from "react";
import Swal from "sweetalert2";
import { getPosts, deletePost } from "../api/postsApi";
import PostCard from "./PostCard";

const PostList = ({ onEdit, refreshKey, onDeleted }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const headingRef = useRef(null);

  const LIMIT = 5;

  const loadPosts = async (reset = false) => {
    setLoading(true);
    setError(null);

    try {
      const currentPage = reset ? 1 : page;
      const res = await getPosts(currentPage, LIMIT);
      const newPosts = res.data;

      if (reset) {
        setPosts(newPosts);
        setPage(2);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
        setPage(currentPage + 1);
      }

      setHasMore(newPosts.length === LIMIT);
    } catch (err) {
      setError("Failed to fetch posts.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(true);
  }, [refreshKey]);

  const handleDelete = useCallback(
    async (id) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This post will be permanently deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        setDeletingId(id);

        try {
          await new Promise((resolve) => setTimeout(resolve, 500));

          await deletePost(id);

          setPosts((prev) => prev.filter((post) => post.id !== id));
          setDeletingId(null);

          if (onDeleted) onDeleted();

          Swal.fire("Deleted!", "The post has been deleted.", "success");
        } catch (err) {
          console.error("Error deleting post:", err);
          setError("Failed to delete post. Please try again.");
          setDeletingId(null);

          Swal.fire("Error", "Something went wrong while deleting.", "error");
        }
      }
    },
    [onDeleted]
  );

  return (
    <div className="bg-indigo-50 shadow-2xl border border-indigo-200 p-6 rounded-2xl max-w-4xl mx-auto mt-8">
      <h2
        ref={headingRef} 
        tabIndex={-1}
        className="text-3xl font-bold text-indigo-800 mb-6"
      >
        All Posts
      </h2>

      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={onEdit}
            onDelete={handleDelete}
            isDeleting={deletingId === post.id}
            isAnyDeleting={!!deletingId}
          />
        ))}

        {!loading && posts.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No posts available.</p>
        )}

        {loading && (
          <div className="text-center text-indigo-600 font-medium py-4">
            Loading...
          </div>
        )}

        {!loading && hasMore && (
          <div className="text-center mt-6">
            <button
              onClick={() => loadPosts()}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition"
            >
              Load More
            </button>
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <p className="text-center text-gray-500 mt-4">
            No more posts to load.
          </p>
        )}
      </div>
    </div>
  );
};

export default PostList;
