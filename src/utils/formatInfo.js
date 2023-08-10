import moment from "moment";

export const formatDisplayName = (fullname) => {
  const arr = fullname.toLocaleUpperCase().split(" ");
  if (arr.length === 1) return arr[0].charAt(0);
  return arr[0].charAt(0) + arr[1].charAt(0);
};

export const formatPhoneNumber = (phoneNumber) => {
  return "+84 " + phoneNumber.slice(1);
};

export const convertDate = (date) => {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: "Asia/HO_CHI_MINH",
    })
  );
};

export const formatDate = (date) => {
  const d = convertDate(date);
  const dn = parseInt(moment(d).format("YYYYMMDD"));
  const n = parseInt(moment(Date.now()).format("YYYYMMDD"));

  if (dn === n) return moment(d).startOf("second").fromNow();

  return moment(d).format("LLL");
};

export const formatDate2 = (date, format) => {
  return moment(convertDate(date)).format(format);
};

export const formatDate3 = (date) => {
  const now = parseInt(moment(Date.now()).format("YYYYMMDDHHmmss"));
  const day = parseInt(formatDate2(date, "YYYYMMDDHHmmss"));

  if (day < now) return "Overdue";
  if (day === now) return "Today";
  if (day > now) {
    const wn = parseInt(moment(Date.now()).format("W"));
    const wd = parseInt(formatDate2(d, "W"));

    if (wd === wn) return "This week";
    if (wd - wn === 1) return "Next week";
  }
  return "Later";
};

export const formatDate4 = (date) => {
  const d = convertDate(date);

  return moment(d).calendar();
};

export const formatDate5 = (date) => {
  const now = parseInt(moment(Date.now()).format("YYYYMMDD"));
  const day = parseInt(formatDate2(date, "YYYYMMDD"));
  let str = "";

  switch (now - day) {
    case 0:
      str = "Today";
      break;
    case 1:
      str = "Yesterday";
      break;
    default:
      str = formatDate2(date, "LL");
  }

  return str;
};

export const formatRange = (start, end) => {
  const startDate = formatDate2(start, "LL");
  const endDate = formatDate2(end, "LL");

  return startDate + " ~ " + endDate;
};

export const checkDateInRange = (date, start, end) => {
  const d = parseInt(formatDate2(date, "YYYYMMDD"));
  const st = parseInt(formatDate2(start, "YYYYMMDD"));
  const en = parseInt(formatDate2(end, "YYYYMMDD"));

  return d >= st && d <= en;
};

export const checkIsPassDue = (date, state) => {
  const now = parseInt(moment(Date.now()).format("YYYYMMDDHHmmss"));
  const due = parseInt(formatDate2(date, "YYYYMMDDHHmmss"));

  return now > due && state !== "resolve";
};
