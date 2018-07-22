'use strict';

const request = require('request-promise');

const base = 'http://api.nbp.pl/api/exchangerates/rates/a';
const date = '2018-01-02';
const format = 'format=json';
const json = true;
const logger = require('../backend/logger');

const cache = {};

const rate = async (unit) => {
  try {
    if (cache[unit]) {
      logger.debug(`unit ${unit} exists`);
      return cache[unit];
    }
    logger.debug(`unit ${unit} doesn't exists`);
    const url = `${base}/${unit.toLowerCase()}/${date}/?${format}`;
    const response = await request({ url, json });
    const value = response.rates[0].mid;
    cache[unit] = value;
  } catch (err) {
    return null;
  }
};

const usd = () => rate('usd');
const eur = () => rate('eur');

const currency = async (value, from, to) => {
  if (from === to) {
    return value;
  }
  if (from === 'PLN' && to === 'USD') {
    return value / await usd();
  }
  if (from === 'USD' && to === 'PLN') {
    return value * await usd();
  }
  if (from === 'PLN' && to === 'EUR') {
    return value / await eur();
  }
  if (from === 'EUR' && to === 'PLN') {
    return value * await eur();
  }
  if (from === 'USD' && to === 'EUR') {
    return value * await usd() / await eur();
  }
  if (from === 'EUR' && to === 'USD') {
    return value * await eur() / await usd();
  }
  return undefined;
};

module.exports = {
  currency,
  rate,
  usd,
  eur,
};
