const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

{/*exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit==='true';
  if(!editMode){
   return res.redirect('/')
  }
  const prodId = req.params.productId;
  Product.findByID(prodId, product=>{
    if(!product){
    return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing:editMode,
      product:product
    });
  })
};*/}
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit === 'true';
  if (!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId; // Fix extraction of productId
  console.log("Product ID:", prodId);

  Product.findByID(prodId, product => { // Fix method name
    if (!product) {
      console.log("Product not found, redirecting...");
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
};

exports.postEditProduct=(req, res, next)=>{
const prodId = req.body.prodId;
const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
const updatedProduct =new Product(
  prodId,
  updatedTitle,
  updatedImageUrl,
  updatedPrice,
  updatedDescription
)
updatedProduct.save();
res.redirect('/admin/products')
}

exports.postDeleteProduct=(req, res, next)=>{
  const prodId = req.params.productId;
  console.log(prodId)
  Product.deleteByID(prodId);
  res.redirect('/admin/products')
}
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
