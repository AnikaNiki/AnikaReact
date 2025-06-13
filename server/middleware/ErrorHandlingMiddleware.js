const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Логируем стек ошибки
  res.status(err.status || 500).json({
    message: err.message || 'Внутренняя ошибка сервера',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export default errorHandler;