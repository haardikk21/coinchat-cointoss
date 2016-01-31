	

    var fs = require('fs');
    var http = require('http');
    var bals = JSON.parse(fs.readFileSync("data.json"));
    var reb = JSON.parse(fs.readFileSync("rebate.json"));
    flip2 = new Array(2);
    flip2[0] = null;
    flip2[1] = null;
    var win25 = 0.48;
    var rebate = 0.02; //FILL THIS HOWEVER YOU WANT
    var win15 = 0.28; //SAME HERE
    module.exports = {
     
            commands: {
                    "!help"         : help,
                    "!commands"     : commands,
                    "!bal"          : bal,
                    "!cashout"      : cashout,
                    "!flip"         : flip1,
                    "!bet"          : flip1
     
            },
     
            admin: {
                    "!say"          : say,
                    "!save"         : savecmd,
                    "!shutdown"     : shutdown
            },
     
            balance: {
                    get                     : getBal,
                    getreb                  : getReb,
                    addreb                  : addReb,
                    add                     : addBal
            }
    };
     
    function help(user, room, msg, chat, emit){
            chat(user + ": Welcome to my bot. Please see http://pastebin.com/TCfFjdpH for more info or type !commands for a list of commands.");
    }
     
    function commands(user, room, msg, chat, emit){
            chat(user + ": My available commands are: !help, !commands, !bal, !cashout and !flip/!bet .15/.25");
    }
     
    function bal(user, room, msg, chat, emit){
            chat(user + ": Your Balance is " + (bals[user] ? bals[user] : "0.000") + " mBTC.");
    }
    function cashout(user, room, msg, chat, emit){
            if(bals[user] < 0.25){
                    chat(user + ": You need at least 0.25 mBTC to cashout, You Have: " + bals[user] + " mBTC");
            }else{
                    if(msg.length == 1){
                            console.log(user + " Is cashing out " + bals[user]);
                            emit("tip", {user: user, room: room, tip: bals[user], message: "cashout"});
                            bals[user] = 0;
                    }else if(msg.length == 2 && isFinite(msg[1]) && Math.floor(Number(msg[1]) * 100) / 100 <= bals[user]){
                            console.log(user + " Is cashing out " + Math.floor(Number(msg[1]) * 100) / 100);
                            emit("tip", {user: user, room: room, tip: Math.floor(Number(msg[1]) * 100) / 100, message: "cashout"});
                            bals[user] = Number((bals[user] - Math.floor(Number(msg[1]) * 100) / 100).toFixed(3));
                    }
            }
    }
     
    function flip1 (user, room, msg, chat, emit){
     
            var bet = Number(Number(msg[1]).toFixed(2));
     
            if(isFinite(bet) && bet == 0.25 && bet <= bals[user]) {
     
                    if(flip2[0] == null) {
     
                                    flip2[0] = user;
                                    flip2[1] = bet;
                                    bals[user] -= bet;
                                    chat("Flip coin against " + user + " For " + bet + " ! Type !bet " + bet + " ! ");
                                    }
     
                    else {
     
                            if(bet != flip2[1]) {chat("Type !bet 0.15 to flip against " + flip2[0] + " ! ");}
     
     
                            if(flip2[0] != user && bet == flip2[1]) {
                                    bals[user] -= bet;
                                    var determine = 7
                                    var randomnumber=Math.floor(Math.random()*12)
                                            if(randomnumber >= determine){
                                                    chat(user + ": You flipped heads! Congratulations you have been credited " + win25 + " mBTC.");
                                                    bals[user] += win25;
                                                    chat(flip2[0] + ": You flipped tails! You lost.");
                                                    chat("RNG: " + randomnumber + "/12");
                                                    reb[flip2[0]] += rebate;
                                                    }
                                                    else {
                                                    chat(flip2[0] + ": You flipped heads! Congratulations you have been credited " + win25 + " mBTC.");
                                                    bals[flip2[0]] += win25;
                                                    reb[user] + rebate;
                                                    chat(user + ": You flipped Tails! You lost.");
                                                    }
                                                    bals[user] = Number(bals[user].toFixed(3));
                                                    flip2[0] = null;
                                                    chat("RNG: " + randomnumber + "/12");
                            }
     
                            else if(flip2[0] != null) {
     
                                    if(bet != flip2[1]) {}
                                    else{
                                    chat("You cant flip against yourself, Or You broke my Bot :(");
                                    }
                                    }
                    }
            }
     
            else if(isFinite(bet) && bet == 0.15 && bet <= bals[user]) {
     
                    if(flip2[0] == null) {
     
                                    flip2[0] = user;
                                    flip2[1] = bet;
                                    bals[user] -= bet;
                                    chat("Flip Coin against " + user + " For " + bet + " ! Type !bet " + bet + " !!! ");
                                    }
     
                    else {
     
                            if(bet != flip2[1]) {chat("Type !bet 0.25 to flip against " + flip2[0] + " ! ");}
     
                            if(flip2[0] != user && bet == flip2[1]) {
                                    bals[user] -= bet;
                                    var determine = 7
                                    var randomnumber=Math.floor(Math.random()*12)
                                            if(randomnumber >= determine){
                                                    chat(user + ": YAY you flipped heads! Congratulations you have Won: " + win15 + " mBTC.");
                                                    bals[user] += win15;
                                                    chat(flip2[0] + ": Damn you flipped tails! You lost");
                                                    chat("RNG: " + randomnumber + "/12");
                                                    }
                                                    else {
                                                    chat(flip2[0] + ": YAY you flipped heads! Congratulations you have Won: " + win15 + " mBTC.");
                                                    bals[flip2[0]] += win15;
                                                    chat(user + ": Damn you flipped tails! You lost");
                                                    }
                                                    bals[user] = Number(bals[user].toFixed(3));
                                                    chat("RNG: " + randomnumber + "/12");
                                                    flip2[0] = null;
                            }
     
                            else if(flip2[0] != null) {
     
                                    if(bet != flip2[1]) {}
                                    else {
                                    chat("You cant flip against yourself, Or you broke my Bot :(");
                                    }
                                    }
                    }
            }
           
            else {
                    chat(user + ": Bet has to be 0.25/0.15, Or you dont have enough mBTC in your Bal");
            }
    }
     
    function say(msg, chat, emit){
            chat(msg.splice(1, msg.length - 1).join(" "));
    }
     
    function savecmd(msg, chat, emit){
            save(function(){
                    chat("Save successful!");
            });
    }
     
    function shutdown(msg, chat, emit){
            save(function(){ chat("Bot is shutting down, Balances Saved, DO NOT TIP");
            setInterval(function(){ process.exit(0) }, 2000) });
    }
     
    function getBal(user){
            return bals[user] ? bals[user] : 0;
    }
     
    function addBal(user, amt){
            bals[user] = getBal(user) + Number(amt);
    }
     
    function getReb(user){
            return reb[user] ? reb[user] : 0;
    }
     
    function addReb(user, amt){
            reb[user] = getBal(user) + Number(amt);
    }
     
    function save(callback){
            // Create a write stream to write the file with.
            var stream = fs.createWriteStream("data.json", {flags: 'w'});
            var rebstream = fs.createWriteStream("rebate.json", {flags: 'w'});
            // Turn our bals variable into a json formatted string and save it to the file.
            stream.end(JSON.stringify(bals));
            rebstream.end(JSON.stringify(reb));
            // Once the file has been written, log it to the console and call the callback.
            stream.on('finish', function(){
                    console.log("Saved user data.");
                    callback();
            });
    }
     
    setInterval(function(){
            save(function(){});
    }, 1000 * 60 * 15);
