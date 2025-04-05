import { useEffect, useState } from "react";
import { Button, Image, message, Table } from "antd";
import { UserType } from "../../Type";
import Loading from "../../Loading";
import AddUser from "./AddUser";
import DeleteUserId from "./DeleteUserId";
import { EditOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import api from "../../api/api";
import EditUser from "./EditUser";

function User() {
  const [user, setUsers] = useState<UserType[]>([]);

  const [isOpenDraver, setOpenDraver] = useState(false);
  const [editUser, setEditUser] = useState<UserType>();

  const Users = () => {
    api
      .get("/api/users?limit=10&page=1&order=ASC")
      .then((res) => {
        setUsers(res.data.items);
      })
      .catch((e) => {
        console.error("Xatolik yuz berdi😒", e);
        message.error("Xatolik");
      });
  };
  useEffect(() => {
    Users();
  }, []);

  if (!user.length) {
    return (
      <div className="m-auto  flex justify-center items-center top-0 bottom-0 left-0 right-0">
        <Loading />
      </div>
    );
  }

  function DeleteUser(id: number) {
    api
      .delete(`/api/users/${id}`)
      .then((res) => {
        console.log(res.data);
        setUsers((i) => i.filter((item) => item.id !== id));
        message.success("O'chirish amalga oshirildi 😊");
      })
      .catch((e) => {
        message.error("O'chirish amalga oshirilmadi 😒" + e);
      });
  }

  return (
    <>
      <div className="pl-36 ">
        <div className=" flex-1 ">
          <AddUser
            ozgarish={Users}
            isOpenDraver={isOpenDraver}
            setOpenDraver={setOpenDraver}
          />
        </div>
        <Table
          dataSource={user.map((item) => ({ ...item, key: item.id }))}
          columns={[
            {
              title: "Id",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Role",
              dataIndex: "role",
              key: "role",
            },
            {
              title: "Created At",
              dataIndex: "createdAt",
              key: "createdAt",
            },

            {
              title: "Image",
              dataIndex: "image",
              key: "image ",
              render: (image) => (
                <Image.PreviewGroup
                  preview={{
                    onChange: (current, prev) =>
                      console.log(
                        `current index: ${current}, prev index: ${prev}`
                      ),
                  }}
                >
                  <Image
                    className="rounded-lg shadow-lg cursor-pointer"
                    width={50} // O‘lchamni moslashtirishingiz mumkin
                    src={image}
                    alt="Product Image"
                    style={{
                      borderRadius: "8px", // Border radius
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)", // Box shadow
                      transition: "transform 0.3s ease-in-out", // Smooth zoom-in effect
                    }}
                    preview={{
                      mask: <EyeInvisibleOutlined />, // Mask text
                    }}
                  />
                </Image.PreviewGroup>
              ),
            },
            {
              title: "delete",
              dataIndex: "id",
              key: "id",
              render: (id: number, nimadur) => {
                return (
                  <div className=" flex items-center gap-3">
                    <div
                      onClick={() => {
                        setEditUser(nimadur);
                      }}
                    >
                      <Button>
                        <EditOutlined />
                      </Button>
                    </div>
                    <div onClick={() => DeleteUser(id)}>
                      <DeleteUserId />
                    </div>
                  </div>
                );
              },
            },
          ]}
        />
        <EditUser editUser={editUser} setEditUser={setEditUser} Users={Users} />
      </div>
    </>
  );
}

export default User;
