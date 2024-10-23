// UserManagementPage.js
import React, { useState } from 'react';
import ViewUser from './ViewUser';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';

const UserManagementPage = () => {
  const [editingUser, setEditingUser] = useState(null);

  const handleUpdateUser = (updatedUser) => {
    setEditingUser(null); // Đóng form chỉnh sửa
  };

  const handleDeleteUser = () => {
    // Thực hiện sau khi xóa tài khoản thành công (ví dụ điều hướng về trang khác)
    console.log('User deleted');
  };

  return (
    <div className="UserManagementPage">
      <h1>Quản lý người dùng</h1>

      {!editingUser ? (
        <>
          <ViewUser onEdit={setEditingUser} />
          {editingUser && <DeleteUser userId={editingUser._id} onDelete={handleDeleteUser} />}
        </>
      ) : (
        <EditUser
          user={editingUser}
          onCancel={() => setEditingUser(null)}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default UserManagementPage;
