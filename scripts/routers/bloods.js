function blood(mydata){
router.on({
  "/bloods": function (params) {
    navManage("bloods");
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
    $(document).ready(function () {
      $("#donor").trigger("click");
    });

    const tab_body = document.querySelector(".tab-body");
    
    $(".tab-item").click(function (e) {
      tab_body.innerHTML = `
      <div class="lds-dual-ring"></div>
      `;
      let id = $(this)[0].id;
      if (id === "donor") {
        $("#" + id).addClass("tab-active");
        $("#recipient").removeClass("tab-active");
       
        fstore.collection('donor').orderBy("creationTime", "desc").onSnapshot(snap=>{
          tab_body.innerHTML ="";
          snap.forEach(element => {
            let data = element.data();
            tab_body.innerHTML += `
            <div class=" blood-post">
                <div class="blood-group"><img src="../../images/group/${data.group}.png"></div>
                <div class="donor"><div class="donor-avatar"><img src="../../images/blood-donor-${data.gender}.png"></div>
                <div class="post-at">
                <div class="post-author">${data.donor}</div>
                <div class="post-time">${getRelativeTime(data.creationTime)}</div>
                </div></div>
                <div class="location"><img src="../../images/location.png"> ${data.location}</div>
                <div class="">পোস্টকারী আপনার থেকে ${
                  geolib.getDistance(
                    {
                        latitude: data.lat,
                        longitude: data.lon,
                    },
                    {
                    latitude: mydata.lat,
                    longitude: mydata.lon,
                })

                } m  দুরে অবস্থান করেন। </div>
                <div class="post-contacts">
                <a href="tel:${data.phone}"><div class="post-contact-icon"><i class="icofont-ui-call"></i></div></a>
                <div class="post-contact-icon"><i class="icofont-ui-message"></i></div>
                </div>
                </div>
            `
          });
        })
      } else {
        $("#" + id).addClass("tab-active");
        $("#donor").removeClass("tab-active");

        fstore.collection('recipient').orderBy("creationTime", "desc").onSnapshot(snap=>{
          tab_body.innerHTML =""
          snap.forEach(element => {
            let data = element.data();
            tab_body.innerHTML += `
            <div class=" blood-post">
                <div class="blood-group"><img src="../../images/group/${data.group}.png"></div>
                <div class="donor"><div class="donor-avatar"><img src="../../images/blood-donor-${data.gender}.png"></div>
                <div class="post-at">
                <div class="post-author">${data.donor}</div>
                <div class="post-time">${getRelativeTime(data.creationTime)}</div>
                </div></div>
                <div class="location"><img src="../../images/location.png"> ${data.location}</div>
               
                <div class="post-contacts">
                <a href="tel:${data.phone}"><div class="post-contact-icon"><i class="icofont-ui-call"></i></div></a>
                <div class="post-contact-icon"><i class="icofont-ui-message"></i></div>
                </div>
                </div>
            `
          });
        })
      }
    });
  },
  "/post": function (params) {
    navManage("post");
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
        <input id="dnr" type="radio" name="status" value="donor" required/>
        <label for="dnr">রক্ত দিতে চাই</label>
        <input id="rcp" type="radio" name="status" value="recipient" required/>
        <label for="rcp">রক্ত নিতে চাই</label>
      </div>
    </div>
  </div>

  <h4>জেন্ডার নির্ধারণ করুন</h4>
  <div class="input-group">
    <input id="gender-male" type="radio" name="gender" value="male" required/>
    <label for="gender-male">পুরুষ</label>
    <input id="gender-female" type="radio" name="gender" value="female" required/>
    <label for="gender-female">নারী</label>
    <input id="gender-female" type="radio" name="gender" value="other" required/>
    <label for="gender-female">অন্যান্য</label>
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
    const bp = document.querySelector("#blood-post");

    bp.addEventListener("submit", (e) => {
      e.preventDefault();
       fstore.collection(bp.status.value).add({
        donor: bp.name.value,
        phone: bp.phone.value,
        location: bp.location.value,
        group: bp.group.value,
        gender: bp.gender.value,
        details: bp.details.value,
        lat: 89.4323907,
        lon: 25.9092413,
        creationTime: firebase.firestore.Timestamp.fromDate(
          new Date())
       });

       Swal.fire({
        icon: 'success',
        title: 'সম্পন্ন হয়েছে!',
        text: 'আপনার পোস্টটি পাবলিশ হয়েছে!',
      });

      bp.reset();
    });
  },
  "/notify": function (params) {
    navManage("notify");
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
});

router
  .on({
    "/auth": function () {
      $(".appBar").hide();
      $(".loader").hide();
      $(".bottom-nav").hide();
      $(".av").hide();
      app.innerHTML = `

        <div class="card auth">
     <center>
        <div class="auth-logo">
        <img height="70px" src="../../images/blood.png">
        <div >রংপুর রক্ত</div>
        </div>
</center>

        <div class="warn"></div>

        <div class="phone-auth">
        <input type="tel" name="phone" placeholder="ফোন নম্বর দিন(ex: 0131xxxx)" id="phoneNumber" />
        <center><div id="recaptcha-container"></div></center>
        <center><button id="confirm-code">ভেরিফিকেশন কোড</button></center>
        </div>
        
        <div class="varify">
        <div class="vf">
        <input type="text" id="code" placeholder="ভেরিফিকেশন কোডটি লিখুন" />
        <button id="sign-in-button" > লগইন করুন</button>
        </div>
        </div>

      
</div>

<button style="display: none;" id="signOut">Sign Out</div>
        `;
      var phoneNumber;
      var code;
      const getCodeButton = document.getElementById("confirm-code");
      const signInWithPhoneButton = document.getElementById("sign-in-button");
      const auth = firebase.auth();
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container"
      );
      recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });

      const sendVerificationCode = () => {
        $(".loader").show();
        phoneNumber = document.getElementById("phoneNumber").value;
        phoneNumber = "+88" + phoneNumber;
        console.log(phoneNumber.length);
        if (phoneNumber === "" || phoneNumber.length != 14) {
          Swal.fire({
            icon: "error",
            title: "ফোন নম্বর ইস্যু...",
            text: "সঠিক ফোন নম্বর প্রদান করুন!",
            footer: "ফোন নম্বরটি ১১ ডিজিটের হওয়া জরুরী!",
          });

          return;
        }

        const appVerifier = window.recaptchaVerifier;

        auth
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            const sentCodeId = confirmationResult.verificationId;
            $(".warn").html(`
           ভেরিফিকেশন কোডটি পাঠানো হয়েছে। 
           `);
            console.log(confirmationResult);
            $(".loader").hide();

            $(".phone-auth").hide();
            $(".varify").show();

            signInWithPhoneButton.addEventListener("click", () =>
              signInWithPhone(sentCodeId)
            );
          });
      };

      const signInWithPhone = (sentCodeId) => {
        code = document.getElementById("code").value;
        const credential = firebase.auth.PhoneAuthProvider.credential(
          sentCodeId,
          code
        ); //This function runs everytime the auth state changes. Use to verify if the user isAuthProvider.credential(sentCodeId, code);
        auth
          .signInWithCredential(credential)
          .then(() => {
            console.log(credential);
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="">Why do I have this issue?</a>',
            });
          });
      };
      getCodeButton.addEventListener("click", sendVerificationCode);
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          console.log(user);
          fstore
            .collection("users")
            .doc(user.uid)
            .set(
              {
                phone: user.phoneNumber,
                uid: user.uid,
                creationTime: (firebase.firestore.Timestamp.fromDate(
                    new Date(user.metadata.creationTime)
                  )),
              },
              { merge: true }
            )
            .then(() => {
              $(".appBar").show();
              $(".bottom-nav").show();
              $(".av").show();
              
              window.location.reload();
            });
        } else {
          console.log("USER NOT LOGGED IN");
        }
      });

      $("#signOut").click(function () {
        firebase
          .auth()
          .signOut()
          .then(() => {
            window.location.reload();
          })
          .catch((e) => {
            console.log(e);
          });
      });
    },

    "/info/:id": function (params) {
      console.log(params.id)
      app.innerHTML = `
      <div class="container">
      <center><div class="avatar"></div>
    
      <h4>প্রোফাইল ফটো আপলোড করুন</h4>
      <div class="uploadProgress"></div>
      <div class="wrapper">
<div class="file-upload">
  <input type="file" id="imgInp" />
  <i class="icofont-camera"></i>
</div>
</div>
<button id="upload">আপলোড</button>
      </center>


    <form id="user-info">
      <div class="row">
    <h4>আপনার তথ্য দিন</h4>
    <div class="input-group input-group-icon">
      <input name="name" type="text" placeholder="নাম" required/>
      <div class="input-icon"><i class="icofont-user"></i></div>
    </div>


    <div class="input-group input-group-icon">
      <input name="location" type="text" placeholder="পূর্ণ ঠিকানা(বর্তমান)" required/>
      <div class="input-icon"><i class="icofont-location-pin"></i></div>
    </div>

  </div>


  <div class="row">

    <div class="col-half">
      <h4>আপনার জেন্ডার নির্ধারণ করুন</h4>
      <div class="input-group">
        <input id="gender-male" type="radio" name="gender" value="male" required/>
        <label for="gender-male">পুরুষ</label>
        <input id="gender-female" type="radio" name="gender" value="female" required/>
        <label for="gender-female">নারী</label>
        <input id="gender-female" type="radio" name="gender" value="other" required/>
        <label for="gender-female">অন্যান্য</label>
      </div>
    </div>
  </div>

  <h4>এর আগে রক্ত দান করেছিলেন?</h4>
  <div class="input-group">
        <input id="yes" type="radio" name="donate_status" value="yes" required/>
        <label for="yes">হ্যাঁ</label>
        <input id="no" type="radio" name="donate_status" value="no" required/>
        <label for="no">না</label>
      </div>

  <div class="donate-date">
  <h4>সর্বশেষ রক্তদানের তারিখ</h4>
  <input type="date" id="meeting-time"
       name="donate_date">
    </div>

  <h4>আপনার রক্তের গ্রুপ</h4>
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
    
        <h4>বায়ো</h4>
        <div class="input-group">
         <textarea maxlength="250" name="details" placeholder="২৫০ বর্ণের  মধ্যে" required></textarea>
        </div>
  <center> <button type="submit">সবমিট করুন</div></center>
</form>
</div>
      `;

      $('#yes').click(
       function(){
        $('.donate-date').show()
       }
      )
      $('#no').click(
        function(){
          $('.donate-date').hide()
        }
      )
     
      const userInfo = document.getElementById('user-info');

      userInfo.addEventListener('submit', e=>{
        e.preventDefault();
        let donate_date = null;
        let donor = false;
        if(userInfo.donate_status.value === "yes"){
          donor = true;
          donate_date = userInfo.donate_date.value;
        }
        
        let data = {
          name: userInfo.name.value,
          location: userInfo.location.value,
          gender: userInfo.gender.value,
          donate_date: donate_date,
          group: userInfo.group.value,
          details: userInfo.details.value,
          isDonor: donor

        }
        fstore.collection('users').doc(params.id).update(data).then(()=>{
          Swal.fire({
            icon: 'success',
            title: 'সাবমিট হয়েছে!',
            text: 'আপনার তথ্যগুলি সংরক্ষিত হয়েছে।',
          });
          window.location.reload();
        })
      })


      //photo upload
      const imgInp = document.querySelector("#imgInp");
      imgInp.onchange = (evt) => {
        let [file] = imgInp.files;
        if (file) {
          let url = URL.createObjectURL(file);
          $(".avatar").html(`<img src="${url}" />`);
       $('#upload').click(function(){
          var metadata = {
            contentType: "image/jpeg",
          };
          var uploadTask = storage
            .ref()
            .child("profile/" + params.id)
            .put(file, metadata)

          uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              $(".uploadProgress").text("Uploading... " + progress + "%");
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                  console.log("Upload is paused");
                  break;
                case firebase.storage.TaskState.RUNNING:
                  $(".uploadProgress").text("Uploading... ");
                  break;
              }
            },
            (error) => {
              console.log(error);
              switch (error.code) {
                case "storage/unauthorized":
                  break;
                case "storage/canceled":
                  break;
                case "storage/unknown":
                  break;
              }
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log("File available at", downloadURL);
                $(".uploadProgress").html(
                  '<font color="green">Successfully Uploaded!</font>'
                );
                fstore.collection("users").doc(params.id).update({
                  photoURL: downloadURL,
                });
                setTimeout(function (params) {
                  $(".uploadProgress").hide(2000);
                }, 2000);
              });
            }
          );

        })
        }
      };


    },
  }).resolve();
}
