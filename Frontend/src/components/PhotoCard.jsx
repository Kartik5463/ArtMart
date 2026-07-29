import { Heart, MessageCircle, X, Send, Pencil, Trash2, Check } from "lucide-react";
import useAuthStore from "../store/UseAuthStore";
import { useState } from "react";

const PhotoCard = ({ photo }) => {
  const { token, user } = useAuthStore();
  const [isLiked, setIsLiked] = useState(
    photo.likedBy?.includes(user.userId)
  );
  const [likes, setLikes] = useState(photo.likes);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleClick = async () => {
    const url = isLiked
      ? `http://localhost:5000/api/photo/unlike/${photo._id}`
      : `http://localhost:5000/api/photo/like/${photo._id}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data.photo);

      if (!isLiked) {
        setLikes((prev) => prev + 1);
      } else {
        setLikes((prev) => prev - 1);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLiked(!isLiked);
    }
  };

  const handleTransaction = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/transaction/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          photoId: photo._id,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        return;
      }
      window.location.reload();

      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const openComments = async () => {
    setShowComments(true);
    setLoadingComments(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/comments/all/${photo._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setComments(data.comments);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/comments/add-comment/${photo._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: commentText }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setComments((prev) => [data.comment, ...prev]);
      setCommentText("");
    } catch (err) {
      console.log(err.message);
    }
  };

  const startEditing = (comment) => {
    setEditingId(comment._id);
    setEditText(comment.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleUpdateComment = async (commentId) => {
    if (!editText.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/comments/update-comment/${commentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: editText }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? data.updated : c))
      );
      cancelEditing();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/comments/delete-comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={`http://localhost:5000${photo.imageUrl}`}
            alt={photo.title}
            className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
          />
          {/* Sale Badge */}
          <span className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {photo.isForSale ? "For Sale" : <span className="text-red-500">Not for sale</span>}
          </span>
          {/* Like Button */}
          <button
            onClick={handleClick}
            className={`absolute top-4 right-4 backdrop-blur-sm p-2 rounded-full transition ${
              isLiked ? "bg-red-500 text-white" : "bg-white/80 hover:bg-red-500 hover:text-white"
            }`}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Details */}
        <div className="p-5 space-y-4">

  {/* Title + Likes */}
  <div className="flex justify-between gap-3 items-start">

    <div className="min-w-0">
      <h2 className="text-xl font-bold text-gray-800 truncate">
        {photo.title}
      </h2>

      <p className="text-gray-500 text-sm truncate">
        by{" "}
        <span className="font-medium text-gray-700">
          {photo.photographer.name}
        </span>
      </p>
    </div>


    <div className="flex items-center gap-3 text-sm text-gray-500 shrink-0">
      <div className="flex items-center gap-1">
        <Heart
          size={14}
          fill={isLiked ? "currentColor" : "none"}
          className={isLiked ? "text-red-500" : ""}
        />
        <span>{likes}</span>
      </div>

      <button
        onClick={openComments}
        className="hover:text-indigo-600 transition"
      >
        <MessageCircle size={16}/>
      </button>
    </div>

  </div>



  {/* Price + Actions */}
  <div className="
      flex 
      flex-col 
      sm:flex-row 
      sm:items-center 
      justify-between 
      gap-3
  ">

    <span className="text-2xl font-bold text-indigo-600">
      ₹{photo.price}
    </span>


    <div className="
        flex 
        gap-2 
        flex-wrap 
        justify-end
        w-full
        sm:w-auto
    ">


      {
      photo.photographer._id !== user.userId &&
      photo.photographer !== user.userId &&
      photo.isForSale && (

        <button
          onClick={handleTransaction}
          className="
            bg-green-500
            hover:bg-green-600
            text-white
            px-4
            py-2
            rounded-xl
            transition
            font-medium
            text-sm
            whitespace-nowrap
          "
        >
          Buy Now
        </button>

      )}



      <button
        onClick={openComments}
        className="
          border
          border-indigo-200
          text-indigo-600
          hover:bg-indigo-50
          px-3
          py-2
          rounded-xl
          transition
          font-medium
          flex
          items-center
          gap-1.5
          text-sm
          whitespace-nowrap
        "
      >
        <MessageCircle size={15}/>
        Comments
      </button>


    </div>

  </div>

</div>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowComments(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b bg-gray-50">
              <div>
                <h3 className="font-bold text-gray-800">Comments</h3>
                <p className="text-xs text-gray-500 line-clamp-1">{photo.title}</p>
              </div>
              <button
                onClick={() => setShowComments(false)}
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full p-1.5 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Comment list */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {loadingComments && (
                <p className="text-gray-400 text-sm text-center py-6">Loading comments...</p>
              )}

              {!loadingComments && comments.length === 0 && (
                <div className="text-center py-10">
                  <MessageCircle size={28} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-400 text-sm">No comments yet. Be the first!</p>
                </div>
              )}

              {comments.map((c) => {
                const isOwner = c.user?._id === user.userId;
                const isEditing = editingId === c._id;

                return (
                  <div key={c._id} className="flex gap-3 group/comment">
                    <img
                      src={
                        c.user?.profileImg?.startsWith("http")
                          ? c.user.profileImg
                          : `http://localhost:5000${c.user?.profileImg}`
                      }
                      className="h-8 w-8 rounded-full object-cover shrink-0 border border-gray-100"
                      alt=""
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">
                        {c.user?.name}
                      </p>

                      {isEditing ? (
                        <div className="flex gap-2 mt-1">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleUpdateComment(c._id)
                            }
                            className="flex-1 border border-gray-200 rounded-lg px-2 py-1 text-sm outline-none focus:border-indigo-400"
                            autoFocus
                          />
                          <button
                            onClick={() => handleUpdateComment(c._id)}
                            className="text-green-600 hover:text-green-700 shrink-0"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="text-gray-400 hover:text-gray-600 shrink-0"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600 break-words">{c.text}</p>
                      )}
                    </div>

                    {isOwner && !isEditing && (
                      <div className="flex items-start gap-2 opacity-0 group-hover/comment:opacity-100 transition shrink-0">
                        <button
                          onClick={() => startEditing(c)}
                          className="text-gray-400 hover:text-indigo-600"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(c._id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-gray-50 flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                placeholder="Add a comment..."
                className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-indigo-400 bg-white"
              />
              <button
                onClick={handleAddComment}
                disabled={!commentText.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2.5 rounded-full transition shrink-0"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoCard;