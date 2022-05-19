const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: 'fe2dc1f3afd64de29125d4139eece964'
});

const handleApiCall = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input)
        .then(data => {
            res.json(data);
        })
    .catch(err=>res.status(400).json('unable to work with api'))
}

        
handleImagecounts = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err=>res.status(400).json('unable to find'))
}

module.exports = {
    handleImagecounts: handleImagecounts,
    handleApiCall: handleApiCall
}