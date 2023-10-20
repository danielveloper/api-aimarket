import { validate } from 'class-validator';

import { PersonRequest } from '../models/person';
import { Person } from '../entities/person';
import { User } from '../entities/user';
import { AppDataSource } from '../utils/database';


export class UserService {
  static async createPerson(personData: PersonRequest) {

    const personRepository = AppDataSource.getRepository(Person);

    const person = new Person();
    person.firstName = personData.firstName;
    person.secondName = personData.secondName;
    person.lastName = personData.lastName;
    person.secondLastName = personData.secondLastName;
    person.phoneNumber = personData.phoneNumber;
    person.street = personData.street;
    person.user = new User(); // Crea una nueva instancia de User
    person.user.id = personData.userId;

    const existingPhone = await personRepository.findOneBy({ phoneNumber: personData.phoneNumber });
    if (existingPhone) {
      throw new Error('El numero de telefono ya existe');
    }

    const errors = await validate(person);

    if (errors.length > 0) {
      return errors;
    }

    return await personRepository.save(person);
  }
}
