define(['cdf/components/BaseComponent'], function(BaseComponent){

  var PostInitComponent = BaseComponent.extend({
    name: "PostInitPromptPanelScrollRestorer",
    type: "base",
    lifecycle: {
      silent: true
    },
    executeAtStart: true,
    priority:999999999,
    update: function() {
    // restore last scroll position for prompt panel
      if(this.promptPanelScrollValue){
        $("#" + this.promptPanel).children(".prompt-panel").scrollTop(this.promptPanelScrollValue);
        delete this.promptPanelScrollValue;
      }
    }
  });

  return PostInitComponent;
});
