// api/new-meetup
// POST / api/ new-meetup
import {MongoClient} from 'mongodb'

async function handler(req,res) {
if (req.method =='POST'){
    const data=req.body;


 
  const result = await meetupsCollection.insertOne(data);
  console.log(result);
  client.close();

  res.status(201).json({message: 'meetup inserted!'})

    } // use await when it is async function 
}
 
export default handler;