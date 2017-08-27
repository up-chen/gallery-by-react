var imageDatas=[
	{
		"filename": "1.jpg",
		"title": "Heaven of time",
		"desc": "Here he comes Here comes Spees Racer. "
	},
	{
		"filename": "2.jpg",
		"title": "Heaven of time",
		"desc": "Here he comes Here comes Spees Racer. "
	},
	{
		"filename": "3.jpg",
		"title": "Heaven of time",
		"desc": "Here he comes Here comes Spees Racer. "
	},
	{
		"filename": "4.jpg",
		"title": "Heaven of time",
		"desc": "Here he comes Here comes Spees Racer. "
	},
	{
		"filename": "5.jpg",
		"title": "Heaven of time",
		"desc": "Here he comes Here comes Spees Racer. "
	},
	{
		"filename": "6.jpg",
		"title": "Heaven of time",
		"desc": "Here he comes Here comes Spees Racer. "
	},
	{
		"filename": "7.jpg",
		"title": "Heaven of time",
		"desc": "Here he comes Here comes Spees Racer. "
	},
	{
		"filename": "8.jpg",
		"title": "Heaven of time",
		"desc": "Here he comes Here comes Spees Racer. "
	},
	{
		"filename": "9.jpg",
		"title": "Heaven of time",
		"desc": "Here he comes Here comes Spees Racer. "
	},
	{
		"filename": "10.jpg",
		"title": "Heaven of time",
		"desc": "Here he comes Here comes Spees Racer. "
	},
	{
		"filename": "11.jpg",
		"title": "Heaven of time",
		"desc": "Here he comes Here comes Spees Racer. "
	},
	{
		"filename": "12.jpg",
		"title": "Heaven of time",
		"desc": "Here he comes Here comes Spees Racer. "
	},
	{
		"filename": "13.jpg",
		"title": "Heaven of time",
		"desc": "Here he comes Here comes Spees Racer. "
	},
	{
		"filename": "14.jpg",
		"title": "Heaven of time",
		"desc": "Here he comes Here comes Spees Racer. "
	},
	{
		"filename": "15.jpg",
		"title": "Heaven of time",
		"desc": "Here he comes Here comes Spees Racer. "
	},
	{
		"filename": "16.jpg",
		"title": "Heaven of time",
		"desc": "Here he comes Here comes Spees Racer. "
	}
]

function getImageUrl(imageDatasArr){
	for(var i=0; i<imageDatasArr.length; ++i){
		var item = imageDatasArr[i];
		item.imageURL = "xxx"

		imageDatasArr[i] = item;
	}

	return  imageDatasArr;
}
var imageDatas = getImageUrl(imageDatas);
var a= JSON.stringify(imageDatas);
console.log(a);
imageDatas.forEach((value, index) => {
			console.log(value.imageURL)
		});
