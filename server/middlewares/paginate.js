const MAX_LIMIT = 5;

// Нам буде приходити з фронт частини запит
// В цьому запиті нам фронт частина буде передавати  limit  та  offset
// В цьому мідлвейрі ми перевіряємо оці limit  та offset, які нам прийшли
// Якщо limit та offset - робимо запит до бд
// Якщо ліміт і оффсет, які прийшли з фронт частини НЕ нормальні - коригуємо
// ліміт та оффсет і робимо запит до БД

module.exports = async (req, res, next) => {
  try {
    // 1. Зчитування ліміту та оффсету з параметрів запиту
    const { query: { limit, offset } } = req;

    // 2. Перевірка ліміту та оффсету, створення об єкту pagination 
    if(!limit && !offset) { // якщо користувач не надіслав ні ліміта ні оффсета
      req.pagination = { // відправляʼмо першу сторінку
        limit: 5,
        offset: 0
      }
    } else {
      req.pagination = {
        limit: limit > MAX_LIMIT || limit <= 0 ? MAX_LIMIT : limit,
        offset: offset < 0 ? 0 : offset
      }
    }

    // 3. Передаємо керування наступному мідлвейру в ланцюжку мідлвейрів
    next();

  } catch (error) {
    next(error);
  }
}