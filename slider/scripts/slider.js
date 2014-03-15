(function() {
	//初始化
	var picWidth = $("img").width();	//获取图片的宽度
	var imgsLength = $("img").length; 	//获取所显示的图片的数目
	var interval = 3000;	//在一幅图片上停留的时间	
	var slideTime = 200;	//一幅图片滑动的时间
	$("#imgList").css("left", "-" + picWidth + "px");	//先设置图片的初始位置
	
	var slideTimer = setInterval(slideDefault, interval+slideTime);	//定期调用用于处理滑动的slide函数

	//默认的滑动函数
	function slideDefault() {
		//图片滑动
		$("#imgList").animate(
			{left: '-=' + picWidth},
			slideTime,
			function() {
				var selectOption = $(".option_select");		//获取滑动前被选中的option
				selectOption.removeClass("option_select");		//先移除所有表示选中的class

				if(selectOption.index() === $("li").length - 1) {	//如果已经滑到了最后一个option					
					$("li").first().addClass("option_select");		//再添加选中的class
				} else {
					selectOption.next().addClass("option_select");		//再添加
				}

				//当图片滑到最后一张时，重设imgList位置
				if($("#imgList").css("left") === "-" + (imgsLength-1)*picWidth + "px") {
					$("#imgList").css("left", "-" + picWidth + "px");
				}
			}
		);		
	}

	//当点击option
	$("li").click(function() {
		var selectOption = $(".option_select");		//点击时获取之前选中的option
		var selectIndex = selectOption.index();		//获取点击之前已选中的option的索引
		var targetIndex = $(this).index();		//获取目标option的索引
		var substract = targetIndex - selectIndex;	//两个索引值之差
		var _that = $(this);

		//如果点中的option就是已选option，马上返回
		if(substract === 0) {
			return;
		}

		clearInterval(slideTimer);		//先清除计时器	

		if(substract > 0) {	//当点击的option索引大于选中的opting的索引，左移
			//触发滑动
			$("#imgList").animate(
				{left: "-=" + substract*picWidth},
				slideTime,
				function() {
					selectOption.removeClass("option_select");		//先移除
					_that.addClass("option_select");		//再添加
					slideTimer = setInterval(slideDefault, interval+slideTime);		//再添加计时器
				}
			);
		} else if(substract < 0) {	//当点击的option索引小于选中的opting的索引，右移
			//触发滑动
			$("#imgList").animate(
				{left: "+=" + (-substract)*picWidth},
				slideTime,
				function() {
					selectOption.removeClass("option_select");		//先移除
					_that.addClass("option_select");		//再添加
					slideTimer = setInterval(slideDefault, interval+slideTime);		//再添加计时器
				}
			);
		}
	});

	//点击往左滑动按钮
	$("#btn_slideLeft").click(function() {
		clearInterval(slideTimer);		//先清除计时器

		var selectOption = $(".option_select");		//点击时获取之前选中的option

		//触发滑动
		$("#imgList").animate(
			{left: "+=" + picWidth},
			slideTime,
			function() {
				selectOption.removeClass("option_select");		//先移除

				if(selectOption.index() === 0) {					
					$("li").last().addClass("option_select");		//再添加选中的class
				} else {
					selectOption.prev().addClass("option_select");		//再添加
				}
				
				//当图片滑到第一张时，马上重设位置
				if($("#imgList").css("left") === 0 + "px") {
					$("#imgList").css("left", "-" + (imgsLength-2)*picWidth + "px");
				}

				slideTimer = setInterval(slideDefault, interval+slideTime);		//再添加计时器
			}
		);
	});

	//点击往右滑动按钮
	$("#btn_slideRight").click(function() {
		clearInterval(slideTimer);		//先清除计时器

		var selectOption = $(".option_select");		//点击时获取之前选中的option

		//触发滑动
		$("#imgList").animate(
			{left: "-=" + picWidth},
			slideTime,
			function() {
				selectOption.removeClass("option_select");		//先移除所有表示选中的class

				if(selectOption.index() === $("li").length - 1) {	//如果已经滑到了最后一个option					
					$("li").first().addClass("option_select");		//再添加选中的class
				} else {
					selectOption.next().addClass("option_select");		//再添加
				}

				//当图片滑到最后一张时，马上重设位置
				if($("#imgList").css("left") === "-" + (imgsLength-1)*picWidth + "px") {
					$("#imgList").css("left", "-" + picWidth + "px");
				}

				slideTimer = setInterval(slideDefault, interval+slideTime);		//再添加计时器
			}
		);
	});
	
})();