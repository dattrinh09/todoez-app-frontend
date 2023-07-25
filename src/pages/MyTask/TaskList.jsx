import { Button, Divider, List, Space, Tag, Tooltip } from "antd";
import React, { useState } from "react";
import MyTooltip from "@/components/MyTooltip/MyTooltip";
import { TitleBar, Content, SubContent } from "./my-task-styles";
import { Link } from "react-router-dom";
import {
  getTaskListRoute,
  getSprintListRoute,
  getTaskDetailRoute,
} from "@/utils/route";
import UpdateTaskStatus from "./Form/UpdateTaskStatus";
import ErrorText from "@/components/ErrorText/ErrorText";


const TaskList = ({ myTasks, myTasksRefetch }) => {
  const [selected, setSelected] = useState(null);
  return (
    <>
      {myTasks.map((task) => (
        <div key={task.date}>
          <Divider orientation="left">
            <Space>
              <span>{task.date}</span>
              <span>\</span>
              <span>{task.list.length}</span>
              <span>tasks</span>
            </Space>
          </Divider>
          <List
            bordered
            dataSource={task.list}
            style={{ backgroundColor: "#fff" }}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={
                    <TitleBar>
                      <Space>
                        <MyTooltip tooltip={item.type} />
                        <Link
                          to={getTaskDetailRoute(
                            item.sprint.project.id,
                            item.id
                          )}
                        >
                          <Content>{item.content}</Content>
                        </Link>
                      </Space>
                      <Space>
                        <Tooltip
                          title="Update status"
                          color={item.status.color}
                        >
                          <Button
                            size="small"
                            style={{
                              color: "#fff",
                              backgroundColor: item.status.color,
                            }}
                            onClick={() => setSelected(item)}
                          >
                            {item.status.label}
                          </Button>
                        </Tooltip>
                      </Space>
                    </TitleBar>
                  }
                  description={
                    <SubContent>
                      <Space>
                        <MyTooltip tooltip={item.priority} />
                        <span>End at:</span>
                        <ErrorText
                          check={item.is_over}
                          title="Over due"
                          content={item.end_at}
                        />
                      </Space>
                      <Space>
                        <Tag color="blue">
                          <Link
                            to={getTaskListRoute(item.sprint.project.id)}
                          >
                            {item.sprint.project.name}
                          </Link>
                        </Tag>
                        <Tag color="blue">
                          <Link to={getSprintListRoute(item.sprint.project.id)}>
                            {item.sprint.title}
                          </Link>
                        </Tag>
                      </Space>
                    </SubContent>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      ))}
      {selected && (
        <UpdateTaskStatus
          task={selected}
          onClose={() => setSelected(null)}
          myTasksRefetch={myTasksRefetch}
        />
      )}
    </>
  );
};

export default TaskList;
