import Nav from "../components/products/Nav";
import CreateProduct from "../components/products/containerProducts/CreateProduct";
import LisOfProducts from "../components/products/containerProducts/ListofProducts";

const Products = () => {
  return (
    <>
      <Nav />
      <div className="containerProducts">
        <CreateProduct />
        <LisOfProducts />
      </div>
    </>
  );
};

export default Products;
