//auth
router.on({
  "/auth": function () {
    $('#appBarTitle').text('সাইন ইন');
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
           { 
             $('.loader').show();
             signInWithPhone(sentCodeId)
            }
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
}).resolve();



