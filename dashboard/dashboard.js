const firebaseConfig = {
  apiKey: "AIzaSyCmWljaR25lxPhoD3E8L4NbDVOG4hfqgbQ",
  authDomain: "epic-shipment.firebaseapp.com",
  projectId: "epic-shipment",
  storageBucket: "epic-shipment.appspot.com",
  messagingSenderId: "294011067794",
  appId: "1:294011067794:web:393e66ca367c8c3e20f54b",
  measurementId: "G-EGEK5E5TS5",
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

var urlParams = new URLSearchParams(window.location.search);
var trackingId = urlParams.get("trackingId");

function getDetailInfo(trackingId) {
  var senderInfo = "";
  var receiverAddressInfo = "";
  var process = "";
  var clearanceInfo = "";
  var tips = "";

  // Get details based on tracking ID
  db.collection("tracking_ids")
    .doc(trackingId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        var senderName = doc.data().sender_name;
        var receiverAddress = doc.data().receiver_address;
        var clearance = doc.data().clearance_info;
console.log("Clearance Info:", clearance); // Add this line

        var tips = doc.data().tips;

        var currentStep = doc.data().current_step;
        updateStep(currentStep);


        senderInfo = `<p id="sender_name" style="font-weight: 700; font-size: 20; text-align: left;">
      Sender: ${senderName}</p>`;

        receiverAddressInfo = `<p id="receiver_address" style="font-weight: 700; font-size: 20; text-align: left;">
      Reciever's Address: ${receiverAddress}</p>`;

        clearanceInfo = `<p id="clearance_info">${clearance}</p>`;
      } else {
        senderInfo = "No details found";
        receiverAddressInfo = "No details found";
        process = "No details found";
        clearanceInfo = "No details found";
        tips = "No details found";
      }
      document.getElementById("sender_name").innerHTML = senderInfo;
      document.getElementById("receiver_address").innerHTML =
        receiverAddressInfo;
      setTimeout(() => {
        document.getElementById("clearance_info").innerHTML = clearanceInfo;
      }, 100);
            document.getElementById("tips").innerHTML = tips;
    })
    .catch((error) => {
      console.error("Error getting document:", error);
      //   senderInfo = 'Error fetching details';
    });

    function updateStep(currentStep) {
        const step1 = document.getElementById("step-1")
        const step2 = document.getElementById("step-2")
        const step3 = document.getElementById("step-3")
        const step4 = document.getElementById("step-4")
        const step5 = document.getElementById("step-5")
    
        switch (currentStep) {
            case "step1":
                step1.checked = true;
                break;
            case "step2":
                step2.checked = true;
                break;
            case "step3":
                step3.checked = true;
                break;
            case "step4":
                step4.checked = true;
                break;
            case "step5":
                step5.checked = true;
                break;
            default:
                console.error("Invalid step:", currentStep);
        }
    }
}

getDetailInfo(trackingId);

// // Track button click event
// const trackButton = document.getElementById("trackButton");
// trackButton.addEventListener("click", async () => {
//   const trackingId = document.getElementById("trackingIdInput").value;

//   try {
// 	// Query Firestore using the tracking ID
// 	const userDoc = await db.collection("users").doc(trackingId).get();

// 	const senderName = document.getElementById("sender_name");
// 	  const receiverAddress = document.getElementById("receiver_address");
// 	  const process = document.getElementById("process");
// 	  const clearanceInfo = document.getElementById("clearance_info");
// 	  const tips = document.getElementById("tips");

// 	  window.location = "dashboard/index.html";

// 	if (userDoc.exists) {
// 	  const userData = userDoc.data();

// 	        // Update specific HTML elements with Firestore data
// 	  senderName.textContent = `Sender: ${userData.sender_name}`;
// 	  receiverAddress.textContent = `Receiver's Address: ${userData.receiver_address}`;
// 	  process.textContent = userData.process;
// 	  clearanceInfo.textContent = userData.clearance_info;
// 	  tips.textContent = userData.tips;

// 	        // Redirect to dashboard with tracking ID as parameter
// 			// window.location `./dashboard/index.html?trackingId=${trackingId}`;

// 	} else {
// 	  userInfoDiv.innerHTML = "Package not found.";
// 	}
//   } catch (error) {
// 	console.error("Error fetching package data:", error);
//   }
// })
