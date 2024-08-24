import Enum from "./enum/Enum";
import Resources from "./enum/Resources";

const backToHome = (router) => {
  router.push({ path: "/" });
};

const logout = (router) => {
  // clear localstorage
  // clear sessionstorage
  // redirect to login page
  localStorage.clear();
  sessionStorage.clear();
  // clear all cookies
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }

  router.push({ path: "/login" });
};

const isLogin = () => {
  return localStorage.getItem("token") ? true : false;
};

const emptyObjectId = "000000000000000000000000";

// Check if user is logged in by get token from cookie
const checkAuth = () => {
  const token = getCookie("token");
  const isAdmin = getCookie("isAdmin");
  return {
    loggedIn: token ? true : false,
    isAdmin: isAdmin == "true" ? true : false,
  };
};

/**
 * Gets the value of a cookie with the specified name
 * Check expired cookie
 * @param {string} key - The name of the cookie.
 * @returns {string} The value of the cookie.
 */
/**
 * Gets the value of a cookie with the specified name
 * Check expired cookie
 * @param {string} key - The name of the cookie.
 * @returns {string} The value of the cookie.
 */
const getCookie = (key) => {
  const name = `${key}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      const cookieValue = c.substring(name.length, c.length);
      const expires = getCookieExpiration(c);
      if (expires && new Date(expires) < new Date()) {
        return "";
      }
      return cookieValue;
    }
  }
  return "";
};

/**
 * Gets the expiration date of a cookie.
 * @param {string} cookie - The cookie string.
 * @returns {string} The expiration date of the cookie.
 */
const getCookieExpiration = (cookie) => {
  const cookieParts = cookie.split(";");
  for (let i = 0; i < cookieParts.length; i++) {
    const part = cookieParts[i].trim();
    if (part.startsWith("expires=")) {
      return part.substring("expires=".length);
    }
  }
  return "";
};
/**
 * Sets a cookie with the specified name, value, and expiration days.
 *
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {number} days - The number of days until the cookie expires.
 */
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
};

const timeFromNow = (createdDate) => {
  // Parse the createdDate into a Date object
  const createdDateObj = new Date(createdDate);

  // Get the current date and time
  const now = new Date();

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = now - createdDateObj;

  // Convert milliseconds to a more readable format
  const seconds = Math.floor(differenceInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Approximate month duration
  const years = Math.floor(months / 12);

  // Determine the most appropriate unit to display
  if (years > 0) {
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
};

const getEnumValue = (key: string, value: any) => {
  if (Resources.hasOwnProperty(key)) {
    const position = Object.keys(Resources[key]).find((k) => k == value);
    if (position) {
      return Resources[key][position];
    }
  }
};

const convertFlatListDataToListTree = (data: Array<any>) => {
  const result: any = [];
  const map = new Map();
  // Add children to each item
  data.forEach((item: any) => {
    item.children = [];
  });
  data.forEach((item: any) => {
    map.set(item._id, { ...item, children: [] });
  });
  data.forEach((item: any) => {
    if (item.parentId) {
      const tempItem = map.get(item.parentId);
      if (tempItem && tempItem.hasOwnProperty("children")) {
        tempItem.children.push(map.get(item._id));
      }
    } else {
      result.push(map.get(item._id));
    }
  });
  return result;
};
/**
 * Chuyển đổi dữ liệu bảng thành dữ liệu kanban
 * @param tableData
 * pntoan 24-8-2024
 */
const convertTableToKanban = (
  tableData: Array<any>,
  groupType: string,
  enumType: string
) => {
  const columns: Array<any> = [];
  tableData.forEach((task: any) => {
    if (task.status == undefined || task.status == null) {
      task.statusName = "Not Status";
    } else {
      // Nếu là enum thì lấy giá trị enum
      if (groupType === "enum" && enumType) {
        task.statusName = getEnumValue(enumType, task.status).value;
      } else {
        task.statusName = task.status;
      }
    }
    const column = columns.find((col) => col.title === task.statusName);
    // Tìm xem có cột đó chưa, nếu có thì push vào cột đó, không thì tạo cột mới
    if (column) {
      column.tasks.push(task);
    } else {
      columns.push({
        title: task.statusName,
        groupValue: task.status,
        tasks: [task],
      });
    }
  });
  return columns;
};
export default {
  backToHome,
  logout,
  isLogin,
  emptyObjectId,
  checkAuth,
  setCookie,
  timeFromNow,
  getEnumValue,
  convertFlatListDataToListTree,
  convertTableToKanban,
};
