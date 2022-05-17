const createError = require('http-errors')
const Election = require('../models/Election')
const {
    electionSchema
} = require('../validators/electionValidator')
const mongoose = require('mongoose');

const createElection = async (req, res, next) => {

    // More testing in case of validation failures
    try {
        await electionSchema.validateAsync(req.body);
    } catch (err) {
        next(createError(400, err));
    }

    const election = new Election({
        title: req.body.title
    })

    try {
        const savedElection = await election.save();
        res.json(savedElection);
    } catch (err) {
        next(createError(500, err));
    }
};

const getElection = async (req, res, next) => {

    electionId = req.params.electionId

    if (!electionId) {
        next(createError(400, 'electionId cannot be empty'));
    }

    if (!mongoose.isValidObjectId(electionId)) {
        next(createError(400, `Election with id :: ${electionId} is not valid`));
    }

    try {
        const election = await Election.findById(electionId);
        if (!election) {
            next(createError(404, `Election with id :: ${electionId} is not found`));
        }
        res.json(election);
    } catch (err) {
        next(createError(500, err));
    }
};

const deleteElection = async (req, res, next) => {

    electionId = req.params.electionId

    if (!electionId) {
        next(createError(400, 'electionId cannot be empty'));
    }

    if (!mongoose.isValidObjectId(electionId)) {
        next(createError(400, `Election with id :: ${electionId} is not valid`));
    }

    try {
        const election = await Election.remove({
            _id: electionId
        })
        if (!election) {
            next(createError(404, `Election with id :: ${electionId} is not found`));
        }
        res.json(election);
    } catch (err) {
        next(createError(500, err));
    }
};


const updateElection = async (req, res, next) => {

    electionId = req.params.electionId

    if (!electionId) {
        next(createError(400, 'electionId cannot be empty'));
    }

    if (!mongoose.isValidObjectId(electionId)) {
        next(createError(400, `Election with id :: ${electionId} is not valid`));
    }

    // More testing in case of validation failures
    try {
        await electionSchema.validateAsync(req.body);
    } catch (err) {
        next(createError(400, err));
    }

    try {
        const election = await Election.updateOne({
            _id: electionId
        }, {
            $set: {
                title: req.body.title
            }
        });

        if (!election) {
            next(createError(404, `Election with id :: ${electionId} is not found`));
        }
        res.json(election);
    } catch (err) {
        next(createError(500, err));
    }
};

const getElections = async (req, res, next) => {

    let {
        page,
        size
    } = req.query;

    if (!page) {
        page = 1;
    }

    if (!size) {
        size = 10;
    }

    if (isNaN(page) || page <= 0) {
        next(createError(400, 'page number should be a valid positive integer'));
    }

    if (isNaN(size) || size <= 0) {
        next(createError(400, 'page size should be a valid positive integer'));
    }

    try {
        const elections = await Election.find().sort({
            createdAt: -1
        }).skip(parseInt((page - 1) * size)).limit(size)
        res.json(elections)
    } catch (err) {
        next(createError(500, err));
    }
};

module.exports = {
    createElection,
    getElections,
    getElection,
    deleteElection,
    updateElection
}