const Drugdb = require('../model/model'); // mongoose model

// Tạo mới
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content cannot be empty!" });
    }

    const drug = new Drugdb({
        name: req.body.name,
        dosage: req.body.dosage,
        card: req.body.card,
        pack: req.body.pack,
        perDay: req.body.perDay
    });

    drug
        .save(drug)
        .then(data => {
            res.send({ message: "Drug added successfully!", data, success: true });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred", success: false });
        });
};

// Lấy danh sách
exports.find = (req, res) => {
    Drugdb.find()
        .then(drug => res.send(drug))
        .catch(err => res.status(500).send({ message: err.message }));
};

// Cập nhật
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty" });
    }

    const id = req.params.id;
    Drugdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update Drug with id=${id}. Maybe not found!` });
            } else {
                res.send({ message: "Drug updated successfully!", data, success: true });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating Drug with id=" + id, success: false });
        });
};

// Xóa
exports.delete = (req, res) => {
    const id = req.params.id;
    Drugdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete Drug with id=${id}. Maybe not found!` });
            } else {
                res.send({ message: "Drug deleted successfully!", success: true });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete Drug with id=" + id });
        });
};
