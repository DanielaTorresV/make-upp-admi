import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../store/reducers/Product.reducer";

const ButtonDelete = ({ productId }) => {
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteProduct(productId));
  };

  return (
    <button className="productButton" onClick={handleDelete}>
      Delete Product
    </button>
  );
};

export default ButtonDelete;
