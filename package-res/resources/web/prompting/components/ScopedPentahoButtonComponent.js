define(['cdf/components/BaseComponent', 'cdf/lib/jquery', 'amd!cdf/lib/jquery.ui'], function(BaseComponent, $){
  var ScopedPentahoButtonComponent = BaseComponent.extend({
    viewReportButtonRegistered: false,

    update : function() {
      this.registerSubmitClickEvent();
    },

    // Registers the click event for the parameter 'View Report' button
    // to invoke panel's submit to update report
    registerSubmitClickEvent: function() {
      if (!this.viewReportButtonRegistered) {

        var $container = $("#" + this.htmlObject)
          .empty();

        $("<button type='button' class='pentaho-button'/>")
          .text(this.label)
          .bind("mousedown", this.expressionStart.bind(this))
          .bind("click", function(){
            // Don't let click-event go as first argument.
            this.expression(false);
           }.bind(this))
          .button()
          .appendTo($container);

        this.viewReportButtonRegistered = true;
      }
    },

    expressionStart: function(){}
  });

  return ScopedPentahoButtonComponent;
});
