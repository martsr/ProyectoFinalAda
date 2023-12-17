import sequelize from ".";

(async () => await sequelize.drop())();
// (async () => await sequelize.drop())();
// console.log("All models were deleted successfully.");

// (async () => await sequelize.sync({ alter: true }))();
console.log("All models were synchronized successfully.");
