
$(document).ready(function() {
	
	var arr = [];
	
	getData(function(obj){
		var img = obj.image;
		var embededvideo = obj.embededvideo;
		var extraImg = $(".extra-picture");
		var img1 = obj.img1;
		var img2 = obj.img2;
		var img3 = obj.img3;
		var img4 = obj.img4;
		var img5 = obj.img5;

		$("#img-detail").attr("src", img);
		$("#embeded-video").attr("src", embededvideo);

		var i = 1;
		extraImg.children().each(function() {
			var str = "img" + i;
			var ima = obj[str];
			$(this).attr('src', ima);
			i++;
		});



	})

})

var getData = function(callback) {

	$.ajax({
	    type: "GET",
	    url: "data.xml",
	    dataType: "xml",
	    success: function (xml) {

	        
	        
	        $(xml).find('article').each(function(){
	    
				
	         	
	         	var id = $(this).find('id').text();

	         	if(id = getUrlParameter('id')) {
	       
	         		var image = $(this).find('image').text(); //lấy 'text' của thẻ 'image' trong file xml, this ở đây là thẻ article
	         		var caption = $(this).find('caption').text();
	         		var rating = $(this).find('rating').text();
	         		var description = $(this).find('description').text();
	         		var embededvideo = $(this).find('embededvideo').text();
	         		var img1 = $(this).find('img1').text();
	         		var img2 = $(this).find('img2').text();
	         		var img3 = $(this).find('img3').text();
	         		var img4 = $(this).find('img4').text();
	         		var img5 = $(this).find('img5').text();

	         		var obj = {};

	         		obj["id"] = id;
	         		obj["image"] = image;
	         		obj["rating"] = rating;
	         		obj["caption"] = caption;
	         		obj["description"] = description;
	         		obj["embededvideo"] = embededvideo;
	         		obj["img1"] = img1;
	         		obj["img2"] = img2;
	         		obj["img3"] = img3;
	         		obj["img4"] = img4;
	         		obj["img5"] = img5;


	         		callback(obj);

	         		return false;
	         	}
	        });
	    }
	})


}


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};