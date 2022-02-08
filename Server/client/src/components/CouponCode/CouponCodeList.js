import React, { useState, useEffect } from "react";
import { Col, Row, Table, Button, Skeleton } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { url, headers } from "../../utils/index";
import Breadcrumb from "../Other/DynamicBreadcrumb";
//import { hideSkeleton, showSkeleton } from "../../redux/actions/Auth";
// import { useSelector, useDispatch } from "react-redux";

const columns = [
  {
    title: "Sl No",
    dataIndex: "slno",
  },
  {
    title: "CouponCode",
    dataIndex: "couponCode",
   
  },
  {
    title: "Discount Type",
    dataIndex: "discountType",
   
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
   
  },
  {
    title: "End Date",
    dataIndex: "endDate",
   
  },
  // {
  //   title: "Action",
  //   render: (text, record) => (
  //     <div>
  //       <Button className="esp-ListBtn esp-btnView">
  //         <Link to={`/couponCode/validate/${record.id}`}>Validate</Link>
  //       </Button>
        
  //       {/* <Button className="esp-ListBtn esp-btnView" onClick = {}>
  //        Delete
  //       </Button> */}
  //     </div>
  //   ),
  // },
];

const CouponCodeList = () => {
  const [couponCodeData, setCouponCodeData] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  console.log('entered coupon code')

  useEffect(() => {
    // dispatch(showSkeleton());
    const getCouponCodeData = () => {
      axios
        .get(url + `couponCode/list`, )
        .then((res) => {
          const items = res.data.couponCodesList;
          console.log('Coupon code',items)
          setCouponCodeData(
            items.map((item, index) => ({
              id: item._id,
              slno: index + 1,
              key: item._id,
              couponCode: item.couponCode,
              startDate : item.startDate,
              endDate : item.endDate,
              discountType : item.discountDetails.typeOfDiscount
            }))
          );
        setIsLoading(true)
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getCouponCodeData();
  }, []);

 
    return (
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
         <Row>
          <Col span={18}>
            <Table
              className="gx-table-responsive"
              columns={columns}
              dataSource={couponCodeData}
              pagination={{ pageSize: 10 }}
            />
          </Col>
        </Row>
        <Row>
 <Col span={18}>
            <Button className="es-btnAdd">
              <Link to="/create">Add</Link>
            </Button>
            <Button className="es-btnAdd">
          <Link to="/validate">Validate</Link>
        </Button>
          </Col>
         
        </Row>  
      
      </>
    );
    
};

export default CouponCodeList;
