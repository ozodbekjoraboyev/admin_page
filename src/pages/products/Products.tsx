import { Button, Image, message, Table } from "antd";
import { useEffect, useState } from "react";
import Loading from "../../Loading";
import { EditOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import DeleteProducts from "./DeleteProducts";
import AddProducts from "./AddProducts";
import EditProducts from "./EditProducts";
import { CatigoriesType, ProductsType } from "../../types/Type";
import ProductsAll from "../../api/products/Products";

function Products() {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [isOpenDraver, setOpenDraver] = useState(false);
  const [catigories, setCatigories] = useState<CatigoriesType[]>([]);
  const [editProduct, setEditProduct] = useState<ProductsType>();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const fetchProducts = (pageNumber = 1) => {
    const limit = 10; 

    ProductsAll.productsget(limit, pageNumber )

      .then((res) => {
        setProducts(res.data.items);
        setTotal(res.data.total);
      })
      .catch((e) => {
        console.error("Xatolik yuz berdi", e);
        message.error("Xatolik");
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

  useEffect(() => {
    ProductsAll.productsCatigories().then((res) => {
      console.log(res.data.items);
      setCatigories(res.data.items);
    });
  }, []);

  if (!products.length) {
    return (
      <div className="m-auto flex justify-center items-center top-0 bottom-0 left-0 right-0">
        <Loading />
      </div>
    );
  }

  function deleteProduct(id: number) {
    ProductsAll.productDelete(id)
      .then(() => {
        setProducts((prev) => prev.filter((item) => item.id !== id));
        message.success("O'chirish amalga oshirildi 😊");
      })
      .catch((e) => {
        message.error("O'chirish amalga oshirilmadi 😒" + e);
      });
  }

  return (
    <div className="pl-36 pt-16">
      <div className="flex-1">
        <AddProducts
          isOpenDraver={isOpenDraver}
          setOpenDraver={setOpenDraver}
          fetchProducts={fetchProducts}
        />
      </div>
      <Table
        dataSource={products.map((item) => ({ ...item, key: item.id }))}
        columns={[
          { title: "Id", dataIndex: "id", key: "id" },
          { title: "Name", dataIndex: "name", key: "name" },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
          {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => {
              const formattedPrice = price.toLocaleString("ru");
              return (
                <div>
                  <p>{formattedPrice} som</p>
                </div>
              );
            },
          },

          {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
            render: (stock) => {
              const formattedstock = stock.toLocaleString("ru");
              return (
                <div>
                  <p>{formattedstock} ta</p>
                </div>
              );
            },
          },
          {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => {
              const date = new Date(createdAt);
              const formattedCreatedAt = date.toLocaleString("ru");
              return (
                <div>
                  <p>{formattedCreatedAt}</p>
                </div>
              );
            },
          },
          {
            title: "categoryId",
            dataIndex: "categoryId",
            key: "categoryId",
            render: (categoryId) => {
              const carigoriesname = catigories.find(
                (item) => item.id === categoryId
              );
              return carigoriesname?.name;
            },
          },
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

          {
            title: "Actions",
            dataIndex: "id",
            key: "id",
            render: (id: number, nimadur) => (
              <div className="flex space-x-2">
                <Button
                  onClick={() => {
                    setEditProduct(nimadur);

                    console.log(nimadur);
                  }}
                >
                  <EditOutlined />
                </Button>
                <div onClick={() => deleteProduct(id)}>
                  <DeleteProducts />
                </div>
              </div>
            ),
          },
        ]}
        pagination={{
          current: page,
          pageSize: 10,
          total: total,
          onChange: (pageNumber) => {
            setPage(pageNumber);
            fetchProducts(pageNumber);
          },
        }}
      />
      <EditProducts
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        catigories={catigories}
        fetchProducts={fetchProducts}
      />
    </div>
  );
}

export default Products;
