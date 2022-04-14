const faker = require('faker');
const boom = require('@hapi/boom');

class SkillServices {

  constructor(){
    this.skills = [];
    this.generate();
  };

  async generate(){
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.skills.push({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        description: faker.commerce.productDescription(),
        image: faker.image.imageUrl(),
      });
    }
  }

//creamos
  async create(data){
    const newSkill = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.skills.push(newSkill);
    return newSkill;
  };
//pasamos los skills que tenemos
  async find(){
    return this.skills;
  };
//llamamos 1
  async findOne(id){
    const skill = this.skills.find(item => item.id === id);
    if (!skill) {
      throw boom.notFound('This skill not found');
    }
    return skill;
  };
//actualizo
  async update(id, change){
    const index = this.skills.findIndex(item => item.id === id);
    if (index === -1){
      throw boom.notFound('This skill not Found');
    }
    const skill = this.skills[index];
    this.skills[index] ={
      ...skill,
      ...change
    }
    return this.skills[index];
  };
//borramos
  async delete(id){
    const index = this.skills.findIndex(item => item.id === id);
    if (index === -1){
      throw boom.notFound('This skill not exist');
    }
    this.skills.splice(index, 1);
    return{message: true};
  };

};




module.exports = SkillServices
