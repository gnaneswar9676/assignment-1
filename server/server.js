const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/spreadsheet_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

// Schema for Spreadsheet
const SpreadsheetSchema = new mongoose.Schema({
  name: String,
  data: Object, // 2D grid stored as JSON
});
const Spreadsheet = mongoose.model('Spreadsheet', SpreadsheetSchema);

// API Routes
app.get('/api/spreadsheets/:id', async (req, res) => {
  const spreadsheet = await Spreadsheet.findById(req.params.id);
  res.json(spreadsheet);
});

app.post('/api/spreadsheets', async (req, res) => {
  const spreadsheet = new Spreadsheet(req.body);
  await spreadsheet.save();
  res.json(spreadsheet);
});

app.put('/api/spreadsheets/:id', async (req, res) => {
  const spreadsheet = await Spreadsheet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(spreadsheet);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));