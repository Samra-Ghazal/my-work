import { toast } from "react-toastify";
import dayjs from "dayjs";
import { styled, alpha } from "@mui/system";
import TextField from "@mui/material/TextField";
import "../snackbar/snackbar.scss";
import { useSelector } from "react-redux";
const snackbar = require("snackbar");
snackbar.duration = 1000;

const DATE = "YYYY-MM-DD";
const TIME = "HH:mm:ss";
const TIMES = "HH:mm:ss";
export const FormateDate = (str) => {
  return str ? dayjs(str).format(DATE) : "";
};
export const FormateTimes = (str) => {
  return str ? dayjs(str).format(TIMES) : "";
};

export const FormateTime = (str) => {
  return str ? dayjs(str).format(TIME) : "";
};
export const DataNotFound = () => {
  return (
    <div className="text-center mt-md-5 mb-md-5 w-100">
      <img
        className="mw-100 object-fit-contain"
        src="/images/Group 515291.png"
        alt="Data Not Found!"
        height={150}
        width={150}
      />
    </div>
  );
};

export const customSnackBar = (text) => {
  return snackbar.show(text);
};

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiFilledInput-root": {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    // transition: theme.transitions.create([
    //   "border-color",
    //   "background-color",
    //   "box-shadow",
    // ]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      // borderColor: theme.palette.primary.main,
    },
    "& .MuiFilledInput-underline": {
      border: "2px solid red",
    },
    "& .MuiFilledInput-underline:before": {
      borderBottom: "2px solid red", // Remove the underline
    },
    "& .MuiInputBase-root": {
      "& input": {
        borderBottom: "none", // Remove the underline
      },
    },
  },
}));
export const tabConfigs = [
  {
    tab: "business-list",
    name: "Business List",
    status: "business",
    id: "business-list-tab",
    type: "businessList",
    url: "/business",
  },
  // {
  //   tab: "new-business",
  //   name: "New Business",
  //   status: "new-business",
  //   id: "new-business-tab",
  //   type: "addBussiness",
  //   url: "/add-business",
  //   relatedTabs: ["business-list-tab"],
  // },
  {
    tab: "department-list",
    name: "Department List",
    status: "department",
    id: "department-list-tab",
    type: "departmentList",
    url: "/department",
    relatedTabs: ["business-list-tab"],
  },
  // {
  //   tab: "new-department",
  //   name: "New Department",
  //   status: "new-department",
  //   id: "new-department-tab",
  //   type: "addDepartment",
  //   url: "/add-department",
  //   relatedTabs: ["business-list-tab", "department-list-tab"],
  // },
  // {
  //   tab: "team-list",
  //   name: "Team List",
  //   status: "team",
  //   id: "team-list-tab",
  //   type: "teamList",
  //   url: "/team",
  //   relatedTabs: ["business-list-tab", "department-list-tab"],
  // },
  // {
  //   tab: "new-team",
  //   name: "New Team",
  //   status: "new-team",
  //   id: "new-team-tab",
  //   type: "addTeam",
  //   url: "/add-team",
  //   relatedTabs: ["business-list-tab", "department-list-tab", "team-list-tab"],
  // },
  {
    tab: "user-list",
    name: "User List",
    status: "user",
    id: "user-list-tab",
    type: "userList",
    url: "/users",
    relatedTabs: ["business-list-tab", "department-list-tab", "team-list-tab"],
  },
  {
    tab: "user-list",
    name: "Permission",
    status: "permission",
    id: "permission-list-tab",
    type: "permissionList",
    url: "/permissions",
    relatedTabs: ["business-list-tab", "department-list-tab", "team-list-tab"],
  },
  {
    tab: "allow-permission-list",
    name: "Allow Permission",
    status: "allow-permission",
    id: "permission-list-tab",
    type: "allowPermission",
    url: "/allow-permission",
    relatedTabs: ["business-list-tab", "department-list-tab", "team-list-tab"],
  },
];
const businessList = [
  {
    tab: "business-list",
    name: "Business List",
    status: "business",
    id: "business-list-tab",
    type: "businessList",
    url: "/business",
  },
];

const addBussiness = [
  ...businessList,
  {
    tab: "new-business",
    name: "New Business",
    status: "new-business",
    id: "new-business-tab",
    type: "addBussiness",
    url: "/add-new-business",
  },
];

const departmentList = [
  ...businessList,
  {
    tab: "department-list",
    name: "Department List",
    status: "department",
    id: "department-list-tab",
    type: "departmentList",
    url: "/department",
  },
];

const addDepartment = [
  ...departmentList,
  {
    tab: "new-department",
    name: "New Department",
    status: "new-department",
    id: "new-department-tab",
    type: "addDepartment",
    url: "/add-department",
  },
];

const teamList = [
  ...departmentList,
  {
    tab: "team-list",
    name: "Team List",
    status: "team",
    id: "team-list-tab",
    type: "teamList",
    url: "/team",
  },
];

const addTeam = [
  ...teamList,
  {
    tab: "new-team",
    name: "New Team",
    status: "new-team",
    id: "new-team-tab",
    type: "addTeam",
    url: "/add-team",
  },
];

const userList = [
  ...teamList,
  {
    tab: "user-list",
    name: "User List",
    status: "user",
    id: "user-list-tab",
    type: "userList",
    url: "/users",
  },
];

const addUser = [
  ...userList,
  {
    tab: "new-user",
    name: "New User",
    status: "new-user",
    id: "new-user-tab",
    type: "addUser",
    url: "/add-user",
  },
];
const servicesArray = [
  { id: 1, service: "Plumbing" },
  { id: 2, service: "Electrical" },
  { id: 3, service: "Manicure Pedicure" },
  { id: 4, service: "Barber" },
  { id: 5, service: "Baby Sitter" },
  { id: 6, service: "Plumbing" },
  { id: 7, service: "Electrical" },
  { id: 8, service: "Manicure Pedicure" },
  { id: 9, service: "Barber" },
  { id: 10, service: "Baby Sitter" },
];
export const tabsList = {
  businessList: businessList,
  addBussiness: addBussiness,
  departmentList: departmentList,
  addDepartment: addDepartment,
  teamList: teamList,
  addTeam: addTeam,
  userList: userList,
  addUser: addUser,
};
export { servicesArray, CustomTextField };
export const success = (value, option = {}) => {
  // toast.success(value, {
  //   position: 'bottom-right', // Set the position to bottom-center
  //   ...option, // Allow custom options to override the default position
  // });
  toast.success(value, {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    ...option,
  });
};

export const warning = (value, option = {}) => {
  // toast.success(value, {
  //   position: 'bottom-right', // Set the position to bottom-center
  //   ...option, // Allow custom options to override the default position
  // });
  toast.warn(value, {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    ...option,
  });
};

export const error = (value, option = {}) => {
  toast.error(value, {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    ...option,
  });
};

export function formatTime(time) {
  const [hours, minutes] = time.split(":");
  const formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  return formattedTime;
}

// permissions.js
export function isBusinessRolePermissionAllowed(data, moduleName, action) {
  for (const role of data) {
    if (role.business && role.allowPermission) {
      for (const permission of role.allowPermission) {
        if (permission.moduleName === moduleName) {
          return Boolean(permission.permissions[action]);
        }
      }
    }
  }
  return false;
}
const useCheckPermission = async (moduleName, action) => {
  const data = await useSelector((state) => state?.Auth?.permissionsModule);
  if (data === null || data.length === 0) {
  } else {
    for (const role of data) {
      if (role.business && role.allowPermission) {
        for (const permission of role.allowPermission) {
          if (permission.moduleName === moduleName) {
            return Boolean(permission.permissions[action]);
          }
        }
      }
    }
    return null;
  }
};
export default useCheckPermission;
