// Active background color logic
const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        menuItems.forEach((menu) => {
            menu.classList.remove("bg-violet-400", "text-white");
        });
        item.classList.add("bg-violet-400", "text-white");
    });
});

// logic for right-bar content
const rightBar = document.querySelector(".right-bar");

async function loadPage(page){

    const response = await fetch(page);
    const html = await response.text();
    rightBar.innerHTML = html;
}