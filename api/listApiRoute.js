// Import required Modules
const express = require("express");

// Import necessary Schema Models
const Product = require("../models/ProductModel");
const Type = require("../models/TypeModel");

// Create new Express Router
const router = express.Router();

// Get all Products
router.get("/products", (req, res) => {
    const page = parseInt(req.query.page);
    const query = {};
    query.skip = 20 * (page - 1);
    query.limit = 20;
    Product.find({})
    .then(data => {
        const len = data.length;
        Product.find({}, {}, query)
            .then(data => {
                res.status(200).json({ len, results: data });
            }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
    }).catch(err => {
        res.status(400).send(`Error : [ ${err} ]`);
    });
});

// Add a new Products
router.post("/products", (req, res) => {
    const product = new Product({
        fullname: `${req.body.name} ${req.body.size} ${req.body.type}`,
        name: req.body.name,
        type: req.body.type,
        generic: req.body.generic,
        size: req.body.size,
        company: req.body.company,
        price: req.body.price
    });
    product.save()
    .then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send(`Error : [ ${err} ]`);
    });
});

// Get a Products by _id
router.get("/products/id/:productId", (req, res) => {
    Product.findById(req.params.productId)
    .then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(400).send(`Error : [ ${err} ]`);
    });
});

// Edit a Products by _id
router.post("/products/id/:productId", (req, res) => {
    Product.findByIdAndUpdate(req.params.productId, {
        fullname: req.body.fullname,
        name: req.body.name,
        type: req.body.type,
        generic: req.body.generic,
        size: req.body.size,
        company: req.body.company,
        price: req.body.price
    }).then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(400).send(`Error : [ ${err} ]`);
    });
});

// Delete a Products by _id
router.delete("/products/id/:productId", (req, res) => {
    Product.findByIdAndDelete(req.params.productId)
    .then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(400).send(`Error : [ ${err} ]`);
    });
});

// Get all Products by productName
router.get("/products/name/:productName", (req, res) => {
    const page = parseInt(req.query.page);
    const query = {};
    query.skip = 20 * (page - 1);
    query.limit = 20;
    Product.find({ name: { $regex: new RegExp(`\\b${req.params.productName}`) }})
    .then(data => {
        const len = data.length;
        Product.find({ name: { $regex: new RegExp(`\\b${req.params.productName}`) }}, {}, query)
        .then(data => {
            res.status(200).json({ len, results: data });
        }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
    }).catch(err => {
        res.status(400).send(`Error : [ ${err} ]`);
    });
});

// Get all Types
router.get("/types", (req, res) => {
    Type.find({})
    .then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(400).send(`Error : [ ${err} ]`);
    });
});

// Add a new Type
router.post("/types", (req, res) => {
    const type = new Type({
        name: req.body.name
    })
    type.save()
    .then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send(`Error : [ ${err} ]`);
    });
});

// Get a Type by _id
router.get("/types/id/:typeId", (req, res) => {
    Type.findById(req.params.typeId)
    .then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(400).send(`Error : [ ${err} ]`);
    });
});

// Edit a Type by _id
router.post("/types/id/:typeId", (req, res) => {
    Type.findByIdAndUpdate(req.params.typeId, {
        name: req.body.name
    })
    .then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(400).send(`Error : [ ${err} ]`);
    });
});

// Delete a Type by _id
router.delete("/types/id/:typeId", (req, res) => {
    Type.findByIdAndDelete(req.params.typeId)
    .then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(400).send(`Error : [ ${err} ]`);
    });
});

// Get all Types by typeName
router.get("/types/name/:typeName", (req, res) => {
    Type.find({ name: { $regex: new RegExp(`\\b${req.params.typeName}`) }})
    .then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(400).send(`Error : [ ${err} ]`);
    });
});

// Export router as default
module.exports = router;