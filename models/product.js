const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    //   this.id = Math.random().toString();
       getProductsFromFile(products => {
         if(this.id){
           const existingProductIndex = products.findIndex(
             prod => prod.id ===this.id
           );
           const updateProducts= [...products];
           updateProducts[existingProductIndex] = this;
           fs.writeFile(p, JSON.stringify(updateProducts), err => {
             console.log(err);
           });
         }
        else{
         this.id = Math.random().toString();
         products.push(this);
         fs.writeFile(p, JSON.stringify(products), err => {
           console.log(err);
         });}
       });
     }

    
     static deleteByID(id) {
      getProductsFromFile(products => {
        const updatedProducts = products.filter(prod => prod.id !== id); // ✅ Use id instead of this.id
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          if (err) {
            console.log(err);
          }
        });
      });
    }
    
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findByID(id, cb){
    getProductsFromFile(products=>{
      const product=products.find(p => p.id === id || p.id === +id);
      cb(product);
    })
  }

};
