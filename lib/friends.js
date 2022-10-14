import firebase from "./firebase";

// returns all valid ids for getStaticPaths so we can build urls 
export async function getPeopleIds(req, res){

    let output=[];
    const snapshot = await firebase.collection("resources").get();


    try {

        //get all friend documents from firebase
        snapshot.forEach(document => {
            
            output.push(
                {
                    params: {
                        id: document.id,
                    }
                }
            )
        });
        
        console.log("output", output)

        
    } catch (error) {
        console.log(error);
    }

    return output;



}

//returns one friend document's data for given ID w/ getStaticProps 
export async function getFriendData(idRequested){

    const doc = await firebase.collection("resources").doc(idRequested).get();

    let output =[];

    if (!doc.empty){
        output = {id:doc.id, data:doc.data() };

    } else {
        output = null;
    }

    return output;

}

