import { useEffect, useState } from "react";
import { Button, message, Table } from "antd";
import Loading from "../../Loading";
import AddCatigories from "./AddCatigories";
import { EditOutlined } from "@ant-design/icons";
import DeleteCatigories from "./DeleteCatigories";
import EditCatigories from "./EditCatigories";
import { CatigoriesType } from "../../types/Type";
import CatigoriesAPI from "../../api/catigories/Catigories";

function Catigories() {
  const [user, setUsers] = useState<CatigoriesType[]>([]);

  const [isOpenDraver, setOpenDraver] = useState(false);
  const [editCatigories, setEditCatigories] = useState<CatigoriesType>();

  const Users = () => {
    CatigoriesAPI.categoriesAll()
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
      <div className="m-auto flex justify-center items-center top-0 bottom-0 left-0 right-0">
        <Loading />
      </div>
    );
  }

  function DeleteUser(id: number) {
    CatigoriesAPI.categoriesDelete(id)
      .then((res) => {
        console.log(res.data);
        setUsers((i) => i.filter((item) => item.id !== id));
        message.success("O'chirish amalga oshirildi ");
      })
      .catch((e) => {
        message.error("O'chirish amalga oshirilmadi " + e);
      });
  }

  return (
    <>
      <div className="pl-36 ">
        <div className=" flex-1 ">
          <AddCatigories
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
              title: "description",
              dataIndex: "description",
              key: "description",
            },

            {
              title: "delete",
              dataIndex: "id",
              key: "id",
              render: (id: number, nmadur) => {
                return (
                  <div className=" flex">
                    <div
                      onClick={() => {
                        setEditCatigories(nmadur);
                        console.log(nmadur);
                      }}
                    >
                      <Button>
                        <EditOutlined />
                      </Button>
                    </div>
                    <div onClick={() => DeleteUser(id)}>
                      <DeleteCatigories />
                    </div>
                  </div>
                );
              },
            },
          ]}
        />
        <EditCatigories
          editCatigories={editCatigories}
          setEditCatigories={setEditCatigories}
          Users={Users}
        />
      </div>
    </>
  );
}

export default Catigories;
