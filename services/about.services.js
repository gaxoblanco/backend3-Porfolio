const faker = require('faker');
const boom = require('@hapi/boom');

class AboutServices {

  constructor(){
    this.abouts = [];
    this.generate();
  };

  async generate(){
    const limit = 3;
    for (let index = 0; index < limit; index++) {
      this.abouts.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        isBlock: faker.datatype.boolean(),
      });
    }
  };



  async create (data) {
    const newAbout = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.abouts.push(newAbout);
    return newAbout;
  };

  async find(){
    return this.abouts;
  };

  async findOne(id){
    const about = this.abouts.find(item => item.id === id);
    if(!about){
      throw boom.notFound('This about not Found');
    }
    if(about.isBlock){
      throw boom.conflict('about is block');
    }
    return about;
  };

  async update(id, changes){
    const index = this.abouts.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('This about not Found');
    }
    const about = this.abouts[index];
    this.abouts[index] = {
      ...about,
      ...changes
    };
    return this.abouts[index];
  };

  async delete(id){
    const index = this.abouts.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('This about not exist');
    }
    this.abouts.splice(index, 1);
    return {message: true};
  };
};

module.exports = AboutServices;
