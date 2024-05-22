import { IProduct } from "./product.interface";
import Product from "./product.model";

// create product into db
const createProductIntoDB = async (product: IProduct) => {
  const result = await Product.create(product);
  return result;
};

// get all products from DB
const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

// get a single product
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

// update a product
const updateAProductFromDB = async (id: string, product: IProduct) => {
  const result = await Product.findByIdAndUpdate({ _id: id }, product, {
    new: true,
  });
  return result;
};

// delete a product
const deleteAProductFromDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });
  if (result.deletedCount) {
    return null;
  }
  return result;
};

// search product by text
const searchProductFromDB = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, "i");
  const result = await Product.find({
    $or: [
      { name: regex },
      { description: regex },
      { category: regex },
      { tags: { $elemMatch: { $regex: regex } } },
    ],
  });
  return result;
};
// export all services
export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateAProductFromDB,
  deleteAProductFromDB,
  searchProductFromDB,
};
