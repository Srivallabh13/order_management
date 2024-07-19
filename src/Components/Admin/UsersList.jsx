import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../MetaData";
import SideBar from './Sidebar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { AllUsers, DeleteUser, UpdateRole } from "../../Actions/UserActions";
import { useAlert } from "react-alert";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";


const UsersList = ({ history }) => {
  const allUsers = useSelector((state) => state.allUsers.users);
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.currentUser);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = useState(user.role);
  const [editUserId, setEditUserId] = useState();

  const handleClickOpen = (id) => {
    setEditUserId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const alert = useAlert();

  useEffect(() => {
    dispatch(AllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (allUsers) {
      setUsers(allUsers);
    }
  }, [allUsers]);

  const deleteUserHandler = (id) => {
    dispatch(DeleteUser(id))
      .then(() => {
        setUsers(users.filter(user => user._id !== id));
        dispatch(AllUsers());
        alert.success("User Deleted Successfully");
      })
      .catch(error => {
        alert.error("Failed to delete user: " + error.message);
      });
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
      field: "fullName",
      headerName: "Name",
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      maxWidth: 150,
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
          <Button onClick={()=>handleClickOpen(params.id) }>
            <EditIcon />
          </Button>
          <Button onClick={() => deleteUserHandler(params.id)}>
            <DeleteIcon />
          </Button>
        </Fragment>
      ),
    },
  ];

  const rows = users.map((user) => ({
    id: user.id,
    role: user.role,
    email: user.email,
    fullName: user.fullName,
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
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            dispatch(UpdateRole(editUserId, role));
            alert.success("User is successfully an admin");
            console.log(role);
            handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
           <div className="w-full relative flex items-center mb-6">
              <VerifiedUserIcon className="absolute left-4 text-gray-600" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="pl-12 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
              >
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Apply</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersList;
