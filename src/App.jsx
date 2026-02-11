import React, { useState, useRef } from "react";
import "animate.css";
import {
  Drawer,
  Tooltip,
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Table,
  Space,
  Divider,
  message,
  Card,
} from "antd";
import { Plus, Printer, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import Home from "./pages/Home";

const { Option } = Select;

const App = () => {
  const [open, setOpen] = useState(false);
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);
  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();
  const printRef = useRef();

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setInvoiceGenerated(false);
    form.resetFields();
    setProducts([]);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        key: Date.now(),
        name: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);
  };

  const removeProduct = (key) => {
    setProducts(products.filter((item) => item.key !== key));
  };

  const handleProductChange = (key, field, value) => {
    const updated = products.map((item) => {
      if (item.key === key) {
        const updatedItem = { ...item, [field]: value };
        updatedItem.total =
          (updatedItem.quantity || 0) * (updatedItem.price || 0);
        return updatedItem;
      }
      return item;
    });
    setProducts(updated);
  };

  const subtotal = products.reduce((acc, item) => acc + item.total, 0);

  const gstRate = form.getFieldValue("gstRate") || 0;
  const gstAmount = (subtotal * gstRate) / 100;
  const grandTotal = subtotal + gstAmount;

  const handleGenerateInvoice = () => {
    form.validateFields().then(() => {
      if (products.length === 0) {
        message.error("Add at least one product");
        return;
      }
      setInvoiceGenerated(true);
      message.success("Invoice Generated Successfully");
    });
  };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open("", "", "width=900,height=650");

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const columns = [
    {
      title: "Product",
      render: (_, record) => (
        <Input
          value={record.name}
          onChange={(e) =>
            handleProductChange(record.key, "name", e.target.value)
          }
        />
      ),
    },
    {
      title: "Qty",
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) =>
            handleProductChange(record.key, "quantity", value)
          }
        />
      ),
    },
    {
      title: "Price",
      render: (_, record) => (
        <InputNumber
          min={0}
          value={record.price}
          onChange={(value) =>
            handleProductChange(record.key, "price", value)
          }
        />
      ),
    },
    {
      title: "Total",
      render: (_, record) => <span>₹ {record.total}</span>,
    },
    {
      title: "",
      render: (_, record) => (
        <Button
          danger
          icon={<Trash2 size={16} />}
          onClick={() => removeProduct(record.key)}
        />
      ),
    },
  ];

  return (
    <>
      {/* HOME PAGE */}
      <Home onCreate={handleOpen} />

      {/* FLOATING ACTION BUTTONS */}
      <div>
        <Tooltip title="Create Invoice">
          <Button
            type="primary"
            shape="circle"
            icon={<Plus />}
            onClick={handleOpen}
          />
        </Tooltip>

        <Tooltip title="Print Invoice">
          <Button
            shape="circle"
            icon={<Printer />}
            onClick={handlePrint}
            disabled={!invoiceGenerated}
          />
        </Tooltip>
      </div>

      {/* DRAWER */}
      <Drawer
        open={open}
        onClose={handleClose}
        width={800}
        title="Create a new invoice"
      >
        <div ref={printRef}>
          {!invoiceGenerated ? (
            <>
              <Form layout="vertical" form={form}>
                <Form.Item
                  label="Customer Pincode"
                  name="pincode"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Transaction ID"
                  name="transactionId"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Payment Method"
                  name="paymentMethod"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="UPI">UPI</Option>
                    <Option value="Card">Card</Option>
                    <Option value="Cash">Cash</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Due Date"
                  name="dueDate"
                  rules={[{ required: true }]}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  label="GST Rate (%)"
                  name="gstRate"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={0} />
                </Form.Item>
              </Form>

              <Divider />

              <Button type="dashed" onClick={addProduct} block icon={<Plus />}>
                Add Product
              </Button>

              <Table
                columns={columns}
                dataSource={products}
                pagination={false}
                style={{ marginTop: 20 }}
              />

              <Divider />

              <Space direction="vertical" style={{ width: "100%" }}>
                <div>Subtotal: ₹ {subtotal}</div>
                <div>GST: ₹ {gstAmount}</div>
                <h3>Grand Total: ₹ {grandTotal}</h3>
              </Space>

              <Divider />

              <Button type="primary" onClick={handleGenerateInvoice}>
                Generate Invoice
              </Button>
            </>
          ) : (
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>INVOICE</h2>
                <Button type="primary" onClick={handlePrint}>
                  Print Invoice
                </Button>
              </div>

              <p>Date: {dayjs().format("DD/MM/YYYY")}</p>

              <Divider />

              <Table
                columns={[
                  { title: "Product", dataIndex: "name" },
                  { title: "Qty", dataIndex: "quantity" },
                  { title: "Price", dataIndex: "price" },
                  { title: "Total", dataIndex: "total" },
                ]}
                dataSource={products}
                pagination={false}
              />

              <Divider />

              <p>Subtotal: ₹ {subtotal}</p>
              <p>GST: ₹ {gstAmount}</p>
              <h3>Grand Total: ₹ {grandTotal}</h3>
            </Card>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default App;
