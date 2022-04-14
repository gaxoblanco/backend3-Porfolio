const faker = require('faker');
const boom = require('@hapi/boom');

class StudiesService{

  constructor(){
    this.studies = [];
    this.generate();
  };

  async generate(){
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.studies.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image: faker.image.imageUrl(),
      });
    }
  }

  async create(data){
    const newStudie = {
      id: faker.datatype.uuid(),
      ...data
    }
    return newStudie;
  };

  async find(){
    return this.studies
  };

  async findOne(id){
    const studie = this.studies.find(item => item.id === id);
    if (!studie) {
      throw boom.notFound('This studie not found');
    }
    return studie;
  };

  async update(id, change){
    const index = this.studies.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('This studie not exist');
    }
    const studie = this.studies[index];
    this.studies[index] = {
      ...studie,
      ...change
    }
    return this.studies[index];
  };

  async delete(id){
    const index = this.studies.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('This studie not exist');
    }
    this.studies.splice(index, 1);
    return {message: true};
  };
};

module.exports = StudiesService;
