$(document).ready(function(){
 
var data = [];
var quoteObject = {};
 
 
// This section stores user input.
 
var getInfo = function(){
	quoteObject ={};
	quoteObject.author = $("#author-input").val();
	quoteObject.quote = $("#quote-input").val();
	data.push(quoteObject);
	
	// This clears fields after input.
	$("#author-input").val("");
    $("#quote-input").val("");
};
 
// Displays the last item in the array.
 
var displayOutput = function(){
	var rateEvent=false;
	var lastIndex = (data.length - 1);
	var addOutput = $("<div class='view-quotes' id='view-quotes_" + lastIndex + "' ><p>"+(lastIndex+1)+ "---"+data[lastIndex].author + " <br>" + data[lastIndex].quote  + 
		"</p> <button type='button' class='delete-button' id='del-button_" + lastIndex + "'>Delete</button><button type='button' class='rate-button' id='rate-butt_" + lastIndex + "'>Rate</button></div>");
	
	// var selectRate = $("<div class='rate-quotes'><button type='button' class='delete-button'>Rate</button></div>");

	//adds to another item to the output string
	
	$(".display-quotes").append(addOutput);
	// $(".display-quotes").append(selectRate);
 
	//adds the functional "Rate" button

	$("#view-quotes_" + lastIndex + " .rate-button").mouseover(function(){
	  // $("#view-quotes_" + lastIndex + ".rate-button").css("background-color","gray");
	  if (!rateEvent){
	    hoverMenu(lastIndex);
	    rateEvent=true;
	  };
  	});
	
	//removes an item when delete is clicked
	
	$(".delete-button").click(function(){
  	$(this).parent().remove();


    
  		
	});
 
 
};
 
var hoverMenu = function(arrayIndex){
	oneRating = "";
	var dropMenu = $('<div class="drop" id="menus_' + arrayIndex + '"><select><option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option></select></div>')

	// $("#view-quotes_"+arrayIndex).append(dropMenu)
	$("#del-button_"+arrayIndex).append(dropMenu);
	$("#rate-butt_"+arrayIndex).remove();


	  	//this captures a rating when selected
	$("#menus_" + arrayIndex).on('change',function(){
		var selectedValue = $("#menus_" + arrayIndex + " option:selected").val();
		var whichMenu = $(this).attr('id');
		var menuNumb = whichMenu.slice(6,7);
		data[menuNumb].rate = selectedValue;
		var example = data[menuNumb];
		console.log(example);

			// console.log(data[menuNumb].author);

			// console.log(data);

	});
};

 
var pullAuthor = function(){
	var searchAuthor = $("#search-name").val();
	// var searchAuthor ="";
	for (var i=0;i<data.length;i++){
		if (data[i].author === searchAuthor) {
			var pulledAuthor = $("<div class='view-quotes'><p>" + searchAuthor + " said, --- '"+data[i].quote + "' <br>" + "</p></div>");
			$(".outputfield").append(pulledAuthor);
		}
	}
};

var sortQuotes = function(){
	sortedList="";
	for (var j=5;j>0;j--){
		sortedList = sortedList + "<br>______" + j + "-rated_______<br>";
		noQuotes = true
		for (var i=0;i<data.length;i++){
			console.log(data[i].rate, j.toString());
			if (data[i].rate === j.toString()) {
				sortedList = sortedList + "<br>'" + data[i].quote + "'";
				noQuotes = false
			}		
		}
		if(noQuotes){
			sortedList = sortedList + "\n'no quotes'";
		}
	};
	console.log(sortedList);
		var highToLow = $("<p class='rated-quotes'><ul>" + sortedList + "<br>" + "</ul></p>" );
		$(".outputfield").append(highToLow);
};

var silliness = function(){
	var grabNumber = Math.floor(Math.random()*(data.length));
	var grabQuote = data[grabNumber].quote;
	$(".queryfield").append(grabQuote);
}
 
// This button adds the data.
$("#add-button").click(function(){
	getInfo();
	displayOutput();
	
 
});
 
// This button calls the author list.
$(".author-button").click(function(){
	pullAuthor();
});

//This button sorts the quotes according to rating.
$("#value-list").click(function(){
	sortQuotes();
});

//This button grabs whichever quote it feels like and puts it just anywhere.
$("#random-quote").click(function(){
	silliness();
});
 
 
 
 
// End of the jquery document
});