const express = require('express');
const router = express.Router();
const path = require('path'); 


router.use(express.static(path.join(__dirname, 'C:\Users\S565903\projects\f23wb03yecharla\public\images')));

router.get('/', (req, res) => {
  const image_names = [
    'car1.jpg',
    'car2.jpg',
    'car3.jpg',
    'car4.jpg',
    'car5.jpg'
  ];

  const selectedImages = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * image_names.length);
    const selectedImage = image_names[randomIndex];
    selectedImages.push(selectedImage);
  }

  res.render('choose', { title: 'Choose', images: selectedImages });
});

module.exports = router;



