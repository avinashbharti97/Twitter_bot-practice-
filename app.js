var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config);

// setting up search parameters

var params = {
    q: '#nodejs',
    count: 10,
    result_type: 'recent',
    lang: 'en'
}

T.get('search/tweets', params, (err, data, response)=>{
    if(!err){
        //looping throught the returned tweets
        for(let i=0; i<data.statuses.length; i++){
            //getting the tweet id from returned tweets
            let id = { id:data.statuses[i].id_str }
            //favouriting the tweets
            T.post('favorites/create', id, (err, response)=>{
                if(err){
                    console.log(err[0].message);
                }else{
                    let username = response.user.screen_name;
                    let tweetId = response.id_str;
                    console.log('Favourited : ', `https://twitter.com/${username}/status/${tweetId}` )
                }
            });
        }
    }else{
        console.log(err);
    }
})