var time = 64, armed = false, interval, after = 0;

var consoleMessages = [
    "Preparing panicked citizens...",
    "Starting some things...",
    "Preparing your McDonald's order...",
    "Gathering panicked citizens...",
    "Selecting a target ... FAILED! :(",
    "Adding some salt to your bomb...",
    "Picking a nice date for the explosion...",
    "Calling all important TV stations...",
    "Prank-calling President Trump...",
    "Doing some other things...",
    "Selecting clothes to wear at the 'fireworks'...",
    "Renting an unicorn for the occasion...",
    "Calling Santa to tell him you are going to be bad this year...",
    "You are not going to receive anything from Santa after this...",
    "Setting the North Pole as a target ... FAILED! :(",
    "Solving the global warming problem...",
]

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatTime(sec) {
    var h, m;
    h = m = 0;
    h = Math.floor(sec / 3600); sec = sec % 3600;
    m = Math.floor(sec / 60); sec = sec % 60;
    var str = "";
    str += (h >= 10 ? h : ("0" + h)) + ":";
    str += (m >= 10 ? h : ("0" + m)) + ":";
    str += (sec >= 10 ? sec : ("0" + sec));
    return str;
}
function zeros(nr) {
    if(nr >= 10)
        return "" + nr;
    else return "0" + nr;
}
function gettime() {
    var date = new Date(), str = "";
    str += zeros(date.getDate()).toString() + ':' + zeros(date.getMinutes()).toString() + ':' + zeros(date.getSeconds()).toString();
    return str;
}
function playsound(filename) {
    if(filename === "stop")
        $("#sound").html("");
    $("#sound").html(
        '<audio autoplay="autoplay"><source src="' + 
        filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3" /></audio>'
    );
}
function explodeTimer() {
    if(armed && time) {
        time --;
        $(".danger").html(formatTime(time));
        document.title = "DANGER | " + formatTime(time);
        var rnd = getRandomInt(0, consoleMessages.length - 1);
        if(time % 2)
            $(".console").append("<li>" + consoleMessages[rnd] + "<span class = 'time'>[" + gettime() + "]</span></li>").scrollTop($('.console').height());
        if(getRandomInt(0, 100) == 31) {
            armed = false;
            $(".console li").remove();
            $(".console").append("<li>Lost signal to bomb. Aborting launch...<span class = 'time'>[" + gettime() + "]</span></li>");
            playsound("failed");
            setTimeout(function () {
                $(".console").append("<li>Launch aborted!<span class = 'time'>[" + gettime() + "]</span></li>");
                abort();
            }, 1500);
        }
        $("#progress").html(100 - Math.floor(100 * time / 64) + "%");
        if(100 - Math.floor(100 * time / 64) >= 75)
            $("#progress").addClass("danger");
    } else if(time == 0 && armed) {
        armed = false;
        setTimeout(function() {
            playsound("success");
            clearInterval(interval);
            $(".console li").remove();
            interval = setInterval(afterMessages, 1500);
            playsound("nuclear");
        }, 3000);
    }
}
function afterMessages() {
    after++;
    var message = null;
    switch(after) {
        case 1: {
            message = "Incoming message from your assistant...";
            break;
        }
        case 2: {
            message = "Connection established. The chat is now live!";
            break;
        }
        case 3: {
            message = "<i>[ASSISTANT:]</i> Oh my god... You are mad!";
            break;
        }
        case 4: {
            message = "<i>[ASSISTANT:]</i> DO YOU KNOW WHAT YOU HAVE DONE !?";
            break;
        }
        case 5: {
            message = "<i>[ASSISTANT:]</i> YOU'VE NUKED THE USA!";
            break;
        }
        case 6: {
            message = "<i>[ASSISTANT:]</i> Here, live footage from the NBC:";
            break;
        }
        case 7: {
            message = "Incoming video feed...";
            break;
        }
        case 8: {
            message = "Starting video feed...";
            break;
        }
        case 10: {
            playsound("stop");
            $("body").append(
                '<video id = "feed" controls autoplay>' + 
                    '<source src="movie.mp4" type="video/mp4">' + 
                   ' <source src="movie.ogg" type="video/ogg">' + 
                    'Your browser does not support the video tag.' + 
                '</video>'
                );
            setTimeout(function () {
                $("#feed").remove();
                document.write("<body style = 'background: #1a1a1a; color: white;'><center style = 'font-family: arial;'><h3>Thank you for being a good citizen :)</h3></center></body>")
            }, 96000);
            break;
        }
    }
    if(message != null)
        $(".console").append("<li>" + message + "<span class = 'time'>[" + gettime() + "]</span></li>").scrollTop($('.console').height());

}
function abort() {
    document.title = "SAFE";
    $(".arm-button").show();
    $(".info").text("Bomb is currently not armed. Stay calm ^_^");
    $(".danger").removeClass("danger").addClass("safe").html("00:00:00");
    armed = false;
    time = 64;
    //$("#sound").html("");
    clearInterval(interval);
}
$(document).ready(function () {
    $(".arm-button").click(function() {
        if(confirm("Are you sure?") === true) {
            time = 64;
            armed = true;
            $(".safe").removeClass("safe").addClass("danger");
            $(".danger").html(formatTime(time));
            interval = setInterval(explodeTimer, 1000);
            playsound("audio");
            $(".arm-button").hide();
            $(".info").text("WARNING! BOMB HAS BEEN ARMED. YOU SHOULD PANIC NOW!");
            $(".stats").show();
        } else {
            alert("NOT ARMED!");
        }
    });
    $(".stats").hide();
});