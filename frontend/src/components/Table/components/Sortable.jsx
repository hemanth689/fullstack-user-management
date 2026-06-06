import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@mui/material";

export default function SortableRow({ user, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: user.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isDragging ? '#e0f7fa' : '',  // light blue while dragging
    opacity: isDragging ? 0.8 : 1,                // slightly transparent while dragging
    cursor: 'grab',
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.phoneNo}</td>
      <td>{user.createdAt}</td>
      <td>{user.updatedAt}</td>
      <td>
        {/* <Button variant="outlined" sx={{ mr: 1 }} onClick={onEdit}>Edit</Button>
        <Button variant="outlined" onClick={onDelete}>Delete</Button> */}
        <Button variant="outlined" sx={{mr:1}} onClick={() => { console.log("Edit button clicked for", user); onEdit(); }}>Edit</Button>
        <Button variant="outlined" onClick={() => { console.log("Delete button clicked for", user); onDelete(); }}>Delete</Button>
      </td>
    </tr>
  );
}
