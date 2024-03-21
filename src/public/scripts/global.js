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
