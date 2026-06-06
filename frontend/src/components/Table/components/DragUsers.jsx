import React, { useState } from "react";
import '../styles/DragUsers.css';
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import UserDialog from "./UserDialog";
import SortableRow from "./Sortable";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDispatch } from 'react-redux';
import { fetchUsers, updateUser, deleteUser } from '../../../redux/users/user.thunk';

export default function UsersTable({ users }) {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNo: ""
  });

  const handleEdit = (user) => {
    console.log("handleEdit called with user:", user);
    setFormData({
      username: user.username,
      email: user.email,
      phoneNo: user.phoneNo || "",
    });
    setOpenDialog(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const dispatch = useDispatch();

  const handleUpdate = async () => {
    const resultAction = await dispatch(updateUser({ email: formData.email, username: formData.username, phoneNo: formData.phoneNo }));

    if (updateUser.fulfilled.match(resultAction)) {
      toast.success("User updated successfully!");
      setOpenDialog(false);
      dispatch(fetchUsers()); // refresh users list
    } else {
      console.error("Update failed", resultAction);
      toast.error(resultAction.payload || "Failed to update user");
    }
  };


  const handleDelete = async (user) => {
    if (!window.confirm(`Delete user "${user.username}"?`)) return;

    const resultAction = await dispatch(deleteUser(user.email));

    if (deleteUser.fulfilled.match(resultAction)) {
      toast.success("User deleted successfully!");
      dispatch(fetchUsers()); // refresh users list
    } else {
      console.error("Delete failed", resultAction);
      toast.error(resultAction.payload || "Failed to delete user");
    }
  };
  return (
    <>
    <div className="table-container">
      <table className="table" style={{ borderCollapse: 'collapse', width: '100%', marginLeft: '50px' }}>
        <thead>
          <tr>
            <th>{t('Id')}</th>
            <th>{t('UserName')}</th>
            <th>{t('EmailId')}</th>
            <th>{t('PhoneNo')}</th>
            <th>{t('createdAt')}</th>
            <th>{t('updatedAt')}</th>
            <th>{t('Actions')}</th>
          </tr>
        </thead>
        <SortableContext items={users.map(u => u.id)} strategy={verticalListSortingStrategy}>
          <tbody>
            {users.map((user) => (
              <SortableRow
                key={user.id}
                user={user}
                onEdit={() => handleEdit(user)}
                onDelete={() => { handleDelete(user) }}
              />
            ))}
          </tbody>
        </SortableContext>
      </table>
      </div>
      <UserDialog
        open={openDialog}
        formData={formData}
        onChange={handleChange}
        onClose={() => setOpenDialog(false)}
        onUpdate={handleUpdate}
      />
    </>
  );
}
