const { Shop, User, Product } = require("../models");
const ApiError = require("../utils/apiError");

const createShop = async (req, res, next) => {
    const { name, userId, productId } = req.body;

    try {
        // Cari pengguna berdasarkan userId
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "User not found",
            });
        }

        // Cari produk berdasarkan productId
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                status: "Error",
                message: "Product not found",
            });
        }

        const newShop = await Shop.create({
            name,
            userId: user.id,
            productId: product.id,
        });

        res.status(200).json({
            status: "Success",
            data: {
                newShop,
            },
        });
    } catch (err) {
        next(new ApiError(err.message, 400));
    }
};

const getAllShop = async (req, res) => {
    try {
        const shops = await Shop.findAll();

        res.status(200).json({
            status: "success",
            data: {
                shops,
            },
        });
    } catch (err) {
        next(new ApiError(err.message, 400));
    }
};

const findShopById = async (req, res, next) => {
    try {
        const shop = await Shop.findOne({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json({
            status: "Success",
            data: {
                shop,
            },
        });
    } catch (err) {
        next(new ApiError(err.message, 400));
    }
};

const updateShop = async (req, res, next) => {
    const { name, userId, productId } = req.body;

    try {
        await Shop.update(
            {
                name,
                userId,
                productId,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        res.status(200).json({
            status: "Success",
            message: "sukses update Shop",
        });
    } catch (err) {
        next(new ApiError(err.message, 400));
    }
};

const deleteShop = async (req, res, next) => {
    try {
        const shop = await Shop.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!shop) {
            next(new ApiError("Shop not found", 404));
        }

        await Shop.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json({
            status: "Success",
            message: "sukses delete Shop",
        });
    } catch (err) {
        next(new ApiError(err.message, 400));
    }
};

module.exports = { createShop, getAllShop, findShopById, updateShop, deleteShop };