
function articlePerPage(arr, page) {
	$("#homepage-view" ).empty();
	var start = (page - 1) * 6;
	var finish = start + 6;
	if(finish > arr.length) 
		finish = arr.length;

	for(let i = start; i < finish; i++) {
		$("#homepage-view" ).append('<div class="col-md-4">\
        <div class="thumbnail">\
          <img id="article-img" src="'+ arr[i].image +'">\
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
	         	var image = $(this).find('image').text();
	         	var caption = $(this).find('caption').text();
	         	var rating = $(this).find('rating').text();
	         	var description = $(this).find('description').text();

	         	var obj = {};

	         	obj["image"] = image;
	         	obj["rating"] = rating;
	         	obj["caption"] = caption;
	         	obj["description"] = description;


	         	arr.push(obj);

	         	
				
	        });
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