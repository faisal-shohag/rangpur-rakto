
var app = document.querySelector('#app');
firebase.auth().onAuthStateChanged( user => {
    if (user) {
     fstore.collection('users').doc(user.uid).onSnapshot((doc) => {
         if(doc.data().name == undefined)
         {
            $('.bottom-nav').hide();
            $('.av').hide();
            router.navigate('/info/'+ user.uid);
            $('.loader').hide();
        }else{
             $('.loader').hide();
             $('.av').show();
 if(doc.data().photoURL !== undefined)      
 $('.myPhoto').html(`<img src="${doc.data().photoURL}">`);
 $('#my-group').text(doc.data().group);
  
 getLatLong(user.uid);

router.on({
    "/": function(params){
        navManage('home');
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
      <img src="../images/blood-req.png"> আবেদন
       </div>

       <div class="post">
       <div class="post-top">
       <div class="post-avatar"><img src="https://pbs.twimg.com/card_img/1501783349148676097/Zy1RLntb?format=jpg&name=small"></div>
       <div class="post-at">
       <div class="post-author">ফয়সাল সোহাগ</div>
       <div class="post-time">2 hrs ago</div>
       </div>
       <div class="post-contacts">
       <div class="post-contact-icon"><i class="icofont-ui-call"></i></div>
       <div class="post-contact-icon"><i class="icofont-telegram"></i></div>
       <div class="post-contact-icon"><i class="icofont-whatsapp"></i></div>
       </div>
       </div>
       <div class="post-body">
       ভাটার সময় নৌপথটির সর্বোচ্চ দূরত্ব দাঁড়ায় ১৬ কিলোমিটার। সরকার নির্ধারিত ভাড়া প্রতি কিলোমিটার ২ টাকা ৩০ পয়সা। এ হারে ভাড়া হয় ৪০ টাকা ৮০ পয়সা। সেখানে ইজারাদার ভাড়া নিচ্ছেন ১২০ টাকা। শুধু বেশি ভাড়া নিচ্ছেন এমন নয়, লঞ্চে উঠতে প্রতি যাত্রীকে কাটতে হয় ১০ টাকার ঘাটটিকিট। অথচ যাত্রী পারাপারে ব্যবহার করা হচ্ছে দুটি ফিটনেসবিহীন লঞ্চ। যাত্রীদের জুলুমের এই চিত্র মেঘনা নদীর নতুন স্লুইস (চরফ্যাশন)-জনতাবাজার (মনপুরা) আন্ত-উপজেলা নৌপথে।
       </div>
       </div>
       
       <div class="post">
       <div class="post-top">
       <div class="post-avatar"><img src="https://pbs.twimg.com/card_img/1501783349148676097/Zy1RLntb?format=jpg&name=small"></div>
       <div class="post-at">
       <div class="post-author">ফয়সাল সোহাগ</div>
       <div class="post-time">2 hrs ago</div>
       </div>
       <div class="post-contacts">
       <div class="post-contact-icon"><i class="icofont-ui-call"></i></div>
       <div class="post-contact-icon"><i class="icofont-telegram"></i></div>
       <div class="post-contact-icon"><i class="icofont-whatsapp"></i></div>
       </div>
       </div>
       <div class="post-body">
       ভাটার সময় নৌপথটির সর্বোচ্চ দূরত্ব দাঁড়ায় ১৬ কিলোমিটার। সরকার নির্ধারিত ভাড়া প্রতি কিলোমিটার ২ টাকা ৩০ পয়সা। এ হারে ভাড়া হয় ৪০ টাকা ৮০ পয়সা। সেখানে ইজারাদার ভাড়া নিচ্ছেন ১২০ টাকা। শুধু বেশি ভাড়া নিচ্ছেন এমন নয়, লঞ্চে উঠতে প্রতি যাত্রীকে কাটতে হয় ১০ টাকার ঘাটটিকিট। অথচ যাত্রী পারাপারে ব্যবহার করা হচ্ছে দুটি ফিটনেসবিহীন লঞ্চ। যাত্রীদের জুলুমের এই চিত্র মেঘনা নদীর নতুন স্লুইস (চরফ্যাশন)-জনতাবাজার (মনপুরা) আন্ত-উপজেলা নৌপথে।
       </div>
       </div>
      
`;
fstore.collection('donor').orderBy("creationTime", "desc").onSnapshot(snap=>{
    $('.donor-count').text(snap.docs.length + ' জন');
   
   });
fstore.collection('recipient').orderBy("creationTime", "desc").onSnapshot(snap=>{
    $('.rec-count').text(snap.docs.length + ' জন');

});
    
},

    
}

).resolve();

blood(doc.data());





}
})

} else {
 router.navigate('/auth');
}
});

function navManage(page) {
    $('.nav').removeClass('nav-active');
    $('#'+page).addClass('nav-active');
    $('.nav-title').hide();
    $('#'+page+' .nav-title').show();
}

function dayDef(date){
 let defInTime = (new Date()).getTime() - (new Date(date)).getTime();
 let defInDay = defInTime / (1000*3600*24);
 return parseInt(defInDay);
}

// moment js for time counting
function getRelativeTime(date) {
    const dateInMillis  = date.seconds * 1000
    d = new Date(dateInMillis).toDateString() + ' ' + new Date(dateInMillis).toLocaleTimeString()
        return moment(new Date(d)).fromNow();
    }



function getLatLong(id){
    if(navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log('Location allowed!')
            
            fstore.collection('users').doc(id).update({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
        })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Not supported!',
            text: 'Geolocation is not supported by your browser!',
            footer: '<a href="">Why do I have this issue?</a>'
          }) 
    }
    
}


navigator.permissions && navigator.permissions.query({name: 'geolocation'})
.then(function(PermissionStatus) {
    if (PermissionStatus.state == 'granted') {
         console.log('granted!')
    } else if (PermissionStatus.state == 'prompt') {
        Swal.fire({
            icon: 'error',
            title: 'আপনার লোকেশন সার্ভিস অফ!',
            text: 'দয়া করে লোকেশন সার্ভিসটি Allow করুন।',
          }) 
    } else {
        Swal.fire({
            icon: 'error',
            title: 'আপনার লোকেশন সার্ভিস অফ!',
            text: 'দয়া করে লোকেশন সার্ভিসটি Allow করুন।',
          }) 
    }
})

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