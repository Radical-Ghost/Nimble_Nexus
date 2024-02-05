const toggle_slider = document.querySelector(".toggle-slider");
const nmode_toggle = document.querySelector(".nmode");
const smode_toggle = document.querySelector(".smode");
var root = document.querySelector(":root");

toggle_slider.addEventListener("click", () => {
	document.querySelector(".slider").classList.toggle("active");
});

let currentTheme = localStorage.getItem("theme");

if (currentTheme) {
	document.body.className = currentTheme;
	document.getElementById("switch").innerHTML =
		currentTheme === "dark-theme" ? "Light Mode" : "Dark Mode";
} else {
	document.body.className = "light-theme";
	document.getElementById("switch").innerHTML = "Dark Mode";
}

nmode_toggle.addEventListener("click", toggleTheme);
smode_toggle.addEventListener("click", toggleTheme);

function toggleTheme() {
	if (document.body.classList.contains("light-theme")) {
		document.body.className = "dark-theme";
		document.getElementById("switch").innerHTML = "Light Mode";
		localStorage.setItem("theme", "dark-theme");
	} else {
		document.body.className = "light-theme";
		document.getElementById("switch").innerHTML = "Dark Mode";
		localStorage.setItem("theme", "light-theme");
	}
}

// nmode_toggle.addEventListener("click", () => {
// 	if (nmode_toggle.classList.contains("fa-moon")) {
// 		nmode_toggle.classList.remove("fa-moon");
// 		smode_toggle.classList.remove("fa-moon");
// 		nmode_toggle.classList.add("fa-sun");
// 		smode_toggle.classList.add("fa-sun");
// 		document.getElementById("switch").innerHTML = "Light Mode";
// 		root.style.setProperty("--about-c", "url(/images/about-dark.svg)");
// 		root.style.setProperty("--back-c", "rgb(0, 14, 25)");
// 		root.style.setProperty("--border-c", "rgb(0, 43, 78)");
// 		root.style.setProperty("--change-text", "white");
// 		root.style.setProperty("--department-text", "thistle");
// 		root.style.setProperty("--fore-c", "rgb(0, 21, 38)");
// 		root.style.setProperty(
// 			"--main-bg",
// 			"linear-gradient(155deg, #390239, #311e4b, #0eb3b5)"
// 		);
// 		root.style.setProperty("--main-c", "rgb(49, 26, 72)");
// 		root.style.setProperty("--search-c", "rgba(105, 105, 105, 0.21)");
// 		root.style.setProperty("--search-pc", "rgba(255, 255, 255, 0.3)");
// 		root.style.setProperty("--shadow-c", "rgba(0, 43, 78, 0.2)");
// 		root.style.setProperty("--sub-text", "rgb(19, 153, 163)");
// 	} else {
// 		nmode_toggle.classList.remove("fa-sun");
// 		nmode_toggle.classList.add("fa-moon");
// 		smode_toggle.classList.remove("fa-sun");
// 		smode_toggle.classList.add("fa-moon");
// 		document.getElementById("switch").innerHTML = "Dark Mode";
// 		root.style.setProperty("--about-c", "url(/images/about-light.svg)");
// 		root.style.setProperty("--back-c", "rgba(223, 224, 243, 0.411)");
// 		root.style.setProperty("--border-c", "rgba(185, 187, 212, 0.7)");
// 		root.style.setProperty("--change-text", "black");
// 		root.style.setProperty("--department-text", "rgb(47, 95, 179)");
// 		root.style.setProperty("--fore-c", "rgba(255, 255, 255, 0.746)");
// 		root.style.setProperty(
// 			"--main-bg",
// 			"linear-gradient(155deg, #07bccf, #7433e5)"
// 		);
// 		root.style.setProperty("--main-c", "rgb(52, 132, 217)");
// 		root.style.setProperty("--search-c", "rgba(0, 0, 0, 0.12)");
// 		root.style.setProperty("--search-pc", "rgba(0, 0, 0, 0.3)");
// 		root.style.setProperty("--shadow-c", "rgba(138, 139, 155, 0.2)");
// 		root.style.setProperty("--sub-text", "rgb(108, 60, 227)");
// 	}
// });

// smode_toggle.addEventListener("click", () => {
// 	if (smode_toggle.classList.contains("fa-moon")) {
// 		nmode_toggle.classList.remove("fa-moon");
// 		smode_toggle.classList.remove("fa-moon");
// 		nmode_toggle.classList.add("fa-sun");
// 		smode_toggle.classList.add("fa-sun");
// 		document.getElementById("switch").innerHTML = "Light Mode";
// 		root.style.setProperty("--about-c", "url(/images/about-dark.svg)");
// 		root.style.setProperty("--back-c", "rgb(0, 14, 25)");
// 		root.style.setProperty("--border-c", "rgb(0, 43, 78)");
// 		root.style.setProperty("--change-text", "white");
// 		root.style.setProperty("--department-text", "thistle");
// 		root.style.setProperty("--fore-c", "rgb(0, 21, 38)");
// 		root.style.setProperty(
// 			"--main-bg",
// 			"linear-gradient(155deg, #390239, #311e4b, #0eb3b5)"
// 		);
// 		root.style.setProperty("--main-c", "rgb(49, 26, 72)");
// 		root.style.setProperty("--search-c", "rgba(105, 105, 105, 0.21)");
// 		root.style.setProperty("--search-pc", "rgba(255, 255, 255, 0.3)");
// 		root.style.setProperty("--shadow-c", "rgba(0, 43, 78, 0.2)");
// 		root.style.setProperty("--sub-text", "rgb(19, 153, 163)");
// 	} else {
// 		nmode_toggle.classList.remove("fa-sun");
// 		nmode_toggle.classList.add("fa-moon");
// 		smode_toggle.classList.remove("fa-sun");
// 		smode_toggle.classList.add("fa-moon");
// 		document.getElementById("switch").innerHTML = "Dark Mode";
// 		root.style.setProperty("--about-c", "url(/images/about-light.svg)");
// 		root.style.setProperty("--back-c", "rgba(223, 224, 243, 0.411)");
// 		root.style.setProperty("--border-c", "rgba(185, 187, 212, 0.7)");
// 		root.style.setProperty("--change-text", "black");
// 		root.style.setProperty("--department-text", "rgb(47, 95, 179)");
// 		root.style.setProperty("--fore-c", "rgba(255, 255, 255, 0.746)");
// 		root.style.setProperty(
// 			"--main-bg",
// 			"linear-gradient(155deg, #07bccf, #7433e5)"
// 		);
// 		root.style.setProperty("--main-c", "rgb(52, 132, 217)");
// 		root.style.setProperty("--search-c", "rgba(0, 0, 0, 0.12)");
// 		root.style.setProperty("--search-pc", "rgba(0, 0, 0, 0.3)");
// 		root.style.setProperty("--shadow-c", "rgba(138, 139, 155, 0.2)");
// 		root.style.setProperty("--sub-text", "rgb(108, 60, 227)");
// 	}
// });

// queries
const showreply = document.querySelectorAll(".replies");

showreply.forEach((btn) =>
	btn.addEventListener("click", (e) => {
		let parentQuery = e.target.closest(".query-container");
		let _id = parentQuery.id;
		if (_id) {
			let childQuery = parentQuery.querySelectorAll(`[dataset=${_id}]`);
			childQuery.forEach((child) => {
				child.classList.toggle("opened");
			});
		}
	})
);

const helpful = document.querySelectorAll(".helpful");
for (let i = 0; i < helpful.length; i++) {
	let helpfulEl = helpful[i];
	let helpfulVotes = parseInt(helpfulEl.textContent);

	helpfulEl.addEventListener("click", (e) => {
		if (helpfulEl.classList.contains("voted")) helpfulVotes--;
		else helpfulVotes++;

		helpfulEl.classList.toggle("voted");

		helpfulEl.textContent = `${helpfulVotes} Found Helpful`;
	});
}

//  Dropdown
const departmentItems = document.querySelectorAll(".sub-department-item");
const departmentSelect = document.querySelector(".select-department");

departmentItems.forEach((item) => {
	item.addEventListener("click", () => {
		departmentSelect.textContent = item.textContent;
	});
});

const dateItems = document.querySelectorAll(".date-item");
const dateSelect = document.querySelector(".select-date");

dateItems.forEach((item) => {
	item.addEventListener("click", () => {
		dateSelect.textContent = item.textContent;
	});
});

function toggleNotices() {
	alert("Notices clicked!");
}
