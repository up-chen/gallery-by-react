require('../styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

//获取图片相关数据
var imageDatas = require('../data/imageDatas.json');

//即使函数获取图片的url信息
imageDatas = (function getImageUrl(imageDatasArr){
	for(var i=0; i<imageDatasArr.length; ++i){
		var item = imageDatasArr[i];
		item.imageURL = require('../images/' + item.filename);

		imageDatasArr[i] = item;
	}

	return  imageDatasArr;
})(imageDatas)

/*
*获取区间内的一个随机值
*/
let getRangeRandom = (low,high) =>{
	return Math.ceil(Math.random()*(high - low) + low)
}

/*
 *获取0-30度之间的一个任意正负值
 */
let get30DegRandom = () =>{
	return ((Math.random()>0.5? '' : '-') + Math.ceil(Math.random()*30));
}


class ImgFigure extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleClick = this.handleClick.bind(this);  //imgFigure 的点击处理函数
	}

	handleClick(e){
		if (this.props.arrange.isCenter) {
	      this.props.inverse()
	    } else {
	      this.props.center();
	    }
		e.stopPropagation()
		e.preventDefault()
	}

	render() {

		let styleObj ={}
		//如果props属性中指定了这张图片的位置，则使用
		if(this.props.arrange.pos){
			
			styleObj =this.props.arrange.pos
		}

		//如果图片的旋转角度有值且不为0，添加旋转角度
		if(this.props.arrange.rotate){
			(['MozTransform','WibkitTransform','MsTransform','transform']).forEach((element) =>{
				
				styleObj[element] = 'rotate(' + this.props.arrange.rotate + 'deg)'
			});
		}

		//居中图片不会被覆盖
		if (this.props.arrange.isCenter) {
	      styleObj.zIndex = 11;
	    }

		let imgFigureClassName = 'img-figure';
		imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

		return (
			<figure className={imgFigureClassName} style={styleObj} onClick = {this.handleClick}>
				<img src={this.props.data.imageURL} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className='img-back' onClick={this.handleClick}>
						 <p>
						 	{this.props.data.desc}
						 </p>
					</div>
				</figcaption>
			</figure>
		);
	}

}

class ControllerUnit extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick (e) {
		if (this.props.arrange.isCenter) {
	      this.props.inverse()
	    } else {
	      this.props.center();
	    }
		e.stopPropagation()
		e.preventDefault()
	}

	render() {
		let controllerUnitClassName = 'controller-unit';
	    //如果对应的是居中的图片，显示控制按钮的居中态
	    if (this.props.arrange.isCenter) {
	      controllerUnitClassName += ' is-center ';
	      //如果翻转显示翻转状态
	      if (this.props.arrange.isInverse) {
	        controllerUnitClassName += 'is-inverse'
	      }
	    }
		return (
			<span className={controllerUnitClassName} onClick={this.handleClick}></span>
		)
	}
}

class AppComponent extends React.Component {
	constructor(props) {
		super(props);
		this.Constant={
			centerPos:{
				left:0,
				top:0
			},
			hPosRange:{			//水平方向取值范围
				leftSecX:[0,0],
				rightSecX:[0,0],
				y:[0,0]
			},
			vPosRange:{			//垂直方向取值范围
				x:[0,0],
				topY:[0,0]
			}
		}

		this.state = {         //图片的状态（pos位置信息）
			imgsArrangeArr:[
				// pos:{
				// 	left:'0',
				// 	top:'0'
				// },
				// rotate:0,  //旋转角度
				// isInverse: false   //图片正反面
				// isCenter:　false   //是否居中
			]
		}
	}

	/*
	翻转图片
	@param index 输入当前被执行inverse操作图片的index值
	@return {Function} 这是一个闭包函数，其内return一个真正待被执行的函数
	*/

	inverse(index){
		return () =>{
			let imgsArrangeArr =this.state.imgsArrangeArr
			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse

 			this.setState({
				imgsArrangeArr:imgsArrangeArr
			});
		}
	}

	/*
   *利用rearramhe函数
   *居中对应index的图片
   */
  center(index) {
    return () => {
      this.reArrange(index);
    }
  }
	/*
	*重新布局所有图片
	*@param centerIndex 指定居中排布那个图片
	*/
	reArrange(centerIndex) {
		let imgsArrangeArr =this.state.imgsArrangeArr
		let Constant =this.Constant
		let centerPos =Constant.centerPos
		let hPosRange =Constant.hPosRange
		let vPosRange =Constant.vPosRange
		let hPosRangeLeftSecX =hPosRange.leftSecX
		let hPosRangeRightSecX =hPosRange.rightSecX
		let hPosRangeY =hPosRange.y
		let vPosRangeTopY =vPosRange.topY
		let vPosRangeX =vPosRange.x

		let imgsArrageTopArr =[]                      //上侧放的图片，取1个或不取
		let topImgNum =Math.floor(Math.random() * 2)  //取1个或不取
		let topImgSpliceIndex =0       				  //放的图片是从数组里面哪个位置拿出来的
		let imgsArrageCenterArr =imgsArrangeArr.splice(centerIndex,1)//会修改目标数组

		//首先居中 centerIndex 图片
		//居中的index图片不需要旋转

		imgsArrageCenterArr[0] ={
			pos:centerPos,
			rotate:0,
			isInverse:  false,
			isCenter:true
		}
		//取出要布局上侧的图片的状态信息，向后取
		topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum))
		imgsArrageTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum)
		//布局位于上侧的图片
		imgsArrageTopArr.forEach((value,index) =>{
			imgsArrageTopArr[index] = {
				pos:{
					top: getRangeRandom(vPosRangeTopY[0] ,vPosRangeTopY[1]),
					left:getRangeRandom(vPosRangeX[0] ,vPosRangeX[1])
				},
				rotate: get30DegRandom(),
				isInverse:  false,
				isCenter:　false
			}
		})
		//布局两侧的图片
		for(let i =0, j =imgsArrangeArr.length,k =j/2 ; i < j ; i++){
			let hPosRangeLORX =null
			//前半部分布局左边 后半部分布局右边
			if(i < k){
				hPosRangeLORX =hPosRangeLeftSecX
			}else{
				hPosRangeLORX =hPosRangeRightSecX
			}
			imgsArrangeArr[i]={
				pos :{
					top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
					left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
				},
				rotate: get30DegRandom(),
				isInverse:  false,
				isCenter:　false
			}
		}

		//重新将图片状态合并回来
		if(imgsArrageTopArr && imgsArrageTopArr[0]){
			imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrageTopArr[0])
		}
		imgsArrangeArr.splice(centerIndex,0,imgsArrageCenterArr[0])
		this.setState({
			imgsArrangeArr:imgsArrangeArr
		})

	}

	//组件加载以后，为每张图片计算其位置范围
	componentDidMount() {
		//拿到舞台的大小
		let stageDOM = ReactDOM.findDOMNode(this.refs.stage)
		let stageW = stageDOM.scrollWidth
		let stageH = stageDOM.scrollHeight
		let halfStageW = Math.ceil(stageW/2)
		let halfStageH = Math.ceil(stageH/2)
		//拿到imagefig的大小
		let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0)
		let imgW = imgFigureDOM.scrollWidth
		let imgH = imgFigureDOM.scrollHeight
		let halfImgW = Math.ceil(imgW/2)
		let halfImgH = Math.ceil(imgH/2)
		//计算中心点的位置
		this.Constant.centerPos = {
			left:halfStageW - halfImgW,
			top:halfStageH - halfImgH
		}
		//计算左侧右侧图片的排布取值范围
		this.Constant.hPosRange.leftSecX[0] = -halfImgW
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3
		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW
		this.Constant.hPosRange.y[0] = -halfImgH
		this.Constant.hPosRange.y[1] = stageH - halfImgH

		//计算上侧图片的排布取值范围
		this.Constant.vPosRange.topY[0] = -halfImgH
		this.Constant.vPosRange.topY[1] = halfStageH -halfImgH * 3
		this.Constant.vPosRange.x[0] = halfStageW - imgW
		this.Constant.vPosRange.x[1] = halfStageW

		this.reArrange(0);
	}
	render() {
		let controlUnits = []
		let imgFigures =[]
		imageDatas.forEach((value, index) => {
			if(!this.state.imgsArrangeArr[index]){
	  			this.state.imgsArrangeArr[index] = {
	  				pos:{
	  					left:0,
	  					top:0
	  				},
	  				rotate:0,
	  				isInverse:  false,
	  				isCenter: false
	  			}
	  		}
			imgFigures.push( <ImgFigure data= {value} key={index} ref={'imgFigure'+index} arrange ={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)}  center={this.center(index)}/> )
			controlUnits.push(<ControllerUnit key={index} arrange ={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)}  center={this.center(index)}/>)
		});

		return (
			<section className = "stage" ref="stage">
				<section className = "image-sec">
					{imgFigures}
				</section>
				<nav className = "controller-nav">
					{controlUnits}
				</nav>
		    </section>
		);
	}
}

AppComponent.defaultProps = {
};

export default AppComponent;
