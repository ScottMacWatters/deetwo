const DestinyApi = require('destiny-api-client');

var express = require('express');
var app = express();

app.set('json spaces', 2);


let client = new DestinyApi(process.env.BUNGIE_API_KEY);


app.get('/activities', function (req, res) {
  client.publicAdvisors({
    definitions: true
  })
  .then(function(activities){
    var ret = Object.keys(activities.data.activities);
    var activity = req.query.activityId;
    if(activity){
      activity = activities.data.activities[activity];
      if(activity){
        ret = activity;
      }
    }
    res.json({activity: ret, definitions: activities.definitions});
    setTimeout(function(){
      console.log('...3 seconds later.');
    },3000);
  });
});








var port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on port ' + port);
