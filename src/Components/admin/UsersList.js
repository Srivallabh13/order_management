import React, { Fragment, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import MetaData from "../MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";

const UsersList = ({ history }) => {
  const [users, setUsers] = useState([
    {
      _id: "1",
      email: "john@example.com",
      name: "John Doe",
      role: "admin",
    },
    {
      _id: "2",
      email: "jane@example.com",
      name: "Jane Doe",
      role: "user",
    },
    {
      _id: "3",
      email: "mark@example.com",
      name: "Mark Smith",
      role: "user",
    },
  ]);

  const deleteUserHandler = (id) => {
    setUsers(users.filter(user => user._id !== id));
    alert("User deleted successfully");
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 1 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 1,
      cellClassName: (params) =>
        params.value === "admin" ? "text-green-500" : "text-red-500",
    },
    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/user/${params.id}`}>
            <EditIcon />
          </Link>
          <Button onClick={() => deleteUserHandler(params.id)}>
            <DeleteIcon />
          </Button>
        </Fragment>
      ),
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    role: user.role,
    email: user.email,
    name: user.name,
  }));

  return (
    <div className="w-screen max-w-full grid grid-cols-1 md:grid-cols-5 absolute">
      <SideBar className="w-1/5" />

      <div className="md:col-span-4 border-l border-gray-200 bg-white p-6 overflow-auto">
        <MetaData title="ALL USERS - Admin Panel" />
        <h1 className="text-2xl font-semibold mt-7 text-black-700 text-center mb-6">ALL USERS</h1>

        <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            className="bg-white border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default UsersList;
