import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, updateUser, uploadProfilePic } from "../../../redux/users/user.thunk";
import '../styles/profile.css';
import { Button } from '@mui/material';
import UserDialog from '../../../components/Table/components/UserDialog';
import { toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';

const API_URL = import.meta.env.VITE_API_URL;


export default function Profile() {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNo: ""
  });
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.users);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editPicMode, setEditPicMode] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  //throw new Error("Oops! This error is on purpose");

  const handleEdit = (user) => {
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

  const handleUpdate = async () => {
    const resultAction = await dispatch(updateUser({ email: formData.email, username: formData.username, phoneNo: formData.phoneNo }));

    if (updateUser.fulfilled.match(resultAction)) {
      toast.success("User updated successfully!");
      setOpenDialog(false);
      dispatch(fetchCurrentUser()); // refresh users list
    } else {
      console.error("Update failed", resultAction);
      toast.error(resultAction.payload || "Failed to update user");
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error loading profile: {error}</div>;
  }

  if (!user) {
    return <div>No user data available.</div>;
  }

  const avatarUrl = user.profilePic
    ? `${API_URL}/${user.profilePic}`
    : `https://randomuser.me/api/portraits/lego/${user.id % 10}.jpg`;


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image file");
      return;
    }

    const resultAction = await dispatch(
      uploadProfilePic({ userId: user.id, file: selectedFile })
    );

    if (uploadProfilePic.fulfilled.match(resultAction)) {
      toast.success("Profile picture updated!");
      dispatch(fetchCurrentUser()); // refresh profile
      setSelectedFile(null);
      setEditPicMode(false);
    } else {
      toast.error(resultAction.payload || "Upload failed");
    }
  };

  return (
    <div className="div1">
      <div className="card">
        <h2>Welcome to Your Profile</h2>
        <div className="avatar-wrapper">
          <img src={avatarUrl} alt="Profile Avatar" className="avatar" />
          <EditIcon
            className="edit-icon"
            onClick={() => setEditPicMode(!editPicMode)}
            titleAccess={editPicMode ? "Cancel Edit" : "Edit Profile Picture"}
          />
        </div>

        {editPicMode && (
          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={loading}
              sx={{ mt: 1 }}
            >
              Upload
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setEditPicMode(false);
                setSelectedFile(null); // Clear file if needed
              }}
              sx={{ml:1, mt:2}}
            >
              Cancel
            </Button>
          </div>
        )}
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>EmailID:</strong> {user.email}</p>
        <p><strong>PhoneNo:</strong> {user.phoneNo.slice(-10)}</p>
        <p><strong>Registered:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        <p><strong>Updated:</strong> {new Date(user.updatedAt).toLocaleDateString()}</p>
        <p><strong>Edit Your Profile:</strong><Button variant="outlined" sx={{ ml: 1 }} onClick={() => handleEdit(user)}>Edit</Button></p>
      </div>
      <UserDialog
        open={openDialog}
        formData={formData}
        onChange={handleChange}
        onClose={() => setOpenDialog(false)}
        onUpdate={handleUpdate}
        setFormData={setFormData}
      />
    </div>
  );
}

// /* Base styles */
// .div1 {
//   display: flex;
//   justify-content: center;
//   padding: 20px;
//   background-color: #f8f9fa;
//   min-height: 100vh;

// }

// .card {
//   background-color: white;
//   border-radius: 12px;
//   padding: 2rem;
//   max-width: 600px;
//   width: 100%;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   text-align: center;
// }

// .avatar-wrapper {
//   position: relative;
//   display: inline-block;
// }

// .avatar {
//   width: 120px;
//   height: 120px;
//   border-radius: 50%;
//   object-fit: cover;
//   border: 3px solid #1976d2;
// }

// .edit-icon {
//   position: absolute;
//   bottom: 0;
//   right: 0;
//   background-color: white;
//   border-radius: 50%;
//   padding: 4px;
//   cursor: pointer;
//   transition: transform 0.2s;
// }

// .edit-icon:hover {
//   transform: scale(1.1);
// }

// /* Typography */
// .card h2 {
//   margin-bottom: 1.5rem;
//   font-size: 1.6rem;
//   color: #333;
// }

// .card p {
//   margin: 0.5rem 0;
//   font-size: 1rem;
//   color: #444;
// }

// /* Responsive Design */
// @media (max-width: 768px) {
//   .card {
//       padding: 1.5rem;
//   }

//   .avatar {
//       width: 100px;
//       height: 100px;
//   }

//   .card h2 {
//       font-size: 1.4rem;
//   }

//   .card p {
//       font-size: 0.95rem;
//   }
// }

// @media (max-width: 480px) {
//   .card {
//       padding: 1rem;
//   }

//   .avatar {
//       width: 80px;
//       height: 80px;
//   }

//   .edit-icon {
//       padding: 2px;
//   }

//   .card h2 {
//       font-size: 1.2rem;
//   }

//   .card p {
//       font-size: 0.9rem;
//   }
// } */