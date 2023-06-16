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

  return moment(d).startOf("second").fromNow();
};

export const formatDate2 = (date, format) => {
  return moment(convertDate(date)).format(format);
};

export const formatRange = (start, end) => {
  const startDate = moment(start).format("DD/MM/YYYY");
  const endDate = moment(end).format("DD/MM/YYYY");

  return startDate + " ~ " + endDate;
};

export const checkDateInRange = (date, start, end) => {
  const d = parseInt(moment(date).format("YYYYMMDD"));
  const st = parseInt(moment(start).format("YYYYMMDD"));
  const en = parseInt(moment(end).format("YYYYMMDD"));

  return d >= st && d <= en;
};

export const checkIsPassDue = (date) => {
  const now = parseInt(moment(Date.now()).format("YYYYMMDD"));
  const due = parseInt(moment(new Date(date)).format("YYYYMMDD"));

  console.log(now, due);

  return now > due;
};
