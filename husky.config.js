module.exports = {
  hooks: {
    'pre-commit': 'npm test || (echo "woof woof!" && exit 1)',
  },
};
