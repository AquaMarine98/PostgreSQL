const { faker } = require("@faker-js/faker");

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
        price: parseInt(faker.commerce.price()) + "$",
        image: faker.image.imageUrl(),
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
    if (filter !== null) {
      const filterList = [];
      this.products.map((item) => { 
        if(item.name === filter || item.price == filter) {
            filterList.push(item);
        }
      });
      return filterList;
    } else {
      return this.products;
    }
  }

  findOne(id) {
    return this.products.find((item) => item.id === id);
  }

  update() {}

  delete() {}
}

module.exports = ProductService;
