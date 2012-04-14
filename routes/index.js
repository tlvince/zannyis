var sprintf = require('sprintf').sprintf;
var flickr = require('flickr-reflection');
var options = {
    key: '3e644ef7400a90d5c388bf003c092684',
    apis: ['photos']
};

var title = "zanny is...";
var moods = ["sleepy", "hungry", "thirsty", "angry", "annoyed", "happy"];
var src = "http://farm%(farm)s.staticflickr.com/%(server)s/%(id)s_%(secret)s.jpg";

exports.index = function(req, res) {

    var mood = moods[Math.floor((moods.length)*Math.random())];

    flickr.connect(options, function(err, api) {
        if (err) throw err;

        api.photos.search({
                tags: mood,
                content_type: 1,
                per_page: 10
            },
            function(err, data) {
                if (err) throw err;
                res.render('index', {
                    title: title,
                    image: sprintf(src, data.photos.photo[Math.floor((10)*Math.random())]),
                    mood: mood
                })
            }
        );
    });

};
