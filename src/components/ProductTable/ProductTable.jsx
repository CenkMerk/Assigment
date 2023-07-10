import React from "react";
import { useRef, useState, useEffect } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../../store/slice/ProductSlice";
//styled components
import {
  DeleteButton,
  CompanyTableHeader,
  CompanyTableContainer,
} from "./ProductTable.js";
//components
import AddProductModal from "../../components/AddProductModal/AddProductModal.jsx";
//antd component and icons
import { Table, Input, Button, Space } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
//data
import Data from "../../data/productData.js";
import EditProductModal from "../EditProductModal/EditProductModal.jsx";

//silme işlemi yapılır
function DeleteButtonComp(id) {
  const dispatch = useDispatch();
  return (
    <DeleteButton
      onClick={() => {
        dispatch(removeProduct(id));
      }}
    >
      <AiOutlineDelete size={20} />
    </DeleteButton>
  );
}
//düzenleme işlemi yapılır
function EditButtonComp(record) {
  return <EditProductModal record={record} />;
}

const ProductTable = () => {
  const { productItems } = useSelector((store) => store.product);
  useEffect(() => {}, [productItems]);
  
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Ara
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Sıfırla
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrele
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Kapat
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "productName",
      fixed: "left",
      key: "productName",
      ...getColumnSearchProps("productName"),
    },
    {
      title: "Ürünün Kategorisi",
      dataIndex: "productCategory",
      key: "productCategory",
    },
    {
      title: "Ürün Miktarı",
      dataIndex: "productAmount",
    },
    {
      title: "Miktar Birimi",
      dataIndex: "amountUnit",
    },
    {
      title: "Şirket",
      dataIndex: "company",
    },
    {
      title: "Sil",
      dataIndex: "",
      key: "x",
      render: (_, record) => <DeleteButtonComp id={record.key} />,
    },
    {
      title: "Düzenle",
      dataIndex: "",
      key: "y",
      render: (_, record) => <EditButtonComp record={record} />,
    },
  ];
  return (
    <CompanyTableContainer>
      <CompanyTableHeader>
        <AddProductModal />
      </CompanyTableHeader>
      <Table
        columns={columns}
        dataSource={productItems}
        onChange={onChange}
        style={{ overflowX: "overlay", width: "100%" }}
        pagination={{ pageSize: "5" }}
      />
    </CompanyTableContainer>
  );
};

export default ProductTable;
