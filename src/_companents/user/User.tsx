import { useEffect, useState } from "react";
import { Button, message, Table } from "antd";
import { UserType } from "../../Type";
import Loading from "../../Loading";
import axios from "axios";
import useMyStor from "../../useMyStore";
import AddUser from "./AddUser";
import DeleteUserId from "./DeleteUserId";
import { EditOutlined } from "@ant-design/icons";

function User() {
  const [user, setUsers] = useState<UserType[]>([]);
  const [userEdit, setuserEdit] = useState<Object>();

  const [isOpenDraver, setOpenDraver] = useState(false);

  const accessToken = useMyStor((state) => state.accessToken);

  const Users = () => {
    axios
      .get("https://nt.softly.uz/api/users?limit=10&page=1&order=ASC", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setUsers(res.data.items);
      })
      .catch((e) => {
        console.error("Xatolik yuz berdi😒", e);
        message.error("Xatolik");
      });
  };
  useEffect(() => {
    if (!accessToken) return;
    Users();
  }, [accessToken]);

  if (!user.length) {
    return (
      <div className="m-auto flex justify-center items-center top-0 bottom-0 left-0 right-0">
        <Loading />
      </div>
    );
  }

  function DeleteUser(id: number) {
    axios
      .delete(`https://nt.softly.uz/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUsers((i) => i.filter((item) => item.id !== id));
        message.success("O'chirish amalga oshirildi 😊");
      })
      .catch((e) => {
        message.error("O'chirish amalga oshirilmadi 😒" + e);
      });
  }

function EditedUser(id: number, updatedData: Partial<UserType>) {
  axios
    .patch(
      `https://nt.softly.uz/api/users/${id}`, // ✅ To‘g‘ri endpoint
      updatedData, // ✅ Tahrirlash uchun malumotlar
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => {
      console.log("Tahrir qilingan foydalanuvchi:", res.data);

      // 🟢 Yangilangan foydalanuvchini `user` ro‘yxatiga joylash
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, ...updatedData } : user))
      );

      message.success("Tahrirlash amalga oshirildi 😊");
    })
    .catch((e) => {
      console.error("Tahrirlash xatosi:", e);
      message.error("Tahrirlash amalga oshmadi 😒");
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
              title: "images",
              dataIndex: "image",
              key: "image",
              render: (image) => {
                return (
                  <>
                    <img className=" w-10 rounded" src={image} alt="" />
                  </>
                );
              },
            },
            {
              title: "delete",
              dataIndex: "id",
              key: "id",
              render: (id: number, edit) => {
                return (
                  <div className=" flex">
                    <div
                      onClick={() => {
                        setuserEdit(edit);
                        setOpenDraver(true);
                        EditedUser(id)
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
      </div>
    </>
  );
}

export default User;
