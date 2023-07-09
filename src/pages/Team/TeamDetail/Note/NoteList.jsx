import React, { useState } from "react";
import { Button, Empty, Space } from "antd";
import { PlusCircleOutlined, TeamOutlined } from "@ant-design/icons";
import TeamLayout from "@/components/Layout/TeamLayout/TeamLayout";
import Loader from "@/components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useGetNotes } from "@/hooks/note";
import { Bar, NoteTitle } from "./note-styles";
import CreateNote from "./Form/CreateNote";
import Notes from "./Notes";
import InfiniteScroll from "react-infinite-scroll-component";
import { getTeamUsersRoute } from "@/utils/route";

const NoteList = () => {
  const params = useParams();
  const navigate = useNavigate();
  const teamId = params["team_id"];
  const [isCreate, setIsCreate] = useState(false);

  const { notes, isNotesLoading, notesRefetch, isNotesNext, notesFetchNext } =
    useGetNotes(teamId);

  const loadMoreNotes = () => {
    if (isNotesNext) notesFetchNext();
  };

  const goToUserList = () => {
    navigate(getTeamUsersRoute(teamId));
  }

  return (
    <TeamLayout>
      <Bar>
        <NoteTitle>Note list</NoteTitle>
        <Space>
          <Button type="primary" icon={<TeamOutlined />} onClick={goToUserList}>
            Users
          </Button>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => setIsCreate(true)}
          >
            Create note
          </Button>
        </Space>
        {isCreate && (
          <CreateNote
            open={isCreate}
            teamId={teamId}
            onClose={() => setIsCreate(false)}
            notesRefetch={notesRefetch}
          />
        )}
      </Bar>
      {isNotesLoading ? (
        <Loader />
      ) : (
        <>
          {notes.length > 0 ? (
            <InfiniteScroll
              dataLength={10}
              next={loadMoreNotes}
              hasMore={isNotesNext}
              loader={<Loader />}
            >
              <Notes
                notes={notes}
                teamId={teamId}
                notesRefetch={notesRefetch}
              />
            </InfiniteScroll>
          ) : (
            <Empty description="No note" />
          )}
        </>
      )}
    </TeamLayout>
  );
};

export default NoteList;
