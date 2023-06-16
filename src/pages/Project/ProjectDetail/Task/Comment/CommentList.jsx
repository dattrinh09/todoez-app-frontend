import React, { useEffect, useState } from "react";
import useGetComments from "@/hooks/project/comment/useGetComments";
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
import axiosInstance from "@/request/axiosInstance";
import { errorResponse } from "@/utils/errorResponse";
import Loader from "@/components/Loader/Loader";
import { notificationShow } from "@/utils/notificationShow";
import { formatDate } from "@/utils/formatInfo";
import EditComment from "./Form/EditComment";

const { confirm } = Modal;

const CommentList = ({ projectId, taskId }) => {
  const { userInfo } = useSelector(userSelector);
  const [content, setContent] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const { isCommentsLoading, comments, commentsFetch, commentsFilter } =
    useGetComments(projectId, taskId, false);

  useEffect(() => {
    commentsFilter({ page });
  }, [page]);

  const handleCreateComment = async () => {
    if (content) {
      setIsCreating(true);
      try {
        await axiosInstance.post(`comments/${projectId}`, {
          task_id: Number(taskId),
          content,
        });
        commentsFetch(true);
      } catch (e) {
        errorResponse(e.response);
      } finally {
        setIsCreating(false);
        setContent("");
      }
    }
  };

  const handleDeleteComment = (id) => {
    confirm({
      title: "Do you want to remove this comment?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await axiosInstance.delete(`comments/${projectId}/${id}`);
          notificationShow("success", "Remove comment successfully");
          commentsFetch(true);
        } catch (e) {
          console.log(e);
          errorResponse(e.response);
        }
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
            <Button loading={isCreating} onClick={handleCreateComment}>
              Add comment
            </Button>
          </div>
        </CommentForm>
      </CommentCreate>
      {isCommentsLoading ? (
        <Loader />
      ) : (
        <List
          size="middle"
          itemLayout="vertical"
          bordered
          dataSource={comments ? comments.list : []}
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
                      commentsRefetch={() => commentsFetch(true)}
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
                  <Avatar style={{ backgroundColor: "#1677ff", color: "fff" }}>
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
      )}
    </CommentContainer>
  );
};

export default CommentList;
