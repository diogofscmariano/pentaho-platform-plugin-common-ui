define(['./TableBasedPromptLayoutComponent'], function(TableBasedPromptLayoutComponent){


    var HorizontalTableBasedPromptLayoutComponent = TableBasedPromptLayoutComponent.extend({
      getMarkupFor: function(components) {
        var html = '<tr>';
        $.each(components, function(i, c) {
          var _class = this.getClassFor(c);
          // Assume components are contained in panels of components
          html += '<td align="left" style="vertical-align: top;"><div id="' + c.htmlObject + '"';
          if(_class) {
            html += ' class="' + _class + '"';
          }
          html += '></div></td>';
        }.bind(this));
        return html + '</tr>';
      }
    });

    return HorizontalTableBasedPromptLayoutComponent;

})
