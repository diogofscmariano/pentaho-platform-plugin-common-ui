define(['./CompositeComponent'], function(CompositeComponent){
  var PanelComponent = CompositeComponent.extend({
    getClassFor: function(component) {
      return undefined;
    },

    getMarkupFor: function(component) {
      var _class = this.getClassFor(component);
      var html = '<div id="' + component.htmlObject + '"';
      if (_class) {
        html += ' class="' + _class + '"';
      }
      html += '></div>';
      return html;
    }
  });

  return PanelComponent;
})
