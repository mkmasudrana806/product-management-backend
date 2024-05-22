import { Request, Response } from "express";
import { productServices } from "./product.services";
import ProductValidationSchema from "./product.validation.zod";

// create a new product
const createNewProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    // zod validation schema
    const zodParseData = ProductValidationSchema.parse(productData);
    // save data to database
    const result = await productServices.createProductIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

// get all products or search products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    // extract search query
    const searchTerm = req.query.searchTerm as string;
    let results;
    // handle products when search query exists
    if (searchTerm) {
      results = await productServices.searchProductFromDB(searchTerm);
      res.status(200).json({
        success: true,
        message: `Products ${
          searchTerm ? `matching search term '${searchTerm}'` : ""
        } fetched successfully!`,
        data: results,
      });
      // handle when no search query
    } else {
      results = await productServices.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: results,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

// get a single product by id
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong to fetch single product",
      error: error,
    });
  }
};

// update a product
const updateAProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = req.body;
    const result = await productServices.updateAProductFromDB(
      productId,
      product
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

// get a single product
const deleteAProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteAProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

// export all controllers
export const productControllers = {
  createNewProduct,
  getAllProducts,
  getSingleProduct,
  updateAProduct,
  deleteAProduct,
};
