import Product from "../../Database/AdminModels/ProductModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: err.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, type, quantity, price, description, url } = req.body;

    if (!name || !type || quantity == null || price == null || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newProduct = new Product({
      name,
      type,
      quantity,
      price,
      description,
      url,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add product", error: err.message });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: err.message });
  }
};
export const indvidualProduct = async(req,res)=>{
  const {id}=req.params;
  try{
    const product = await Product.findOne({_id:id});
    console.log(product);
    if (!product){
      return res.status(400).json("Product Not Found!")
    }
    res.status(200).json({product});
  }
  catch(error){
    return res.status(500).json("Server Error ")
  }
}
export const UpdateProduct =async(req,res)=>{
  const {id}=req.params;
  const {quantity}=req.body
  try{
     const updatedProduct = await Product.findByIdAndUpdate(
      id,                           
      { quantity },                 
      { new: true }                 
    );
    if (!updatedProduct){
      return res.status(400).json({message : "Product Not Found"});

    }
    console.log("Updated Product");
    console.log(updatedProduct);
    return res.status(200).json({message : "product Update Successfully",updatedProduct})

  }
  catch(error){
    return res.status(500).json("Server Error");
  }
}