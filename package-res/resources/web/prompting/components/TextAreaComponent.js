define(['cdf/components/BaseComponent'], function(BaseComponent){
  var TextAreaComponent = BaseComponent.extend({
    update: function() {
      var value = Dashboards.getParameterValue(this.parameter);
      var html = '<textarea id="' + this.htmlObject + '-input">';
      if (value != undefined) {
        html += Dashboards.escapeHtml(value);
      }
      html += '</textarea>';
      $('#' + this.htmlObject).html(html);
      var input = $('#' + this.htmlObject + '-input');
      //change() is called on blur
      input.change(function() {
        // blur wasn't good enough. clicking of the submit button without clicking out of the text component
        // doesn't trigger blur. so modified text fields can have a stale value.
        // we now use the jQuery ui focusout event on the input.
      }.bind(this));
      input.keypress(function(e) {
        if (e.which === 13) {
          Dashboards.processChange(this.name);
        }
      }.bind(this));

      input.focusout(function() {
        Dashboards.processChange(this.name);
      }.bind(this));

      this._doAutoFocus();
    },

    getValue: function() {
      var val = $('#' + this.htmlObject + '-input').val();
      if (this.formatter) {
        return this.transportFormatter.format(this.formatter.parse(val));
      } else {
        return val;
      }
    }
  });

})
