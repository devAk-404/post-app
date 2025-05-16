import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const PostForm = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || { userId: "", title: "", body: "" },
  });

  useEffect(() => {
    reset(initialData || { userId: "", title: "", body: "" });
  }, [initialData, reset]);

  const onFormSubmit = async (data) => {
    const preparedData = { ...data, userId: Number(data.userId) };

    onSubmit(preparedData);

    if (!initialData) {
      reset();

      await Swal.fire({
        icon: "success",
        title: "Post Added",
        text: "Your post was successfully created!",
        timer: 7000,
        showConfirmButton: false,
      });
    } else {
      await Swal.fire({
        icon: "success",
        title: "Post Updated",
        text: "Your post was successfully updated!",
        timer: 7000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        {initialData ? "Edit Post" : "Create New Post"}
      </h2>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="space-y-5"
        noValidate
      >
        {/* User ID */}
        <div>
          <label className="block mb-1 text-gray-700">User ID</label>
          <input
            {...register("userId", {
              required: "User ID is required",
              pattern: {
                value: /^\d+$/,
                message: "User ID must be an integer",
              },
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.userId ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter User ID"
          />
          {errors.userId && (
            <p className="text-red-600 text-sm mt-1">{errors.userId.message}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 text-gray-700">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Post Title"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Body */}
        <div>
          <label className="block mb-1 text-gray-700">Body</label>
          <textarea
            {...register("body", { required: "Body is required" })}
            className={`w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.body ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Write your content here..."
            rows={4}
          />
          {errors.body && (
            <p className="text-red-600 text-sm mt-1">{errors.body.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className={`px-6 py-2 font-semibold text-white rounded-lg shadow-md ${
              initialData
                ? "bg-indigo-500 hover:bg-indigo-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {initialData ? "Update Post" : "Add Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
