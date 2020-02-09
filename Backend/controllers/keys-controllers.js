const uuid = require('uuid/v4');

const HttpError = require('../models/http-error');



let example_keys = [
    {
        id: '1',
        title: 'MyKey',
        value: 'jkdlfdsakjfhdslkjbflsdjkbfldshfbljkdsgfldsagbflkjdsagflkjdsgaflsa',
        userId: '1'
    }
];



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

const getKeysByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const keys = example_keys.filter(k => {
        return k.userId === userId;
    });

    if (!keys || keys.length === 0) {
        //next is used for asynchronos actions instead of THROW 
        return next(new HttpError('Could not find keys for the given user id', 404));
    }

    res.json({keys: keys});
};

const genrateKey = (req, res, next) => {
    const { title, value, userId } = req.body;
    const generatedKey = {
        id: uuid(),
        title,
        value,
        userId
    };
    
    example_keys.push(generatedKey);

    res.status(201).json({key: generatedKey});
 };

 const deleteKey = (req, res, next) => {
    const keyId = req.params.pid;
    example_keys = example_keys.filter(p => p.id !== keyId);
    res.status(200).json({ message: 'Deleted key.' });
  };

exports.getKeyById = getKeyById;
exports.getKeysByUserId = getKeysByUserId;
exports.genrateKey = genrateKey;
exports.deleteKey = deleteKey;