import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import ButtonDelete from "./ButtonDelete";

const LisOfProducts = () => {
  const { products, loading } = useSelector((state) => state.productReducer);

  if (loading === true) {
    return <ReactLoading type="spin" color="#956068" height={50} width={50} />;
  }
  console.log(products);
  return (
    <>
      {products.length > 0 &&
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
