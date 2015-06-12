define(['./PromptLayoutComponent'], function(PromptLayoutComponent){

    var TableBasedPromptLayoutComponent = PromptLayoutComponent.extend({
      buildComponentCell: function(c) {
        return "<td align='left' style='vertical-align: top;'><div id='" + c.htmlObject + "'></div></td>";
      },

      getMarkupFor: function(components) {
        throw 'TableBasedPromptLayoutComponent should not be used directly.';
      },

      updateInternal: function() {
        var html = '<table cellspacing="0" cellpadding="0" class="parameter-container" style="width: 100%;">';
        html += '<tr><td><div><table cellspacing="0" cellpadding="0">';

        html += this.getMarkupFor(this.components);

        return html + '</table></div></td></tr></table>';
      }
    });

    return TableBasedPromptLayoutComponent;
})
