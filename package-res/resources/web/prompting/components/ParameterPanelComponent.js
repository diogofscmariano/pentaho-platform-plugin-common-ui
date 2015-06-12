define(['./PanelComponent'], function(PanelComponent){
  var ParameterPanelComponent = PanelComponent.extend({
    getClassFor: function(component) {
      if (component.promptType === 'label') {
        return 'parameter-label';
      }
    }
  });

  return ParameterPanelComponent;
})
