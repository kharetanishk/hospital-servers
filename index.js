const express = require("express");

const app = new express();

//creating a inmemory or we can say default data
const users = [
  {
    name: "Tanishk",
    kidneys: [
      {
        healthy: true,
      },
      {
        healthy: false,
      },
    ],
  },
];

//getting request
app.get("/", function (req, res) {
  const userkidneys = users[0].kidneys;
  const numberOfkidneys = userkidneys.length;
  let healthykidney = 0;
  for (let i = 0; i < userkidneys.length; i++) {
    if (userkidneys[i].healthy) {
      healthykidney = healthykidney + 1;
    }
  }
  const unhealthykidney = numberOfkidneys - healthykidney;
  res.json({
    numberOfkidneys,
    healthykidney,
    unhealthykidney,
  });
});
//posting some request
app.use(express.json());
app.post("/", function (req, res) {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "done",
    isHealthy: true,
  });
});

//pulling request means updating something in our database
app.put("/", function (req, res) {
  if (unhealthy()) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
      users[0].kidneys[i].healthy = true;
    }
    res.json({
      msg: "updated",
    });
  } else {
    res.status(411).json({
      msg: "you have already updated all the kidneys to healthy",
    });
  }
});
function unhealthy() {
  let unhealthykidney = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      unhealthykidney = true;
    }
  }
  return unhealthykidney;
}

//deleting
app.delete("/", function (req, res) {
  if (checkingForDeletion()) {
    const newKidney = [];
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy) {
        newKidney.push({
          healthy: true,
        });
      }
    }
    users[0].kidneys = newKidney;
    res.json({
      msg: "done",
    });
  } else {
    res.status(411).json({
      msg: "you have no bad kidney",
    });
  }
});

function checkingForDeletion() {
  let atleastAnunhealthyKidney = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    const iteration = users[0].kidneys[i].healthy;
    if (!iteration) {
      atleastAnunhealthyKidney = true;
    }
  }
  return atleastAnunhealthyKidney;
}
app.listen(1000, () => {
  console.log("port is running in server 1000");
});
