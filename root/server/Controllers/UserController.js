const User = require("../Models/UserModel");

module.exports.AddVisited = async (req, res) => {
    const { username } = req.params;
    const { country, id } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { username },
            { $addToSet: { visited: { country, id } } },
            { new: true }
        );
        res.status(200).json({ message: "Country added to visited", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding country to visited list" });
    }
};

module.exports.AddWishlist = async (req, res) => {
    const { username } = req.params;
    const { country, id } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { username },
            { $addToSet: { wishlist: { country, id } } },
            { new: true }
        );
        res.status(200).json({ message: "Country added to wishlist", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding country to wishlist" });
    }
};

module.exports.Visited = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });
        res.status(200).json({ visited: user.visited });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving visited list" });
    }
};

module.exports.Wishlist = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });
        res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving wishlist" });
    }
};

module.exports.DeleteVisited = async (req, res) => {
    const { username } = req.params;
    const { id } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { username },
            { $pull: { visited: { id } } },
            { new: true }
        );
        res.status(200).json({ message: "Country removed from visited list", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing country from visited list" });
    }
};

module.exports.DeleteWishlisted = async (req, res) => {
    const { username } = req.params;
    const { id } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { username },
            { $pull: { wishlist: { id } } },
            { new: true }
        );
        res.status(200).json({ message: "Country removed from wishlist", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing country from wishlist" });
    }
};
