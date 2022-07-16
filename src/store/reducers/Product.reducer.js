import axios from "axios";
import toast from "react-hot-toast";
const PRODUCTS_SUCCESS = "PRODUCTS_SUCCESS";
const PRODUCTS_ERROR = "PRODUCTS_ERROR";
const PRODUCTS_LOADING = "PRODUCTS_LOADING";
const DELETE_PRODUCT = "DELETE_PRODUCT";

const initialState = {
  products: [],
  loading: false,
  error: null,
};
//action creator

export const getProducts = () => {
  return async function (dispatch) {
    try {
      dispatch({ type: PRODUCTS_LOADING, payload: true });
      const products = await axios.get(
        `${process.env.REACT_APP_URL_BACK}/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({ type: PRODUCTS_SUCCESS, payload: products.data.data });
      dispatch({ type: PRODUCTS_LOADING, payload: false });
    } catch (err) {
      dispatch({ type: PRODUCTS_ERROR, payload: err });
    }
  };
};

export const postProducts = (data) => {
  return async function (dispatch) {
    try {
      dispatch({ type: PRODUCTS_LOADING, payload: true });
      const product = await axios.post(
        `${process.env.REACT_APP_URL_BACK}/products`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({ type: PRODUCTS_SUCCESS, payload: product.data.data });
      dispatch({ type: PRODUCTS_LOADING, payload: false });
      toast.success("Product creates succesfully.");
    } catch (err) {
      dispatch({ type: PRODUCTS_ERROR, payload: err });
      toast.error("Couldn't create the product, please try again later.");
    }
  };
};

export const deleteProduct = (productId) => {
  return async function (dispatch) {
    try {
      dispatch({ type: PRODUCTS_LOADING, payload: true });
      const product = await axios.delete(
        `${process.env.REACT_APP_URL_BACK}/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({ type: DELETE_PRODUCT, payload: productId });
      dispatch({ type: PRODUCTS_LOADING, payload: false });
      toast.success("Product deleted.");
    } catch (err) {
      toast.error("Couldn't delete the product, please try again later.");
    }
  };
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((item) => item._id !== action.payload),
      };
    case PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
