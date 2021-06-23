// ==UserScript==
// @name         AO3: [Wrangling] Find the Tag in the Blurb
// @namespace    https://github.com/RhineCloud
// @version      0.1
// @author       Rhine
// @description  emphasise the tag in big at the top of a page in work blurbs
// @include      *://*archiveofourown.org/tags/*
// @exclude      *://*archiveofourown.org/tags/*/wrangle*
// @exclude      *://*archiveofourown.org/tags/*/edit
// @exclude      *://*archiveofourown.org/tags/*/comments*
// @exclude      *://*archiveofourown.org/tags/*/troubleshooting*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @grant        none
// @license      GPL-3.0 <https://www.gnu.org/licenses/gpl.html>
// ==/UserScript==

(function($) {
    var page_path = window.location.pathname;
    var page_type = "";
    var tag_name = "";

    // determine if works/bookmarks/tags landing page
    if (page_path.includes("/works")) {
        page_type = "works";
    } else if (page_path.includes("/bookmarks")) {
        page_type = "bookmarks";
    } else {
        page_type = "tags";
    }

    // get the tag name in the heading
    if (page_type == "works" || page_type == "bookmarks") {
        tag_name = $("h2.heading a").text();
    } else if (page_type == "tags") {
        tag_name = $("h2.heading").text();
    }

    // find the matching tag in each blurb and make it pop in colour
    $("li.blurb a.tag").each(function(index, element) {
        if ($(this).text() == tag_name) {
            $(this).css({
                "color": "#fff",
                "background-color": "#900"
            });
        }
    });
})(jQuery);
