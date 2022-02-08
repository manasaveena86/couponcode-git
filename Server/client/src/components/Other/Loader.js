import gif from "../../assets/images/loading1.gif";
import "./style.css";

const Loader = () => {
  return (
    <div className="loader-contents">
      <div className="loader">
        <img  src={gif} />
      </div>
    </div>
  );
};

export default Loader;
