define(['./ScopedPentahoButtonComponent'], function(ScopedPentahoButtonComponent){
  var SubmitPromptComponent = ScopedPentahoButtonComponent.extend({
    update: function() {

      this.base();

      var promptPanel = this.promptPanel;

      // BISERVER-3821 Provide ability to remove Auto-Submit check box from report viewer
      // only show the UI for the auto-submit check-box if no preference exists
      // TODO: true/false is irrelevant?
      if (this.paramDefn.autoSubmit == undefined) {
        var checkboxStr = '<label class="auto-complete-checkbox">' +
                            '<input type="checkbox"' +
                              (promptPanel.autoSubmit ? ' checked="checked"' : '') +
                            ' />' +
                            this.autoSubmitLabel +
                          '</label>';

        $(checkboxStr)
          .appendTo($('#' + this.htmlObject))
          .bind('click', function(ev) { promptPanel.autoSubmit = ev.target.checked; });
      }

      // BISERVER-6915 Should not request pagination when auto-submit is set to false
      if (promptPanel.forceAutoSubmit || promptPanel.autoSubmit) {
        this.expression(/*isInit*/true);
      }
    },

    expression: function(isInit) {
      this.promptPanel._submit({isInit: isInit});
    },

    expressionStart: function() {
      this.promptPanel._submitStart();
    }
  });

  return SubmitPromptComponent;

});
