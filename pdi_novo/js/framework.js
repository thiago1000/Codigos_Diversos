
// Accordion
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

// Tabs
$(document).ready(function(){
	$('.container-tab').hide();
        $('.container-tab:eq(0)').show();
		$('.item-tab:eq(0)').addClass('active');
		$('.item-tab').click(function(){
			var x = $(this).index();
			$('.item-tab').removeClass('active');
			$(this).addClass('active');
			$('.container-tab').hide();
			$('.container-tab:eq('+x+')').show();
	});		
});


