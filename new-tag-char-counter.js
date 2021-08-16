// ==UserScript==
// @name           AO3: [Wrangling] Character Counter when Creating New Tags
// @description	   find out how long your tag is right as you put it in
// @version		   1.0.1
// @author		   Rhine
// @namespace	   https://github.com/RhineCloud
// @match		   *://*archiveofourown.org/tags/new
// @match          *://*archiveofourown.org/tags/*/edit
// @require		   https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @grant		   none
// @license		   GPL-3.0 <https://www.gnu.org/licenses/gpl.html>
// ==/UserScript==

(function($) {
    var page_url = window.location.pathname;
    var legend_sel = '#edit_tag [for="tag_syn_string_autocomplete"]';
    var field_sel = '#edit_tag #tag_syn_string_autocomplete';
    if (page_url.endsWith('/tags/new')) {
        legend_sel = '#new_tag [for="tag_name"]';
        field_sel = '#new_tag #tag_name';
    }
    var tag_length = 0;
    $(legend_sel).append('<span style="font-size:0.8em;">&nbsp; (tag&nbsp;length:&nbsp;' +
                         '<span class="counted_length">...</span>)</span>');
    $(field_sel).on('keyup', function() {
        var tag_input = $(this).val();
        if (tag_input) {tag_length = tag_input.length;}
        $('.counted_length').text(tag_length);
        if (tag_length > 100) {
            $(this).css({'color':'white',
                         'background-color':'darkred'});
        } else {
            $(this).css({'color':'#222',
                         'background-color':'honeydew'});
        }
    });
})(jQuery);
