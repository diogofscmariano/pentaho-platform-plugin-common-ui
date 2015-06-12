define(['cdf/components/BaseComponent','dojo/_base/lang', 'dijit/registry'], function(BaseComponent, lang, registry){
  var ExternalInputComponent = BaseComponent.extend({
    clear: function() {
      if (this.dijitId) {
        if (this.onChangeHandle) {
          this.onChangeHandle.remove();
        }
        registry.byId(this.dijitId).destroyRecursive();
        delete this.dijitId;
      }
    },
    update: function() {

      var parameterValue = Dashboards.getParameterValue(this.parameter);

      var container = $('#' + this.htmlObject)
        .empty();

      var textInputComboId = this.htmlObject + '-textButtonCombo';
      var textInputComboElement = '<div id="' + textInputComboId + '"></div>';
      container.append(textInputComboElement);
      var textInputCombo = new pentaho.common.TextButtonCombo({}, textInputComboId);
      textInputCombo.set('textPlaceHolder', 'file path...');
      textInputCombo.set('value', parameterValue); // set initial value

      // get button label
      var buttonLabel = this.param.attributes['button-label'];
      if(buttonLabel != null && buttonLabel != ''){
        textInputCombo.set('buttonLabel', buttonLabel);
      }

      // override onClickCallback
      textInputCombo.onClickCallback = lang.hitch(this, function(currentValue){
        try{
          var c = Dashboards.getComponentByName(this.name);
          var resultCallback = function(externalValue){
            textInputCombo.set('text', externalValue);
            Dashboards.processChange(this.name);
          };
          c.param.values = [currentValue]; // insert current value
          c.promptPanel.getExternalValueForParam(c.param, resultCallback); // request new value from prompt panel
        } catch(error) {
          if(typeof console !== 'undefined' && console.error) { console.error(error); }
        }
      });
      this.dijitId = textInputComboId;

      // override onChangeCallback
      textInputCombo.onChangeCallback = lang.hitch(this, function(newValue){
        Dashboards.processChange(this.name);
      });
    },

    getValue: function() {
      return registry.byId(this.dijitId).get('value');
    }
  });

  return ExternalInputComponent;
});
