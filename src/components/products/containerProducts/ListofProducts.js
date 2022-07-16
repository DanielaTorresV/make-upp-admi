import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../../store/reducers/Product.reducer";
import ReactLoading from "react-loading";
import ButtonDelete from "./ButtonDelete";

const LisOfProducts = () => {
  const { products, loading } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (loading === true) {
    return <ReactLoading type="spin" color="#956068" height={50} width={50} />;
  }

  return (
    <>
      {products &&
        products.map((item) => {
          return (
            <div key={item._id}>
              <div className="containerAllProducts">
                <h4 className="nameProduct">Name: {item.name}</h4>
                <p className="descriptionProduct">
                  Description: {item.description}
                </p>
                <p className="categoryProduct">Category: {item.category}</p>
                <div className="containerAllProducts-imgButton">
                  <img
                    src={item.image}
                    alt="productImage"
                    loading="lazy"
                    className="imgProduct"
                  />
                  <ButtonDelete productId={item._id} />
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default LisOfProducts;
