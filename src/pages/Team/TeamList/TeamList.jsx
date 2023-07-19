import { useMemo, useState } from "react";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";
import Loader from "@/components/Loader/Loader";
import { useGetTeams } from "@/hooks/team";
import { Bar, Container, Heading } from "./team-list-styles";
import { Button, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { formatDate2 } from "@/utils/formatInfo";
import CreateTeam from "./Form/CreateTeam";
import Teams from "./Teams";
import { useSearchParams } from "react-router-dom";

const TeamList = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParams = useMemo(() => {
    return {
      page: searchParams.get("page") || 1,
      keyword: searchParams.get("keyword") || undefined,
    };
  }, [searchParams]);
  const { isTeamsLoading, teams, teamsRefetch } = useGetTeams(filterParams);

  const data = useMemo(() => {
    return {
      list: teams
        ? teams.list.map((value) => ({
            key: value.id,
            id: value.id,
            name: value.name,
            create: formatDate2(value.create_at, "LL"),
            notes: value.team_users.reduce((count, cur) => {
              return count + cur.notes.length;
            }, 0),
            users: value.team_users.length,
          }))
        : [],
      total: teams ? teams.total : 0,
    };
  }, [teams]);

  const handleTableChange = (page) => {
    if (page.current !== 1) searchParams.set("page", page.current);
    else searchParams.delete("page");

    setSearchParams(searchParams);
  };

  const handleSearch = (value) => {
    const text = value.replaceAll(" ", "%");
    if (text) searchParams.set("keyword", text);
    else searchParams.delete("keyword");

    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  return (
    <MainLayout>
      <Container>
        <Heading>Team List</Heading>
        <Bar>
          <Input.Search
            defaultValue={filterParams.keyword || null}
            allowClear
            placeholder="Search team"
            onSearch={handleSearch}
            style={{ width: "300px" }}
          />
          <Button
            icon={<PlusCircleOutlined />}
            type="primary"
            onClick={() => setIsCreate(true)}
          >
            Create Team
          </Button>
        </Bar>
        {isCreate && (
          <CreateTeam
            open={isCreate}
            onClose={() => setIsCreate(false)}
            teamsRefetch={teamsRefetch}
          />
        )}
        <section>
          {isTeamsLoading ? (
            <Loader />
          ) : (
            <Teams
              data={data}
              isLoading={isTeamsLoading}
              teamsRefetch={teamsRefetch}
              current={Number(filterParams.page)}
              onTableChange={handleTableChange}
            />
          )}
        </section>
      </Container>
    </MainLayout>
  );
};

export default TeamList;
