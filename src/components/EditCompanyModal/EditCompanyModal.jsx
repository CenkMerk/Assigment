import { useEffect, useState } from "react";
//redux
import { useDispatch } from "react-redux";
import { editCompany } from "../../store/slice/CompanySlice.js";
//antd components and icons
import { Modal, Button, Form, Input, Space, InputNumber } from "antd";
import { BiEdit } from "react-icons/bi";
//styled components
import { EditButton } from "./EditCompanyModal";



//---------Formlarla Alakalı İşlemler-------------
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
    dispatch(editCompany({ values, id }));
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

const EditCompanyModal = ({ record }) => {
  const [modal2Open, setModal2Open] = useState(false);
  const [form] = Form.useForm();

  const [fields, setFields] = useState([
    {
      name: ["key"],
      value: record.record.key,
    },
    {
      name: ["companyName"],
      value: record.record.companyName,
    },
    {
      name: ["headquarters"],
      value: record.record.headquarters,
    },
    {
      name: ["website"],
      value: record.record.website,
    },
  ]);

  return (
    <>
      <EditButton onClick={() => setModal2Open(true)}>
        <BiEdit size={20} />
      </EditButton>
      <Modal
        title="Şirket bilgilerini güncelle"
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

export default EditCompanyModal;
