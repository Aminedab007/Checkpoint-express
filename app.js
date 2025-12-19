const express = require('express');
const app = express();
const port = 4000;

const workingHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay(); // 0 = dimanche, 6 = samedi
  const hour = date.getHours();

  const isWorkingDay = day >= 1 && day <= 5;
  const isWorkingHour = hour >= 9 && hour < 17;

  if (isWorkingDay && isWorkingHour) {
    next();
  } else {
    res.send('⛔ Sorry, the website is only available during working hours.');
  }
};

// appliquer le middleware
app.use(workingHours);

// middleware pour fichiers statiques (CSS)
app.use(express.static('public'));

// config pug
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});


// serveur
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
