
var app = document.querySelector('#app');
firebase.auth().onAuthStateChanged( user => {
    if (user) {
        $('.av').hide();
     fstore.collection('users').doc(user.uid).onSnapshot((doc) => {
         if(doc.data().name == undefined)
         {
            // $('.appBar').hide();
            $('.bottom-nav').hide();
            $('.av').hide();
            router.navigate('/info/'+ user.uid);
            $('.loader').hide();
        }else{
             $('.loader').hide();
             $('.av').show();

router.on({
    "/": function(params){
        navManage('home');
        app.innerHTML = `
       <div class="sec-horz">
       <div class="card active-card" style="background: #D14142">
        <div class="card-title">সক্রিয় Rh+ রক্তদাতা </div>
        <div class="card-num">53 জন</div>
        <div class="card-icon"><img src="../images/rh+.png"></div>
       </div>
      
       <div class="card active-card" style="background: #FA7449">
       <div class="card-title">সক্রিয় Rh- রক্তদাতা </div>
       <div class="card-num">31 জন</div>
       <div class="card-icon"><img src="../images/rh-.png"></div>
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
    },
}).resolve();



function navManage(page) {
    $('.nav').removeClass('nav-active');
    $('#'+page).addClass('nav-active');
    $('.nav-title').hide();
    $('#'+page+' .nav-title').show();
}

}
})

} else {
 router.navigate('/auth');
}
});