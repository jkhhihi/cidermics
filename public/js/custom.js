/*!
 * Cidermics admin
 */
 
$(document).ready(function (){	
	
	//질문 추가
	var no = 1;
	$('.add-question').click(function (e){
		e.preventDefault();
		addQuestion(no);
		no++;
	});
	
	//contents file 관리
	
	//이미지 박스 클릭
	
	$('.modal-trigger1').leanModal({
		dismissible: true, // Modal can be dismissed by clicking outside of the modal
		opacity: .5, // Opacity of modal background
		in_duration: 300, // Transition in duration
		out_duration: 200, // Transition out duration
		ready: function() { 
			fileList('thumb', 1); 
		}, // Callback for Modal open
		complete: function() { 
			
		} // Callback for Modal close
	});
	
	//썸네일 이미지 등록
	$('.btn-thumb').click(function(){
		if($('.img-selected').length > 1){
			alert('하나만 선택해주세요~');
			return;
		}
		var src = $('.img-selected').find('img').attr('src');
		$('.preview').css('display','block');
		$('.preview').find('img').attr('src', src);
		$('.preview').find('input').attr('value', src);
		$('#modal1').closeModal();
	});
	
	
});

function fileList(type, page){
	var pages = '';
	$.ajax({
		url : '/adm/contents/files/'+ page,
		method : 'GET',
		success : function(data){
			
			var totalPage = data.pagination[0];
			var startPage = data.pagination[1];
			var lastPage = data.pagination[2];
			var next = data.pagination[3];
			var currentPage = data.pagination[4];
			
//			console.log(totalPage, startPage, lastPage, next, currentPage);
			var img = '<div class="row"> ';
			$.each(data.files, function(idx, val){
				if (idx % 3 == 0) {
					img += '</div>';
					img += '<div class="row"> ';
				}
				img += '<div class="col m4 center-align img-select"> ' +
							'<img class="responsive-img" src="/uploads/'+val+'"/> ' +
							'<div class="fileName"> '+val+'</div>' + 
					   '</div>';
				if (idx == 8){
					img += '</div>';
				}	
			});
			
			$('.images').html(img);
			var paging = '<li ' +disabled(currentPage)+'><a class="pageGo" href="javascript:pageGo('+ (currentPage - 1)+')"><i class="material-icons">chevron_left</i></a></li> ';
			for (var i = startPage; i < lastPage + 1; i++){
				paging += '<li '+ active(currentPage, i) +'><a class="pageGo" href="javascript:pageGo('+i+')">'+i+'</a></li>';
			}
			if(next){
				paging += '<li class="waves-effect"><a class="pageGo" href="javascript:pageGo('+ (currentPage+1) +')"><i class="material-icons">chevron_right</i></a></li>';					
			}
			$('.pagination').html(paging);
			
			$('.img-select').click(function(){
				var hasClass = $(this).hasClass('img-selected');
				if(hasClass){
					$(this).removeClass('img-selected');
				}else{
					$(this).addClass('img-selected');
				}
				var img = $(this).find('img').attr('src');
			});
		}
	});
}

function pageGo(page) {
	fileList(1,page);
}

function disabled (currentPage){
	if(currentPage == 1){
		return 'class="disabled"';
	}else {
		return 'class="waves-effect"';
	}
}

function active(currentPage, i){
	if(currentPage == i){
		return ' class="active"';
	}else{
		return ' class="waves-effect"';
	}
}


function addChoices (no){
	
	var contents = "";
	
	contents += '<div class=""></div>';
	
	$('.add-choices').append(contents);
	
}

function addQuestion(no){
	
	var contents = "";
	
	contents += '<div class=""> ' + 
		            '<div class="input-field col l12"> ' +
						'<input id="title" type="text" class="validate"> ' +
						'<label for="문항">'+no+'. 문항</label> ' +
						'<div class="add-choices"></div> ' + 
						'<div><i class="material-icons">add</i>선택지 추가</div> ' + 
					'</div> ' +
				'</div> ';
	$('.add-zone').append(contents);
	
}

$(document).ready(function(){
	
	$('.btn-contents').click(function(){
		var src = $('.img-selected').find('img');
		var F_body = $('iframe').contents().find('#se2_iframe').contents().find('.se2_inputarea');
		$.each(src, function(idx, val){
			F_body.append(val);
		});
		$('#modal1').closeModal();
	});
	
	
	$('#insert').click(function(e){
		var F_body = $('iframe').contents().find('#se2_iframe').contents().find('.se2_inputarea');
		var contents = F_body.html();
		var cate = $('[name=category]').val();
		var title = $('#title').val();
		var photo = $('[name=photo]').val();
		var userinfo = $('#user').val();
		
		var arr = userinfo.split("/");
		var userNo = arr[0];
		var writer = arr[1];
		
		if(cate == null) {
			alert('카테고리를 지정해주세요');
			return;
		}
		if(title == "") {
			alert('제목을 작성해주세요');
			return;
		}
		if(photo == ""){
			alert('썸네일 설정해주세요');
			return;
		}
		if(userinfo == ""){
			alert('에디터를 선택해주세요');
			return;
		}
		
		console.log('contents : ' + contents + '| cate : ' + cate + ' | title + ' + title );
		$('[name=title]').val(title);
		$('[name=contents]').val(contents);
		$('[name=userNo]').val(userNo);
		$('[name=writer]').val(writer);
		
		$('#cform').attr('action', '/adm/contents/insert');
		$('#cform').attr('method', 'post');
		$('#cform').submit();
		
//		var formData = new FormData();
//		formData.append('contents', contents); 
//		formData.append('cate', cate); 
//		formData.append('title', title); 
//		var xhr = new XMLHttpRequest();
//		
//		xhr.open("POST", '/adm/contents/insert');
//		xhr.send(formData);
		
	});
	
	$('#update').click(function(e){
		var F_body = $('iframe').contents().find('#se2_iframe').contents().find('.se2_inputarea');
		var contents = F_body.html();
		var cate = $('[name=category]').val();
		var title = $('#title').val();
		var photo = $('[name=photo]').val();
		var userinfo = $('#user').val();
		
		var arr = userinfo.split("/");
		var userNo = arr[0];
		var writer = arr[1];
		
		if(cate == null) {
			alert('카테고리를 지정해주세요');
			return;
		}
		if(title == "") {
			alert('제목을 작성해주세요');
			return;
		}
		if(photo == ""){
			alert('썸네일 설정해주세요');
			return;
		}
		if(userinfo == ""){
			alert('에디터를 선택해주세요');
			return;
		}
		
		console.log('contents : ' + contents + '| cate : ' + cate + ' | title + ' + title );
		$('[name=title]').val(title);
		$('[name=contents]').val(contents);
		$('[name=userNo]').val(userNo);
		$('[name=writer]').val(writer);
		
		$('#cform').attr('action', '/adm/contents/update');
		$('#cform').attr('method', 'post');
		$('#cform').submit();
		
	});
});