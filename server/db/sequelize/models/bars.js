export default (sequelize, DataTypes) => {
  const Bar = sequelize.define('Bar', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    going: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false
    },
    lastRequest: {
      type: DataTypes.DATE(),
      allowNull: false
    }
  }, {
    timestamps: false
  });

  return Bar;
};
