import express from 'express';
import { DataAPIClient } from "@datastax/astra-db-ts";
import cors from 'cors';


const app = express();
app.use(cors());
// Initialize the client
const client = new DataAPIClient(process.env.TOKEN);
const db = client.db(process.env.URL);

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


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
