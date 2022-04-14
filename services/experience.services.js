const faker = require('faker');
const boom = require('@hapi/boom');

class ExperiencesService {

  constructor(){
    this.experiences = [];
    this. generate();
  };

  async generate(){
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.experiences.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image: faker.image.imageUrl(),
      });
    }
  };

  async create(data){
    const newExperience = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.experiences.push(newExperience);
    return newExperience;
  };

  async find(){
    return this.experiences;
  };

  async findOne(id){
    const experience = this.experiences.find(item => item.id === id);
    if(!experience){
      throw boom.notFound('This experiences not Found');
    }
    return experience;
  };

  async update(id, change){
    const index =  this.experiences.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('This experiences not Found');
    }
    const experience = this.experiences[index];
    this.experiences[index] = {
      ...experience,
      ...change
    }
    return this.experiences[index];
  };

  async delete(id){
    const index =  this.experiences.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('This experiences not exist');
    }
    this.experiences.splice(index, 1);
    return {message: true};
  };

};

module.exports = ExperiencesService;
