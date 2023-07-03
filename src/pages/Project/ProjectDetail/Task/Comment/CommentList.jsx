import React, { useState } from "react";
import {
  ButtonGroup,
  CommentContainer,
  CommentContent,
  CommentCreate,
  CommentForm,
} from "./comment-styles";
import { Button, Input, List, Modal, Space, Tag } from "antd";
import { useSelector } from "react-redux";
import { userSelector } from "@/stores/selectors";
import Loader from "@/components/Loader/Loader";
import { formatDate } from "@/utils/formatInfo";
import EditComment from "./Form/EditComment";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetComments, useMutateComment } from "@/hooks/comment";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";
import MyAvatar from "@/components/MyAvatar/MyAvatar";

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
        <MyAvatar size="large" src={userInfo.avatar} name={userInfo.fullname} />
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
        <>
          {comments.length > 0 && (
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
                style={{ backgroundColor: "#fff" }}
                renderItem={(item) => (
                  <List.Item
                    extra={[
                      <ButtonGroup>
                        <Button
                          size="small"
                          type="link"
                          onClick={() => setSelected(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          type="link"
                          danger
                          onClick={() => handleDeleteComment(item.id)}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <MyAvatar
                          src={item.user.user.avatar}
                          name={item.user.user.fullname}
                        />
                      }
                      title={
                        <Space>
                          <span>{item.user.user.fullname}</span>
                          <span style={{ color: "#1677ff" }}>
                            {formatDate(item.update_at)}
                          </span>
                        </Space>
                      }
                      description={
                        <CommentContent>{item.content}</CommentContent>
                      }
                    />
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          )}
        </>
      )}
      {selected && (
        <EditComment
          comment={selected}
          onClose={() => setSelected(null)}
          projectId={projectId}
          commentsRefetch={commentsRefetch}
        />
      )}
    </CommentContainer>
  );
};

export default CommentList;
