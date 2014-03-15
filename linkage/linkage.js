$(function($) {
	//因为地域信息量通常都很大，所以这里用json来存储数据
	var location = {
		"province": [
			{
				"name": "广东省",
				"city": [
					{
						"name": "广州市",
						"district": ["天河区", "越秀区", "海珠区", "白云区", "荔湾区", "番禺区"]
					},
					{
						"name": "佛山市",
						"district": ["禅城区", "南海区", "高明区"]
					}
				]
			},
			{
				"name": "湖南省",
				"city": [
					{
						"name": "长沙市",
						"district": ["岳麓区", "雨花区"]
					},
					{
						"name": "岳阳市",
						"district": ["岳阳楼区", "君山区"]
					}
				]
			}
		]
	}

	//先把所有省份先添加进去
	for(var i = 0; i < location.province.length; i ++) {
		$(".select_province").append("<option>" + location.province[i].name + "</option>");
	}

	//当改变省份时，触发二级联动，改变相应的城市和区
	$(".select_province").change(function() {
		var cities = $(".select_city");
		var districts = $(".select_district");
		var selectIndex = $(this)[0].selectedIndex;

		//每次改变时，先清空城市和区的<select>里的所有<option>
		cities.empty();
		districts.empty();

		cities.append("<option>请选择城市</option>");
		districts.append("<option>请选择区</option>");

		var targetCities = location.province[selectIndex - 1].city;

		//循环把该省份对应的城市添加进去
		for(var i = 0; i < targetCities.length; i ++) {
			cities.append("<option>" + targetCities[i].name + "</option>");
		}
	});

	//当改变城市时，触发二级联动，改变相应的区
	$(".select_city").change(function() {
		var selectProvince = $(".select_province")[0].selectedIndex;	//先获取选中省份的index
		var districts = $(".select_district");
		var selectCity = $(this)[0].selectedIndex;

		districts.empty();	//先清空区的<select>的所有<option>
		districts.append("<option>请选择区</option>");

		var targetDistricts = location.province[selectProvince - 1].city[selectCity - 1].district;
		//循环把对应的区添加进去
		for(var i = 0; i < targetDistricts.length; i ++) {
			districts.append("<option>" + targetDistricts[i] + "</option>");
		}
	});
});