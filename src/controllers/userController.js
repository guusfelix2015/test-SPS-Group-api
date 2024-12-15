class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.userService.login(email, password);

      res.json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      res.status(401).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({
        status: 'success',
        message: 'Usuário criado com sucesso',
        data: user.toJSON(),
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async getAll(req, res) {
    const users = await this.userService.findAll();
    res.json({
      status: 'success',
      data: users,
    });
  }

  async getById(req, res) {
    const user = await this.userService.getById(req.params.id);
    res.json({
      status: 'success',
      data: user,
    });
  }

  async update(req, res) {
    const user = await this.userService.update(req.params.id, req.body);
    res.json({
      status: 'success',
      data: user,
    });
  }

  async delete(req, res) {
    await this.userService.delete(req.params.id);
    res.json({
      status: 'success',
      message: 'Usuário deletado com sucesso',
    });
  }

  async getCurrentUser(req, res) {
    const user = await this.userService.getCurrentUser(req.user.id);
    res.json({
      status: 'success',
      data: user,
    });
  }
}

module.exports = UserController;
