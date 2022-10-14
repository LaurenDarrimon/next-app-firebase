import Layout from '../../components/layout.js';
import Link from 'next/link';
import { getPeopleIds, getFriendData } from '../../lib/friends.js';



//create getstaticprops to return all the data for one person

export async function getStaticProps({ params }) {

    const friendData = await getFriendData(params.id);

    console.log("friend data on id page")
    console.log(friendData)

    return {
        props: {
            friendData
        }
    };
}

//all possible URLs 
export async function getStaticPaths() {

    const dynamicPaths = await getPeopleIds();
    console.log("dynamicPaths")
    console.log(dynamicPaths)
    return {
        paths: dynamicPaths,
        fallback: false
    };
}

//make a compoenent that will display the persons details at the dynamic route 

export default function Entry (  { friendData } ){
    return (
        <Layout>
            <article data-testid="not-empty" className="card col-6">
                { friendData.data ? 
                    <div className="card-body">
                    
                        <h4 className="card-title text-dark">
                            {friendData.data.name}
                        </h4>
                        <h5 className="card-subtitle mb-2 text-muted"> 
                            {friendData.data.job}
                        </h5>
                        <p className="card-text text-dark">{friendData.data.name} was {friendData.data.age} years old at the time of the Fellowship of the Ring.</p>
                        <a href={"mailto:" + friendData.data.email} className="card-link text-primary"> Email {friendData.data.name}</a>
                        <br/>
                        <h5  className="card-text text-dark">
                            Friends of {friendData.data.name} :
                        </h5>
                        {console.log("friend data inside component")}
                        {console.log(friendData)}
                            {friendData.data.friends &&
                                <div className="list-group">
                            

                                {friendData.data.friends.map(({ friendId, name }) => (
                                    <Link  key={friendId} href={`/${friendId}`}>
                                        <a  data-testid="hyperlink" className="friend-link list-group-item text-dark list-group-item-action"> {name} </a> 
                                    </Link>
                                ))}
                                </div>
                            }     
                    </div> 
                :  
                    <div className="card-body">     
                    <h4 className="card-title text-dark">
                        No Friend Here Yet! 
                    </h4>
                    </div>
                }
            </article>
        </Layout>
    )
}