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

//queries
const showreply = document.querySelectorAll(".replies");

showreply.forEach((btn) =>
	btn.addEventListener("click", (e) => {
		let parentQuery = e.target.closest(".query-container");
		let _id = parentQuery.getAttribute("id").split("-")[1];
		if (_id) {
			let childQueries = document.querySelectorAll(
				`div[dataset='comment-${_id}']`
			);
			childQueries.forEach((child) => {
				child.classList.toggle("opened");
			});
		}
	})
);

//dropdowns
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

document.querySelectorAll(".notice-data").forEach((noticeDiv) => {
	noticeDiv.addEventListener("click", async () => {
		const imageId = noticeDiv.id;
		const response = await fetch(`/uploads/${imageId}`);
		const image = await response.blob();
		const imageUrl = URL.createObjectURL(image);

		const modal = document.createElement("div");
		modal.style.position = "fixed";
		modal.style.left = "0";
		modal.style.top = "0";
		modal.style.width = "100%";
		modal.style.height = "100%";
		modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
		modal.style.display = "flex";
		modal.style.justifyContent = "center";
		modal.style.alignItems = "center";
		modal.style.zIndex = "1000";

		const img = document.createElement("img");
		img.src = imageUrl;

		img.style.width = "90vw";
		img.style.height = "90vh";

		modal.appendChild(img);

		document.body.appendChild(modal);

		modal.addEventListener("click", () => {
			document.body.removeChild(modal);
		});
	});
});

let input = document.querySelector(".search input");

input.addEventListener("input", function () {
	let filter = input.value.toUpperCase();
	let notices = document.querySelectorAll(".notice-data");

	for (let i = 0; i < notices.length; i++) {
		let title = notices[i].querySelector("p").textContent;
		if (title.toUpperCase().indexOf(filter) > -1) {
			notices[i].style.display = "";
		} else {
			notices[i].style.display = "none";
		}
	}
});

input.addEventListener("input", function () {
	let filter = input.value.toUpperCase();
	let queries = document.querySelectorAll(".query-container");

	for (let i = 0; i < queries.length; i++) {
		let title = queries[i].querySelector(".title")?.textContent || "";
		let desc = queries[i].querySelector(".query-body")?.textContent || "";
		if (
			title.toUpperCase().indexOf(filter) > -1 ||
			desc.toUpperCase().indexOf(filter) > -1
		) {
			queries[i].style.display = "";
		} else {
			queries[i].style.display = "none";
		}
	}
});

function toggleLike(queryId) {
	const helpfulDiv = document.querySelector(`#comment-${queryId} .helpful`);
	const isLiked = helpfulDiv.classList.contains("liked");

	if (isLiked) {
		fetch(`/unlike_query/${queryId}`, {
			method: "POST",
		})
			.then((data) => {
				document.querySelector(
					`#comment-${queryId} .helpful`
				).innerText = `${data.likes} Found Helpful`;
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	} else {
		fetch(`/like_query/${queryId}`, {
			method: "POST",
		})
			.then((data) => {
				document.querySelector(
					`#comment-${queryId} .helpful`
				).innerText = `${data.likes} Found Helpful`;
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}
}
