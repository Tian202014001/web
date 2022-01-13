/// Store
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function timeNow() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime;
}


function store_comment() {
    // alert("meh");

    var _name = document.getElementById("name").value;
    var _email = document.getElementById("email").value;
    var _comment = document.getElementById("comment").value;

    // alert(_name + "\n" + _email + "\n" + _comment);
    var now = timeNow();
    console.log(now);
    // alert(now);

    firebase.database().ref('User/Comment/' + now).set({
        name: _name,
        email: _email,
        comment: _comment,
        time: now
    },
        function (error) {
            if (error) {
                // The write failed...
                alert("Error occured");
            }
            else {
                alert("SENT");
            }

        });
}


function DisplayItems(_name, _email, _comment, _time) {

    var Div = document.getElementById('commentList');
    var div = document.createElement('div');
    div.style.border = "1px solid rgba(16, 46, 46, 1)";
    div.style.backgroundColor = "rgba(16, 46, 46, 0.973)";

    div.style.padding = "5px";
    div.style.display = "block";
    div.style.height = "auto";
    div.style.margin = "20px 0px";
    div.style.boxShadow = "0 0.25em 0.25em -0.125em rgba(0, 0, 0, 0.25), 0 0.5em 1.25em rgba(0, 0, 0, 0.5)";
    div.style.backgroundColor = "rgba(221,232,249, 0.98)";
    div.style.opacity = "90%";
    div.style.borderRadius = "1.5%";

    var image = document.createElement('img');
    // image.src = "images/unknown-user.png";
    image.className = "rounded-circle";
    image.style.width = "40", image.style.height = "40";

    Div.appendChild(image);
    div.innerHTML = `<h4 style='color: darkslateblue;'>${_name}</h4> <span style='color: gray;'> ${_time}<br></span> <br> <p style='color: black; '>${_comment}</p>`
    Div.appendChild(div);
}


function FetchAllComments() {

    firebase.database().ref('User/Comment/').once('value').then(function (snapshot) {
        var s = "";
        snapshot.forEach(function (child) {
            var n = child.val().name;
            var o = child.val().email;
            var c = child.val().comment;
            var t = child.val().time;
            // s += n + " " + o + " " + c + " " + t + "\n";
            // alert(n + " "+ o+ " "+ c + " "+ t);

            DisplayItems(n, o, c, t);

        });
        // alert(s);

    }, function (error) {
        if (error) {
            alert("Error occured");
        } else {
            alert("No error");
        }
    });
}


// window.onload(FetchAllComments());

FetchAllComments();