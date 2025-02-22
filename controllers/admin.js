
const { promiseImpl } = require('ejs');
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
  req.user.createProduct({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  })
  .then((result)=>{
    console.log(result)
    res.redirect('/admin/products')
  })
  .catch((err)=>{
    console.log(err)
  })
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
  //Product.findByPk(prodId)
  req.user.getProducts({where:{id:prodId}})
  .then((products)=>{
    const product=products[0];
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
  })
  .catch((err)=>{
    console.log(err)
  })
};

exports.postEditProduct=(req, res, next)=>{
  console.log(req.body)
const prodId = req.body.productId;
const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
Product.findByPk(prodId).then((product)=>{
  product.title=updatedTitle;
  product.imageUrl= updatedImageUrl;
  product.price= updatedPrice;
  product.description=updatedDescription;
  return product.save()
})
.then((result)=>{
  console.log("success");
  res.redirect('/admin/products')
})
.catch((err)=>{
  console.log(err)
})

}

exports.postDeleteProduct=(req, res, next)=>{
  const prodId = req.body.prodId;
  console.log(prodId)
  Product.findByPk(prodId)
  .then((product)=>{
   return product.destroy() 
  })
  .then((result)=>{
console.log(result)
res.redirect('/admin/products')
  })
  .catch((err)=>{
console.log(err)
  })
  
}
exports.getProducts = (req, res, next) => {
  //Product.findAll()
  req.user.getProducts()
  .then((products)=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch((err)=>{
    console.log(err)
  })
};
