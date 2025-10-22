import { Cart } from "../models/Cartmodel.js";
import { error, success } from "../utils/Utils.js";

const addtocart = async (req, res) => {
  const { _id } = req.user;
  const { cart, info } = req.body.data;

  try {
    if (!cart && !info) {
      return error(res, "Pls provide the Cart data");
    }

    const newcart = await Cart.create({
      product: cart,
      userid: _id,
      info,
    });

    if (!newcart) {
      return error(res, "Couldn't create a cart");
    }
    return success(res, "cart created");
  } catch (err) {
    return error(res, err.message);
  }
};

const getcart = async (req, res) => {
  const { _id } = req.user;
  try {
    const cart = await Cart.find({ userid: _id });
    if (!cart) {
      return error(res, "Cant find cart");
    }

    return success(res, cart);
  } catch (err) {
    return error(res, err.message);
  }
};

const getall = async (req, res) => {
  try {
    const cart = await Cart.find({});
    if (!cart) {
      return error(res, "Cant find cart");
    }

    return success(res, cart);
  } catch (err) {
    return error(res, err.message);
  }
};

const managecart = async (req, res) => {
  const { orderstatus } = req.body.data;

  if (!orderstatus) {
    return error(res, "provide status");
  }
  try {
    const cart = await Cart.findByIdAndUpdate(
      { userid },
      { orderstatus },
      { new: true }
    );

    if (!cart) {
      return error(res, "cart not found");
    }
    return success(res, "updated");
  } catch (errr) {
    return error(res, errr.message);
  }
};

export { addtocart, getcart, managecart, getall };
