define(['cdf/components/BaseComponent', 'pentaho/common/DateTextBox', 'dijit/registry'],
function(BaseComponent, DateTextBox, registry){

  var DojoDateTextBoxComponent = BaseComponent.extend({
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

      var value = this.transportFormatter.parse(Dashboards.getParameterValue(this.parameter));
      this.dijitId = this.htmlObject + '_input';
      var input = $('#' + this.htmlObject).html($('<input/>').attr('id', this.dijitId));
      var dateTextBox = new pentaho.common.DateTextBox({
        name: this.name,
        constraints: {
          datePattern: this.param.attributes['data-format'],
          selector: 'date',
          formatLength: 'medium' // Used if datePattern is not defined, locale specific
        }
      }, this.dijitId);

      dateTextBox.set('value', value, false);
      this.onChangeHandle = on(dateTextBox, "change", function() {
        Dashboards.processChange(this.name);
      }.bind(this));

      this._doAutoFocus();
    },

    getValue: function() {
      var date = registry.byId(this.dijitId).get('value');
      return this.transportFormatter.format(date);
    }
  });

  return DojoDateTextBoxComponent;
})
