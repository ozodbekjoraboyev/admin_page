import { useEffect, useState } from "react";
import { Button, Image, message, Switch, Table } from "antd";
import { BanersType } from "../../Type";
import Loading from "../../Loading";
import AddBanerlar from "./AddBanerlar";
import DeleteBanerlar from "./DeleteBanerlar";
import api from "../../api/api";
import { EditOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import EditBunner from "./EditBunner";

function Banners() {
  const [banners, setBanners] = useState<BanersType[]>([]);
  const [editBanners, seteditBanners] = useState<BanersType | null>(null);

  const fetchBanners = () => {
    api
      .get("/api/banners?limit=10&page=1&order=ASC")
      .then((res) => {
        setBanners(res.data.items);
        message.success("Banners Page 😊");
      })
      .catch((e) => {
        console.error("Xatolik yuz berdi😒", e);
        message.error("Xatolik");
      });
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  if (!banners.length) {
    return (
      <div className="m-auto flex justify-center items-center top-0 bottom-0 left-0 right-0">
        <Loading />
      </div>
    );
  }

  function deleteBanner(id: number) {
    api
      .delete(`/api/banners/${id}`, {})
      .then(() => {
        setBanners((prev) => prev.filter((item) => item.id !== id));
        message.success("O'chirish amalga oshirildi 😊");
      })
      .catch((e) => {
        message.error("O'chirish amalga oshirilmadi 😒" + e);
      });
  }

  const toggleBanner = (id: number, isActive: boolean) => {
    api
      .patch(`/api/banners/${id}`, { isActive: !isActive })
      .then(() => {
        setBanners((prev) =>
          prev.map((banner) =>
            banner.id === id
              ? { ...banner, isActive: !banner.isActive }
              : banner
          )
        );
        message.success("Banner holati o‘zgartirildi!");
      })
      .catch(() => {
        message.error("Xatolik yuz berdi");
      });
  };

  return (
    <div className="pl-36">
      <div className="flex-1">
        <AddBanerlar ozgarish={fetchBanners} />
      </div>
      <Table
        dataSource={banners.map((item) => ({ ...item, key: item.id }))}
        columns={[
          { title: "Id", dataIndex: "id", key: "id" },
          { title: "Title", dataIndex: "title", key: "title" },
          // {
          //   title: "Image",
          //   dataIndex: "imageUrl",
          //   key: "imageUrl",
          //   render: (imageUrl) => (
          //     <img className="w-10 rounded" src={imageUrl} alt="" />
          //   ),
          // },


          {
            title: "Image",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (imageUrl) => (
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
                  src={imageUrl}
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
          { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
          {
            title: "Active",
            dataIndex: "isActive",
            key: "isActive",
            render: (_, record) => (
              <Switch
                checked={record.isActive}
                onChange={() => toggleBanner(record.id, record.isActive)}
              />
            ),
          },
          {
            title: "Delete",
            dataIndex: "id",
            key: "id",
            render: (id: number, nimadur) => (
              <div className=" flex items-center gap-2">
                <div
                  onClick={() => {
                    seteditBanners(nimadur);
                    console.log(nimadur);
                  }}
                >
                  <Button>
                    <EditOutlined />
                  </Button>
                </div>

                <div onClick={() => deleteBanner(id)}>
                  <DeleteBanerlar />
                </div>
              </div>
            ),
          },
        ]}
      />
      <EditBunner
        editBanners={editBanners}
        seteditBanners={seteditBanners}
        fetchBanners={fetchBanners}
      />
    </div>
  );
}

export default Banners;
