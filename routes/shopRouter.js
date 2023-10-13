const router = require("express").Router();

const Shop = require("../controller/shopController");
const autenticate = require("../middlewares/authenticate");


router.post("/",autenticate, Shop.createShop);
router.get("/", Shop.getAllShop);
router.get("/:id", Shop.findShopById);
router.patch("/:id",Shop.updateShop);
router.delete("/:id", Shop.deleteShop);

module.exports = router;