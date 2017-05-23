
function articlePerPage(arr, page) {
	$("#homepage-view" ).empty();
	var start = (page - 1) * 9;
	var finish = start + 9;
	if(finish > arr.length)
		finish = arr.length;

	for(let i = start; i < finish; i++) {
		$("#homepage-view" ).append('<div class="col-md-4">\
        <div class="thumbnail">\
          <a href="/DoAn-UDM/detail.html?id=' + arr[i].id + '"><img id="article-img" src="'+ arr[i].image +'"></a>\
          <div class="caption">\
            <h3>'+ arr[i].caption +'<div class="badge-css price">' + arr[i].rating +'</div></h3>\
            <p><i class="fa fa-money" aria-hidden="true"></i>'+ arr[i].description +'</p>\
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
			$('#pagination-demo').twbsPagination({
			        totalPages: (totalArticles/9).toFixed(0),
			        visiblePages: 3,
			        next: 'Next',
			        prev: 'Prev',
			        onPageClick: function (event, page) {
			        	articlePerPage(arr, page);
			        }
			});
	    }
	})
	
	$(".btn").click(function(){
        searchCourses($('#search').val());
    }); 


})

function isMatch(str1, str2) {

	str1 = changeAlias(str1);
	str2 = changeAlias(str2);
	


	var res = str1.search(str2)
    
   	if(res >= 0) 
   		return true;
   	return false;
}

function changeAlias(alias) {
	var str = alias;
	str= str.toLowerCase();
	str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
	str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
	str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
	str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
	str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
	str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
	str= str.replace(/đ/g,"d");
	str= str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'||\"|\&|\#|\[|\]|~/g,"");

	return str;
}

function searchCourses(str) {

	var arr = [];
	var totalArticles = 0;

	$.ajax({
	    type: "GET",
	    url: "data.xml",
	    dataType: "xml",
	    success: function (xml) {



	        $(xml).find('article').each(function(){

				totalArticles++;
	         	var caption = $(this).find('caption').text();
	         	
	         	var res = isMatch(caption, str);

	         	if(res) {
	         		var image = $(this).find('image').text();
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

	         	}


	        });
	        if(arr.length > 0) {
	        	$("#homepage-view").empty();
	        	$("#pagination-demo").empty();

	            for(let i = 0; i < arr.length; i++) {
					$("#homepage-view" ).append('<div class="col-md-4">\
			        <div class="thumbnail">\
			          <a href="/DoAn-UDM/detail.html?id=' + arr[i].id + '"><img id="article-img" src="'+ arr[i].image +'"></a>\
			          <div class="caption">\
			            <h3>'+ arr[i].caption +'<div class="badge-css price">' + arr[i].rating +'</div></h3>\
			            <p><i class="fa fa-money" aria-hidden="true"></i>'+ arr[i].description +'</p>\
			            <p><a href="#" class="btn btn-primary" role="button">ĐẶT</a> <a href="#" class="btn btn-default" role="button">LƯU</a></p>\
			          </div>\
			        </div>\
			      </div>');
				}
			} else {
				$("#homepage-view").empty();
	        	$("#pagination-demo").empty();
				$("#homepage-view" ).append('<h1 class="sf">Currently No List To Display!</h1>');

			}
		}
	});


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
