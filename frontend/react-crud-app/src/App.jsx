import { useState, useRef } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import { addPost, updatePost } from "./api/postsApi";

function App() {
  const [editData, setEditData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); 
  const headerRef = useRef(null);

  const handleSubmit = async (data) => {
    if (editData) {
      await updatePost(editData.id, data);
      setEditData(null);
    } else {
      await addPost(data);
    }
    setRefreshKey((prev) => prev + 1); 
  };

  const scrollToHeader = () => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
      headerRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-purple-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1
          tabIndex={-1}
          ref={headerRef}
          className="flex items-center justify-center gap-3 text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-10 tracking-tight drop-shadow-xl hover:drop-shadow-2xl transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 text-pink-600"
          >
            <path
              fillRule="evenodd"
              d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          <span>POST CRUD APP</span>
        </h1>
        <PostForm onSubmit={handleSubmit} initialData={editData} />
        <PostList
          onEdit={setEditData}
          refreshKey={refreshKey}
          onDeleted={scrollToHeader}
        />{" "}
      </div>
    </div>
  );
}

export default App;
