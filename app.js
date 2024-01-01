const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/weather/:city', async (req, res) => {
  const { city } = req.params;
  console.log("this is the city in the server->  " , city);

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=605b5adc1b1f5d216518eb1c953c563d`
    ); 
    res.json(response.data.city);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 