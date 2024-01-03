const Country = require("../Models/CountryModel");

module.exports.Create = async (req, res) => {
    try {
        const { name, status, text } = req.body;

        // Create new country
        const country = new Country({ name, status, text });
        await country.save();

        res.status(201).json({ message: "Country created successfully", country });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating country" });
    }
};

module.exports.Patch = async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedData = req.body;

        // Update country
        const updatedCountry = await Country.findByIdAndUpdate(
            id,
            updatedData,
            { new: true } // Return the updated document
        );

        if (!updatedCountry) {
            return res.status(404).json({ message: "Country not found" });
        }

        res.status(200).json({ message: "Country updated successfully", updatedCountry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating country" });
    }
};

module.exports.Get = async (req, res) => {
    const { id } = req.params;

    try {
        const country = await Country.findById(id);
        if (!country) {
            return res.status(404).json({ message: "Country not found" });
        }
        res.status(200).json(country);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving country data" });
    }
};

module.exports.Delete = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the country by ID
        const deletedCountry = await Country.findByIdAndDelete(id);

        if (!deletedCountry) {
            return res.status(404).json({ message: "Country not found" });
        }

        res.status(200).json({ message: "Country deleted successfully" });
    } catch (error) {
        console.error("Error deleting country:", error);
        res.status(500).json({ message: "Error deleting country" });
    }
};

