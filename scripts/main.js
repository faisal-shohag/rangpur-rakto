var app = document.querySelector("#app");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    fstore
      .collection("users")
      .doc(user.uid)
      .onSnapshot((doc) => {
        $(".splash_screen").hide();
        if (doc.data().name == undefined) {
          $(".bottom-nav").hide();
          $(".splash_screen").hide();
          $(".av").hide();
          router.navigate("/info/" + user.uid);
          $(".loader").hide();
          blood(doc.data(), user.uid);
        } else {
          // router.navigate("/");
          $(".loader").hide();
          $(".bottom-nav").show();
          $(".av").show();
          if (doc.data().photoURL !== undefined)
            $(".profile_av").html(
              `<a href="#!/profile/${
                user.uid
              }"><div class="av"><div class="avatar myPhoto"><img src="${
                doc.data().photoURL
              }"/></div> <div id="my-group"></div></a>`
            );
          else
            $(".profile_av").html(
              `<a href="#!/profile/${
                user.uid
              }"><div class="av"><div class="avatar myPhoto"><img src="${
                doc.data().photoURL
              }"/></div> <div id="my-group"></div></a>`
            );

          $("#my-group").text(doc.data().group);

          // getLatLong(user.uid);
          router
            .on({
              "/": function (params) {
                $("#appBarTitle").text("রংপুর রক্ত");
                navManage("home");
                app.innerHTML = `
       <div class="sec-horz">
       <div class="card active-card" style="background: #D14142">
        <div class="card-title">সক্রিয় রক্তদাতা </div>
        <div class="card-num donor-count">... জন</div>
        <div class="card-icon"><img height="60px" src="../images/donor.png"></div>
       </div>
      
       <div class="card active-card" style="background: #FA7449">
       <div class="card-title">গ্রহীতা </div>
       <div class="card-num rec-count">... জন</div>
       <div class="card-icon"><img height="60px" src="../images/transfusion.png"></div>
       </div>
       </div>

       <div class="section-title">
      <img src="../images/blood-req.png"> প্রয়োজনীয়
       </div>

       <div class="menu">

       <div class="menu-item">
       <div class="menu-icon"><img src="../images/blood-organization.png"></div>
       <div class="menu-title">সংগঠন</div>
       </div>


       <div class="menu-item">
       <div class="menu-icon"><img src="../images/blood-bank.png"></div>
       <div class="menu-title">ব্লাড ব্যাংক</div>
       </div>

       
       <div class="menu-item">
       <div class="menu-icon"><img src="../images/oxygen-tank.png"></div>
       <div class="menu-title">অক্সিজেন</div>
       </div>

       <div class="menu-item">
       <div class="menu-icon"><img src="../images//ambulance.png"></div>
       <div class="menu-title">অ্যাম্বুলেন্স</div>
       </div>
       </div>
`;
                fstore
                  .collection("donor")
                  .orderBy("creationTime", "desc")
                  .onSnapshot((snap) => {
                    $(".donor-count").text(snap.docs.length + " জন");
                  });
                fstore
                  .collection("recipient")
                  .orderBy("creationTime", "desc")
                  .onSnapshot((snap) => {
                    $(".rec-count").text(snap.docs.length + " জন");
                  });
              },
            })
            .resolve();

          blood(doc.data(), user.uid);
        }
      });
  } else {
    $(".splash_screen").hide();
    router.navigate("/auth");
  }
});

function navManage(page) {
  $(".nav").removeClass("nav-active");
  $("#" + page).addClass("nav-active");
  $(".nav-title").hide();
  $("#" + page + " .nav-title").show();
}

function getRoundedCanvas(sourceCanvas) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;

    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
    context.fill();
    return canvas;
  }

function dayDef(date) {
  let defInTime = new Date().getTime() - new Date(date).getTime();
  let defInDay = defInTime / (1000 * 3600 * 24);
  return parseInt(defInDay);
}

// moment js for time counting
function getRelativeTime(date) {
  const dateInMillis = date.seconds * 1000;
  d =
    new Date(dateInMillis).toDateString() +
    " " +
    new Date(dateInMillis).toLocaleTimeString();
  return moment(new Date(d)).fromNow();
}

function timestampToDate(date) {
  const dateInMillis = date.seconds * 1000;
  d =
    new Date(dateInMillis).toDateString() +
    " at " +
    new Date(dateInMillis).toLocaleTimeString();
  return d;
}

function getLatLong(id) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Location allowed!");

      fstore.collection("users").doc(id).update({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Not supported!",
      text: "Geolocation is not supported by your browser!",
      footer: '<a href="">Why do I have this issue?</a>',
    });
  }
}

navigator.permissions &&
  navigator.permissions
    .query({ name: "geolocation" })
    .then(function (PermissionStatus) {
      if (PermissionStatus.state == "granted") {
        console.log("granted!");
      } else if (PermissionStatus.state == "prompt") {
        Swal.fire({
          icon: "error",
          title: "আপনার লোকেশন সার্ভিস অফ!",
          text: "দয়া করে লোকেশন সার্ভিসটি Allow করুন।",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "আপনার লোকেশন সার্ভিস অফ!",
          text: "দয়া করে লোকেশন সার্ভিসটি Allow করুন।",
        });
      }
    });

    function dataURItoBlob(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
    }

/*

function getDistanceByGeoPoint(lat1, lon1, lat2, lon2){
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d*1000; 
}

function toRad(value){
    return value * Math.PI / 180;
}


console.log(getDistanceByGeoPoint(25.9096536,89.4306251,25.9092413,89.4323907));

console.log(
    'You are ',
    
    geolib.getDistance(
        {
            latitude: 25.9096536,
            longitude: 89.4306251,
        },
        {
        latitude: 25.9092413,
        longitude: 89.4323907,
    }),
    'meters away from 51.525, 7.4575'
);


*/
