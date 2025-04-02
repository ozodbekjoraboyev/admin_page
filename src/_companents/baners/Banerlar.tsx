import { useEffect, useState } from "react";
import { message, Switch, Table } from "antd";
import { BanersType } from "../../Type";
import Loading from "../../Loading";
import axios from "axios";
import useMyStor from "../../useMyStore";
import AddBanerlar from "./AddBanerlar";
import DeleteBanerlar from "./DeleteBanerlar";

function Banners() {
  const [banners, setBanners] = useState<BanersType[]>([]);
  const accessToken = useMyStor((state) => state.accessToken);

  const fetchBanners = () => {
    axios
      .get("https://nt.softly.uz/api/banners?limit=10&page=1&order=ASC", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
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
    if (!accessToken) return;
    fetchBanners();
  }, [accessToken]);

  if (!banners.length) {
    return (
      <div className="m-auto flex justify-center items-center top-0 bottom-0 left-0 right-0">
        <Loading />
      </div>
    );
  }

  function deleteBanner(id: number) {
    axios
      .delete(`https://nt.softly.uz/api/banners/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        setBanners((prev) => prev.filter((item) => item.id !== id));
        message.success("O'chirish amalga oshirildi 😊");
      })
      .catch((e) => {
        message.error("O'chirish amalga oshirilmadi 😒" + e);
      });
  }

  const toggleBanner = (id: number, isActive: boolean) => {
    axios
      .patch(
        `https://nt.softly.uz/api/banners/${id}`,
        { isActive: !isActive },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
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
              <img className="w-10 rounded" src={imageUrl} alt="" />
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
            render: (id: number) => (
              <div onClick={() => deleteBanner(id)}>
                <DeleteBanerlar />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export default Banners;
