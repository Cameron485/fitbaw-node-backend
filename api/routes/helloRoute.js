const getHello = (req, res) => {
  const hello = req.swagger.params.name.value;
  console.log(hello);
  res.status(200).json({ message: hello });
};


module.exports = {
  getHello,
};
