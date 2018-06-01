const Account = require('../model/db').Account
const route = require('express').Router()
const sequelize = require('../model/db')
const bcrypt = require('bcrypt')
var cookieParser = require('cookie-parser');

route.use(cookieParser());

function cookieParser (req, res, next) {
    // check if client sent cookie
    var cookie = req.cookies.cookieName;
    if (cookie === undefined){      
      var stringLength = 30;
      // list containing characters for the random string
      var stringArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','!','?'];
      var rndString = "";
	
      // build a string with random characters
      for (var i = 1; i < stringLength; i++) { 
          var rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
          rndString = rndString + stringArray[rndNum];
      }
       console.log(rndString)         
    
    } else {
      // yes, cookie was already present 
      console.log('cookie exists', cookie);
    } 
    next(); // <-- important!
  }
route.get('/', (req, res) => {
    Account.findAll({
        order: [
            ['id', 'ASC'],
        ],

    }).then((account) => {
        res.status(200).json({
            status: '1',
            account
        })
        console.log(account)
    }).catch((err) => {
        res.status(500).json({
            status: '0'
        })
        console.log(err);
    })
});
route.post('/login', (req, res) => {
    var email = req.body.email
    var password = req.body.password
   // var cookies = cookieParser();
  /*  var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        var stringLength = 30;
        // list containing characters for the random string
        var stringArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '?'];
        var rndString = "";

        // build a string with random characters
        for (var i = 1; i < stringLength; i++) {
            var rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
            rndString = rndString + stringArray[rndNum];
        }
        //  console.log(rndString)         
    } else {
        // yes, cookie was already present 
        console.log('cookie exists', cookie);
    }
    //next(); // <-- important!*/
    Account.findOne({
        where: {
            email: email
        }
    }).then((account) => {
        if (!account) {
            return res.json({
                status: 'Your Email is not found'
            })
        }
        if (!account.isValidPassword(password)) {
            console.log(register)
            return res.json({
                status: '0'
            })
        }
        //console.log("cookies : " + rndString)
        return res.json({
            status: '1',
            cookie: rndString
        })
    })
});
route.post('/register', (req, res) => {
    var employee = '1';
    var Emobj = Account.count('id').then((max) => {
        employee = max + 1;
        //employee = employee + maxid;
        //console.log(maxid);
    }).catch((err) => {
        res.send({
            status: "Failed"
        })
        console.log(EMobj);
    })
    var email = req.body.email
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function (err, gethash) {
        console.log('ssss ' + JSON.stringify(Account));
        Account.findOne({
            where: {
                email: email
            }
        }).then((account) => {
            console.log(account)
            if (account) {
                return res.json({
                    status: '0'
                });
            } else {
                const accountData = {
                    id: employee,
                    email: req.body.email,
                    password: gethash
                };
                Account.create(accountData, (req, res) => {
                }).then((account) => {
                    console.log(req.cookies)
                    res.status(201).json({
                        status: '1'
                    })
                }).catch((err) => {
                    console.log(err)
                    res.json({
                        status: '0'
                    })
                })
            }
        })
    })
});
/*route.post('/register', (req, res) => {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function (err, gethash) {
        const accountData = {
            id: req.body.id,
            email: req.body.email,
            password: gethash,
        };
        Account.create(accountData, (err, result) => {
        }).then((account) => {
            console.log(account)
            res.status(201).json({
                status: '1'
            })
        }).catch((err) => {
            console.log(err)
            res.status(500).json({
                status: '0',
            })
        })
    })
});*/
route.put('/update/:id', (req, res, next) => {
    const id = req.body.id
    Account.update({
        password: req.body.password
    }, {
            where: {
                id: id
            }
        }).then((account) => {
            res.json({
                status: '1'
            })
        }).catch((err) => {
            res.json({
                status: '0'
            })
        })
});
route.delete('/:id', (req, res, next) => {
    Account.findById(req.body.id)
    Account.update({
        password: req.bode.password
    }, {
            where: {
                id: req.body.id
            }
        })
})
module.exports = route