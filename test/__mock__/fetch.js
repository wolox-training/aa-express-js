const fetch = {
  get: jest.fn(() => Promise.resolve({ data: {} }))
};
module.exports = fetch;
