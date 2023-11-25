import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const toggleCommentsHandler = async () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = async (commentData) => {
    // send data to API
    notificationCtx.showNotification({ title: "저장중", messaeg: "댓글을 저장중입니다.", status: "pending" });
    const response = await fetch(`/api/comment/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      notificationCtx.showNotification({
        title: "저장 성공",
        messaeg: "댓글을 성공적으로 저장했습니다.",
        status: "success",
      });
    } else {
      notificationCtx.showNotification({
        title: "저장 실패",
        messaeg: "댓글 저장에 실패했습니다",
        status: "error",
      });
    }
    return data;
  };

  useEffect(() => {
    if (showComments) {
      setIsFetching(true);
      fetch(`/api/comment/${eventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetching(false);
        });
    }
  }, [showComments]);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? "Hide" : "Show"} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetching && <CommentList comments={comments} />}
      {showComments && isFetching && <p>댓글을 불러오는 중입니다.</p>}
    </section>
  );
}

export default Comments;
