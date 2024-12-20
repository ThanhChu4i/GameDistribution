// UserManagementPage.js
import React, { useState } from 'react';
import ViewUser from './ViewUser/ViewUser';
import EditUser from './EditUser/EditUser';
import DeleteUser from './DeleteUser';
import MyGameHistory from './MyHistory';
import AvatarUpload from './AvatarUpload/AvatarUpload';
import './UserManagementPage.css';
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
      <div className='UserInforandAvatar'>
      <div className='AvatarUpload'><AvatarUpload/></div>
      <div className= 'ViewUser'>{!editingUser ? (
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
      )}</div>
      </div>
      
      <MyGameHistory/>
    </div>
  );
};

export default UserManagementPage;
