import firebase from "./firebase";

// returns all valid ids and names for getStaticPaths so we can build urls 
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
                        name: document.name
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


export async function getFriendList(){

    let allPeopleArray = [];

    try {

        const list = await firebase.collection("resources").get();

        //loop through the array of people
        list.forEach((person) =>{
            //for each person on the list push an object of info into people array 
            allPeopleArray.push(
                {
                    id: person.id, 
                    data:person.data()
                }
            )
        })
        
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).end(error.message);
    }

    return allPeopleArray; 


    // console.log("list", list)

    // list.sort(function(a, b){
    //     return a.name.localeCompare(b.name);
    // });

    // // console.log("post-sort");
    // // console.log(peopleObject);

    // //map through the array to pull out just id and name of all people
    // return list.map(person => {
    //     return {
    //         id: person.id.toString(),
    //         name: person.name
    //     }
    // })

}
