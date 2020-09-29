const express = require('express');
const router = express.Router();

const animalData = [{
        "type": "Kedi",
        "races": [{
                "race": "Ankara"
            },
            {
                "race": "Bengal"
            },
            {
                "race": "İran"
            },
            {
                "race": "Melez"
            },
            {
                "race": "Tekir"
            },
            {
                "race": "Siyam"
            },
            {
                "race": "Scottish Fold"
            },
            {
                "race": "Smokin Kedi"
            },
            {
                "race": "Van"
            },
            {
                "race": "Diğer"
            }
        ]
    },
    {
        "type": "Köpek",
        "races": [{
                "race": "Akbaş"
            },
            {
                "race": "Boxer"
            },
            {
                "race": "Setter"
            },
            {
                "race": "Gelden Retriever"
            },
            {
                "race": "Sivas Kangalı"
            },
            {
                "race": "Labrador"
            },
            {
                "race": "Melez"
            },
            {
                "race": "Terrier"
            },
            {
                "race": "Diğer"
            }
        ]
    },
    {
        "type": "Kuş",
        "races": [{
                "race": "Kanarya"
            },
            {
                "race": "Muhabbet Kuşu"
            },
            {
                "race": "Papağan"
            },
            {
                "race": "Diğer"
            }
        ]
    },
    {
        "type": "Tavşan",
        "races": [{
                "race": "Ada Tavşanı"
            },
            {
                "race": "Yeni Zellanda"
            },
            {
                "race": "Diğer"
            }
        ]
    }
]


router.get('/animalData', (req, res) => {
    res.status(200).json({
        Success: true,
        animalData: animalData
    })
});

module.exports = router;