//homepage
import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList'
import {MongoClient} from 'mongodb';

function Home(props){

    return <MeetupList meetups={props.meetups}/>
}


// export async function getServerSideProps(context){ //runs for every request so do not need to be revalidated
//     const req=context.req;
//     const res=context.res;

//     //fetch data from an API
//     return {
//         props:{
//             meetups:MEETUPSL
//         } 
//     };
// };


export async function getStaticProps(){ //get information from DB
//fetch data from an API

const client = await MongoClient.connect('mongodb+srv://gerihr:1392000Kakva@cluster0.xw43p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
const db = client.db();

const meetupsCollection = db.collection('meetups');
const meetups =  await meetupsCollection.find().toArray();
client.close();


return {
    props:{
        meetups:meetups.map(meetup => ({
            title:meetup.title,
            address:meetup.address,
            image:meetup.image,
            id:meetup._id.toString()
        }))
    },
    revalidate: 1 //update the page with information, the number shows the seconds 
    };
}

export default Home;