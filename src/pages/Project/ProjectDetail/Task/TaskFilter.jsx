import React, { useMemo } from "react";
import { FilterBar } from "./task-styles";
import { Input, Select } from "antd";
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from "@/constants/Constants";
import { useSearchParams } from "react-router-dom";

const TaskFilter = ({ filter, users }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterData = useMemo(() => {
    return {
      keyword: filter.keyword || null,
      type: filter.type || null,
      status: filter.status || null,
      priority: filter.priority || null,
      assignee: filter.assignee
        ? users.find((item) => item.value === Number(filter.assignee)).label
        : null,
      reporter: filter.reporter
        ? users.find((item) => item.value === Number(filter.reporter)).label
        : null,
    };
  }, [filter, users]);

  const changeSearchParam = (field, value) => {
    if (value) searchParams.set(field, value);
    else searchParams.delete(field);

    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  return (
    <FilterBar>
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
        style={{ width: "150px" }}
      >
        {TYPE_OPTIONS.map((option) => (
          <Select.Option key={option.id} value={option.value}>
            <span style={{ color: `${option.color}` }}>{option.label}</span>
          </Select.Option>
        ))}
      </Select>
      <Select
        allowClear
        defaultValue={filterData.status}
        onChange={(value) => changeSearchParam("status", value)}
        placeholder="Status"
        style={{ width: "150px" }}
      >
        {STATUS_OPTIONS.map((option) => (
          <Select.Option key={option.id} value={option.value}>
            <span style={{ color: `${option.color}` }}>{option.label}</span>
          </Select.Option>
        ))}
      </Select>
      <Select
        allowClear
        defaultValue={filterData.priority}
        onChange={(value) => changeSearchParam("priority", value)}
        placeholder="Priority"
        style={{ width: "150px" }}
      >
        {PRIORITY_OPTIONS.map((option) => (
          <Select.Option key={option.id} value={option.value}>
            <span style={{ color: `${option.color}` }}>{option.label}</span>
          </Select.Option>
        ))}
      </Select>
      <Select
        allowClear
        showSearch
        defaultValue={filterData.assignee}
        onChange={(value) => changeSearchParam("assignee", value)}
        placeholder="Assignee"
        style={{ width: "150px" }}
        filterOption={(input, option) =>
          (option?.label.toLocaleLowerCase() ?? "").includes(input)
        }
        options={users}
      />
      <Select
        allowClear
        showSearch
        defaultValue={filterData.reporter}
        onChange={(value) => changeSearchParam("reporter", value)}
        placeholder="Reporter"
        style={{ width: "150px" }}
        filterOption={(input, option) =>
          (option?.label.toLocaleLowerCase() ?? "").includes(input)
        }
        options={users}
      />
    </FilterBar>
  );
};

export default TaskFilter;
