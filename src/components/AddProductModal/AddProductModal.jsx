import { useEffect, useState } from "react";
//redux
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/slice/ProductSlice";
//antd components and icons
import { Modal, Button, Form, Input, Space, InputNumber, Select } from "antd";
const { Option } = Select;
import { AiOutlinePlus } from "react-icons/ai";
//styled components
import { AddNew } from "./AddProductModal";
import Data from "../../data/data";

//------------Formlarla Alakalı İşlemler-------------
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

const SubmitButton = ({ form }) => {
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

  const handleSubmit = () => {
    dispatch(addProduct(values));
  };
  return (
    <Button
      type="primary"
      htmlType="reset"
      disabled={!submittable}
      onClick={handleSubmit}
    >
      Submit
    </Button>
  );
};
//------------Formlarla Alakalı İşlemler Bitti-------------

const AddProductModal = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [form] = Form.useForm();
  return (
    <>
      <AddNew onClick={() => setModal2Open(true)}>
        <AiOutlinePlus size={20} />
        Ürün Ekle
      </AddNew>
      <Modal
        title="Yeni ürün ekle"
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
              {Data.map((company,index) => (
                <Option value={company.companyName} key={index}>
                  {company.companyName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <SubmitButton form={form} />
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddProductModal;
