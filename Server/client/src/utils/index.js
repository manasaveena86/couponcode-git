const token = localStorage.getItem("token");


//52.66.197.77 smartwork
export const url = "/";

export const headers = {
  headers: {
    auth: token,
  },
};

export const formItemLayout = {
  labelCol: {
    lg: { span: 5 },
  },
  wrapperCol: {
    lg: { span: 19 },
  },
};
//52.66.197.77