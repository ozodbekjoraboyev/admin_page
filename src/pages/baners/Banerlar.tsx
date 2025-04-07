import { useEffect, useState } from "react";
import { Button, Image, message, Switch, Table } from "antd";
import Loading from "../../Loading";
import AddBanerlar from "./AddBanerlar";
import DeleteBanerlar from "./DeleteBanerlar";
import { EditOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import EditBunner from "./EditBunner";
import { BanersType } from "../../types/Type";
import BannersApi from "../../api/banners/Banners";

function Banners() {
  const [banners, setBanners] = useState<BanersType[]>([]);
  const [editBanners, seteditBanners] = useState<BanersType>();

  const fetchBanners = () => {
    BannersApi.getAll()
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
    BannersApi.deleteOne(id)
      .then(() => {
        setBanners((prev) => prev.filter((item) => item.id !== id));
        message.success("O'chirish amalga oshirildi 😊");
      })
      .catch((e) => {
        message.error("O'chirish amalga oshirilmadi 😒" + e);
      });
  }

  const toggleBanner = (id: number, isActive: boolean) => {
    BannersApi.patchOne(id, isActive)
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
                  width={50}
                  src={imageUrl}
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
