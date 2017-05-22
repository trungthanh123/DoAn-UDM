
function articlePerPage(arr, page) {
	$("#homepage-view" ).empty();
	var start = (page - 1) * 6;
	var finish = start + 6;
	if(finish > arr.length) 
		finish = arr.length;

	for(let i = start; i < finish; i++) {
		$("#homepage-view" ).append('<div class="col-md-4">\
        <div class="thumbnail">\
          <a href="/DoAn-UDM/detail.html?id=' + arr[i].id + '"><img id="article-img" src="'+ arr[i].image +'"></a>\
          <div class="caption">\
            <h3>'+ arr[i].caption +'<div class="badge-css price">' + arr[1].rating +'</div></h3>\
            <p>'+ arr[i].description +'</p>\
            <p><a href="#" class="btn btn-primary" role="button">ĐẶT</a> <a href="#" class="btn btn-default" role="button">LƯU</a></p>\
          </div>\
        </div>\
      </div>');
	}
}
$(document).ready(function() {
	var arr = [];
	var totalArticles = 0;
	$.ajax({
	    type: "GET",
	    url: "data.xml",
	    dataType: "xml",
	    success: function (xml) {

	        
	        
	        $(xml).find('article').each(function(){
	    
				totalArticles++;
	         	var image = $(this).find('image').text(); //lấy 'text' của thẻ 'image' trong file xml, this ở đây là thẻ article
	         	var caption = $(this).find('caption').text();
	         	var rating = $(this).find('rating').text();
	         	var description = $(this).find('description').text();
	         	var id = $(this).find('id').text();
	         	var obj = {};
	         	obj["id"] = id;
	         	obj["image"] = image;
	         	obj["rating"] = rating;
	         	obj["caption"] = caption;
	         	obj["description"] = description;

	         	arr.push(obj);

				
	        });
	        console.log(arr);
			$('#pagination-demo').twbsPagination({
			        totalPages: (totalArticles/6).toFixed(0),
			        visiblePages: 3,
			        next: 'Next',
			        prev: 'Prev',
			        onPageClick: function (event, page) {
			            articlePerPage(arr, page);
			        }	
			});
	    }
	})

})





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