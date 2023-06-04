import React, { useMemo } from "react";
import { FilterBar } from "./task-styles";
import { Input, Select } from "antd";
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from "../../../../constants/Constants";
import { useSearchParams } from "react-router-dom";

const TaskFilter = ({ filter, users }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterData = useMemo(() => {
    return {
      keyword: filter.keyword ? filter.keyword : null,
      type: filter.type ? filter.type : null,
      status: filter.status ? filter.status : null,
      priority: filter.priority ? filter.priority : null,
      assignee: filter.assignee
        ? users.find((item) => item.id === Number(filter.assignee)).label
        : null,
      reporter: filter.reporter
        ? users.find((item) => item.id === Number(filter.reporter)).label
        : null,
    };
  }, [filter, users]);

  const handleSearchKeyword = (value) => {
    const text = value.replaceAll(" ", "%");
    if (text) searchParams.set("keyword", text);
    else searchParams.delete("keyword");

    setSearchParams(searchParams);
  };

  const handleChangeType = (value) => {
    if (value) searchParams.set("type", value);
    else searchParams.delete("type");

    setSearchParams(searchParams);
  };

  const handleChangeStatus = (value) => {
    if (value) searchParams.set("status", value);
    else searchParams.delete("status");

    setSearchParams(searchParams);
  };

  const handleChangePriority = (value) => {
    if (value) searchParams.set("priority", value);
    else searchParams.delete("priority");

    setSearchParams(searchParams);
  };

  const handleChangeAssignee = (value) => {
    if (value) searchParams.set("assignee", value);
    else searchParams.delete("assignee");

    setSearchParams(searchParams);
  };

  const handleChangeReporter = (value) => {
    if (value) searchParams.set("reporter", value);
    else searchParams.delete("reporter");

    setSearchParams(searchParams);
  };

  return (
    <FilterBar>
      <Input.Search
        defaultValue={filterData.keyword}
        allowClear
        onSearch={handleSearchKeyword}
        placeholder="Search task"
        style={{ width: "200px" }}
      />
      <Select
        allowClear
        defaultValue={filterData.type}
        onChange={handleChangeType}
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
        onChange={handleChangeStatus}
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
        onChange={handleChangePriority}
        placeholder="Priority"
        style={{ width: "100px" }}
      >
        {PRIORITY_OPTIONS.map((option) => (
          <Select.Option key={option.id} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
      <Select
        allowClear
        defaultValue={filterData.assignee}
        onChange={handleChangeAssignee}
        placeholder="Assignee"
        style={{ width: "150px" }}
      >
        {users.map((option) => (
          <Select.Option key={option.id} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
      <Select
        allowClear
        defaultValue={filterData.reporter}
        onChange={handleChangeReporter}
        placeholder="Reporter"
        style={{ width: "150px" }}
      >
        {users.map((option) => (
          <Select.Option key={option.id} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </FilterBar>
  );
};

export default TaskFilter;
