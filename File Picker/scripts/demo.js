(function (global) {
  var DemoViewModel,
      app = global.app = global.app || {};

  DemoViewModel = kendo.data.ObservableObject.extend({

    isAvailable: function () {
      if (!this.checkSimulator()) {
	      FilePicker.isAvailable(function (avail) {
  	      alert(avail ? "YES" : "NO");
  			});
      }
    },

    pickFile: function () {
      if (!this.checkSimulator()) {
				FilePicker.pickFile(this.onSuccess, this.onError);
      }
    },

    pickImages: function () {
      if (!this.checkSimulator()) {
        // supported UTI's: https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/UTIRef/Articles/System-DeclaredUniformTypeIdentifiers.html#//apple_ref/doc/uid/TP40009259-SW1
				var utis = ["public.image"];
				FilePicker.pickFile(this.onSuccess, this.onError, utis);
      }
    },

    onSuccess: function (result) {
      alert("Success: " + JSON.stringify(result));
    },

    onError: function (result) {
      alert("Error: " + JSON.stringify(result));
    },

    checkSimulator: function () {
		  if (window.navigator.simulator === true) {
    		alert('This plugin is not available in the simulator.');
		    return true;
		  } else if (window.FilePicker === undefined) {
    		alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
		    return true;
		  } else {
    		return false;
  		}
		}
  });

  app.demoService = {
    viewModel: new DemoViewModel()
  };
})(window);