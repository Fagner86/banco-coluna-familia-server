import express from 'express';
import { DataAPIClient } from "@datastax/astra-db-ts";
import cors from 'cors';


const app = express();
app.use(cors());
// Initialize the client

const client = new DataAPIClient(process.env.TOKEN);
const db = client.db(process.env.URL, { namespace: "default_keyspace" });

app.use(express.json());

// Route to create a new record

// Rota para criar um novo registro
app.post('/data', async (req, res) => {
  try {
    const { column1, column2 } = req.body;
    // Substitua 'your_collection' pelo nome da sua coleção no Astra DB
    await db.collection('banco01').insertOne({ column1, column2 });
    res.status(201).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to get all records
app.get('/data', async (req, res) => {
  try {
    const records = await db.collection('banco01').find().toArray();
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update a record
app.put('/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { column1, column2 } = req.body;
    await db.collection('banco01').updateOne({ _id: id }, { $set: { column1, column2 } });
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to delete a record
app.delete('/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('banco01').deleteOne({ _id: id });
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
