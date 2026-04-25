"use client"
import { Table, Avatar, Button, Space } from "antd"
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons"
import userImg from '../../assets/Ellipse 1.png'
import { useGetAllUserQuery } from "../../redux/feature/user/userApi"
import { useState } from "react"
const UserTable = () => {
    // eslint-disable-next-line no-unused-vars
    const [page, setPage] = useState(1);
  const {data:allUsers}=useGetAllUserQuery(page)
  const currentItems = allUsers?.data?.result.slice(0,5)
  const columns = [
    {
      title: "S.ID",
      dataIndex: "id",
      key: "id",
        render: (text, record, index) => {

    return index + 1;
  },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => (
        <div className="flex items-center gap-3">
          <img src={userImg} alt="User" className="w-8 h-8 rounded-full" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Joining Date",
      dataIndex: "createdAt",
      key: "createdAt",
          render: (text) => (
        <div className="flex items-center gap-3">
      
          <span>{ text?.split('T')[0]}</span>
        </div>
      ),
    },

  ];



  return (
    <div style={{ padding: "10px" }}>
      <Table
        columns={columns}
        dataSource={currentItems}
        pagination={false}
        bordered
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: '5px', 
        }}
      />
    </div>
  )
}

export default UserTable
