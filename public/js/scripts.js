$(document).ready(function() {
	//

	// FORM
	// selection
	$(".control .control-selection .control-selection-option").click(function() {
		var $this = $(this);
		$this.closest(".control-selection").find(".control-selection-option, .control-selection-selector").removeClass("selected");
		$this.addClass("selected");
		$this.prev().addClass("selected");
	});
	$(".control .control-selection .control-selection-selector").click(function() {
		var $this = $(this);
		$this.closest(".control-selection").find(".control-selection-option, .control-selection-selector").removeClass("selected");
		$this.addClass("selected");
		$this.next().addClass("selected");
	});

	// boolean
	$(".control .control-boolean .button").click(function() {
		var $this = $(this);
		$this.closest(".control-boolean").find(".button").removeClass("selected");
		$this.addClass("selected");
	});

	// send
	$("#send-survey").click(function() {
		var controls = $(".control");
		var results = {};
		$.each(control, function(i, control) {
			var id = control.data("id");
			var type = control.data("type");
			var value;
			if(!id) {
				results = false;
				return false;
			}
			switch(type) {
				case "selection":
					//value = 
					break;
			}
		});
		if(!results) {
			alert("Selecciona todos los campos de la encuesta");
			return;
		}
	});
});