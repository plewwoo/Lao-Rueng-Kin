const connection = require('./connection')

const db = {
    selectAll: (cb) => {
        connection.query(`SELECT * FROM buffet_project.restaurant WHERE status = 'Approve' ORDER BY avgStar DESC;`, (err, data) =>{
            if(err)
                cb(err, null);
            cb(null, data);
        });
    },

    selectAllShabu: (cb) => {
        connection.query(`SELECT * FROM buffet_project.restaurant WHERE status = 'Approve' AND category = 'shabu' ORDER BY avgStar DESC`, (err,data) => {
            if(err)
                cb(err, null);
            cb(null, data);
        });
    },

    selectAllYakiniku: (cb) => {
        connection.query(`SELECT * FROM buffet_project.restaurant WHERE status = 'Approve' AND category = 'Yakiniku' ORDER BY avgStar DESC`, (err,data) => {
            if(err)
                cb(err, null);
            cb(null, data);
        });
    },

    selectAllSushi: (cb) => {
        connection.query(`SELECT * FROM buffet_project.restaurant WHERE status = 'Approve' AND category = 'Sushi' ORDER BY avgStar DESC`, (err,data) => {
            if(err)
                cb(err, null);
            cb(null, data);
        });
    },
    selectAllBuffet: (cb) => {
        connection.query(`SELECT * FROM buffet_project.restaurant WHERE status = 'Approve' AND category = 'Buffet' ORDER BY avgStar DESC`, (err,data) => {
            if(err)
                cb(err, null);
            cb(null, data);
        });
    },

    selectAllDessert: (cb) => {
        connection.query(`SELECT * FROM buffet_project.restaurant WHERE status = 'Approve' AND category = 'Dessert' ORDER BY avgStar DESC`, (err,data) => {
            if(err)
                cb(err, null);
            cb(null, data);
        });
    },
    
    SelectRestaurantId: (restaurant_id, cb) => {
        connection.query(`
        SELECT 
        *
        FROM buffet_project.restaurant AS ts3
        INNER JOIN buffet_project.image AS img
        ON ts3.name = img.name
        INNER JOIN buffet_project.map AS map
        ON ts3.name = map.name
        WHERE ts3.restaurant_id = ${restaurant_id}`, (err,data) =>{
            if(err)
                cb(err, null);
            cb(null, data);
        });
    },

    InsertReview: (restaurant_id, username, star, comment, cb) => {
        console.log(restaurant_id)
        connection.query(`INSERT INTO buffet_project.review (restaurant_id, username, star, comment) VALUES (${restaurant_id}, '${username}', ${star}, '${comment}')`, (err, data) => {
            if(err)
                cb(err, null);
            cb(null, data);
        })
    },

    SelectReview: (restaurant_id, cb) => {
        connection.query(`  
        SELECT 
        *
        FROM buffet_project.restaurant AS ts3
        INNER JOIN buffet_project.review AS review
        ON ts3.restaurant_id = review.restaurant_id
        WHERE ts3.restaurant_id = ${restaurant_id}
        ORDER BY review.id DESC`, (err,data) =>{
            if(err)
                cb(err, null);
            cb(null, data);
        });
    },

    AverageStar: (restaurant_id, cb) => {
        return new Promise((resolve, reject) =>{
            connection.query(`SELECT AVG(star) AS avgStar FROM buffet_project.review WHERE restaurant_id = ${restaurant_id}`, (err , data) =>{
                // if(err){
                //     cb(err, null);
                // }
                // cb(null, data);
                return resolve(data)
            });
        })
    },

    InsertAverageStar:(avgStar, restaurant_id, cb) => {
        console.log(avgStar)
        return new Promise((resolve, reject) =>{
            connection.query(`UPDATE buffet_project.restaurant SET avgStar = ${avgStar} WHERE restaurant_id = ${restaurant_id}`, (err, data) => {
                // if(err)
                //     cb(err, null);
                // cb(null, data);
                return resolve(data)
            })
        })
    },

    Search: (searchTerm,cb) => {
        connection.query(`SELECT * FROM buffet_project.restaurant WHERE status = 'Approve' AND name LIKE ? ORDER BY avgStar DESC`, ['%' + searchTerm + '%'], (err,data) => {
            if(err)
                cb(err, null);
            cb(null, data);
        });
    },

    SelectFilter: (category, price, water,time, cb) => {
        connection.query(`SELECT * FROM buffet_project.restaurant WHERE (category = '${category}') AND (price BETWEEN ${price}) AND (water = '${water}') AND (isTimeLimit = '${time}') AND status = 'Approve' ORDER BY avgStar DESC`, (err, data) => {
            if(err)
                cb(err, null);
            cb(null, data);
        });
    },

    InsertRestaurant: (username, name, category, imgUrl, price, openDate, openTime, closeTime, water, isTimeLimit, timeLimit, address, tel, details, status, cb) => {
        connection.query(`INSERT INTO buffet_project.restaurant (username, name, category, imgUrl, price, openDate, openTime, closeTime, water, isTimeLimit, timeLimit, address, tel, details, status) VALUES 
            ('${username}', '${name}', '${category}', '${imgUrl}', ${price}, '${openDate}', '${openTime}', '${closeTime}', '${water}', '${isTimeLimit}', '${timeLimit}', '${address}', '${tel}', '${details}', '${status}')`, (err, data) => {
            if(err)
                cb(err, null);
            cb(null, data);
        });
    },

    InsertImg: (name, img, cb) => {
        connection.query(`INSERT INTO buffet_project.image (name, img) VALUES ('${name}', '${img}')`, (err, data) => {
            if(err)
                cb(err, null);
            cb(null, data);
        })
    },

    InsertMap: (name, map, cb) => {
        connection.query(`INSERT INTO buffet_project.map (name, map) VALUES ('${name}', '${map}')`, (err, data) => {
            if(err)
                cb(err, null);
            cb(null, data);
        })
    },

    UpdateStatus: (status, restaurant_id, cb) => {
        connection.query(`UPDATE buffet_project.restaurant SET status = '${status}' WHERE restaurant_id = ${restaurant_id}`, (err, data) => {
            if(err)
                cb(err, null);
            cb(null, data);
        })
    },

    InsertUser: (username,email,password,cb) => {
        connection.query(`INSERT INTO buffet_project.userInfo (username,email,password) VALUES ('${username}','${email}','${password}')`, (err, data) => {
            if(err)
                cb(err, null);
            cb(null, data);
        });
    },

    CheckUser: (username,password, cb) => {
        connection.query(`SELECT * FROM buffet_project.userInfo WHERE username = '${username}' AND password = '${password}'`, (err, data) => {
            if(err)
                cb(err, null);
            cb(null, data);
        })
    },

    SelectProfile: (username, cb) => {
        connection.query(`
        SELECT 
        * 
        FROM buffet_project.userInfo AS userInfo
        WHERE userInfo.username = '${username}' 
        `, (err, data) => {
            if(err)
                cb(err, null);
            cb(null, data);
        })
    },

    SelectUserRestaurant: (username, cb) => {
        connection.query(`
        SELECT 
        * 
        FROM buffet_project.userInfo AS userInfo
        INNER JOIN buffet_project.restaurant AS user_res
        ON userInfo.username = user_res.username
        WHERE userInfo.username LIKE '${username}' 
        `, (err, data) => {
            if(err)
                cb(err, null);
            cb(null, data);
        })
    }
}

module.exports= db;