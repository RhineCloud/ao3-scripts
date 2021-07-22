# ao3-scripts

As with other userscripts, just point the add-on you're using to the code file of the script you want.
[I've also put it on greasyfork, if you prefer to install from there.](https://greasyfork.org/en/scripts/428350-ao3-wrangling-find-the-tag-in-the-blurb)

## find-tag-in-blurbs

It compares each tag in a work blurb with the tag in the title of the page (optionally also with its child tags) and colours the ones that match.

There's a SETTINGS section at the beginning where you can change:
* The colours in which matched tags are marked in.
  * On install it's set to white text on an AO3 red background.
* Whether to mark the matching tags automatically or to add a "Mark plain uses" button next to the "Works" and "Bookmarks" etc. navigation buttons instead.
* If you want any child tags to be marked automatically, otherwise you'll get a "Check child tags and mark syns" button at the top of the page.
  * **If any of them is set to true it'll go request the tags landing page along with any works/bookmarks landing page of a canonical tag you open. This may hasten your journey into ao3jail ("Retry later").**

It may be worth noting that when a button uses "check" it means that it'll open the tags landing page, while if there's only "mark" it means that all the necessary data is available already.
