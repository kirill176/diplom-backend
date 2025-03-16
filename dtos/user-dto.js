module.exports = class UserDto {
  email;
  id;
  isActivated;
  userName;
  disckSpace;
  usedSpace;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.userName = model.userName;
    this.disckSpace = model.disckSpace;
    this.usedSpace = model.usedSpace;
  }
};
