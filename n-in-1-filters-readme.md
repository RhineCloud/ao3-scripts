# n-in-1 Wrangling Home Filter(s)
I wanted to filter for things like:
- Batfamily comics (and only comics) with unwrangled tags
- the Green Lantern fandoms that I deal with by myself that have unwrangled tags (while leaving the rest for my co-wranglers to deal with)
- films (and only films, no TV series) where I transliterate things from Cantonese
- all my fandoms with lots of unfilterable freeforms to look through for ro3-hunting
- I haven't dug around (my idiolect for playing the canon or OC game) in a while, let's do that

or most importantly
- where are the bins that I can look through quickly
- where are the dumpster fires

while also not needing to manually (re)set all the things each time I add/remove a group to be filtered on, so here we are. ~~Now I still need to edit ALL the things when [adding another extra separate filter](#adding-another-extra-separate-filter) category that I want to use parallel to the existing ones, but that's a lot better than needing to do so every time I add a new grouping already.~~

## Basic Setup
The very first step would be to install the script, either [from GitHub in this repository](https://github.com/RhineCloud/ao3-scripts) or over [from GreasyFork](https://greasyfork.org/en/users/676543-rhine).

On install, you should get a **[Prepare Unfiltered Table for Setup]** toggle along with some other filter toggles that are automatically set up. Clicking that will make sure that no filters are being applied and add a comma after each fandom canonical.

If you then hold the `Ctrl` key on Windows while dragging down along the column with the names of all your assigned fandoms, it'll select all the cells you went over. Copy this selection and paste it in the script code under `var my_fandoms`, replacing these lines that serve as examples:
```javascript
DCU, amt, dcu, co
DCU (Comics),,   DCU   ,   Co
Dead Rising (Video Games),
```
After you save the changes at this point, the script will recognise the fandoms and not consider them to be newly assigned to you anymore. If the fandom tag ends in a standard/unmodified disambig, it'll be recognised as that media type. The functions differentiating between solo- and co-wrangled fandoms will be disabled, since no fandoms would be marked as co-wrangled at this point.

Whenever you get fandom tags that are not in this list added to your Wrangling Home, a **[Newly Assigned]** toggle will appear. Once that filter is enabled, a **[Prepare These Fandoms for Setup]** toggle will show up, which will add a comma after each fandom tag without resetting the filters. You can then easily grab the new fandoms and add them to your existing fandoms.

After this, you can feed it with extra info on all your fandoms.

### Adding Extra Data About Your Fandoms
Each fandom with all the info associated with that fandom should have their own line (in singular).

The full base format is `Fandom Canonical, mediatype, source1 source2 etc, co?`.

(I've been calling the extra bit `source` since for my use it's mostly the franchises, publishers, genres, and original canon languages that I'm using this for, so basically extra info about the source of the fandom, but any way you want to group your fandoms works.)

Some examples:

```
DCU, amt, dcu, co
```
`DCU` is the fandom canonical, directly followed by a comma. `amt` as a media type means that it's an All Media Types fandom. It belongs to the `dcu` category, and is a `co`-wrangled fandom.

```
Pocket Monsters | Pokemon - All Media Types,,  pokemon  ,co
```
The fandom canonical ends with a standard media disambig, which the script can identify on its own, so there's no need to add `amt`. (But you _can_ add it anyway, in that case the `amt` from this line would overwrite the detected media type.) A full list of media types can be found at the bottom under the [Addendum: List with Media Types](#addendum-list-with-media-types).

Only the first comma **needs** to immediately follow after the fandom canonical, otherwise it won't get recognised as the end of the fandom tag. For the others, the number of spaces around each comma don't matter.

```
Dangan Ronpa - All Media Types,                                    , DANGANronpa ,co
Dangan Ronpa: Trigger Happy Havoc,                       videogame , danganronpa ,co
Dangan Ronpa Another Episode: Ultra Despair Girls,       ViDeOgAmE , danganRONPA ,cO
Super Dangan Ronpa 2,                                    VideoGame , DanganRonpa ,co
Dangan Ronpa 3: The End of 希望ヶ峰学園 | The End of Kibougamine Gakuen | End of Hope's Peak High School, Anime, DanganRonpa, co
New Dangan Ronpa V3: Everyone's New Semester of Killing, VIDEOGAME , DANGANRONPA ,CO
```
While the fandom canonicals are case sensitive, the other parts aren't. You can use whatever style of capitalisation works for you; as long as things are spelled the same, they'll end up in the same filter.

```
Kingdom Hearts (Video Games), , disney finalfantasy crossover, co
```
One fandom can be assigned to multiple sources, each source being separated by a space (or multiple spaces, like with the later commas their number doesn't matter here).

```
Green Lantern - All Media Types, , greenlantern, co
Green Lantern (2011), , greenlantern, solo
Green Lantern (Comics), ,greenlantern, co
Green Lantern Corps (Comics), ,greenlantern, haha
Green Lantern: Emerald Knights, animatedfilm, greenlantern
Green Lantern: First Flight (2009), animatedfilm, greenlantern,
Green Lantern: Legacy (DC Comics 2020), comic, greenlantern, co
```
If a fandom is not specified to be `co`-wrangled, it'll be assumed that it's solo-wrangled. If you'd rather have this information in the list, you can add `solo` at the end of each line in place of `co`, or you can use any other text you fancy. You can also just skip any mention of that altogether, not even necessarily keeping the final comma that'd go before `co`.

`animatedfilm` is a somewhat special media type that - unlike on the archive - gets assigned to both `cartoon` and `movie` instead. The other media type where something like this happens is `animanga`, for fandom tags that hold both their `anime` and `manga` fandoms.

`(DC Comics 2020)` is not a standard media disambig, so it won't get recoginsed, which is why it needs to be manually assigned to `comic` before it'll show up in that media filter.

```
Llamas with Hats (Web Series),
Norse Mythology - Neil Gaiman, book
```
You only really need to keep the fandom canonical and the comma `,` that immediately follows after that for the script to be able to recognise it as a "known" fandom.

Since the first of this pair of examples ends in `(Web Series)`, the script can automatically add `webseries` as the media type, while in the second example it's manually set to be `book`. And with no data that follows after that, it'll automatically make them show up in the `other` source filter and assume that they're solo-wrangled fandoms.

### Default Settings
Some other settings to help adjusting some of the filters to your needs.
- `uppercase_in_toggles`: When set to `true`, the toggles will have Upper Case Initials; pre-defined media types that are acronyms will be rendered in ALL CAPS. `false` will keep all toggle text in lower case (unless you're manually changing the toggle text in the code.)
- `few_char_max`, `few_rel_max`, and `few_ff_max`: They define the thresholds for the filter setting where all the fandoms with only a "few" unwrangled tags are listed. Set (one of) these to `0` to disable this particular filter.
  - This will also affect which fandoms will show up as having unwrangled tags to dig in (more than a "few" chars/rels), which will be disabled if both the values for chars and rels are set to `-1`, and which will show up as having unwrangled tags to shovel (more than a "few" freeforms), which can be disabled by setting `few_ff_max` to `-1`.
- `many_char_min`, `many_rel_min`, and `many_ff_min`: The define the thresholds for what I call the "dumpster fire" filter setting. If there are more than these numbers of unwrangled tags in either category, it's a dumpster fire. Set all three to `-1` if you want to disable this.
- `ro3_min`: The minimum size of an unfilterable freeforms bin where you feel it's worth checking for possible ro3's. Set this to `0` if you want all fandoms with tags in the unfilterable freeforms bin, or to `-1` if you don't want this function at all.
- `filter_media`: Which media type filter you want to have applied automatically after a page is loaded. Set this to `-all` if you want to keep all the media types (not to be confused with all AMTs (and ` & Related Fandoms`), which would use the `amt` setting here.)
- `filter_source`: If you want to start with only seeing the fandoms in one specific _source_ group on your Wrangling Home set it to that. `-all` will make it not apply any filter at this stage.
- `filter_fandom`: Check the list with all the General Filters for settings that you can apply here.

#### General Filters
- `all-fandoms`
  - no filtering, all fandoms (that are not hidden by other filters) will show up
  - corresponds to the **Wrangling Status:** toggle on the page
- `few-uw`
  - fandoms with a "few" unwrangled tags, bins that should be fairly quick to clean up
  - corresponds to the **[Quickies]** toggle
- `some-digging`
  - fandoms with more than a "few" unwrangled chars and/or rels, may require some digging/rounds of canon or OC
  - corresponds to the **[Digging]** toggle
- `some-shoveling`
  - fandoms with more than a "few" unwrangled freeforms, can probably be shoveled in
  - corresponds to the **[Shoveling]** toggle
- `many-uw`
  - fandoms with a lot of unwrangled tags, in either category; aka dumpster fires
  - corresponds to the **[Dumpster Fires]** toggle
- `solo-unwrangled`
  - solo-wrangled (or at least not noted as co-wrangled) fandoms with unwrangled tags
  - corresponds to the **[Solo-unwrangled]** toggle
- `co-unwrangled`
  - co-wrangled fandoms with unwrangled tags
  - corresponds to the **[Co-unwrangled]** toggle
- `has-uw`
  - all the fandoms with unwrangled tags
  - corresponds to the **[All Unwrangled]** toggle
- `solo-ro3`
  - solo-wrangled fandoms with sizable unfilterable freeform bins to do a ro3-hunt in
  - _corresponds to the **[Solo-Ro3]** toggle (toggle is hidden by default)_
- `co-ro3`
  - co-wrangled fandoms with enough unfilterable freeforms to go ro3-hunting in
  - _corresponds to the **[Co-Ro3]** toggle (toggle is hidden by default)_
- `ro3-hunting`
  - all the fandoms with enough unfilterable freeforms
  - corresponds to the **[Ro3-hunting]** toggle
- `solo-wrangled`
  - all the solo-wrangled/not specifically noted as co-wrangled fandoms
  - _corresponds to the **[Solo-wrangled]** toggle (toggle is hidden by default)_
- `co-wrangled`
  - all the co-wrangled fandoms
  - _corresponds to the **[Co-wrangled]** toggle (toggle is hidden by default)_
- `new-catch`
  - fandoms that aren't included in the my_fandoms list at the top of the settings
  - corresponds to the **[Newly Assigned]** toggle

## More Customisations
Some things that you can adjust that are not simple edits in the `SETTIMGS` section at the top of the code like the above. The first couple things are doable without really digging into the code. The further down something is, the more complex it gets.

It helps if you start in the same "layer" as the other examples that are already in the code (that you are free to remove if you want to).

### (Un)Hide a Toggle
Find the line with the `// remove the toggles that you don't want to filter on` comment, and add a new line to hide another toggle. Start the new line with `remove_option('`, then add the kind of filter this toggle belongs to - `media` for media types, `source` for sources, or `fandom` for the general filters listed above. After that, continue the line with `', '` and add the specific toggle name. For `fandom` toggles they're the ones listed above as [General Filters](#general-filters) formatted as `code`, for `media` they're the ones in `code` format listed at the bottom under [Addendum: List with Media Types](#addendum-list-with-media-types). For `source` toggles, use whatever you entered under `my_fandoms`. Finish the line with a `');` and you're done.

The finished line will look something like this:
```javascript
remove_option('source', 'arkhamverse');
```

There are a whole lot of examples in the code already, you can use them as a pattern.

To unhide a toggle, find the line in which they're getting hidden and either turn that line into a comment by adding two slashes `//` at the beginning of the line, or delete the line entirely. (If no fandoms fulfill the conditions of a filter setting, the toggle for that setting won't show up in the first place.)

### Change the Toggle Text
While most toggles will use whatever you entered at the top in my_fandoms as the text that'll show up will the toggle on your wrangling home, you can manually (re-)assign that. Just insert each block with one assignment after the `// you can manually set what a specific source toggle is supposed to say here` comment line. A block ends with a `break;` line, and the next block begins with the next `case`.

As an example, this block will make the toggle for the `en` source show up as **[English]** on your page:
```javascript
case 'en':
    toggle_html = toggle_html + '[English]';
    break;
```
You can replace the parts between the apostrophes `'` with whatever suits your purposes.

For `// acronyms in ALLCAPS` when `uppercase_in_toggles` is enabled there's a separate section.

### Manually Rearrange the Toggle Order
By default, the `media` and the `source` filter toggles are listed in alphabetical order, though the `other` source filter setting is manually pushed to the end.

To make the script `// find a specific toggle to put at the end instead`, we use a `moving_toggle_index` to help move things along (in a way that keeps the code somewhat easier readable).

```javascript
if (source_options_count > 2 && source_options.includes('other')) {
    moving_toggle_index = source_options.indexOf('other');
    source_options.splice(moving_toggle_index, 1);
    source_options.push('other');
}
```
In this example, if there are enough `source` options to make re-sorting them possibly sensible and there are actually fandoms that'd show up under the `other` source filter, it'll use the `moving_toggle_index` to remember where the `other` is in the alphabetically sorted list. Once the script knows where it is, it'll remove the option in that spot, and then add `other` back in at the end of the list.

You may, for some reason, want to `// manually assign the order` of all the toggle options, in which case you can look to the way the [General Filters](#general-filters) (in the code as `fandom_options`) get (re)arranged.

### Apply Extra (Meta)Soures when Applying Specific (Sub)Sources
For these, insert each block of code after the `// you can manually define meta/parent sources here` comment line. Each block ends with a `break;` line, and the next block begins with the next `case`.

#### Assign 1 Metasource to 1 Subsource
You have a somewhat generic source (in this example `squeenix`) as well as a more specific one (`finalfantasy`) where everything with `finalfantasy` should also be included in `squeenix`, but not all `squeenix` things are `finalfantasy`.

As a tag structure this would approximately be like this:
- `squeenix`
  - `finalfantasy`

The code to automatically assign `squeenix` to all `finalfantasy` looks like this: (the indentations are optional but tend to help with keeping things readable)
```javascript
case 'finalfantasy':
    if (!source_options.includes('squeenix')) {
        source_options.push('squeenix');
    }
    class_text = class_text + ' ' + class_type + 'squeenix';
    break;
```
In `case 'finalfantasy':` it checks that the source in question is, indeed, `finalfantasy`.

`if (!source_options.includes('squeenix'))` checks whether `squeenix` is already included in the list of source filters that are available. (This check would already have happened with `finalfantasy` further up above in the code.)

`source_options.push('squeenix');` adds `squeenix` to the list of source filters if it isn't there yet.

`class_text = class_text + ' ' + class_type + 'squeenix';` then adds `squeenix` onto the classes that will be assigned, and `break;` ends this entire block.

You can replace the text between the apostrophes `'` with whatever combination suits your purposes.

#### Assign 1 Metasource to Multiple Subsources
Sometimes, you have structures like this:
- `dcu`
  - `batman`
  - `justiceleague`
  - `superman`
  - `teentitans`
  - `wonderwoman`
  - `youngjustice`

In this case, you can stack multiple "sub" sources together in one block, since only the part where it checks what the source is differs:
```javascript
case 'batman':
case 'justiceleague':
case 'superman':
case 'teentitans':
case 'wonderwoman':
case 'youngjustice':
    if (!source_options.includes('dcu')) {
        source_options.push('dcu');
    }
    class_text = class_text + ' ' + class_type + 'dcu';
    break;
```

#### Assign Multiple Metasources to 1 Subsource
`srw` is a `mecha` franchise published by `bandainamco`, so there's both
- `mecha`
  - `srw`

and
- `bandainamco`
  - `srw`

So it'd make sense to assign both, one after the other, in one block under one source check.
```javascript
case 'srw':
    if (!source_options.includes('mecha')) {
        source_options.push('mecha');
    }
    class_text = class_text + ' ' + class_type + 'mecha';
    if (!source_options.includes('bandainamco')) {
        source_options.push('bandainamco');
    }
    class_text = class_text + ' ' + class_type + 'bandainamco';
    break;
```

#### Adding More Extra Layers
Sometimes fandom structures/groupings are horrible and you end up with something like
- `nintendo`
  - `mario`
  - `pokemon`
    - `pkmnmaingames`

while also having
- `jrpg`
    - `pkmnmaingames`

For this particular setup, only `pkmnmaingames` is under `jrpg`, but through `pokemon` also ends up on the `nintendo` tree.

You can solve this by having one block for `pkmnmaingames` specifically, separate from the others where you add `jrpg` and `pokemon` and `nintendo`, or you can make multiple layers, like this: (drawing diagrams tends to help with figuring this out)
```javascript
case 'pkmnmaingames':
    if (!source_options.includes('jrpg')) {
        source_options.push('jrpg');
    }
    class_text = class_text + ' ' + class_type + 'jrpg';
    if (!source_options.includes('pokemon')) {
        source_options.push('pokemon');
    }
    class_text = class_text + ' ' + class_type + 'pokemon';
case 'pokemon':
case 'mario':
    if (!source_options.includes('nintendo')) {
        source_options.push('nintendo');
    }
    class_text = class_text + ' ' + class_type + 'nintendo';
    break;
```

## Adding a Media Type
Knowing myself (and the number of times I've gone over this whole thing so far) it'll be helpful to at the very least keep a list of things to go through whenever adding/changing/removing a mediatype. Full, current list is under [Addendum: List with Media Types](#addendum-list-with-media-types)

### Detect a Media Type
The first step here is for the script to `// use the fandom name to try to detect the media type`, followed by a couple `(else) if` statements. These here are case sensitive.

Add another `else if` statement if the disambig to be identified isn't in parentheses `()`. If the disambigging ending isn't a fandom tag in its own right (like `RPF`), include a space before the term for better accuracy.

If the disambig _is_ inside a pair of parentheses, add a new `case ... break;` sequence down below under `switch (fandom_disambig)`. The `fandom_disambig` is the entirety of the text between the parentheses, not including the parentheses. It may be helpful to check for variations of the disambig, in particular if it's also being used in plural. (Or like `Webseries` and `Web Series`, where different formats are still in use. For tag search, using `*(*[mediatype]*)` as a search string will summon the gross majority of them. Note to self: If it returns less than half a page of results, it's probably not absolutely necessary to add it.)

The `default` case checks if it's a four-digit number instead (usually a movie with a `YEAR` being used as the disambig), otherwise the `detected_media` is left blank/undefined.

### Add the Media Type to a (Meta)Media Type
Pretty much the same as how to [Apply Extra (Meta)Sources when Applying Specific (Sub)Sources](#apply-extra-metasources-when-applying-specific-subsources), but further down under `case 'media':` instead. And using a slightly different format to keep the lines a bit shorter, but are kinda more prone to having undetected typos.

Notes on exceptions:
- `animanga` gets replaced with `anime` and `manga` (under `m-eastasiancomic`)
- `band` and `musician` are under both `music` and `rpf`
- `shortfilm` goes under `movie` instead of `other`
- `asmr`, `dramacd`, `podcast`, and `radio` are under `audio`, which not under `other` now
  - use `//` to turn the `break;` after that into a comment and remove the `//` before `case 'audio':` that comes after to put them under `other` again
-`webseries` has also been pulled out from under `other` via `//` before `case 'webseries':` 

### Adjust the Toggle Text
Same as how to [Change the Toggle Text](#change-the-toggle-text), but with some extra `if` statements to account for `uppercase_in_toggles`. First there's a `switch` for acronyms, then tere are separate sections for toggle text being very different from class names, only use an acronym when in upper case, where it's actually two words in the class name (grouped by what the second word is so that all the " Games" and " Novels" can be stacked together), where the plural form is identical or doesn't even exist, and where the plural uses `-es`, instead of the `-s` that's set as default.

### New Media Type is a "Hidden" Media Type
Very much the same as how to [(Un)Hide a Toggle](#unhide-a-toggle), but best to double-check that whatever you're hiding will still show up as part of some other "meta"mediatype.

## Adding Another Extra Separate Filter
You know what would be fun? Having a language filter separate from the others that I can use in parallel with everything else. (Given my poking through so far I don't actually _need_ this to be separate from `source`, but giving it a separate menu will keep them easier to find, so.) This will mostly just be a checklist of things to go through.

I'm going to name this filter `lang`, but pretty much anything that is not one of the existing filter/menu names (`media`, `source`, `fandom`; `reset`, `setup`, `addnew`) should work.

### Things to Have Prepped Before the Script Starts Checking Each Fandom
1. If the info is intended to be listed before the `co`-wrangling status in `my_fandoms`, adjust the number of commas of the fandoms listed in there as needed.
2. Add `filter_lang` as a setting under the `// default filters`.
3. Start a `lang_options` array as one of the `// lists to keep track of all the different options`, with `'-all'` as the first array element.

### Include the Filter in the Checking Process
The script will `// go through all the fandoms`, checking each one. This set of things should happen within the `assigned_fandoms.each(function() {...});` part
1. If you want to have a default assignment/track if something has been assigned, insert a boolean where the script is to `// add soem classes based on my_fandoms data`, before the `switch` begins.
2. If the new filter data isn't being listed at the end of each line in `my_fandoms`, add 1 to the `case` and `fandom_ref` index of each thing that comes after.
3. Insert the `case n:` for the new filter, with `n` being the (minimum) length of the `fandom_ref` that may possibly have this data.
4. Make a trimmed copy of what `this_lang` is for ease of use; the index of this in `fandom_ref` is 1 smaller than its (minimum) length.
5. Generate the `lang_class` to be added after checking if there is any data in `this_lang` from `fandom_ref` and using the `get_classes()` function, and add the class to `$(this)` element.
  1. If there'd be a default value that wouldn't be needed to be assigned anymore at this point, change the tracking boolean here.
  2. If this is one where multiple things may have been entered in `my_fandoms` at once, look to `// add source classes` on how to loop through them all.
6. DO **NOT** END THIS `case` WITH A `break;`
7. If you want a default class assigned, check the tracker boolean **after** the `switch` to see if something has been added already, and add the default class if not.
8. If it's something to do with the tag numbers, the UF/UW checks on happen after this point.

9. Go edit the `get_classes()` function so that it knows which list of options to add this new thing to.
  1. If this is a filter where (in some cases) there may be "meta"classes to be assigned along with the specific "sub"class, you'll need an extra `switch (class_class)` under the `case` for the new filter.
  2. You may want to include a `case '':` for `switch (class_class)` to assign the default class to, just in case.

### Add the Filter Menu with All the Toggles
1. You may want to [(Un)Hide a Toggle](#unhide-a-toggle) before generating all the HTML.
2. Have it `// find out how many options are left` and `// sort the options in alphabetical order` (or [Manually Rearrange the Toggle Order](#manually-rearrange-the-toggle-order)).
3. Make the script `// generate the html for the filter menus where it makes sense to have one` by checking how many options i needs to have at minimum to be sensible and adding to `filters_html` (with the `get_menu_html()` function) and `filters_count` if so. The order here matters.
4. Add a new `case` with a new `for` loop for the new filter in the `get_menu_html()` function. Don't forget to `break;` this `case` at the end.
5. If the toggle text differs from the filter name for the `-all` option, or any of the things put into the `my_fandoms` list, start a new `case` under `switch (toggle_type)` to [Change the Toggle Text](#change-the-toggle-text).
6. Then, `// add the stuff that makes the toggles do the thing when clicked` with a loop. The order here doesn't actually matter.
7. Add a `case` in the `add_toggle()` function so that it knows which filter setting to update, as well as to set it back to `-all` in the `default:` (`reset`) case.
8. Add to the sequence of `if` statements on what `to_hide` in the `refresh_table()` function, as well as further below with the selectors for the two `css()`.

## Addendum: List with Media Types
These are based on what's in the [Fandom Wrangling Guidelines](https://archiveofourown.org/wrangling_guidelines/4) and whatever else I found on a quick skim through fandom tags.

They're listed in alphabetical(-ish) order and formatted as follows:
- (meta) `mediatype` as [corresponding toggle]
  - disambig(s) the script will identify as this (meta)mediatype on its own
  - (sub) `mediatype`
    - disambig(s) the script will identify as this (sub)mediatype

The ones listing two different toggles change the text based on your `uppercase_in_toggles` setting, otherwise the difference is only in if there are upper case initials and ALL CAPS for acronyms, or if everything is in lower case.

The toggles in _italics_ are hidden by default, but can be made to appear again with some simple edits to the code, as explained under [(Un)Hide a Toggle](#unhide-a-toggle).

- `amt` as [AMTs]
  - \- All Media Types, & Related Fandoms
- `anime` as [Anime]
  - (Anime), _(Anime & Manga)_
- `audio` as [Audio]
  - (Big Finish Audio)
  - `asmr` as _[ASMR]_
  - `dramacd` as _[Drama CDs]_
    - (Drama CD)
  - `podcast` as _[Podcasts]_
    - (Podcast)
  - `radio` as _[Radio]_
    - (Radio), (Radio Show), (BBC Radio)
- `cartoon` as [Cartoons]
  - (Cartoon), (Cartoons)
- `comic` as [Comics]
  - (Comic), (Comics)
  - `bede` as _[BDs] or [bédés]_
    - (Bande Dessinée)
  - `graphicnovel` as _[Graphic Novels]_
    - (Graphic Novel), (Graphic Novels)
  - `webcomic` as _[Webcomics]_
    - (Webcomic)
- `literature` as [Literature]
  - `book` as _[Books]_
  - `fairytale` as _[Fairly Tales]_
    - (Fairy Tale)
  - `lightnovel` as _[Light Novels]_
  - `poem` as _[Poems]_
    - (Poem)
  - `rellore` as [Religion & Lore]
    - Folklore, Lore, Mythology, Religion, Traditions, (Folklore)
- `m-eastasiancomic` as [漫画] (the `m-` is for sorting purposes)
  - `manga` as _[Manga]_
    - (Manga), _(Anime & Manga)_
  - `manhua` as _[Manhua]_
    - (Manhua)
  - `manhwa` as _[Manhwa]_
    - (Manhwa)
- `movie` as [Movies]
  - (Movie), (Movies), (`YEAR`)
  - `shortfilm` as _[Short Films]_
  - (Short Film), (Short Films)
- `music` as [Music]
  - `album` as _[Albums]_
    - (Album), (Albums)
  - `band` as [Bands]
    - (Band)
  - `musicvideo` as _[MVs] or [music videos]_
    - (Music Video), (Music Videos)
  - `musician` as [Musicians]
    - (Musician), (Musicians)
  - `song` as _[Songs]_
    - (Song), (Songs)
- `other` as [Other]
  - `anthro` as _[Anthro]_
    - (Anthropomorphic)
  - `arg` as _[ARGs]_
    - (Alternate Reality Game)
  - `attraction` as _[Attractions]_
    - (Attraction)
  - `blog` as _[Blogs]_
    - (Blog), (Blog Post), (Tumblr), (Twitter)
  - `boardgame` as _[Board Games]_
    - (Board Game), (Board Games)
  - `cardgame` as _[Card Games]_
    - (Card Game), (Card Games)
  - `commercial` as _[Commercials]_
    - Commercial, Commercials
  - `interactive` as _[IF]_
    - (Interactive Fiction)
  - `roleplay` as _[Roleplays]_
    - (Roleplay)
  - `rpg` as _[RPGs]_
    - (Roleplaying Game), (RPG), (Tabletop RPG)
  - `sketch` as _[Sketches]_
  - `toy` as _[Toys]_
- `rpf` as [RPF]
  - RPF
  - `band` as [Bands]
  - (Band)
  - `musician` as [Musicians]
  - (Musician), (Musicians)
- `theater` as [Theater]
  - `ballet` as _[Ballet]_
  - `musical` as _[Musicals]_
  - `opera` as _[Operas]_
  - `stageplay` as _[Stageplays]_
- `tvshow` as [TV Shows]
  - (TV), (Live Action TV)
- `videogame` as [Video Games]
  - (Video Game), (Video Games)
  - `visualnovel` as [Visual Novels]
    - (Visual Novel), (Visual Novels)
- `webseries` as [Web Series]
  - (Web Series), (Webseries)
