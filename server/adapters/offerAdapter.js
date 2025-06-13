const cityCoordinates = {
  Paris: { latitude: 48.8566, longitude: 2.3522, zoom: 13 },
  Cologne: { latitude: 50.9375, longitude: 6.9603, zoom: 13 },
  Brussels: { latitude: 50.8503, longitude: 4.3517, zoom: 13 },
  Amsterdam: { latitude: 52.3676, longitude: 4.9041, zoom: 13 },
  Hamburg: { latitude: 53.5511, longitude: 9.9937, zoom: 13 },
  Dusseldorf: { latitude: 51.2277, longitude: 6.7735, zoom: 13 }
};

const getBaseUrl = () => `${process.env.HOST}:${process.env.PORT || 5000}`;

const adaptOfferToClient = (offer) => {
  const baseUrl = getBaseUrl();
  const cityLocation = cityCoordinates[offer.city];
  let previewImage = offer.previewImage;
  if (previewImage && !previewImage.startsWith('http')) {
    previewImage = `${baseUrl}${previewImage.startsWith('/') ? '' : '/'}${previewImage}`;
  }
  let photos = offer.photos;
  if (photos && photos.length > 0) {
    photos = photos.map(photo => `${baseUrl}${photo.startsWith('/') ? '' : '/'}${photo}`);
  }

  return {
    id: String(offer.id),
    title: offer.title,
    type: offer.type,
    price: offer.price,
    city: {
      name: offer.city,
      location: cityLocation
    },
    location: offer.latitude && offer.longitude ? {
      latitude: offer.latitude,
      longitude: offer.longitude
    } : { latitude: 0, longitude: 0 },
    isFavorite: offer.isFavorite,
    isPremium: offer.isPremium,
    rating: parseFloat(offer.rating),
    previewImage,
    photos
  };
};

const adaptFullOfferToClient = (offer, author) => {
  const baseOffer = adaptOfferToClient(offer);
  return {
    ...baseOffer,
    description: offer.description,
    rooms: offer.rooms,
    guests: offer.guests,
    features: offer.features,
    author: {
      id: String(author.id),
      username: author.username,
      email: author.email,
      isPro: author.userType === 'pro',
      avatarUrl: author.avatar ? `${getBaseUrl()}${author.avatar.startsWith('/') ? '' : '/'}${author.avatar}` : null
    }
  };
};

export { adaptOfferToClient, adaptFullOfferToClient };