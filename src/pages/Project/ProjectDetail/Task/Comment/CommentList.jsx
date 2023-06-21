import React, { useState } from "react";
import {
  ButtonGroup,
  CommentContainer,
  CommentCreate,
  CommentForm,
} from "./comment-styles";
import { Avatar, Button, Input, List, Modal, Space, Tag } from "antd";
import { useSelector } from "react-redux";
import { userSelector } from "@/stores/selectors";
import { formatDisplayName } from "@/utils/formatInfo";
import Loader from "@/components/Loader/Loader";
import { formatDate } from "@/utils/formatInfo";
import EditComment from "./Form/EditComment";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetComments, useMutateComment } from "@/hooks/comment";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const { confirm } = Modal;

const CommentList = ({ projectId, taskId }) => {
  const { userInfo } = useSelector(userSelector);
  const [content, setContent] = useState("");
  const [selected, setSelected] = useState(null);

  const {
    comments,
    isCommentsLoading,
    isCommentsNext,
    commentsFetchNext,
    commentsRefetch,
  } = useGetComments(projectId, taskId);
  const { mutateCommentFn, isMutateCommentLoading } = useMutateComment();

  const loadMoreComments = async () => {
    if (isCommentsNext) await commentsFetchNext();
  };

  const handleCreateComment = () => {
    if (content) {
      const newComment = {
        task_id: Number(taskId),
        content,
      };
      mutateCommentFn(
        {
          type: "create",
          param: [projectId, newComment],
        },
        {
          onSuccess: () => {
            notificationShow("success", "Add comment successfully");
            commentsRefetch();
          },
          onError: (error) => {
            errorResponse(error.response);
          },
          onSettled: () => {
            setContent("");
          },
        }
      );
    }
  };

  const handleDeleteComment = (commentId) => {
    confirm({
      title: "Do you want to remove this comment?",
      okText: "Yes",
      cancelText: "No",
      okButtonProps: {
        loading: isMutateCommentLoading,
      },
      onOk: () => {
        mutateCommentFn(
          {
            type: "delete",
            param: [projectId, commentId],
          },
          {
            onSuccess: () => {
              notificationShow("success", "Remove comment successfully");
              commentsRefetch();
            },
            onError: (error) => {
              errorResponse(error.response);
            },
          }
        );
      },
    });
  };

  return (
    <CommentContainer>
      <div>
        <Tag color="#222222">Comment</Tag>
      </div>
      <CommentCreate>
        <Avatar
          size="large"
          style={{ backgroundColor: "#1677ff", color: "fff" }}
        >
          {formatDisplayName(userInfo.fullname)}
        </Avatar>
        <CommentForm>
          <Input.TextArea
            value={content}
            rows={2}
            allowClear
            placeholder="Add a comment..."
            onChange={(e) => setContent(e.target.value)}
          />
          <div>
            <Button
              loading={isMutateCommentLoading}
              onClick={handleCreateComment}
            >
              Add comment
            </Button>
          </div>
        </CommentForm>
      </CommentCreate>
      {isCommentsLoading ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={10}
          next={loadMoreComments}
          hasMore={isCommentsNext}
          loader={<Loader />}
        >
          <List
            size="middle"
            itemLayout="vertical"
            bordered
            dataSource={comments}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <ButtonGroup>
                    <Button
                      size="small"
                      type="link"
                      onClick={() => setSelected(item)}
                    >
                      Edit
                    </Button>
                    {selected && (
                      <EditComment
                        comment={selected}
                        onClose={() => setSelected(null)}
                        projectId={projectId}
                        commentsRefetch={commentsRefetch}
                      />
                    )}
                    <Button
                      size="small"
                      type="link"
                      onClick={() => handleDeleteComment(item.id)}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{ backgroundColor: "#1677ff", color: "fff" }}
                    >
                      {formatDisplayName(item.user.user.fullname)}
                    </Avatar>
                  }
                  title={
                    <Space>
                      <span>{item.user.user.fullname}</span>
                      <span style={{ color: "#1677ff" }}>
                        {formatDate(item.update_at)}
                      </span>
                    </Space>
                  }
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      )}
    </CommentContainer>
  );
};

export default CommentList;
