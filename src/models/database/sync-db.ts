import sequelize from ".";

(async () => await sequelize.drop())();
console.log("All models were synchronized successfully.");
