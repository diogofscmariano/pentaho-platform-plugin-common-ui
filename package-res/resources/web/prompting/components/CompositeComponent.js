define(['cdf/components/BaseComponent'], function(BaseComponent){

  /**
   * This is a component that contains other components and can optionally wrap all components in a
   * &lt;fieldset&gt; to provide a title for the container.
   */
  var CompositeComponent = BaseComponent.extend({
    components: undefined, // array of components

    executeAtStart: true,

    getComponents: function() {
      return this.components;
    },

    clear: function() {
      if(this.components){
        $.each(this.components, function(i, c) {
          c.clear();
        });
      }
      this.base();
    },

    getClassFor: function(component) {
      return component.cssClass;
    },

    getMarkupFor: function(component) {
      var _class = this.getClassFor(component);
      var html = '<div id="' + component.htmlObject + '"';
      if (_class) {
        html += ' class="' + _class + '"';
      }
      html += '></div>';
      return html;
    },

    update: function() {
      var html = '';

      if (this.label !== undefined) {
        html += '<fieldset>';
        if (this.label.length > 0) {
          html += '<legend>' + Dashboards.escapeHtml(this.label) + '</legend>';
        }
        html += '<div>';
      }

      if (this.components && this.components.length > 0) {
        html += this.updateInternal();
      }

      if (this.label !== undefined) {
        html += '</div></fieldset>';
      }

      $('#' + this.htmlObject).html(html);

      if (this.cssClass) {
        $('#' + this.htmlObject).addClass(this.cssClass);
      }
    },

    updateInternal: function() {
      var html = '';
      $.each(this.components, function(i, c) {
        html += this.getMarkupFor(c);
      }.bind(this));
      return html;
    },

    /**
     * Pre-order traversal of a component and its descendants.
     */
     //TODO REVIEW!
    mapComponents: function(c, f, x) {
      f.call(x, c);
      if (c.components) { this.mapComponentsList(c.components, f, x); }
      return c;
    },

    /**
     * Pre-order traversal of components given a list of root components.
     */
     //TODO REVIEW!
    mapComponentsList: function(comps, f, x) {
      var me = this;
      $.each(comps, function(i, c) { me.mapComponents(c, f, x); });
      return me;
    }

  });

  return CompositeComponent;
});
