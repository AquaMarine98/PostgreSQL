const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 50;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.product(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  create(data) {
    return new Promise((resolve, reject) => {
        if(data.name == null) {
            return reject('No hay nada');
        }
        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.products.push(newProduct);
        resolve(newProduct);
    })
  }

  find(filter) {
    return new Promise((resolve, reject) => {
      if (filter !== null) {
        const filterList = [];
        this.products.map((item) => { 
          if(item.name === filter || item.price == filter) {
              filterList.push(item);
          }
        });
        resolve(filterList);
      } else {
        resolve(this.products);
      }
    })
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if(!product) {
      throw boom.notFound('Product not found');
    }
    if(product.isBlock) {
      throw boom.conflict('Product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if(index === -1) {
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if(index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductService;
