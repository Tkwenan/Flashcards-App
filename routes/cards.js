const express = require('express');
const router = express.Router();

//store the JSONs data property into a constant named data
//equivalent to const data  = require('../data/flashcardData.json').data;
const { data } = require('../data/flashcardData.json');

//store the card data separately
//equivalent to const cards = data.cards;
const { cards } = data;

router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const flashcardId = Math.floor(Math.random() * numberOfCards);
    //res.redirect(`/cards/${flashcardId}?side=question`)
    res.redirect(`/cards/${flashcardId}`)
});


//route that serves the individual page
router.get('/:id', (req, res) => {
    const { side } = req.query;

    //since question and answer are properties on the json
    //we can use the value stored in 'side' to find the text we want to display
    //get the id of the card from the route parameter
    const { id } = req.params;

    if (!side){
       return res.redirect(`/cards/${id}?side=question`);
    }

    const name = req.cookies.username;
    const text = cards[id][side];
    const { hint } = cards[id];

    //wrap the id and the text into an object
    //that can be passed into the template
    const templateData = { id, text, name, side};

    //assign values to sideToShow and sideToShowDisplay
    //based on which side of the card the URL points to
    //if it's the question in the query string, it should point
    //to the answer
    if (side === 'question'){
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    }
    else if (side === 'answer'){
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }
    
    res.render('card', templateData);
        
});

module.exports = router;

