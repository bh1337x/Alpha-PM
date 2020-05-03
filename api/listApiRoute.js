// Import required Modules
const express = require("express");

// Import necessary Schema Models
const Product = require("../models/ProductModel");
const Company = require("../models/CompanyModel");
const Generic = require("../models/GenericModel");
const Type = require("../models/TypeModel");

// Create new Express Router
const router = express.Router();

// Mock API
router.get("/mock", (req, res) => {
    Product.find({type: "NONE"}, { _id: 1 })
        .then(data => {
            res.status(200).json(data);
        }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
});

// Mock Product API
router.get("/mock/fullname", (req, res) => {
    Product.find({}, { fullname: 1 })
        .then(data => {
            res.status(200).json(data);
        }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
});

// Mock Type API
router.get("/mock/type", (req, res) => {
    Product.find({}, { type: 1 })
        .then(data => {
            res.status(200).json(data);
        }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
});

// Mock Company API
router.get("/mock/company", (req, res) => {
    Product.find({}, { company: 1 })
        .then(data => {
            res.status(200).json(data);
        }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
});

// Mock Generic API
router.get("/mock/generic", (req, res) => {
    Product.find({}, { generic: 1 })
        .then(data => {
            res.status(200).json(data);
        }).catch(err => {
        res.status(400).send(`Error : [ ${err} ]`);
    });
});

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
    if (req.body.fullname && req.body.name && req.body.price) {
        const product = new Product({
            fullname: req.body.fullname,
            name: req.body.name,
            type: req.body.type || "NONE",
            generic: req.body.generic || "NONE",
            size: req.body.size || "NONE",
            company: req.body.company || "NONE",
            price: req.body.price
        });
        product.save()
            .then(data => {
                res.status(200).send(data);
            }).catch(err => {
                res.status(400).send(`Error : [ ${err} ]`);
            });
    } else {
        res.status(400).send("Error : [ Invalid Body ]");
    }
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
    if (req.body.fullname && req.body.name && req.body.price) {
        Product.findByIdAndUpdate(req.params.productId, {
            fullname: req.body.fullname,
            name: req.body.name,
            type: req.body.type || "NONE",
            generic: req.body.generic || "NONE",
            size: req.body.size || "NONE",
            company: req.body.company || "NONE",
            price: req.body.price
        }).then(data => {
            res.status(200).json(data);
        }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
    } else {
        res.status(400).send("Error : [ Invalid Body ]");
    }
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
    Product.find({ fullname: { $regex: new RegExp(`\\b${req.params.productName}`) }})
        .then(data => {
            const len = data.length;
            Product.find({ fullname: { $regex: new RegExp(`\\b${req.params.productName}`) }}, {}, query)
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
    });
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
            Product.countDocuments({ type: data.name })
                .then((c) => {
                    const d = {
                        _id: data._id,
                        name: data.name,
                        count: c
                    }
                    res.status(200).json(d);
                }).catch(err => {
                    res.status(400).send(`Error : [ ${err} ]`);
                });
        }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
});

// Edit a Type by _id
router.post("/types/id/:typeId", (req, res) => {
    Type.findByIdAndUpdate(req.params.typeId, {
        name: req.body.name.trim()
    }).then(data => {
        Product.find({type: data.name }, { _id: 1 })
            .then(ids => {
                ids.forEach(id => {
                    Product.findByIdAndUpdate(id, { type: req.body.name.trim() })
                        .catch((err) => {
                            res.status(400).send(`Error : [ ${err} ]`);
                        });
                });
                res.status(200).json(data);
            }).catch(err => {
                res.status(400).send(`Error : [ ${err} ]`);
            });
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

// Get all Companies
router.get("/companies", (req, res) => {
    Company.find({})
        .then(data => {
            res.status(200).json(data);
        }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
});

// Add a new Company
router.post("/companies", (req, res) => {
    const company = new Company({
        name: req.body.name
    })
    company.save()
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
});

// Get a Company by _id
router.get("/companies/id/:companyId", (req, res) => {
    Company.findById(req.params.companyId)
        .then(data => {
            Product.countDocuments({ company: data.name })
                .then(c => {
                    const d = {
                        _id: data._id,
                        name: data.name,
                        count: c
                    }
                    res.status(200).json(d);
                }).catch(err => {
                res.status(400).send(`Error : [ ${err} ]`);
            });
        }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
});

// Edit a Company by _id
router.post("/companies/id/:companyId", (req, res) => {
    Company.findByIdAndUpdate(req.params.companyId, {
        name: req.body.name.trim()
    }).then(data => {
        Product.find({ company: data.name }, { _id: 1 })
            .then(ids => {
                ids.forEach(id => {
                    Product.findByIdAndUpdate(id, { company: req.body.name.trim() })
                        .catch((err) => {
                            res.status(400).send(`Error : [ ${err} ]`);
                        });
                });
                res.status(200).json(data);
            }).catch(err => {
                res.status(400).send(`Error : [ ${err} ]`);
            });
    }).catch(err => {
        res.status(400).send(`Error : [ ${err} ]`);
    });
});

// Delete a Company by _id
router.delete("/companies/id/:companyId", (req, res) => {
    Company.findByIdAndDelete(req.params.companyId)
        .then(data => {
            res.status(200).json(data);
        }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
});

// Get all Companies by companyName
router.get("/companies/name/:companyName", (req, res) => {
    Company.find({ name: { $regex: new RegExp(`\\b${req.params.companyName}`) }})
        .then(data => {
            res.status(200).json(data);
        }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
});

// Get all Generics
router.get("/generics", (req, res) => {
    const page = parseInt(req.query.page);
    const query = {};
    query.skip = 20 * (page - 1);
    query.limit = 20;
    Generic.find({})
        .then(data => {
            const len = data.length;
            Generic.find({}, {}, query)
                .then(data => {
                    res.status(200).json({ len, results: data });
                }).catch(err => {
                res.status(400).send(`Error : [ ${err} ]`);
            });
        }).catch(err => {
        res.status(400).send(`Error : [ ${err} ]`);
    });
});

// Add a new Generic
router.post("/generics", (req, res) => {
    const generic = new Generic({
        name: req.body.name
    })
    generic.save()
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
});

// Get a Generic by _id
router.get("/generics/id/:genericId", (req, res) => {
    Generic.findById(req.params.genericId)
        .then(data => {
            Product.countDocuments({ generic: data.name })
                .then(c => {
                    const d = {
                        _id: data._id,
                        name: data.name,
                        count: c
                    }
                    res.status(200).json(d);
                }).catch(err => {
                res.status(400).send(`Error : [ ${err} ]`);
            });
        }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
});

// Edit a Generic by _id
router.post("/generics/id/:genericId", (req, res) => {
    Generic.findByIdAndUpdate(req.params.genericId, {
        name: req.body.name.trim()
    }).then(data => {
        Product.find({ generic: data.name }, { _id: 1 })
            .then(ids => {
                ids.forEach(id => {
                    Product.findByIdAndUpdate(id, { generic: req.body.name.trim() })
                        .catch((err) => {
                            res.status(400).send(`Error : [ ${err} ]`);
                        });
                });
                res.status(200).json(data);
            }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
    }).catch(err => {
        res.status(400).send(`Error : [ ${err} ]`);
    });
});

// Delete a Generic by _id
router.delete("/generics/id/:genericId", (req, res) => {
    Generic.findByIdAndDelete(req.params.genericsId)
        .then(data => {
            res.status(200).json(data);
        }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
});

// Get all Generics by genericName
router.get("/generics/name/:genericName", (req, res) => {
    const page = parseInt(req.query.page);
    const query = {};
    query.skip = 20 * (page - 1);
    query.limit = 20;
    Generic.find({ name: { $regex: new RegExp(`\\b${req.params.genericName}`) }})
        .then(data => {
            const len = data.length;
            Generic.find({ name: { $regex: new RegExp(`\\b${req.params.genericName}`) }},
                {}, query)
                .then(data => {
                    res.status(200).json({ len, results: data });
                }).catch(err => {
                res.status(400).send(`Error : [ ${err} ]`);
            });
        }).catch(err => {
            res.status(400).send(`Error : [ ${err} ]`);
        });
});

// Export router as default
module.exports = router;