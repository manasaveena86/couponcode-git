import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form";
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
import { store } from "react-notifications-component";
// import {
//   show_error_message,
//   hide_error_message,
// } from "../../redux/actions/BasicAction";

import { Error } from "../Other/BasicComponents";



const token = localStorage.getItem("token");

const CouponCodeValidate = () => {
  // const [profilePics, setProfilePics] = useState([]);
  // const [documentFile, setDocumentFile] = useState();
//   const [value, onChange] = useState(new Date());
//   const [startDate, setStartDate] = useState(new Date());
//  const [endDate, setEndDate] = useState(new Date());
//   const [radioValue,setRadioValue] = useState(1)
//   const[isFixed,setIsFixed] = useState(false)
//   const[isPercentage,setIsPercentage] = useState(false)
//   const [categoryProfile, setCategoryProfile] = useState();
      const [isLoaded,setIsLoaded] = useState(false)
      const [disAmount,setDisAmount] = useState({})
      //const [Form] = Form.useForm();
 const navigate = useNavigate();
 // const dispatch = useDispatch();
 // const errorMessage = useSelector((state) => state.basic.errorMessage);

  useEffect(() => {
   // dispatch(hide_error_message());
  }, []);

  // const onReset = ()=>{
  //   Form.resetFields()
  // }

  const validateCouponCode = (values) => {
    //dispatch(showLoader());
    // const fd = new FormData();

    // fd.append("name", values.name);
    
const postData = {
      couponCode: values.couponCode,
      cartAmount : parseInt(values.cartAmount),
      // startDate : moment(startDate).format('DD/MM/YYYY'),
      // endDate : moment(endDate).format('DD/MM/YYYY'),
      // discountDetails : {
      //   typeOfDiscount : radioValue,
      //   predefineAmount : values.predefineAmount?values.predefineAmount:0,
      //   discountPercentage : values.discountPercentage?values.discountPercentage:0,
      //   maxDiscountAmount : values.maxDiscountAmount?values.maxDiscountAmount:0
      // }
    };
    console.log('post data',postData)
    axios
      .post(url + `couponCode/validate`, postData, {
        headers: {
          auth: token,
        },
      })
      .then((res) => {
        console.log("res", res);
        if (res.data.success == true) {
          console.log('success from server',res.data)
          setDisAmount(res.data)
          setIsLoaded(true)
        alert(`Discount amount to deduct from total amount:   ${res.data.discountAmountToDeduct}`)
          navigate("/");
        }
        else{
          alert(`${res.data.message}`)
          navigate('/validate')
        }
      })
     
      .catch((e) => {
        console.log("adding Category error", e);
      });
  };
  
  return (
    <>
      <Row className="esp-Category-form">
        <Col span="24" style={{ border: "1px solid #cccc" }}>
          <Card className="gx-card" title="Validate CouponCode">
            {/* <Error errorMessage={errorMessage} /> */}
            <Form {...formItemLayout} onFinish={validateCouponCode}>
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
                    label="CartAmount"
                    name="cartAmount"
                    rules={[{ required: true, message: "Minimum cart amount is required!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
                <Button className="es-btnUpdate" htmlType="submit">
                  Submit
                </Button>
                {/* <Button htmlType="button" onClick={onReset}>
          Reset
        </Button> */}
            {isLoaded&& <div><Row>
                <label>Discount : </label>
                    {disAmount.discountAmountToDeduct==0?'Exceeded minimum discount amount':disAmount.discountAmountToDeduct}
                   
                </Row></div>}
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CouponCodeValidate;
