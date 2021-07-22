// ==UserScript==
// @name         AO3: [Wrangling] Find the Tag in the Blurb
// @namespace    https://github.com/RhineCloud
// @version      1.0.1
// @author       Rhine
// @description  go through work blurbs and mark the tags that match the big one in the heading
// @include      *://*archiveofourown.org/tags/*
// @include      *://*archiveofourown.org/works?*tag_id=*
// @include      *://*archiveofourown.org/bookmarks?*tag_id=*
// @exclude      *://*archiveofourown.org/tags/*/wrangle*
// @exclude      *://*archiveofourown.org/tags/*/edit
// @exclude      *://*archiveofourown.org/tags/*/comments*
// @exclude      *://*archiveofourown.org/tags/*/troubleshooting*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @grant        none
// @license      GPL-3.0 <https://www.gnu.org/licenses/gpl.html>
// ==/UserScript==


// SETTINGS //
// how you want the matching tags to be emphasised
var text_colour = '#fff';
var background_colour = '#900';

// whether to automatically mark plain uses
var auto_mark_tag = true;

// whether to automatically mark various child tags
// setting any of these as "true" may land you in ao3jail ("Retry later") faster than usual
// but setting all three (3) as "true" won't get you in there faster than only setting one (1) as "true"
var auto_mark_syns = false;
var auto_mark_subs = false;
var auto_mark_rels = false;

// END OF SETTINGS //


// HERE'S WHERE THE MAGIC HAPPENS //
(function($){
  // getting some info from the page
  var page_url = window.location.pathname;
  var is_filterable = false;
  var tag_name = '';

  if (page_url.includes('/works') || page_url.includes('/bookmarks')) {
    is_filterable = true;
  }
  if (is_filterable) {
    tag_name = $('h2.heading a').text();
  } else {
    tag_name = $('h2.heading').text();
  }
  
  // check if there are even any blurbs on the page before trying to match anything
  if ($('li.blurb').length) {
    // some functions to help the entire process
    // adding various buttons
    function add_button(button_id_to_add) {
      var button_html = '<ul class="navigation actions" role="navigation"><li><a id="' + button_id_to_add + '">';
      switch (button_id_to_add) {
        case 'mark_tag':
          button_html = button_html + 'Mark plain uses';
          break;
        case 'check_syns':
          button_html = button_html + 'Check child tags and mark syns';
          break;
        case 'mark_syns':
          button_html = button_html + 'Mark synonyms';
          break;
        case 'mark_subs':
          button_html = button_html + 'Mark subtag canonicals';
          break;
        case 'mark_rels':
          button_html = button_html + 'Mark rel canonicals with this char';
              break;
        default:
          button_html = button_html + 'An Erroneous Button';
      }
      button_html = button_html + '</a></li></ul>';
      $('div[id="main"] ul.navigation:has(span.current)').append(button_html);
    }
    // removing buttons
    function remove_button(button_id_to_remove) {
      let button_to_remove = ':has(a[id="' + button_id_to_remove + '"])';
      $('ul.navigation li').remove(button_to_remove);
    }
    // only select tags of the same category if the tag category is known
    function get_selector(tag_category) {
      var selector = 'li.blurb';
      switch (tag_category) {
        case 'fandoms':
          selector = selector + ' h5.' + tag_category;
          break;
        case 'characters':
        case 'relationships':
        case 'freeforms':
          selector = selector + ' li.' + tag_category;
          break;
        default:
          selector = selector;
      }
      selector = selector + ' a.tag';
      return selector;
    }
    // enter what kind of blurb tags to compare to what reference tag(s)
    // and it'll change the appearance of the matching blurb tags
    function match_tags(tag_selector, reference) {
      // reference tags are child tags
      if (Array.isArray(reference)) {
        $(tag_selector).each(function(arrayindex, arrayelement) {
          for (let i = 0; i < reference.length; i++) {
            if ($(this).text() == reference[i]) {
              $(this).css({
                'color': text_colour,
                'background-color': background_colour
              });
              break;
            }
          }
        });
      } else {
        // reference tag is just the one in the heading
        $(tag_selector).each(function(tagindex, tagelement) {
          if ($(this).text() == reference) {
            $(this).css({
              'color': text_colour,
              'background-color': background_colour
            });
          }
        });
      }
    }

    // automatically mark plain uses...
    if (auto_mark_tag) {
      match_tags('li.blurb a.tag', tag_name);
    } else {
      // ...or add a button to do so on click
      add_button('mark_tag');
      $('a[id="mark_tag"]').on('click', function() {
        $('a[id="mark_tag"]').innerHTML = 'Looking for uses...';
        match_tags('li.blurb a.tag', tag_name);
        remove_button('mark_tag');
      });
    }

    // do some more extra stuff if it's a works/bookmarks landing page
    if (is_filterable) {
      // things to be looked up on the tags landing page
      var tag_cat = '';
      var syns = [];
      var subs = [];
      var rels = [];

      // function to grab the data from the tags landing page
      // and do some matches already or add buttons for those
      function set_children(synmatching, submatching, relmatching) {
        var tag_url = $('h2.heading a').attr('href');
        // open the tags landing page
        $.get(tag_url, function(response) {
          // determine tag category of the canonical
          var tag_description = $(response).find('div.tag.home.profile > p').text().split('.');
          tag_cat = tag_description[0].slice(24, -9);
          switch (tag_cat) {
            case 'Fandom':
              tag_cat = 'fandoms';
                break;
            case 'Character':
              tag_cat = 'characters';
              break;
            case 'Relationship':
              tag_cat = 'relationships';
              break;
            case 'Additional Tags':
              tag_cat = 'freeforms';
              break;
            default:
              tag_cat = '';
          }
          var tag_select = get_selector(tag_cat);

          // grab the syns
          $(response).find('div.synonym a.tag').each(function(syn_index, syn_element) {
            syns[syns.length] = $(this).text();
          });
          // grab the subtags
          $(response).find('div.sub a.tag').each(function(sub_index, sub_element) {
            subs[subs.length] = $(this).text();
          });
          // if it's a character tag, grab the connected relationships
          if (tag_cat == 'characters') {
            $(response).find('div.relationships a.tag').each(function(rel_index, rel_element) {
              rels[rels.length] = $(this).text();
            });
          }
          
          // if there are any syns...
          if (syns.length) {
            // ...match syns right after...
            if (synmatching) {
              match_tags(tag_select, syns);
            } else {
              // ...or add a button to do so on click
              add_button('mark_syns');
              $('a[id="mark_syns"]').on('click', function() {
                $('a[id="mark_syns"]').innerHTML = 'Marking syns...';
                match_tags(tag_select, syns);
                remove_button('mark_syns');
              });
            }
          }
          // if there are any subtags...
          if (subs.length) {
            // ...match subtags right after...
            if (submatching) {
              match_tags(tag_select, subs);
            } else {
              // ...or add a button to do so on click
              add_button('mark_subs');
              $('a[id="mark_subs"]').on('click', function() {
                $('a[id="mark_subs"]').innerHTML = 'Marking subtag canonicals...';
                match_tags(tag_select, subs);
                remove_button('mark_subs');
              });
            }
          }
          // if it's a char canonical with rels attached...
          if (tag_cat == 'characters' && rels.length) {
            var rel_select = get_selector('relationships');
            // ...match rels right after if it's a char tag...
            if (relmatching) {
              match_tags(rel_select, rels);
            } else {
              // ...or add a button to do so on click
              add_button('mark_rels');
              $('a[id="mark_rels"]').on('click', function() {
                $('a[id="mark_rels"]').innerHTML = 'Marking rel canonicals...';
                match_tags(rel_select, rels);
                remove_button('mark_rels');
              });
            }
          }
        });
      }

      // start the tags landing page check for child tags on its own...
      if (auto_mark_syns || auto_mark_subs || auto_mark_rels) {
        set_children(auto_mark_syns, auto_mark_subs, auto_mark_rels);
      } else {
        // ...or add a button to do the check while matching syns
        add_button('check_syns');
        $('a[id="check_syns"]').on('click', function() {
          $('a[id="check_syns"]').innerHTML = 'Checking tags page and marking syns...';
          set_children(true, false, false);
          remove_button('check_syns');
        });
      }
    }
  }
})(jQuery);
