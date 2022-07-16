import Nav from "../components/products/Nav";
import CreateProduct from "../components/products/containerProducts/CreateProduct";
import LisOfProducts from "../components/products/containerProducts/ListofProducts";

const Products = () => {
  return (
    <>
      <Nav />
      <div className="containerProducts">
        <CreateProduct />
        <h3 className="titleProducts">Your Products</h3>
        <div className="containerListOfProducts">
          <LisOfProducts />
        </div>
      </div>
    </>
  );
};

export default Products;
