import { useEffect, useState } from "react";
//redux
import { useDispatch } from "react-redux";
import { editProduct } from "../../store/slice/ProductSlice.js";
//antd components and icons
import { Modal, Button, Form, Input, Space, Select, InputNumber } from "antd";
import { BiEdit } from "react-icons/bi";
//styled components
import { EditButton } from "./EditProductModal.js";
const { Option } = Select;
import Data from "../../data/data";

//---------Formlarla Alakalı İşlemler-------------
const FormItemContent = [
  {
    name: "productName",
    Label: "Ürün Adı",
    rules: [
      {
        required: true,
        message: "Lütfen ürün adını giriniz!",
      },
    ],
    content: <Input />,
  },
  {
    name: "productCategory",
    Label: "Kategori Adı",
    rules: [
      {
        required: true,
        message: "Lütfen kategori adını giriniz!",
      },
    ],
    content: <Input />,
  },
  {
    name: "productAmount",
    Label: "Ürün Miktarı",
    rules: [
      {
        required: true,
        type: "number",
        min: 1,
        message: "Lütfen ürün miktarını giriniz!",
      },
    ],
    content: <InputNumber />,
  },
  {
    name: "amountUnit",
    Label: "Miktar Birimi",
    rules: [
      {
        required: true,
        message: "Lütfen miktar birimini giriniz!",
      },
    ],
    content: <Input />,
  },
];

const SubmitButton = ({ form, id }) => {
  const [submittable, setSubmittable] = useState(false);
  const dispatch = useDispatch();
  // Watch all values
  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values]);

  const HandleEdit = () => {
    dispatch(editProduct({ values, id }));
  };
  return (
    <Button
      type="primary"
      htmlType="reset"
      disabled={!submittable}
      onClick={HandleEdit}
    >
      Güncelle
    </Button>
  );
};

//---------Formlarla Alakalı İşlemler Bitti-------------

const EditProductModal = ({ record }) => {
  const [modal2Open, setModal2Open] = useState(false);
  const [form] = Form.useForm();
  const [fields, setFields] = useState([
    {
      name: ["productName"],
      value: record.record.productName,
    },
    {
      name: ["productCategory"],
      value: record.record.productCategory,
    },
    {
      name: ["productAmount"],
      value: record.record.productAmount,
    },
    {
      name: ["amountUnit"],
      value: record.record.amountUnit,
    },
    {
      name: ["company"],
      value: record.record.company,
    },
  ]);

  return (
    <>
      <EditButton onClick={() => setModal2Open(true)}>
        <BiEdit size={20} />
      </EditButton>
      <Modal
        title="Ürün bilgilerini güncelle"
        centered
        open={modal2Open}
        onCancel={() => setModal2Open(false)}
        okButtonProps={{ className: "DisplayNoneButton" }}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          fields={fields}
        >
          {FormItemContent.map((formItem, index) => (
            <Form.Item
              key={index}
              name={formItem.name}
              label={formItem.Label}
              rules={formItem.rules}
            >
              {formItem.content}
            </Form.Item>
          ))}
          <Form.Item
            name="company"
            label="Şirket Seç"
            rules={[
              {
                required: true,
                message: "Lütfen şirket seç!",
              },
            ]}
          >
            <Select>
              {Data.map((company, index) => (
                <Option value={company.companyName} key={index}>
                  {company.companyName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <SubmitButton form={form} id={record.record.key} />
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProductModal;
