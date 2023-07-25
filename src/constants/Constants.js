import TaskTypeIcon from "@/assets/images/task.svg";
import BugTypeIcon from "@/assets/images/bug.svg";
import LowestIcon from "@/assets/images/lowest.svg";
import LowIcon from "@/assets/images/low.svg";
import MediumIcon from "@/assets/images/medium.svg";
import HighIcon from "@/assets/images/high.svg";
import HighestIcon from "@/assets/images/highest.svg";

export const GoogleConstants = {
  clientId:
    "190197860178-noh9fjs59j1hvo2ehogv5f9t28iu3l5c.apps.googleusercontent.com",
};

export const PhoneNumberFormat = /(84|0[1|3|5|7|8|9])+([0-9]{8})\b/g;

export const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;

export const TYPE_OPTIONS = [
  {
    id: 1,
    label: "Task",
    value: "task",
    icon: TaskTypeIcon,
    color: "blue",
  },
  {
    id: 2,
    label: "Bug",
    value: "bug",
    icon: BugTypeIcon,
    color: "red",
  },
];

export const STATUS_OPTIONS = [
  {
    id: 1,
    label: "Assign",
    value: "assign",
    color: "#2f54eb",
  },
  {
    id: 2,
    label: "Doing",
    value: "doing",
    color: "#1677ff",
  },
  {
    id: 3,
    label: "Complete",
    value: "complete",
    color: "#eb2f96",
  },
  {
    id: 4,
    label: "Test",
    value: "test",
    color: "#722ed1",
  },
  {
    id: 5,
    label: "Resolve",
    value: "resolve",
    color: "#52c41a",
  },
  {
    id: 6,
    label: "Reject",
    value: "reject",
    color: "#f5222d",
  },
];

export const PRIORITY_OPTIONS = [
  {
    id: 1,
    label: "Lowest",
    value: "lowest",
    icon: LowestIcon,
    color: "blue",
  },
  {
    id: 2,
    label: "Low",
    value: "low",
    icon: LowIcon,
    color: "blue",
  },
  {
    id: 3,
    label: "Medium",
    value: "medium",
    icon: MediumIcon,
    color: "orange",
  },
  {
    id: 4,
    label: "High",
    value: "high",
    icon: HighIcon,
    color: "red",
  },
  {
    id: 5,
    label: "Highest",
    value: "highest",
    icon: HighestIcon,
    color: "red",
  },
];
