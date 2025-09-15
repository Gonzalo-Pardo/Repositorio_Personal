const ExchangeRate = require("../models/ExchangeRate");
const ExchangeTransaction = require("../models/ExchangeTransaction");

async function upsertRate({ base, quote, rate, effectiveAt }) {
  return await ExchangeRate.create({
    base: base.toUpperCase(),
    quote: quote.toUpperCase(),
    rate,
    effectiveAt: effectiveAt || new Date(),
  });
}

async function listRates({ base, quote, limit = 50 }) {
  const where = {};
  if (base) where.base = base.toUpperCase();
  if (quote) where.quote = quote.toUpperCase();

  return await ExchangeRate.findAll({
    where,
    order: [["effectiveAt", "DESC"]],
    limit: Math.min(Number(limit), 200),
  });
}

async function getLatestRate(base, quote) {
  return await ExchangeRate.findOne({
    where: { base: base.toUpperCase(), quote: quote.toUpperCase() },
    order: [["effectiveAt", "DESC"]],
  });
}

async function convertCurrency(from, to, amount) {
  let rateRow = await getLatestRate(from, to);
  let rate = null;
  let direction = "directa";

  if (!rateRow) {
    // intentar inversa
    const inverse = await getLatestRate(to, from);
    if (inverse) {
      rate = 1 / Number(inverse.rate);
      direction = "inversa";
    }
  } else {
    rate = Number(rateRow.rate);
  }

  if (!rate) return null;

  const result = amount * rate;

  const tx = await ExchangeTransaction.create({
    fromCurrency: from,
    toCurrency: to,
    amount,
    rateUsed: rate,
    resultAmount: result,
  });

  return { rate, result, direction, txId: tx.id };
}

module.exports = {
  upsertRate,
  listRates,
  getLatestRate,
  convertCurrency,
};
