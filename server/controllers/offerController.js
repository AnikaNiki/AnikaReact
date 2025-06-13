import { Offer } from '../models/offer.js';
import { User } from '../models/user.js';
import ApiError from '../error/ApiError.js';
import { adaptOfferToClient, adaptFullOfferToClient } from '../adapters/offerAdapter.js';

async function getAllOffers(req, res, next) {
  try {
    const offers = await Offer.findAll();
    const adaptedOffers = offers.map(adaptOfferToClient);
    res.status(200).json(adaptedOffers);
  } catch (error) {
    next(ApiError.internal('Не удалось получить список предложений'));
  }
}

async function createOffer(req, res, next) {
  try {
    const {
      title, description, publishDate, city, isPremium, isFavorite, rating, type,
      rooms, guests, price, features, commentsCount, latitude, longitude, authorId
    } = req.body;

    if (!req.files?.previewImage || req.files.previewImage.length === 0) {
      return next(ApiError.badRequest('Превью изображение обязательно для загрузки'));
    }

    const previewImagePath = `/static/${req.files.previewImage[0].filename}`;
    let processedPhotos = [];
    if (req.files?.photos) {
      processedPhotos = req.files.photos.map(file => `/static/${file.filename}`);
    }

    let parsedFeatures = [];
    if (features) {
      parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
    }

    const offer = await Offer.create({
      title,
      description,
      publishDate: publishDate || new Date(),
      city,
      previewImage: previewImagePath,
      photos: processedPhotos,
      isPremium: isPremium === 'true' || isPremium === true,
      isFavorite: isFavorite === 'true' || isFavorite === true,
      rating: parseFloat(rating),
      type,
      rooms: parseInt(rooms),
      guests: parseInt(guests),
      price: parseInt(price),
      features: parsedFeatures,
      commentsCount: parseInt(commentsCount) || 0,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      authorId: parseInt(authorId)
    });

    return res.status(201).json(adaptOfferToClient(offer));
  } catch (error) {
    next(ApiError.internal(`Не удалось добавить предложение: ${error.message}`));
  }
}

async function getFullOffer(req, res, next) {
  try {
    const { id } = req.params;
    const offer = await Offer.findByPk(id, {
      include: { model: User, as: 'author' }
    });

    if (!offer) {
      return next(ApiError.badRequest('Offer not found'));
    }

    const adaptedOffer = adaptFullOfferToClient(offer, offer.author);
    res.send(adaptedOffer);
  } catch (error) {
    next(ApiError.internal('Не удалось получить предложение'));
  }
}

async function getFavoriteOffers(req, res, next) {
  try {
    const offers = await Offer.findAll({
      where: { isFavorite: true }
    });
    const adaptedOffers = offers.map(adaptOfferToClient);
    res.status(200).json(adaptedOffers);
  } catch (error) {
    next(ApiError.internal('Не удалось получить избранные предложения'));
  }
}

async function toggleFavorite(req, res, next) {
  try {
    const { offerId, status } = req.params;
    const offer = await Offer.findByPk(offerId);
    if (!offer) {
      return next(ApiError.badRequest('Предложение не найдено'));
    }
    offer.isFavorite = status === '1';
    await offer.save();
    res.json(adaptOfferToClient(offer));
  } catch (error) {
    next(ApiError.internal('Ошибка при обновлении статуса избранного'));
  }
}

export { getAllOffers, createOffer, getFullOffer, getFavoriteOffers, toggleFavorite };