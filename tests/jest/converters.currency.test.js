'use strict';

// const mock = require('mock-require');

// mock('request-promise', async () => ({
//   table: 'A',
//   currency: 'dolar amerykański',
//   code: 'USD',
//   rates: [
//     {
//       no: '1/A/NBP/2012',
//       effectiveDate: '2012-01-02',
//       mid: 0.4454,
//     },
//   ],
// }));

const { currency } = require('../../converters/currency');

describe('currency converter', async () => {
  const response = await currency(1, 'USD', 'PLN');
  expect(response).toBe(3.4546);
});
