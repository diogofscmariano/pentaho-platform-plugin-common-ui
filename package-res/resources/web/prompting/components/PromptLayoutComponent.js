define(['./CompositeComponent'], function(CompositeComponent){

  /**
   * Base Prompting Component that builds a layout
   */
 var PromptLayoutComponent = CompositeComponent.extend({
    getClassFor: function(component) {
      if (!component.param) { return; }
      return 'parameter' + (component.cssClass ? ' ' + component.cssClass : '');
    }
  });

  return PromptLayoutComponent;

});
