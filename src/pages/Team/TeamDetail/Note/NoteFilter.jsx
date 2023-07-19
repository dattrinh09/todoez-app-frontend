import { Input, Select, Space } from "antd";
import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const NoteFilter = ({ filter, users }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterData = useMemo(() => {
    return {
      keyword: filter.keyword || null,
      user: filter.user
        ? users.find((item) => item.value === Number(filter.user)).label
        : null,
    };
  }, [filter, users]);

  const changeSearchParam = (field, value) => {
    if (value) searchParams.set(field, value);
    else searchParams.delete(field);

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
        showSearch
        defaultValue={filterData.user}
        onChange={(value) => changeSearchParam("user", value)}
        placeholder="User"
        style={{ width: "150px" }}
        filterOption={(input, option) =>
          (option?.label.toLocaleLowerCase() ?? "").includes(input)
        }
        options={users}
      />
    </Space>
  );
};

export default NoteFilter;
