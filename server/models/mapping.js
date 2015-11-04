"use strict";

module.exports = function(sequelize, DataTypes) {
  var mapping = sequelize.define("mapping", {
    
    attributeId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    
    tenantId: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    
    fileName: {
      type: DataTypes.STRING
    },
    mappingInfo: {
      type: DataTypes.ARRAY(DataTypes.JSON), 
      defaultValue: []
    },
    
    delimeter: DataTypes.JSON,
    mappingName: {
      type: DataTypes.STRING
    }
  });

  return mapping;
};