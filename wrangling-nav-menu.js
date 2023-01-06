// ==UserScript==
// @name        AO3: [Wrangling] Wrangling Navigation Menu
// @version     1.0
// @description Add a "Wrangling" dropdown menu to the navigation bar
// @author      Rhine
// @namespace   https://github.com/RhineCloud
// @match       https://*.archiveofourown.org/*
// @grant       none
// @license     GPL-3.0 <https://www.gnu.org/licenses/gpl.html>
// ==/UserScript==

(function($) {
    const username = document.getElementById("greeting").querySelector("a").href.split("/").pop();
    const navbar = document.querySelector("ul.primary.navigation.actions li.search");
    
    /* use // at the beginning of each line to toggle whether to include each item or not */
    const wranglingMenuItems = [
        {name: "Wrangling Home", path: `/tag_wranglers/${username}`},
        {name: "Wrangling Tools", path: "/tag_wranglings"},
        {name: "Wranglers", path: "/tag_wranglers"},
        {name: "Search Tag", path: "/tags/search"},
        {name: "New Tag", path: "/tags/new"},
        
        // {name: "Fandoms bin", path: "/tag_wranglings?show=fandoms"},
        {name: "Characters bin", path: "/tag_wranglings?show=characters"},
        {name: "Relationships bin", path: "/tag_wranglings?show=relationships"},
        // {name: "Freeforms bin", path: "/tag_wranglings?show=freeforms"},
        // {name: "Unsorted bin", path: "/unsorted_tags"}
    ];
    
    const wranglingMenu = document.createElement("li");
    wranglingMenu.className = "dropdown";
    wranglingMenu.innerHTML = `<a class="dropdown-toggle" href="/tag_wranglers/${username}" data-toggle="dropdown" data-target="#">Wrangling</a>
    <ul class="menu dropdown-menu" role="menu">
        ${wranglingMenuItems.map((item) => `<li role="menu-item"><a href="${item.path}">${item.name}</a></li>`).join("")}
    </ul>`;
    
    navbar.before(wranglingMenu);
})();
