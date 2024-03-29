const prisma = require("./prisma");

const findUserByEmail = (email) => {
  return prisma.users.findUnique({
    where: {
      email,
    },
  });
};

const findUserById = (id) => {
  return prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
    },
  });
};

const saveUser = (user) => {
  return prisma.users.create({
    data: user,
  });
};

module.exports = {
  findUserByEmail,
  findUserById,
  saveUser,
};
