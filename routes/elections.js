const {Router} = require('express')
const { getElection, getElections, createElection, deleteElection, updateElection } = require('../controllers/electionController')

const router = Router();

router.get('/', getElections)
router.get('/:electionId', getElection)
router.delete('/:electionId', deleteElection)
router.put('/:electionId', updateElection)
router.post('/', createElection);

module.exports = router;