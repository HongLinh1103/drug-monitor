const validateDrugData = (req, res, next) => {
    console.log(">>> Body nhận từ client:", req.body);

    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!",
            success: false
        });
    }

    const { name, dosage, card, pack, perDay } = req.body;
    const errors = [];

    if (!name || name.length <= 5) {
        errors.push("Drug name must be longer than 5 characters");
    }

    const dosagePattern = /^\d{1,2}-morning,\d{1,2}-afternoon,\d{1,2}-night$/;
    if (!dosage || !dosagePattern.test(dosage)) {
        errors.push("Dosage must follow format: XX-morning,XX-afternoon,XX-night");
    }

    if (!card || isNaN(Number(card)) || Number(card) <= 1000) {
        errors.push("Card must be more than 1000");
    }

    if (!pack || isNaN(Number(pack)) || Number(pack) <= 0) {
        errors.push("Pack must be more than 0");
    }

    if (!perDay || isNaN(Number(perDay)) || Number(perDay) <= 0 || Number(perDay) >= 90) {
        errors.push("PerDay must be more than 0 and less than 90");
    }

    if (errors.length > 0) {
        console.log(">>> Validation errors:", errors);
        return res.status(400).send({
            message: "Validation error",
            errors,
            success: false
        });
    }

    next();
};

module.exports = validateDrugData;   // 👈 thêm export đúng cách
