const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const querystring = require("querystring");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = express.Router();
const PORT = 4000;

let Battles = require("./Battles.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://harshCN:harshcn123@got-ycxx0.mongodb.net/Downloads?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MondoDB database connected");
});

app.use("/", routes);

routes.route("/list").get(function(req, res) {
  Battles.find({}, function(err, data) {
    if (err) console.log(err);
    else res.json(data);
  });
});

routes.route("/search").get(function(req, res) {
  let { type, location, king } = req.query;
  let aggregation = {};

  if (type) {
    const regex = new RegExp(type, "gi");
    aggregation["battle_type"] = { $regex: regex };
  }

  if (location) {
    const regex = new RegExp(location, "gi");
    aggregation["location"] = { $regex: regex };
  }

  if (king) {
    const regex = new RegExp(king, "gi");
    //  if (aggregation["attacker_king"] === regex) {
    //    aggregation["attacker_king"] = { $regex: regex };
    //  }
    //  const k = "attacker_king" || "defender_king";
    //  aggregation[
    //     Battles.find({ $or: [{ defender_king: king }, { attacker_king: king }] },)
    //  ] = {
    //    $regex: regex
    //  };

    //   aggregation[{ $or: [{ attacker_king=king }, { defender_king=king }] }] = { $regex: regex };
    aggregation = {
      ...aggregation,
      $or: [
        { attacker_king: { $regex: regex } },
        { defender_king: { $regex: regex } }
      ]
    };

    //  aggregation[k] = { $regex: regex };
  }

  Battles.find(aggregation, function(err, data) {
    if (err) console.log(err);
    else res.json(data);
  });
  //alternate -->
  //   let type = req.query.type;
  //   let location = req.query.location;
  //   if (king && type && location) {
  //     Battles.find(
  //       {
  //         $and: [
  //           { battle_type: type },
  //           { location: location },
  //           { $or: [{ defender_king: king }, { attacker_king: king }] }
  //         ]
  //       },
  //       function(err, data) {
  //         if (err) console.log(err);
  //         else res.json(data);
  //       }
  //     );
  //   } else if (king && type) {
  //     Battles.find(
  //       {
  //         $and: [
  //           { battle_type: type },

  //           { $or: [{ defender_king: king }, { attacker_king: king }] }
  //         ]
  //       },
  //       function(err, data) {
  //         if (err) console.log(err);
  //         else res.json(data);
  //       }
  //     );
  //   } else if (king && location) {
  //     Battles.find(
  //       {
  //         $and: [
  //           { location: location },
  //           { $or: [{ defender_king: king }, { attacker_king: king }] }
  //         ]
  //       },
  //       function(err, data) {
  //         if (err) console.log(err);
  //         else res.json(data);
  //       }
  //     );
  //   } else if (location && type) {
  //     Battles.find({}, function(err, data) {
  //       if (err) console.log(err);
  //       else res.json(data);
  //     });
  //   } else {
  //     if (king) {
  //       Battles.find(
  //         { $or: [{ defender_king: king }, { attacker_king: king }] },

  //         function(err, data) {
  //           if (err) console.log(err);
  //           else res.json(data);
  //         }
  //       );
  //     } else if (type) {
  //       Battles.find({ battle_type: type }, function(err, data) {
  //         if (err) console.log(err);
  //         else res.json(data);
  //       });
  //     } else if (location) {
  //       Battles.find({ location: location }, function(err, data) {
  //         if (err) console.log(err);
  //         else res.json(data);
  //       });
  //     } else {
  //       Battles.find({}, {}, function(err, data) {
  //         if (err) console.log(err);
  //         else res.json(data);
  //       });
  //     }
  //   }
});

routes.route("/count").get(function(req, res) {
  Battles.countDocuments(
    {
      defender_1: { $ne: null }
    },
    function(err, count) {
      if (err) {
        res.send(err);
        return;
      }

      res.json({ count: count });
    }
  );
});

routes.route("/view/:name").get(function(req, res) {
  let name = req.params.name;
  Battles.find({ name }, function(err, data) {
    res.json(data);
  });
});

app.listen(PORT, function() {
  console.log("server running on port :" + PORT);
});
