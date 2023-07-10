import { useRef, useState, useEffect } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
import { removeCompany } from "../../store/slice/CompanySlice.js";
//antd component and icons
import { Table, Input, Button, Space } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
//styled components
import {
  DeleteButton,
  CompanyTableHeader,
  CompanyTableContainer,
} from "./CompanyTable.js";
//components
import AddCompanyModal from "../../components/AddCompanyModal/AddCompanyModal.jsx";
import EditCompanyModal from "../../components/EditCompanyModal/EditCompanyModal.jsx";

//silme işlemi yapılır
function DeleteButtonComp(id) {
  const dispatch = useDispatch();
  return (
    <DeleteButton
      onClick={() => {
        dispatch(removeCompany(id));
      }}
    >
      <AiOutlineDelete size={20} />
    </DeleteButton>
  );
}
//düzenleme işlemi yapılır
function EditButtonComp(record) {
  return <EditCompanyModal record={record} />;
}

//---------------------Form ile alakalı işlemler----------------------
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const CompanyTable = () => {
  const { companyItems } = useSelector((store) => store.company);
  useEffect(() => {}, [companyItems]);

  //---------------------Form ile alakalı işlemler----------------------
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
      title: "Şirket Adı",
      dataIndex: "companyName",
      fixed: "left",
      key: "companyName",
      ...getColumnSearchProps("companyName"),
    },
    {
      title: "Şirket Sicil Numarası",
      dataIndex: "key",
      key: "key",
      sorter: {
        compare: (a, b) => a.key - b.key,
      },
    },
    {
      title: "Kuruluş Ülkesi",
      dataIndex: "headquarters",
      ...getColumnSearchProps("headquarters"),
    },
    {
      title: "Web Sitesi",
      dataIndex: "website",
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

  //------------------------Form ile alakalı işlemler bitti-------------
  return (
    <CompanyTableContainer>
      <CompanyTableHeader>
        <AddCompanyModal/>
      </CompanyTableHeader>
      <Table
        columns={columns}
        dataSource={companyItems}
        onChange={onChange}
        style={{ overflowX: "overlay", width: "100%" }}
        pagination={{ pageSize: "5" }}
      />
    </CompanyTableContainer>
  );
};

export default CompanyTable;
