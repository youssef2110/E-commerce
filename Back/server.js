const express = require('express');
const app = express();
var ObjectId = require('mongodb').ObjectId;
app.use(express.json());
const Port = process.env.Port || 3000;

const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://user:user@cluster0-jergt.mongodb.net/test?retryWrites=true&w=majority"
const uri = "mongodb://localhost:27017"

const client = new MongoClient(uri,{ useUnifiedTopology: true , useNewUrlParser: true });

app.post("/api/adduser", function(req, rep) {
    user = req.body;
    client.connect(err => {
    const collection = client.db("Ecommerce").collection("User");
    collection.insertOne({Username: user.Username,Email: user.Email,Password: user.Password,Role : "Client"},(err, us) => {
      if (us) {
        rep.send([{ statue: "Success" }, { user: user }]);
      } else rep.send([{ statue: "Echec" }, { user: user }]);
		});
  });
});

app.post("/api/addvendeur", function(req, rep) {
  user = req.body;
  client.connect(err => {
  const collection = client.db("Ecommerce").collection("User");
  collection.insertOne({Username: user.Username,Email: user.Email2,Password: user.Password2,Role : "Vendeur"},(err, us) => {
    if (us) {
      rep.send([{ statue: "Success" }, { user: user }]);
    } else rep.send([{ statue: "Echec" }, { user: user }]);
  });
});
});

app.post("/api/tryloginv", function(req, rep) {
  user = req.body;
  client.connect(err => {
  const collection = client.db("Ecommerce").collection("User");
  collection.findOne({Email: user.Email , Password: user.Password},(err, us) => {
    console.log(us)
    if (us) {
      if(us.Role === "Vendeur"){
      rep.send([{ statue: "Success" }, { user: us }]);
      }else rep.send([{ statue: "Echec" }, { user: us }]);
    } else rep.send([{ statue: "Echec" }, { user: us }]);
  });
});
});

app.post("/api/tryloginc", function(req, rep) {
  user = req.body;
  client.connect(err => {
  const collection = client.db("Ecommerce").collection("User");
  collection.findOne({Email: user.Email2,Password: user.Password2},(err, us) => {
    console.log(us)
    if (us) {
      if(us.Role === "Client"){
      rep.send([{ statue: "Success" }, { user: us }]);
      }else rep.send([{ statue: "Echec" }, { user: us }]);
    } else rep.send([{ statue: "Echec" }, { user: us }]);
  });
});
});

app.post("/api/addprod", function(req, rep) {
  prod = req.body;
  client.connect(err => {
    const collection = client.db("Ecommerce").collection("Product");
    if(prod.product_categorie === 'typeb'){
      collection.insertOne({Id :prod.ID, product_name :prod.product_name, product_categorie : prod.product_categorie,available_quantity : prod.available_quantity,product_price : prod.product_price ,product_for:prod.product_for ,Images :prod.images, url1 : prod.url1, url2 : prod.url2, url3 : prod.url3,product_description : prod.product_description},(err, prod) => {
        if (prod) {
          rep.send([{ statue: "Success" }, { prod: prod }]);
          }else rep.send([{ statue: "Echec" }, { prod: prod }]);
      });
    }else{
      collection.insertOne({Id :prod.ID, product_name :prod.product_name, product_categorie : prod.product_categorie,available_quantity : prod.available_quantity,product_price : prod.product_price,Images :prod.images, url1 : prod.url1, url2 : prod.url2, url3 : prod.url3,product_description : prod.product_description},(err, prod) => {
        if (prod) {
          rep.send([{ statue: "Success" }, { prod: prod }]);
          }else rep.send([{ statue: "Echec" }, { prod: prod }]);
      });
    }
  });
});

app.get("/api/getprod/:id", function(req, rep) {
  Num = req.params.id;
  client.connect(err => {
    const collection = client.db("Ecommerce").collection("Product");
    collection.find({Id :Num}).toArray((err, prod) => {
      rep.json(prod);
    });
  });
});

app.get("/api/getprod2/:id", function(req, rep) {
  Num = req.params.id;
  var Num = new ObjectId(Num);
  client.connect(err => {
    const collection = client.db("Ecommerce").collection("Product");
    collection.findOne({_id :Num},(err, prod) => {
      rep.json(prod);
    });
  });
});

app.get("/api/getprod", function(req, rep) {
  client.connect(err => {
    const collection = client.db("Ecommerce").collection("Product");
    collection.find().toArray((err, prod) => {
      rep.json(prod);
    });
  });
});

app.post("/api/addcmd", function(req, rep) {
  cmd = req.body;
  console.log(cmd)
  client.connect(err => {
    const collection = client.db("Ecommerce").collection("Commande");
    const collection2 = client.db("Ecommerce").collection("Panier");
    const collection3 = client.db("Ecommerce").collection("Commande2");
    const collection4 = client.db("Ecommerce").collection("Product");
    collection.insertOne({product:cmd.product , iden:cmd.iden , Adresse:cmd.Adresse , Nom:cmd.Nom + " " + cmd.Prenom , ZipCode:cmd.ZipCode , Ville:cmd.Ville , Telephone:cmd.Telephone },(err, us) => {
      collection2.deleteMany({Id_client : cmd.product[0].Id_client},(err , prod) => {
        if (prod) {
          rep.send([{ statue: "Success" }, { prod: prod }]);
          }else rep.send([{ statue: "Echec" }, { prod: prod }]);
      });
      for(var i=0 ; i<cmd.product.length ; i++){
        collection3.insertOne({product:cmd.product[i] , iden:cmd.iden , Adresse:cmd.Adresse , Nom:cmd.Nom + " " + cmd.Prenom , ZipCode:cmd.ZipCode , Ville:cmd.Ville , Telephone:cmd.Telephone , Etat:"Non livré"},(err,cc) => {
        })
        var id = new ObjectId(cmd.product[i].Id_prod)
        var number = cmd.product[i].quantity.toString();
        var number = parseInt(cmd.product[i].quantity);
        collection4.updateOne({_id : id },{$inc : { available_quantity :- number} },(err,cc) => {
        })
      }
    });
  });
});
app.post("/api/changeetat", function(req, rep) {
  don = req.body;
  var Num = new ObjectId(don.id)
  console.log(don)
  if(don.type === "Non livré"){
    var tt = "Livré"
  }
  if(don.type === "Livré"){
    var tt = "Non livré"
  }
  client.connect(err => {
    const collection = client.db("Ecommerce").collection("Commande2");
    collection.updateOne({_id : Num },{'$set': {Etat : tt} },(err,prod) => {
      if (prod) {
        rep.send([{ statue: "Success" }, { prod: prod }]);
        }else rep.send([{ statue: "Echec" }, { prod: prod }]);
    })
  });
});

app.post("/api/addpanier", function(req, rep) {
  ids = req.body;
  var id = new ObjectId(ids.id)
  client.connect(err => {
    const collection2 = client.db("Ecommerce").collection("Panier");
    const collection = client.db("Ecommerce").collection("Product");
    collection.findOne({_id :id},(err, prod) => {
      collection2.insertOne({Id_client:ids.id2 , Id_prod:ids.id , product_name :prod.product_name,quantity : ids.qt,product_price : prod.product_price, url1 : prod.url1, product_description : prod.product_description},(err, us) => {
      });
    });
  });
});

app.get("/api/getpanier/:id", function(req, rep) {
  Num = req.params.id;
  client.connect(err => {
    const collection = client.db("Ecommerce").collection("Panier");
    collection.find({Id_client :Num}).toArray((err, prod) => {
      rep.json(prod);
    });
  });
});

app.get("/api/getcmd", function(req, rep) {
  client.connect(err => {
    const collection = client.db("Ecommerce").collection("Commande");
    collection.find().toArray((err, prod) => {
      rep.json(prod);
    });
  });
});

app.get("/api/getcmd2", function(req, rep) {
  client.connect(err => {
    const collection = client.db("Ecommerce").collection("Commande2");
    collection.find().toArray((err, prod) => {
      rep.json(prod);
    });
  });
});

app.get("/api/deletprod/:id", function(req, rep) {
  Num = req.params.id;
  var Num = new ObjectId(Num)
  client.connect(err => {
    const collection = client.db("Ecommerce").collection("Product");
    collection.deleteOne({_id:Num},(err, prod) => {
      if (prod) {
        rep.send([{ statue: "Success" }, { prod: prod }]);
        }else rep.send([{ statue: "Echec" }, { prod: prod }]);
    });
  });
});

app.post("/api/editprod", function(req, rep) {
  prod = req.body;
  var Num = new ObjectId(prod[0])
  client.connect(err => {
    const collection = client.db("Ecommerce").collection("Product");
    collection.updateOne({_id :Num},{'$set': {product_name :prod[1].product_name,available_quantity : prod[1].available_quantity,product_price : prod[1].product_price, product_description : prod[1].product_description}} ,(err, prod) => {
      if (prod) {
        rep.send([{ statue: "Success" }, { prod: prod }]);
        }else rep.send([{ statue: "Echec" }, { prod: prod }]);
    });
  });
});



app.listen(Port,()=> console.log('server Ecommerce started'))
