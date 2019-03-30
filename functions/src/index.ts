import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper';
import * as express from 'express';
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const app = express();
const main = express();

main.use('/api', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

const catalog = 'catalog';

export const webApi = functions.https.onRequest(main);


// Add new product
app.post('/catalog', (req, res) => {
    firebaseHelper.firestore
        .creatNewDocument(db, catalog, req.body);
    res.send('Create a new product');
})

// View a product
app.get('/catalog/:product', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, catalog, req.params.product)
        .then(doc => res.status(200).send(doc));
})

// View all catalog
app.get('/catalog', (req, res) => {
    firebaseHelper.firestore
        .backup(db, catalog)
        .then(data => res.status(200).send(data))
})

// Delete a product 
app.delete('/catalog/:product', (req, res) => {
    firebaseHelper.firestore
        .deleteDocument(db, catalog, req.params.product);
    res.send('Contact is deleted');
})