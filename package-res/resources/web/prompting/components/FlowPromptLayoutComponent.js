define(['./PromptLayoutComponent'], function(PromptLayoutComponent){

    var FlowPromptLayoutComponent = PromptLayoutComponent.extend({
      update: function() {
        $('#' + this.htmlObject).addClass('flow');
        this.base();
      }
    });


  return FlowPromptLayoutComponent;

})
