import MeetupDetailsForm from '../components/meetups/MeetupDetailsForm';
import {MongoClient, ObjectID} from 'mongodb';

function MeetupDetails(props){
    return (
    <MeetupDetailsForm 
    image = {props.meetupData.image}
    title = {props.meetupData.title}
    address={props.meetupData.address}
    description={props.meetupData.description}/>
    
    )
}

export async function getStaticPaths(){


    const client = await MongoClient.connect('mongodb+srv://gerihr:1392000Kakva@cluster0.xw43p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    const db = client.db();
    
    const meetupsCollection = db.collection('meetups');
    const meetups=await meetupsCollection.find({}, {_id:1}).toArray();

    client.close();

    return{
        fallback: false,
        paths:meetups.map(meetup=>({params:{meetupId:meetup._id.toString()},
     } )),
       
    };
}

export async function getStaticProps(context){
    //frtch data fro a single meetup
    const meetupId = context.params. meetupId;
    const client = await MongoClient.connect('mongodb+srv://gerihr:1392000Kakva@cluster0.xw43p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    const db = client.db();
    
    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectID(meetupId) });

    client.close();


    
return {
    props:{
        meetupData:
        {
            id: selectedMeetup._id.toString(),
            title:selectedMeetup.title,
            address:selectedMeetup.address,
            image:selectedMeetup.image,
            description:selectedMeetup.description

        }
    }
}
};



export default MeetupDetails;