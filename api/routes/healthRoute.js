const getHealth = (req, res) => {
  res.status(200).json({ message: 'ok' });
};

module.exports = {
  getHealth,
};
