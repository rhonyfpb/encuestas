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
		$.each(controls, function(i, control) {
			control = $(control);
			var id = control.data("id");
			var type = control.data("type");
			var value, options, selected;
			if(!id) {
				results = false;
				return false;
			}
			switch(type) {
				case "selection":
					options = $(".control-selection-option", control);
					selected = $(".control-selection-option.selected", control);
					value = options.index(selected);
					if(value === -1) {
						results = false;
						return false;
					} else {
						results[id] = value;
					}
					break;
				case "boolean":
					options = $(".button", control);
					selected = $(".button.selected", control);
					value = options.index(selected);
					if(value === -1) {
						results = false;
						return false;
					} else {
						value = value === 0 ? true : false;
						results[id] = value;
					}
					break;
			}
		});
		if(!results) {
			alert("Selecciona todos los campos de la encuesta");
			return;
		} else {
			$.ajax({
				url: "/process",
				method: "POST",
				data: results
			}).done(function() {
				window.location.href = "/";
			});
		}
	});
});