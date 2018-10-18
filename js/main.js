//预加载
var oPreload = document.querySelector('.preload')
var oSpan = document.querySelector('.preload span')
var iStatus = 0;

var imgData = [
	'img/bg.jpg',
	'img/bg1.jpg'
];



//获取案例
  $.ajax({
	url:'http://111.230.210.32:3000/getDemo',
	method:'get',
	success:function(res){
		if(res.code == 0 && res.data.length){
			var listStr = ''
			var resultData = res.data
			resultData.map((item)=>{
				listStr += `
				<li>
					<em class='mark'>${item.tag}</em>
					<a href="${item.detail_md}" target="_blank">
						<div class="pic">
							<img src="${item.thumb}" alt="">
						</div>
						<div class="info">
							<h5 title="${item.title}">${item.title}</h5>
							<h3 class="name">${item.sub_title}</h3>
							<img src="img/star.png" alt="">
							<p>技术:${item.skill}</p>
							<div class="download">猛击详情</div>
						</div>
					</a>
				</li>
			`
			})
			$('.zhufeng_video ul').append(listStr)
		}
	}
	});

//2017年
$('#history-2017').on('mouseenter', function () {
	layer.tips('description for project 1', '#history-2017', {
		tips: [1, '#0FA6D8'],
		time:20000
	});
})

