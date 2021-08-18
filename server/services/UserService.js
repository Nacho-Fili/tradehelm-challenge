class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  createUser = async function () {
    let generatedId;
    let idIsValid = false;

    try {
      while (!idIsValid) {
        generatedId = Math.ceil(Math.random() * 10000);
        idIsValid = await this.userRepository.idIsValid(generatedId);
        if (idIsValid) await this.userRepository.createUser(generatedId);
      }
    } catch (err) {
      generatedId = -1;
      throw err;
    }

    return generatedId;
  };
}

module.exports = UserService;
