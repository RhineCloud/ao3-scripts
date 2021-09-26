# ao3-scripts

As with other userscripts, just point the add-on you're using to the code file of the script you want.

[I've also put them on greasyfork, if you prefer to install from there.](https://greasyfork.org/en/users/676543-rhine)

## find-tag-in-blurbs

It compares each tag in a work blurb with the tag in the title of the page (optionally also with its child tags) and colours the ones that match.

There's a SETTINGS section at the beginning where you can change:
* The colours in which matched tags are marked in.
  * On install it's set to white text on an AO3 red background.
* Whether to mark the matching tags automatically or to add a "Mark plain uses" button next to the "Works" and "Bookmarks" etc. navigation buttons instead.
* If you want any child tags to be marked automatically, otherwise you'll get a "Check child tags and mark syns" button at the top of the page.
  * **If any of them is set to true it'll go request the tags landing page along with any works/bookmarks landing page of a canonical tag you open. This may hasten your journey into ao3jail ("Retry later").**

It may be worth noting that when a button uses "check" it means that it'll open the tags landing page, while if there's only "mark" it means that all the necessary data is available already.

## new-tag-char-counter

Everytime you're done hitting your keys in the Tag Name field on the Create New Tag page or the Synonym of field on Tag Edit pages, it'll update a smol character counter placed right under the legend for the input fields.

It'll also make the colour of the input field change depending on how long your tag is.

## edit-tag-button-on-inbox-comments

Add an Edit Tag button to tag comments in your AO3 inbox, right next to the Reply button, making it much easier to reach the tag editing page to action them. (This also has the side-effect of making tag comments easier to spot.)

It also makes sure that other links to tags pages inside the comment itself lead to the edit pages.

## n-in-1 wrangling filters

Check out the separate [n-in-1 filters readme doc](https://github.com/RhineCloud/ao3-scripts/blob/main/n-in-1-filters-readme.md#n-in-1-wrangling-home-filters).
