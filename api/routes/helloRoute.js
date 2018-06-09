const getHello = (req, res) => {
  const name = req.swagger.params.name.value;
  res.status(200).json({ message: name });
};

module.exports = {
  getHello,
};
