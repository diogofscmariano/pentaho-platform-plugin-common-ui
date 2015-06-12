define(['./PromptLayoutComponent'], function(PromptLayoutComponent){
  var ScrollingPromptPanelLayoutComponent = PromptLayoutComponent.extend({
    update: function() {
      if(this.components){
        if (this.components.length == 0) {
          $('#' + this.htmlObject).empty();
          return;
        }
        var html = '<div class="prompt-panel">';
        var submitHtml = '<div class="submit-panel">';
        $.each(this.components, function(i, c) {
          if (c.promptType === 'submit') {
            submitHtml += this.getMarkupFor(c);
          } else {
            html += this.getMarkupFor(c);
          }
        }.bind(this));
        html += '</div>' + submitHtml + '</div>';
        $('#' + this.htmlObject).html(html);
      }
    }
  });

  return ScrollingPromptPanelLayoutComponent;

})
