const admins = require("../model/admins");

module.exports.get = async (req, res) => {
  res.render("index", {
    title: "Noicland",
    layout: "main"
  });
};
