import React, { useState, useEffect } from "react";
import { Button, Col, Row, Card, Skeleton } from "antd";
//import { useDispatch } from "react-redux";
//import { showLoader, hideLoader } from "../../redux/actions/Auth";
import { url, headers } from "../../utils/index";

import { Link } from 'react-router-dom';
import axios from "../config/axios";
import CouponCodeList from "../CouponCode/CouponCodeList";

const Dashboard = () => {
  // const dispatch = useDispatch();

 

  return  (
    <>
      <Row>
        <Col lg={24}>
          <Row>
            <Col lg={24}>
              <div className="gx-card">
                <div className="gx-card-body">
                  <div className="gx-wel-ema gx-pt-xl-2">
               
                    <h1 className="gx-mb-3">Welcome To CouponCode Validator Application</h1>
                  {/* <CouponCodeList/> */}
                    
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        
      </Row>
    </>
  ) 
 
};

export default Dashboard;
