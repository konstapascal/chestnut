const HttpError = require('../models/http-error');


const example_keys = [
    {
        id: '1',
        title: 'MyKey',
        value: 'jkdlfdsakjfhdslkjbflsdjkbfldshfbljkdsgfldsagbflkjdsagflkjdsgaflsa',
        userId: 1
    }
]



const getKeyById = (req, res, next) => {
    const keyId = req.params.kid; // stores the id of the key in keyId 

    // Search the keys and compare key ids
    const key = example_keys.find(k => {
        return k.id === keyId;
    });
    
    if (!key) {
        return next(new HttpError('Could not find a key for the given id', 404));
    }
 
    //respond with the key we found
    res.json({key: key});
};

const getKeyByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const key = example_keys.find(k => {
        return k.id === userId;
    });

    if (!key) {
        //next is used for asynchronos actions instead of THROW 
        return next(new HttpError('Could not find a key for the given user id', 404));
    }

    res.json({key: key});
};

const genrateKey = (req, res, next) => {
    const { title, value, userId } = req.body;
    const generatedKey = {
        title,
        value,
        userId
    };
    
    example_keys.push(generatedKey);

    res.status(201).json({key: generatedKey});
 };

exports.getKeyById = getKeyById;
exports.getKeyByUserId = getKeyByUserId;
exports.genrateKey = genrateKey;