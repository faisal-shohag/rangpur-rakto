router.on({
    "/bloods": function(params){
        navManage('bloods');
        app.innerHTML = `
        <div class="tab1">
        <div id="donor" class="tab-item tab-active">
        <div class="tab-icon"><img src="../../images/donor.png"></div>
        <div class="tab-title">রক্ত দাতা</div>
        </div>

        <div id="recipient" class="tab-item">
        <div class="tab-icon"><img src="../../images/transfusion.png"></div>
        <div class="tab-title">রক্ত গ্রহীতা</div>
        </div>
        </div>
        <div class="tab-body">
        </div>
        `;
     $(document).ready(function(){
            $('#donor').trigger('click');
          });

        const tab_body = document.querySelector('.tab-body');
        tab_body.innerHTML= '';
        $('.tab-item').click(function(e){
            let id = $(this)[0].id;
            if(id === 'donor'){
                $('#'+id).addClass('tab-active');
                $('#recipient').removeClass('tab-active');

                tab_body.innerHTML = `
                <div class=" blood-post">
                <div class="blood-group"><img src="../../images/group/AB+.png"></div>
                <div class="donor"><div class="donor-avatar"><img src="../../images/blood-donor-female.png"></div>
                <div class="post-at">
                <div class="post-author">ফায়সাল সোহাগ</div>
                <div class="post-time">2 mins ago</div>
                </div></div>
                <div class="location"><img src="../../images/location.png"> শাপলা, রংপুর</div>
                <div class="post-contacts">
                <div class="post-contact-icon"><i class="icofont-ui-call"></i></div>
                <div class="post-contact-icon"><i class="icofont-ui-message"></i></div>
                </div>
                </div>

                <div class=" blood-post">
                <div class="blood-group"><img src="../../images/group/AB+.png"></div>
                <div class="donor"><div class="donor-avatar"><img src="../../images/blood-donor-female.png"></div>
                <div class="post-at">
                <div class="post-author">ফায়সাল সোহাগ</div>
                <div class="post-time">2 mins ago</div>
                </div></div>
                <div class="location"><img src="../../images/location.png"> শাপলা, রংপুর</div>
                <div class="post-contacts">
                <div class="post-contact-icon"><i class="icofont-ui-call"></i></div>
                <div class="post-contact-icon"><i class="icofont-ui-message"></i></div>
                </div>
                </div>


                <div class=" blood-post">
                <div class="blood-group"><img src="../../images/group/AB+.png"></div>
                <div class="donor"><div class="donor-avatar"><img src="../../images/blood-donor-female.png"></div>
                <div class="post-at">
                <div class="post-author">ফায়সাল সোহাগ</div>
                <div class="post-time">2 mins ago</div>
                </div></div>
                <div class="location"><img src="../../images/location.png"> শাপলা, রংপুর</div>
                <div class="post-contacts">
                <div class="post-contact-icon"><i class="icofont-ui-call"></i></div>
                <div class="post-contact-icon"><i class="icofont-ui-message"></i></div>
                </div>
                </div>
                `

            }else{
                $('#'+id).addClass('tab-active');
                $('#donor').removeClass('tab-active');

                tab_body.innerHTML = `
                <div class=" blood-post">
                <div class="blood-group"><img src="../../images/group/AB+.png"></div>
                <div class="donor"><div class="donor-avatar"><img src="../../images/blood-donor-female.png"></div>
                <div class="post-at">
                <div class="post-author">ফায়সাল সোহাগ</div>
                <div class="post-time">2 mins ago</div>
                </div></div>
                <div class="location"><img src="../../images/location.png"> শাপলা, রংপুর</div>
                <div class="post-contacts">
                <div class="post-contact-icon"><i class="icofont-ui-call"></i></div>
                <div class="post-contact-icon"><i class="icofont-ui-message"></i></div>
                </div>
                </div>
                `
            }
        });
    },
    "/post": function(params){
        navManage('post');
        app.innerHTML = `
<div class="container">
<form id="blood-post">

  <div class="row">

    <h4>দাতা বা গ্রহীতার বিবরণ </h4>

    <div class="input-group input-group-icon">
      <input name="name" type="text" placeholder="নাম" required/>
      <div class="input-icon"><i class="icofont-user"></i></div>
    </div>

    <div class="input-group input-group-icon">
      <input name="phone" type="number" placeholder="সঠিক ফোন নম্বর" required/>
      <div class="input-icon"><i class="icofont-ui-call"></i></div>
    </div>

    <div class="input-group input-group-icon">
      <input name="location" type="text" placeholder="পূর্ণ ঠিকানা(বর্তমান)" required/>
      <div class="input-icon"><i class="icofont-location-pin"></i></div>
    </div>

  </div>


  <div class="row">

    <div class="col-half">
      <h4>একটি ঠিক করুন</h4>
      <div class="input-group">
        <input id="gender-male" type="radio" name="status" value="donor" required/>
        <label for="gender-male">রক্ত দিতে চাই</label>
        <input id="gender-female" type="radio" name="status" value="recipient" required/>
        <label for="gender-female">রক্ত নিতে চাই</label>
      </div>
    </div>
  </div>

  <h4>যে রক্তের গ্রুপ দিতে চান বা নিতে চান</h4>
  <div class="input-group">

          <select name="group" required>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            
          </select>

        </div>
    
        <h4>বিস্তারিত লিখুন</h4>
        <div class="input-group">
         <textarea maxlength="200" name="details" placeholder="২০০ বর্ণের  মধ্যে" required></textarea>
        </div>
  <center> <button type="submit">সবমিট করুন</div></center>
</form>
</div>
        `;
const bp = document.querySelector('#blood-post');

bp.addEventListener('submit', e => {
    e.preventDefault();
    let data = {
        donor: bp.name.value,
        phone: bp.phone.value,
        location: bp.location.value,
        status: bp.status.value,
        group: bp.group.value,
        details: bp.details.value,
    }

    console.log(data);
    bp.reset();
})

    },
    "/notify": function(params){
        navManage('notify');
        app.innerHTML = `
        <div class="tab-body">
        
         <div class="blood-post">
          <div class="ntf-logo">
          <img src="../../images/donor.png">
          <div class="ntf-desc">
          <div class="sender">Faisal Shohag • <span class="time">Just now</span></div>
          <div class="type">রক্ত দিতে চান</div>
          </div>
          </div>
      </div>

      <div class="blood-post">
          <div class="ntf-logo">
          <img src="../../images/donor.png">
          <div class="ntf-desc">
          <div class="sender">Faisal Shohag • <span class="time">Just now</span></div>
          <div class="type">রক্ত দিতে চান</div>
          </div>
          </div>
      </div>

        </div>
        `;
    },
    '/auth': function(){
        app.innerHTML = `
        <input type="tel" id="phoneNumber" />
        <input type="text" id="code" />
    
        <!-- Add two buttons to submit the inputs -->
        <button id="sign-in-button" >
          SIGN IN WITH PHONE
        </button>
        <button id="confirm-code">
          ENTER CODE
        </button>
    
        <!-- Add a container for reCaptcha -->
        <div id="recaptcha-container"></div>
        
        `

        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "normal",
              callback: function(response) {
                submitPhoneNumberAuth();
              }
            }
          );
      
          $('#sign-in-button').click(function(){
            submitPhoneNumberAuth();
          })
          
        function submitPhoneNumberAuth(){
            console.log('signing in');
            var phoneNumber = document.getElementById("phoneNumber").value;
            var appVerifier = window.recaptchaVerifier;
            firebase
              .auth()
              .signInWithPhoneNumber(phoneNumber, appVerifier)
              .then(function(confirmationResult) {
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult);
              })
              .catch(function(error) {
                console.log(error);
              });
        }

    
          $('#confirm-code').click(function(){
            submitPhoneNumberAuthCode()
          })
          
          function submitPhoneNumberAuthCode(){
            var code = document.getElementById("code").value;
            confirmationResult
              .confirm(code)
              .then(function(result) {
                var user = result.user;
                console.log(user);
              })
              .catch(function(error) {
                console.log(error);
              });
          }
       
         

          //This function runs everytime the auth state changes. Use to verify if the user is logged in
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log("USER LOGGED IN");
        } else {
          // No user is signed in.
          console.log("USER NOT LOGGED IN");
        }
      });

    }
})