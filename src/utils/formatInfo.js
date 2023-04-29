export const formatDisplayName = (fullname) => {
  const arr = fullname.toLocaleUpperCase().split(" ");
  if (arr.length === 1) return arr[0].charAt(0);
  return arr[0].charAt(0) + arr[1].charAt(0);
};

export const formatPhoneNumber = (phoneNumber) => {
  return "+84 " + phoneNumber.slice(1);
};

export const formatDate = (date) => {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: "Asia/HO_CHI_MINH",
    })
  );
};
