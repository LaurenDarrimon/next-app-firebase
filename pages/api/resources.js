//import firebase database

import firebase from "../../lib/firebase";


export default async function handler(req, res){
    try {
        const snapshot = await firebase.collection("resources").get();

        //loop through returned docs and add all data to object 

        let output = [];

        snapshot.forEach(document => {
            
            output.push(
                {
                    id: document.id,
                    data: document.data()
                }
            )
        });
        
        console.log("output", output)

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json( {output});

        
    } catch (error) {
        console.log(error);
        res.status(500).end(err.message);
    }
}