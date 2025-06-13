import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { User } from './user.js';

class Offer extends Model {}

Offer.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [10, 100] }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [20, 1024] }
  },
  publishDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  city: {
    type: DataTypes.ENUM('Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'),
    allowNull: false
  },
  previewImage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photos: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  isPremium: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  isFavorite: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
    validate: { min: 1, max: 5 }
  },
  type: {
    type: DataTypes.ENUM('apartment', 'house', 'room', 'hotel'),
    allowNull: false
  },
  rooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 8 }
  },
  guests: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 10 }
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 100, max: 100000 }
  },
  features: {
    type: DataTypes.ARRAY(DataTypes.ENUM('Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge')),
    allowNull: false
  },
  commentsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Offer',
  tableName: 'offers'
});

Offer.belongsTo(User, { as: 'author', foreignKey: 'authorId' });

export { Offer };