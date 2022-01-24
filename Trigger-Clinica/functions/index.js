const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();


exports.onUserCreate = functions.firestore.document('Ingreso/{Ingreso_Id}').onCreate(async (snap, context) => {
    const values = snap.data();
    const query = db.collection("Ingreso");
    const snapshot = await query.where("id_ingreso", "==", values.id_ingreso).get();
    let a = 0;
    snapshot.forEach(querysnapshot => {
        a = querysnapshot.data().incidente_violento
    });
    console.log(a);
    if (a > 1) {
        try {
            await db.collection('Ingreso').doc(snap.id).delete();
        } catch (error) {
            console.log(error);
        }
    }
})
