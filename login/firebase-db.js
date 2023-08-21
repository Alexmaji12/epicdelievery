

const firebaseConfig = {
    apiKey: "AIzaSyCmWljaR25lxPhoD3E8L4NbDVOG4hfqgbQ",
    authDomain: "epic-shipment.firebaseapp.com",
    projectId: "epic-shipment",
    storageBucket: "epic-shipment.appspot.com",
    messagingSenderId: "294011067794",
    appId: "1:294011067794:web:393e66ca367c8c3e20f54b",
    measurementId: "G-EGEK5E5TS5"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Track button click event
const trackButton = document.getElementById("trackButton");
trackButton.addEventListener("click", async () => {
  const trackingId = document.getElementById("trackingIdInput").value;

  try {
	// Query Firestore using the tracking ID
	const userDoc = await db.collection("users").doc(trackingId).get();

	const senderName = document.getElementById("sender_name");
	  const receiverAddress = document.getElementById("receiver_address");
	  const process = document.getElementById("process");
	  const clearanceInfo = document.getElementById("clearance_info");
	  const tips = document.getElementById("tips");

	  window.location = "dashboard/index.html";

	if (userDoc.exists) {
	  const userData = userDoc.data();

	        // Update specific HTML elements with Firestore data
	  senderName.textContent = `Sender: ${userData.sender_name}`;
	  receiverAddress.textContent = `Receiver's Address: ${userData.receiver_address}`;
	  process.textContent = userData.process;
	  clearanceInfo.textContent = userData.clearance_info;
	  tips.textContent = userData.tips;

	        // Redirect to dashboard with tracking ID as parameter
			// window.location `./dashboard/index.html?trackingId=${trackingId}`;

	} else {
	  userInfoDiv.innerHTML = "Package not found.";
	}
  } catch (error) {
	console.error("Error fetching package data:", error);
  }
})
