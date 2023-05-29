const prisma = require("./prisma");

const saveList = (list) => {
  return prisma.lists.create({
    data: list,
  });
};

const getAllLists = () => {
  return prisma.lists.findMany();
};

const updateList = (id, body) => {
  return prisma.lists.update({
    where: {
      id: id,
    },
    data: body,
  });
};

const deleteItemList = (id) => {
  return prisma.lists.delete({
    where: {
      id: id,
    },
  });
};

module.exports = {
  saveList,
  getAllLists,
  updateList,
  deleteItemList,
};
