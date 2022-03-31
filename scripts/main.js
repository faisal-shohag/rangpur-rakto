var app = document.querySelector("#app");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    fstore
      .collection("users")
      .doc(user.uid)
      .onSnapshot((doc) => {
        $(".splash_screen").hide();
        if (doc.data().name == undefined || doc.data().name == null) {
          $(".bottom-nav").hide();
          $(".splash_screen").hide();
          $(".av").hide();
          router.navigate("/info/" + user.uid);
          $(".loader").hide();
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

       <a href="#!/emergency/org"><div class="menu-item">
       <div class="menu-icon"><img src="../images/blood-organization.png"></div>
       <div class="menu-title">সংগঠন</div>
       </div></a>


       <a href="#!/emergency/bb"><div class="menu-item">
       <div class="menu-icon"><img src="../images/blood-bank.png"></div>
       <div class="menu-title">ব্লাড ব্যাংক</div>
       </div></a>

       
       <a href="#!/emergency/ox"><div class="menu-item">
       <div class="menu-icon"><img src="../images/oxygen-tank.png"></div>
       <div class="menu-title">অক্সিজেন</div>
       </div></a>

       <a href="#!/emergency/amb"><div class="menu-item">
       <div class="menu-icon"><img src="../images//ambulance.png"></div>
       <div class="menu-title">অ্যাম্বুলেন্স</div>
       </div></a>

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
              "/emergency/:id": function(params){
                $('#appBarTitle').text('রক্ত');
               
                if(params.id === "org"){
                  $('#appBarTitle').text('সংগঠন');
                  app.innerHTML = `
                  <div class="em">


                  <div class="em-card">
                  <div class="em-title">Badhon, BRUR Branch</div>
                  <div class="em-contact"><img src="../images/phone.png"> +880-2-8319366, 9330188, 9330189, 935410399, 8314701, 9352226</div>
                  <div class="em-addr"><img src="../images/location.png"> BRUR, Rangpur</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">TPI Blood Donate Foundation-Rangpur</div>
                  <div class="em-contact"><img src="../images/phone.png"> +8801796-080374</div>
                  <div class="em-addr"><img src="../images/location.png"> Darshana, Rangpur</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">Student Welfare Organization of Bangladesh (SWOB)</div>
                  <div class="em-contact"><img src="../images/phone.png"> 01704-260771</div>
                  <div class="em-addr"><img src="../images/location.png">  Kurigram-Ulipur-Chilmari Road, Ulipur</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">Begum Tayeeba Mojumder Red Crescent Blood Center</div>
                  <div class="em-contact"><img src="../images/phone.png"> 0531 61300, 01723 595972, 01717 184539</div>
                  <div class="em-addr"><img src="../images/location.png"> 1 New Town, Dinajpur</div>
                  </div>


                  <div class="em-card">
                  <div class="em-title">Rajshahi Red Crescent Blood Center</div>
                  <div class="em-contact"><img src="../images/phone.png"> 01794565654</div>
                  <div class="em-addr"><img src="../images/location.png"> Sandhani Eye Hospital, Dhaka</div>
                  </div>



                  </div>
                  `
                }

                if(params.id == "bb"){
                  $('#appBarTitle').text('ব্লাড ব্যাংক');
                  app.innerHTML = `
                  <div class="em">


                  <div class="em-card">
                  <div class="em-title">Bangladesh Red Crescent Society</div>
                  <div class="em-contact"><img src="../images/phone.png"> +880-2-8319366, 9330188, 9330189, 935410399, 8314701, 9352226</div>
                  <div class="em-addr"><img src="../images/location.png"> National Headquarters, 684-686, Bara Maghbazar, Dhaka- 1217, Bangladesh</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">Quantum Blood Bank</div>
                  <div class="em-contact"><img src="../images/phone.png"> +88-02-9355756,</div>
                  <div class="em-addr"><img src="../images/location.png"> 1/1 Pioneer Road (Ground Floor); Segunbagicha, Dhaka- 1000, Bangladesh</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">Thalassemia Foundation Hospital</div>
                  <div class="em-contact"><img src="../images/phone.png"> +88-02-8332481, 01755-587479</div>
                  <div class="em-addr"><img src="../images/location.png"> Dhaka- 1207, Bangladesh</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">Bloodseek.com</div>
                  <div class="em-contact"><img src="../images/phone.png">+88-01716-057020</div>
                  <div class="em-addr"><img src="../images/location.png">Dhaka- 1207, Bangladesh</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">Bangladesh Blood Bank & Transfiution Center</div>
                  <div class="em-contact"><img src="../images/phone.png">+88-01776-291633, 01850-077185</div>
                  <div class="em-addr"><img src="../images/location.png">22/12, 1st Floor, Mirpur Road, Dhaka- 1207, Bangladesh</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">BADHAN</div>
                  <div class="em-contact"><img src="../images/phone.png">+88-02-8629042, 01534-982674</div>
                  <div class="em-addr"><img src="../images/location.png">: Central Office, T.S.C (Ground Floor), University of Dhaka, Dhaka- 1000, Bangladesh</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">Bangladesh Red Crescent Blood Bank</div>
                  <div class="em-contact"><img src="../images/phone.png">+8802-8121497</div>
                  <div class="em-addr"><img src="../images/location.png">7/5, Aurongzeb Road, Dhaka- 1207, Bangladesh</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">Voluntary Blood Donation Program and Quantum Lab</div>
                  <div class="em-contact"><img src="../images/phone.png">+8802-8322987</div>
                  <div class="em-addr"><img src="../images/location.png">31/V Shilpacharya Zainul Abedin Sarak, Shantinagar, Dhaka- 1217, Bangladesh</div>
                  </div>

                  </div>
                  `
                }

                if(params.id == "ox"){
                  $('#appBarTitle').text('অক্সিজেন');
                  app.innerHTML = `
                  <div class="em">

                  <div class="em-card">
                  <div class="em-title">Marium Oxygen</div>
                  <div class="em-contact"><img src="../images/phone.png"> +8801714558407</div>
                  <div class="em-addr"><img src="../images/location.png"> https://mariumoxygen.com/</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">71care</div>
                  <div class="em-contact"><img src="../images/phone.png">01401-444888</div>
                  <div class="em-addr"><img src="../images/location.png"> https://71care.com/oxygen-cylinder-bd/</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">Prova Oxygen</div>
                  <div class="em-contact"><img src="../images/phone.png"> +8801716961897</div>
                  <div class="em-addr"><img src="../images/location.png"> https://provaoxygen.xyz/</div>
                  </div>
                  
                  <div class="em-card">
                  <div class="em-title">Maisha Care LTD</div>
                  <div class="em-contact"><img src="../images/phone.png"> +8801315092095</div>
                  <div class="em-addr"><img src="../images/location.png">https://maishacare.com/product-category/oxygen-cylinder/</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">Oxygen Delivery24</div>
                  <div class="em-contact"><img src="../images/phone.png">+8801718967976, +8801730116203</div>
                  <div class="em-addr"><img src="../images/location.png"> https://oxygendelivery24.com/</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">Oxygen Cylinder BD</div>
                  <div class="em-contact"><img src="../images/phone.png"> 01714585817</div>
                  <div class="em-addr"><img src="../images/location.png"> https://www.oxygencylinderbd.com/</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">Oxygen Dhaka</div>
                  <div class="em-contact"><img src="../images/phone.png"> 01725554233</div>
                  <div class="em-addr"><img src="../images/location.png"> https://www.oxygendhaka.com/</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">Medishop BD</div>
                  <div class="em-contact"><img src="../images/phone.png"> +8801795228222</div>
                  <div class="em-addr"><img src="../images/location.png"> https://medishop.com.bd/</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">Oxygen Cylinder Home Service</div>
                  <div class="em-contact"><img src="../images/phone.png"> +8801716089838</div>
                  <div class="em-addr"><img src="../images/location.png"> https://oxygencylinderhomeservice.com.bd/</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">Peace Oxygen</div>
                  <div class="em-contact"><img src="../images/phone.png"> +8801719677350</div>
                  <div class="em-addr"><img src="../images/location.png"> https://peaceoxygen.com/</div>
                  </div>
                  </div>
                  
                  `
                }

                if(params.id == "amb"){
                  $('#appBarTitle').text('অ্যাম্বুলেন্স');
                  app.innerHTML = `
                  <div class="em">


                  <div class="em-card">
                  <div class="em-title">Rangpur BP Ambulance Service</div>
                  <div class="em-contact"><img src="../images/phone.png">01715-773382</div>
                  <div class="em-addr"><img src="../images/location.png"> Rangpur City</div>
                  </div>


                  <div class="em-card">
                  <div class="em-title">LABAID Diagnostic Rangpur</div>
                  <div class="em-contact"><img src="../images/phone.png">01766-663099</div>
                  <div class="em-addr"><img src="../images/location.png">  Setu Bandhan, House-69, Road, 01 Rangpur – Dinajpur Hwy, Rangpur 5400</div>
                  </div>


                  <div class="em-card">
                  <div class="em-title">City Clinic Ambulance Service</div>
                  <div class="em-contact"><img src="../images/phone.png">0531 65481, 01712816234.</div>
                  <div class="em-addr"><img src="../images/location.png"> Dinajpur</div>
                  </div>


                  <div class="em-card">
                  <div class="em-title">Doctors Hospital Ambulance Service</div>
                  <div class="em-contact"><img src="../images/phone.png">01716991273</div>
                  <div class="em-addr"><img src="../images/location.png"> Dinajpur</div>
                  </div>



                  <div class="em-card">
                  <div class="em-title">Doctors Clinic Unit 1 Ambulance Service</div>
                  <div class="em-contact"><img src="../images/phone.png">051 61074</div>
                  <div class="em-addr"><img src="../images/location.png"> Bogra</div>
                  </div>

                  <div class="em-card">
                  <div class="em-title">Doctors Clinic Unit 2 Ambulance Service</div>
                  <div class="em-contact"><img src="../images/phone.png">051 66224</div>
                  <div class="em-addr"><img src="../images/location.png"> Bogra</div>
                  </div>


                  </div>
                  `
                }


               
              },
              "/bloods": function (params) {            
                $('#appBarTitle').text('রক্ত');
                navManage("bloods");
                app.innerHTML = `
                <div class="search-bar">
                <div class="search-icon"><img src="../../images/search.png"></div>
                <input autocomplete="off" id="search-blood" placeholder="রক্তের গ্রুপ সার্চ করুন..." type="text" name="search"/>
                </div>
            
                </div>
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
                    <div class="search_bar">
                   
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
                        if(user.uid === data.uid){
                          tab_body.innerHTML += `
                          <div class="blood-post">
                          <div style="display: none;" class="search-tag">${data.group}</div>
                              <div class="blood-group"><img src="../../images/group/${data.group}.png"></div>
                              <div class="donor"><div class="donor-avatar"><img src="../../images/blood-donor-${data.gender}.png"></div>
                              <div class="post-at">
                              <div class="post-author">${data.donor} 	• দাতা</div>
                              <div class="post-time">${getRelativeTime(data.creationTime)}</div>
                              </div></div>
                              <div class="post-body">${data.details}</div>
                              <div class="post-foot-area">
                              <div class="location"><img src="../../images/location.png"> ${data.location}</div>
                              <div class="end">
                              <a href="#!/profile/${data.uid}"><div class="postBy"><i class="icofont-user"></i></div></a>
                              <a href="#!/edit/donor/${element.id}"><div class="edit"><i class="icofont-edit"></i></div></a>
                              <div id="${element.id}" class="delete"><i class="icofont-ui-delete"></i></div>
                              </div>
                              </div>
                              <div class="post-contacts">
                              <a href="tel:${data.phone}"><div class="post-contact-icon"><i class="icofont-ui-call"></i></div></a>
                              <a><div class="post-contact-icon"><i class="icofont-flag"></i></div></a>
                              </div>
                              </div>
                          `
            
                        
                        }else{
                          tab_body.innerHTML += `
                        <div class="blood-post">
                            <div style="display: none;" class="search-tag">${data.group}</div>
                            <div class="blood-group"><img src="../../images/group/${data.group}.png"></div>
                            <div class="donor"><div class="donor-avatar"><img src="../../images/blood-donor-${data.gender}.png"></div>
                            <div class="post-at">
                            <div class="post-author">${data.donor} • দাতা </div>
                            <div class="post-time">${getRelativeTime(data.creationTime)}</div>
                            </div></div>
                            <div class="post-body">${data.details}</div>
                            <div class="post-foot-area">
                            <div class="location"><img src="../../images/location.png"> ${data.location}</div>
                            <a href="#!/profile/${data.uid}"><div class="postBy"><i class="icofont-user"></i></div></a>
                            </div>
                           
                            <div class="post-contacts">
                            <a href="tel:${data.phone}"><div class="post-contact-icon" ><i class="icofont-ui-call"></i></div></a>
                            <a><div class="post-contact-icon"><i class="icofont-flag"></i></div></a>
                            </div>
                            </div>
                        `
                        }
                      });
            
                      $('.delete').click(function(){
                        let postId = $(this)[0].id;
                        deletePost(postId, "donor");
                      });
                    })
                  } else {
                    $("#" + id).addClass("tab-active");
                    $("#donor").removeClass("tab-active");
            
                    fstore.collection('recipient').orderBy("creationTime", "desc").onSnapshot(snap=>{
                      tab_body.innerHTML =""
                      snap.forEach(element => {
                        let data = element.data();
                        if(user.uid === data.uid){
                          tab_body.innerHTML += `
                          <div  class="blood-post">
                          <div style="display: none;" class="search-tag">${data.group}</div>
                              <div class="blood-group"><img src="../../images/group/${data.group}.png"></div>
                              <div class="donor"><div class="donor-avatar"><img src="../../images/blood-donor-${data.gender}.png"></div>
                              <div class="post-at">
                              <div class="post-author">${data.donor} • গ্রহীতা</div>
                              <div class="post-time">${getRelativeTime(data.creationTime)}</div>
                              </div></div>
                              <div class="post-body">${data.details}</div>
                              <div class="post-foot-area">
                              <div class="location"><img src="../../images/location.png"> ${data.location}</div>
                              <div class="end">
                              <a href="#!/profile/${data.uid}"><div class="postBy"><i class="icofont-user"></i></div></a>
                              <a href="#!/edit/recipient/${element.id}"><div class="edit"><i class="icofont-edit"></i></div></a>
                              <div id="${element.id}" class="delete"><i class="icofont-ui-delete"></i></div>
                              </div>
                              </div>
                              <div class="post-contacts">
                             
                              <a href="tel:${data.phone}"><div class="post-contact-icon"><i class="icofont-ui-call"></i></div></a>
                              <a href="#"><div class="post-contact-icon"><i class="icofont-flag"></i></div></a>
                              
                              </div>
                              </div>
                          `
                        }else{
                          tab_body.innerHTML += `
                        <div class=" blood-post">
                        <div style="display: none;" class="search-tag">${data.group}</div>
                            <div class="blood-group"><img src="../../images/group/${data.group}.png"></div>
                            <div class="donor"><div class="donor-avatar"><img src="../../images/blood-donor-${data.gender}.png"></div>
                            <div class="post-at">
                            <div class="post-author">${data.donor} • গ্রহীতা</div>
                            <div class="post-time">${getRelativeTime(data.creationTime)}</div>
                            </div></div>
                            <div class="post-body">${data.details}</div>
            
                            <div class="post-foot-area">
                            <div class="location"><img src="../../images/location.png"> ${data.location}</div>
                            <a href="#!/profile/${data.uid}"><div class="postBy"><i class="icofont-user"></i></div></a>
                            </div>
                           
                            <div class="post-contacts">
                            
                            <a href="tel:${data.phone}"><div class="post-contact-icon" ><i class="icofont-ui-call"></i></div></a>
                            <a><div class="post-contact-icon"><i class="icofont-flag"></i></div></a>
                            </div>
                            </div>
                        `
                        }
                      });
            
            
                      $('.delete').click(function(){
                        let postId = $(this)[0].id;
                        deletePost(postId, "recipient");
                      });
            
                    
            
            
            
                    })
                  }
            
                    //Searching..
                    document.getElementById('search-blood').addEventListener('keyup', e=>{
                      if(e.key = 'Enter'){
                        e.preventDefault();
                        let filter = ($('#search-blood')[0].value).toUpperCase();
                        let allPost = document.querySelectorAll('.search-tag');
                        for(let i=0; i<allPost.length; i++){
                          tag = allPost[i].innerText;
                          if(tag.indexOf(filter) > -1) {
                            allPost[i].parentNode.style.display = "";
                          } else{
                            allPost[i].parentNode.style.display = "none";
                          }
            
                        }
                      }
                    });
            
            
                });
              },          
              "/post": function (params) {
                $('#appBarTitle').text('পোস্ট');
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
                    uid: user.uid,
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
              "/members": function (params) {
                $('#appBarTitle').text('মেম্বারস');
                navManage("members");
                app.innerHTML = `
                <div class="search-bar">
                <div class="search-icon"><img src="../../images/search.png"></div>
                <input autocomplete="off" id="search-member" placeholder="সদস্য সার্চ করুন..." type="text" name="search"/>
                </div>
            
                <div class="member-list">
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
                    `;
                    const member_list = document.querySelector('.member-list');
                    fstore.collection('users').get().then(snap => {
                      member_list.innerHTML = "";
                      
                      snap.forEach(member => {
                        member_list.innerHTML += `
                        <a href="#!/profile/${member.id}"><div class="card">
                        <div class="member">
                        <div class="member-avatar"><img src="${member.data().photoURL}"></div>
                        <div class="member-nb">
                        <div class="member-name">${member.data().name}</div>
                        <div class="member-group">${member.data().group}</div>
                        </div>
                        </div>
                        </div></a>
                        `
                      });
            
                      document.getElementById('search-member').addEventListener('keyup', e=>{
                        if(e.key = 'Enter'){
                          e.preventDefault();
                          let filter = ($('#search-member')[0].value).toUpperCase();
                          let allPost = document.querySelectorAll('.member-name');
                          for(let i=0; i<allPost.length; i++){
                            tag = allPost[i].innerText;
                            tag = tag.toUpperCase();
                            if(tag.indexOf(filter) > -1) {
                              allPost[i].parentNode.parentNode.parentNode.style.display = "";
                            } else{
                              allPost[i].parentNode.parentNode.parentNode.style.display = "none";
                            }
              
                          }
                        }
                      });
            
                    })
              },
              "edit/:id/:id2": function (params) {
                $('#appBarTitle').text('পোস্ট এডিট');
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
            
                fstore.collection(params.id).doc(params.id2).onSnapshot(snap=>{
                  let data = snap.data();
                  bp.name.value = data.donor;
                  bp.phone.value = data.phone;
                  bp.location.value = data.location;
                  bp.group.value = data.group;
                  bp.gender.value = data.gender;
                  bp.details.value = data.details;
                  bp.status.value = params.id;
                })
            
              
                bp.addEventListener("submit", (e) => {
                  e.preventDefault();
                   fstore.collection(bp.status.value).doc(params.id2).update({
                    donor: bp.name.value,
                    phone: bp.phone.value,
                    location: bp.location.value,
                    group: bp.group.value,
                    gender: bp.gender.value,
                    details: bp.details.value,
                    uid: uid,
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
              "/profile/:id": function(params){   
                $('#appBarTitle').text('প্রোফাইল');
              app.innerHTML= `
              <div class="le"></div>
               <div class="profile-container"></div>
             
              `
              const profile_container = document.querySelector('.profile-container');
            
              fstore.collection('users').doc(params.id).onSnapshot(snap=>{
                let data = snap.data();
                let donation = "এখনো রক্ত দান করেননি।";
                if(data.donate_date != null)
                donation = data.donate_date;
            //  console.log(getRelativeTime(data.donate_date));
                profile_container.innerHTML = `
               
               
            
               <div class="profile-top">
                <div class="profile-avatar"><img src="${data.photoURL}"></div>
                <div class="profile-name">${data.name}</div>
                <div class="profile-bio">${data.details}</div>
                </div>
                
                <div class="profile-body">
                <div class="profile-section">
                <div class="profile-info-icon"><img src="../../images/phone.png"></div>
                <div class="profile-info-text">${data.phone}</div>
                </div>
            
                <div class="profile-section">
                <div class="profile-info-icon"><img src="../../images/gender.png"></div>
                <div class="profile-info-text">${data.gender}</div>
                </div>
            
                <div class="profile-section">
                <div class="profile-info-icon"><img src="../../images/location.png"></div>
                <div class="profile-info-text">${data.location}</div>
                </div>
            
                <div class="profile-section">
                <div class="profile-info-icon"><img src="../../images/user-donation.png"></div>
                <div class="profile-info-text">${donation}</div>
                </div>
            
                </div>
                <div class="profile-footer"><b>Joined </b>${timestampToDate(data.creationTime)}</div>
                `
            
                if(params.id === user.uid){
                  document.querySelector('.le').innerHTML = `
                  <div id="logout" class="profile-button"><i class="icofont-logout"></i></div>
                  <a href="#!/info/${user.uid}"><div class="profile-button"><i class="icofont-edit"></i></div></a>
                  `
                  $('#logout').off().click(function(){
                    firebase
                    .auth()
                    .signOut()
                    .then(() => {
                      // window.location.reload();
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                  })
            
            
                }
            
              })
              }
            })
            .resolve();

          // blood(doc.data(), user.uid);

          
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

    function deletePost(postId, postCollection){
      console.log(postId);
      Swal.fire({
        title: 'পোস্টটি ডিলিট করতে চান?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'হ্যাঁ',
        cancelButtonText: `না`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          fstore.collection(postCollection).doc(postId).delete();
          Swal.fire('ডিলিট হয়েছে!', '', 'success')
        } 
      })
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
