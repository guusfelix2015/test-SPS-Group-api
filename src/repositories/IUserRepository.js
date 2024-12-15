class IUserRepository {
  async findById(_id) {
    throw new Error('Método não implementado');
  }
  async findByEmail(_email) {
    throw new Error('Método não implementado');
  }
  async create(_user) {
    throw new Error('Método não implementado');
  }
  async update(_id, _data) {
    throw new Error('Método não implementado');
  }
  async delete(_id) {
    throw new Error('Método não implementado');
  }
  async findAll() {
    throw new Error('Método não implementado');
  }
}

module.exports = IUserRepository;
