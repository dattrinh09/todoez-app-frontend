import { Button, Divider, List, Modal } from "antd";
import React, { useState } from "react";
import EditNote from "./Form/EditNote";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";
import { useMutateNote } from "@/hooks/note";
import MyAvatar from "@/components/MyAvatar/MyAvatar";
import { Content, ContentSection, ContentTitle } from "./note-styles";

const { confirm } = Modal;

const Notes = ({ notes, teamId, notesRefetch }) => {
  const [selected, setSelected] = useState(null);
  const { mutateNoteFn, isMutateNoteLoading } = useMutateNote();

  const handleDeleteNote = (id) => {
    confirm({
      title: "Do you want to remove this note?",
      okText: "Yes",
      cancelText: "No",
      okButtonProps: {
        loading: isMutateNoteLoading,
      },
      onOk: () => {
        mutateNoteFn(
          {
            type: "delete",
            param: [teamId, id],
          },
          {
            onSuccess: () => {
              notificationShow("success", "Delete note successfully");
              notesRefetch();
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
    <>
      {notes.map((note) => (
        <div key={note.date}>
          <Divider orientation="left">{note.date}</Divider>
          <List
            bordered
            dataSource={note.list}
            itemLayout="vertical"
            style={{ backgroundColor: "#fff" }}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                extra={[
                  <Button type="link" onClick={() => setSelected(item)}>
                    Edit
                  </Button>,
                  <Button
                    type="link"
                    danger
                    onClick={() => handleDeleteNote(item.id)}
                  >
                    Delete
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <MyAvatar
                      size="large"
                      src={item.user.user.avatar}
                      name={item.user.user.fullname}
                    />
                  }
                  title={<span>{item.user.user.fullname}</span>}
                  description={<span>{item.create_time}</span>}
                />
                <Content>
                  <ContentTitle>{item.content}</ContentTitle>
                  <ContentSection>{item.description}</ContentSection>
                </Content>
              </List.Item>
            )}
          />
        </div>
      ))}
      {selected && (
        <EditNote
          note={selected}
          onClose={() => setSelected(null)}
          teamId={teamId}
          notesRefetch={notesRefetch}
        />
      )}
    </>
  );
};

export default Notes;
