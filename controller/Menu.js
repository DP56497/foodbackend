const { menuItems } = require('../models/Menu');

// Get Menu Items
const getMenu = async(req, res) => {
    res.json(menuItems);
};

module.exports = {
    getMenu
}
