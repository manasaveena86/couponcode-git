import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { Row, Col, Form, Input, Button, Card, Checkbox, Upload ,Radio} from "antd";
import { UploadOutlined } from "@ant-design/icons";
//import { Link, useHistory } from "react-router-dom";
import "./salon.css";
import axios from "axios";
import { url, headers, formItemLayout } from "../../utils/index";

// import { useSelector, useDispatch } from "react-redux";
// import { showLoader, hideLoader } from "../../redux/actions/Auth";
import Breadcrumb from "../Other/DynamicBreadcrumb";
import DatePicker from 'react-date-picker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import ReactNotification from "react-notifications-component";

import { store } from "react-notifications-component";
// import {
//   show_error_message,
//   hide_error_message,
// } from "../../redux/actions/BasicAction";

import { Error } from "../Other/BasicComponents";



const token = localStorage.getItem("token");

const CouponCodeCreate = () => {
  // const [profilePics, setProfilePics] = useState([]);
  // const [documentFile, setDocumentFile] = useState();
  const [value, onChange] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
 const [endDate, setEndDate] = useState(new Date());
  const [radioValue,setRadioValue] = useState(1)
  const[isFixed,setIsFixed] = useState(false)
  const[isPercentage,setIsPercentage] = useState(false)
 

  const navigate = useNavigate();
 // const dispatch = useDispatch();
 // const errorMessage = useSelector((state) => state.basic.errorMessage);

  useEffect(() => {
   // dispatch(hide_error_message());
  }, []);

  

  const addCouponCode = (values) => {
    //dispatch(showLoader());
    // const fd = new FormData();

    // fd.append("name", values.name);
    
const postData = {
      couponCode: values.couponCode,
      minCartAmount : values.minCartAmount?values.minCartAmount:0,
      startDate : moment(startDate).format('DD/MM/YYYY'),
      endDate : moment(endDate).format('DD/MM/YYYY'),
      discountDetails : {
        typeOfDiscount : radioValue,
        predefineAmount : values.predefineAmount?values.predefineAmount:0,
        discountPercentage : values.discountPercentage?values.discountPercentage:0,
        maxDiscountAmount : values.maxDiscountAmount?values.maxDiscountAmount:0
      }
    };
    console.log('post data',postData)
    axios
      .post(url + `couponCode/create`, postData, {
        headers: {
          auth: token,
        },
      })
      .then((res) => {
      //  dispatch(hideLoader());
        console.log("res", res);

        if (res.data.success == false) {
         // dispatch(show_error_message(res.data.error));
        }

        if (res.data.success == true) {
          console.log('success from server')
          // store.addNotification({
          //   message: "Coupon code Added Successfully",
          //   type: "success",
          //   insert: "top",
          //   container: "top-right",
          //   animationIn: ["animate__animated", "animate__fadeIn"],
          //   animationOut: ["animate__animated", "animate__fadeOut"],
          //   dismiss: {
          //     duration: 5000,
          //     onScreen: true,
          //   },
          // });
          navigate("/");
        }
      })
      .catch((e) => {
        console.log("adding Category error", e);
      });
  };
  const discountChange = e => {
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
    if(e.target.value=='flatAmount'){
      setIsFixed(true)
      setIsPercentage(false)
    }
    else{
      setIsPercentage(true)
      setIsFixed(false)
    }
  };
  return (
    <>
      {/* <Row>
        <Col span={24}>
          <Breadcrumb
            middleBreadcrum="Category Lists"
            middleHref="/user/Categorys"
            lastBreadcrum="Create"
          />
        </Col>
      </Row> */}
     
      <Row className="esp-Category-form">
        <Col span="24" style={{ border: "1px solid #cccc" }}>
          <Card className="gx-card" title="Create CouponCode">
            {/* <Error errorMessage={errorMessage} /> */}
            <Form {...formItemLayout} onFinish={addCouponCode}>
              <Row>
                <Col span="12">
                  <Form.Item
                    label="CouponCode"
                    name="couponCode"
                    rules={[{ required: true, message: "CouponCode is required!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span="12">
                  <Form.Item
                    label="MinCartAmount"
                    name="minCartAmount"
                    rules={[{ required: true, message: "Minimum cart amount is required!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
              <Col span="12">
              <Form.Item
                    label="Start Date"
                    name="startDate"
                    rules={[{ required: true, message: "Start Date is required!" }]}
                  >
              <DatePicker  value={value}
      //  selected={startDate}
      //  selectsStart
      //  startDate={startDate}
      //  endDate={endDate}
       onChange={date => setStartDate(date)}
     /></Form.Item>
     </Col>
     <Col span="12">
              <Form.Item
                    label="End Date"
                    name="endDate"
                    rules={[{ required: true, message: "ENd date is required!" }]}
                  >
              <DatePicker
      //  selected={startDate}
      //  selectsStart
      //  startDate={startDate}
       endDate={endDate}
       onChange={date => setEndDate(date)}
     /></Form.Item>
     </Col>
      </Row>
      <Row>
      <Col span="12">
      <Form.Item
                    label="Type of Discount"
                    name="radioValue"
                    rules={[{ required: true, message: "Select discount is required!" }]}
                  >
                     <Radio.Group value={radioValue} onChange={discountChange}
       
      >
                    <Radio value="flatAmount" >FlatDiscount</Radio>
                    <Radio value="percentageDiscount" >PercentageDiscount</Radio>
                    </Radio.Group>
                    </Form.Item>
        </Col>

      </Row>
      <Row>
      <Col span="12">
    {isFixed&&<div>  <Form.Item
                    label="Predefine amount"
                    name="predefineAmount"
                    rules={[{ required: true, message: "Select discount is required!" }]}
                  >
                   
                    <Input/>
                    </Form.Item>
                    </div>}
                {isPercentage&& <div>
                   <Form.Item
                    label="percentage"
                    name="discountPercentage"
                    rules={[{ required: true, message: "Select discount is required!" }]}
                  >
                 
                    <Input/>
                    </Form.Item>
                    <Form.Item
                    label="Max Discount amount"
                    name="maxDiscountAmount"
                    rules={[{ required: true, message: "Select discount is required!" }]}
                  >
                 
                    <Input/>
                    </Form.Item></div>}
                    </Col>
      </Row>
                <Button className="es-btnUpdate" htmlType="submit">
                  Submit
                </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CouponCodeCreate;
