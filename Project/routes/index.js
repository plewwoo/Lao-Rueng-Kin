const express = require('express');
const { LocalStorage } = require('node-localstorage')
var localStorage = new LocalStorage('./scratch');

const db = require('../config/orm')
//const incorrect = require('../javascript/incorrect.js')

const router = express.Router();

router.get('/signupPage', (req, res) => {
    res.render('user/signup', {
        register: true
    });
});

router.post('/signup', (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    db.InsertUser(username, email, password, (err, result) => {
        res.redirect('/signinPage')
    })
})

router.get('/signinPage', (req, res) => {
    res.render('user/signin', {
        register: true,
    });
    localStorage.clear();
});

router.post('/signin', (req, res) => {
    const username = req.body.username
    const password = req.body.password



    db.CheckUser(username, password, (err, result) => {
        if (result.length > 0) {
            localStorage.setItem('user', username)

            if (username == 'admin') {
                localStorage.setItem('user', '%')
                localStorage.setItem('isAdmin', true)
            }
            res.redirect('/')
        }
        else {
            res.send('Incorrect Username or Password');
        }
    });
})

router.get('/profile', (req, res) => {
    const username = localStorage.getItem('user')
    const isAdmin = localStorage.getItem('isAdmin')

    db.SelectUserRestaurant(username, (err, restaurant) => {

        if (restaurant.length > 0) {
            res.render('user/profile', {
                restaurant,
                isAdmin,
                addRestaurant: true
            });
        }
        else {
            db.SelectProfile(username, (err, profile) => {
                res.render('user/profile', {
                    profile,
                    addRestaurant: false
                });
            });
        }
    })
});

router.get('/', (req, res) => {
    db.selectAll((err, restaurant) => {
        res.render('index', {
            restaurant
        });
    });
});

router.get('/shabu', (req, res) => {
    db.selectAllShabu((err, restaurant) => {
        res.render('index', {
            cat: 'ชาบู',
            restaurant
        });
    });
});

router.get('/yakiniku', (req, res) => {
    db.selectAllYakiniku((err, restaurant) => {
        res.render('index', {
            cat: 'ปิ้งย่าง',
            restaurant
        });
    });
});

router.get('/sushi', (req, res) => {
    db.selectAllSushi((err, restaurant) => {
        res.render('index', {
            cat: 'ซูชิ',
            restaurant
        });
    });
});

router.get('/buffet', (req, res) => {
    db.selectAllBuffet((err, restaurant) => {
        res.render('index', {
            cat: 'บุฟเฟต์',
            restaurant
        });
    });
});

router.get('/dessert', (req, res) => {
    db.selectAllDessert((err, restaurant) => {
        res.render('index', {
            cat: 'ขนมหวาน',
            restaurant
        });
    });
});

router.get('/:restaurant_id', (req, res) => {
    const restaurant_id = req.params.restaurant_id;
    localStorage.setItem('res_id', restaurant_id)
    let avgStar = localStorage.getItem('avgStar');

    db.SelectRestaurantId(restaurant_id, (err, restaurant) => {
        res.render('restaurant', {
            restaurant
        });
    });
});

router.get('/review/:id', (req, res) => {
    let restaurant_id = localStorage.getItem('res_id')

    db.SelectReview(restaurant_id, (err, restaurant) => {
        res.render('review', {
            restaurant,
            restaurant_id
        })
    })
})

router.post('/addComment', async (req, res) => {
    let restaurant_id = localStorage.getItem('res_id')
    let username = localStorage.getItem('user')
    let star = req.body.star
    let comment = req.body.comment

    try {
        db.InsertReview(restaurant_id, username, star, comment, (err, result) => {
            if (err) {
                res.send('err')
            }
            else {
                res.redirect('back')
            }
        });

        const avgStar = await db.AverageStar(restaurant_id);
        localStorage.setItem('avgStar', avgStar[0].avgStar.toFixed(1))
        console.log(avgStar)

        const updateStar = await db.InsertAverageStar(avgStar[0].avgStar.toFixed(1), restaurant_id)
        console.log(updateStar)

    } catch (error) {
        console.log(error)
    }
});

router.get('/restaurant/addRestaurant', (req, res) => {
    res.render('addForm')
});

router.post('/insertRestaurant', (req, res) => {
    let username = localStorage.getItem('user')
    let name = req.body.name;
    let category = req.body.category;
    let imgUrl = req.body.imgUrl;
    let img = req.body.img;
    let price = req.body.price;
    let openDate = req.body.openDate;
    let openTime = req.body.openTime;
    let closeTime = req.body.closeTime;
    let water = req.body.drink;
    let isTimeLimit = req.body.isTimeLimit;
    let timeLimit = req.body.timeLimit;
    let address = req.body.address;
    let tel = req.body.tel;
    let details = req.body.details;
    let map = req.body.map;
    let status = 'Pending'

    db.InsertRestaurant(username, name, category, imgUrl, price, openDate, openTime, closeTime, water, isTimeLimit, timeLimit, address, tel, details, status, (err, restaurant) => {
        console.log('Restaurant Added Complete')
    });

    for (let i = 0; i < img.length; i++) {
        db.InsertImg(name, img[i], (err, restaurant) => {
            if (err) {
                console.log(err)
            }
            console.log(img[i])
            console.log('Image Added Complete')
        });
    };

    db.InsertMap(name, map, (err, restaurant) => {
        console.log('Map Added Complete')
    });

    res.redirect('/')
});

router.get('/updateStatus/:restaurant_id', (req, res) => {
    let status = 'Approve';
    let restaurant_id = req.params.restaurant_id;

    db.UpdateStatus(status, restaurant_id, (err, result) => {
        console.log('Update Complete')
        res.redirect('back')
    })
})

//Search 
router.post('/search', (req, res) => {
    let searchTerm = req.body.search;

    db.Search(searchTerm, (err, restaurant) => {
        res.render('index', {
            restaurant
        });
    });
});

router.post('/filter', (req, res) => {
    let category = req.body.category;
    let price = req.body.price;
    let water = req.body.drink;
    let time = req.body.isTimeLimit;

    db.SelectFilter(category, price, water, time, (err, restaurant) => {
        res.render('index', {
            restaurant
        });
    });
});

module.exports = router;