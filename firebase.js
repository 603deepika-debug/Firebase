const admin=require('firebase-admin');

const serviceAccount=require('./serviceAccountkey.json');
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:"https://fir-2c53f-default-rtdb.firebaseio.com"
});
const db=admin.database();
module.exports=db;