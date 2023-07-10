import { useEffect, useState } from "react";
//redux
import { useDispatch } from "react-redux";
import { addCompany } from "../../store/slice/CompanySlice.js";
//antd components and icons
import { Modal, Button, Form, Input, Space, InputNumber } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
//styled components
import { AddNew } from "./AddCompanyModal";

//------------Formlarla Alakalı İşlemler-------------
const FormItemContent = [
  {
    name: "key",
    Label: "Sicil No",
    rules: [
      {
        required: true,
        type: "number",
        min: 1000,
        max: 9999,
        message: "Lütfen şirket sicil numarasını giriniz!(1000-9999)",
      },
    ],
    content: <InputNumber />,
  },
  {
    name: "companyName",
    Label: "Şirket Adı",
    rules: [
      {
        required: true,
        message: "Lütfen şirket adını giriniz!",
      },
    ],
    content: <Input />,
  },
  {
    name: "headquarters",
    Label: "Kuruluş Ülkesi",
    rules: [
      {
        required: true,
        message: "Lütfen kuruluş ülkesini giriniz!",
      },
    ],
    content: <Input />,
  },
  {
    name: "website",
    Label: "Website",
    rules: [
      {
        required: true,
        type: "url",
        message: "Lütfen geçerli bir url adresi girin!",
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
    dispatch(addCompany(values));
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

const AddCompanyModal = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [form] = Form.useForm();
  return (
      <>
        <AddNew onClick={() => setModal2Open(true)}>
          <AiOutlinePlus size={20} />
          Şirket Ekle
        </AddNew>
        <Modal
          title="Yeni şirket oluştur"
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

export default AddCompanyModal;
