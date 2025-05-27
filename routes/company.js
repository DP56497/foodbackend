const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const CompanyImage = require('../models/CompanyImage');

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'companyImages',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

// Upload route
// Upload route
router.post('/upload', upload.array('images', 2), async (req, res) => {
  try {
    const { names, prices } = req.body;
    const namesArray = Array.isArray(names) ? names : [names];
    const pricesArray = Array.isArray(prices) ? prices : [prices];

    const imageDocs = req.files.map((file, index) => ({
      imageUrl: file.path,
      name: namesArray[index] || file.originalname,
      price: pricesArray[index] || 0
    }));

    await CompanyImage.insertMany(imageDocs);
    res.json({ message: 'Images uploaded successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});


router.get('/all', async (req, res) => {
  try {
    const images = await CompanyImage.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const image = await CompanyImage.findById({ _id: req.params.id });
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    
     await image.deleteOne();

    res.json({ message: 'Image deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error during delete', error });
  }
});


module.exports = router;
