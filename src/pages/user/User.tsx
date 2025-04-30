import { useEffect, useState } from "react";
import { Button, Image, message,  Table } from "antd";
import Loading from "../../Loading";
import AddUser from "./AddUser";
import DeleteUserId from "./DeleteUserId";
import { EditOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import EditUser from "./EditUser";
import { UserType } from "../../types/Type";
import UsersAll from "../../api/users/Users";

function User() {
  const [user, setUsers] = useState<UserType[]>([]);

  const [isOpenDraver, setOpenDraver] = useState(false);
  const [editUser, setEditUser] = useState<UserType>();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const Users = (pageNumber = 1) => {
    setLoading(true);
    const limit = 10; 
    UsersAll.usersAll(limit, pageNumber)
      .then((res) => {
        setUsers(res.data.items);
        setTotal(res.data.total); 
      })
      .catch((e) => {
        console.error("Xatolik yuz berdi😒", e);
        message.error("Xatolik");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  useEffect(() => {
    Users(page);
  }, [page]);
  
  if (loading) {
    return (
      <div className="m-auto  flex justify-center items-center top-0 bottom-0 left-0 right-0">
        <Loading />
      </div>
    );
  }

  function DeleteUser(id: number) {
    UsersAll.deleteOne(id)
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
      <div className="pl-36 pt-16 ">
        <div className=" flex-1 ">
          <AddUser
            ozgarish={Users}
            isOpenDraver={isOpenDraver}
            setOpenDraver={setOpenDraver}
          />
        </div>
        <Table
          loading={loading}
          dataSource={user}
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
                    width={50}
                    src={image}
                    alt="Product Image"
                    style={{
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    preview={{
                      mask: <EyeInvisibleOutlined />,
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
          pagination={{
            current: page,
            pageSize: 10, 
            total: total, 
            onChange: (pageNumber) => {
              setPage(pageNumber);
              Users(pageNumber); 
            },
          }}
        />
              <EditUser editUser={editUser} setEditUser={setEditUser} Users={Users} />
      </div>
    </>
  );
}

export default User;
