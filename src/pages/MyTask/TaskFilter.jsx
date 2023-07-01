import { Space, Select, Input } from "antd";
import React, { useMemo } from "react";
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from "@/constants/Constants";
import { useSearchParams } from "react-router-dom";

const TaskFilter = ({ filter }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterData = useMemo(() => {
    return {
      keyword: filter.keyword || null,
      type: filter.type || null,
      status: filter.status || null,
      priority: filter.priority || null,
    };
  }, [filter]);

  const changeSearchParam = (field, value) => {
    if (value) searchParams.set(field, value);
    else searchParams.delete(field);

    searchParams.delete("page");
    setSearchParams(searchParams);
  };
  return (
    <Space>
      <Input.Search
        defaultValue={filterData.keyword}
        allowClear
        onSearch={(value) => {
          const text = value.replaceAll(" ", "%");
          changeSearchParam("keyword", text);
        }}
        placeholder="Search task"
        style={{ width: "300px" }}
      />
      <Select
        allowClear
        defaultValue={filterData.type}
        onChange={(value) => changeSearchParam("type", value)}
        placeholder="Type"
        style={{ width: "100px" }}
      >
        {TYPE_OPTIONS.map((option) => (
          <Select.Option key={option.id} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
      <Select
        allowClear
        defaultValue={filterData.status}
        onChange={(value) => changeSearchParam("status", value)}
        placeholder="Status"
        style={{ width: "100px" }}
      >
        {STATUS_OPTIONS.map((option) => (
          <Select.Option key={option.id} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
      <Select
        allowClear
        defaultValue={filterData.priority}
        onChange={(value) => changeSearchParam("priority", value)}
        placeholder="Priority"
        style={{ width: "100px" }}
      >
        {PRIORITY_OPTIONS.map((option) => (
          <Select.Option key={option.id} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};

export default TaskFilter;
