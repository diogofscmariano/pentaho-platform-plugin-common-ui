define(['./TableBasedPromptLayoutComponent'], function(TableBasedPromptLayoutComponent){

    var VerticalTableBasedPromptLayoutComponent = TableBasedPromptLayoutComponent.extend({
      getMarkupFor: function(components) {
        var html = '';
        $.each(components, function(i, c) {
          var _class = this.getClassFor(c);
          // Assume components are contained in panels of components
          html += '<tr><td><div id="' + c.htmlObject + '"';
          if(_class) {
            html += ' class="' + _class + '"';
          }
          html += '></div></td></tr>';
        }.bind(this));
        return html;
      }
    });

    return VerticalTableBasedPromptLayoutComponent;
})
