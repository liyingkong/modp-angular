import { Component, ElementRef , ViewChild, AfterViewInit,Renderer } from '@angular/core';

import {FileUploadModule} from 'primeng/fileupload';

import { StepsModule, MenuItem,SelectItem } from 'primeng/primeng';
import { Upload } from '../shared/upload';
import { UploadService } from '../shared/upload.service';
import { Result } from '../shared/base/result';
import { MessageService } from 'primeng/components/common/messageservice';
import { CutVideoParam } from '../shared/CutVideoParam';
import { CutVideoParamService } from '../shared/CutVideoParam.service';

@Component({
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
// export class DisplayComponent {
export class DisplayComponent implements AfterViewInit{
  items: MenuItem[];

  activeIndex: number = 0;

  videofile:Upload = new Upload();

  stepContent:string = "";
  options: any;
  displayDialog: boolean;
  displayUploadDialog: boolean;
  uploadUrl: string;
  downloadUrl: string;
  imageUrl: string;
  cutVideoUrl: string;
  videoTrackPath: string;
  videoMaskPath: string;

  cutVideoParam:CutVideoParam = new CutVideoParam();
  cut_x:any;
  cut_y:any;
  cut_width:any;
  cut_height:any;
  videoh:any;
  videow:any;
  // output: any;
  // video: any;
  // scale: any;
  public penColor:string;
  public penWidth:string;
  public layer: number = 0;
  @ViewChild('VideoDiv')
  VideoDiv: ElementRef;
  @ViewChild('VideoImgDiv')
  VideoImgDiv: ElementRef;
  @ViewChild('Can')
  Can: ElementRef;
  @ViewChild('CutVideoDiv')
  CutVideoDiv: ElementRef;
  @ViewChild('TrackVideoDiv')
  TrackVideoDiv: ElementRef;
  @ViewChild('selectButton')
  selectButton: ElementRef;
  
  types: SelectItem[];
  selectedType: string;
  // @HostListener('mousedown',['$event']) onMousedown(event) {
  // }
  
  // @ViewChild('ImageDiv')
  // ImageDiv: ElementRef;
  // @ViewChild('VideoImgParentDiv')
  // VideoImgParentDiv: any;

  constructor(

    private uploadService: UploadService,
    private elem: ElementRef,
    private renderer: Renderer,
    private messageService: MessageService,
    private cutVideoParamService: CutVideoParamService,
  ) {
    this.uploadUrl = this.uploadService.getUploadUrl();
    this.imageUrl = this.uploadService.getImageUrl()+'?filename=';
    this.downloadUrl = this.uploadService.getDownloadUrl();
    this.cutVideoUrl = this.cutVideoParamService.getCutVideoUrl();
    this.videoTrackPath = this.cutVideoParamService.getTrackVideoUrl();
    this.videoMaskPath = this.cutVideoParamService.getMaskVideoUrl();
    this.types = [
      {label: '自然场景', value: '0', icon: 'fa fa-fw fa-cc-paypal'},
      {label: '前景', value: '1', icon: 'fa fa-fw fa-cc-visa'},
    ];
    // this.selectedType = "0";
  }

  ngAfterViewInit(): void {
    console.log("this.VideoDiv.nativeElement:");
    console.log(this.VideoDiv.nativeElement.videoWidth);
    console.log(this.VideoDiv.nativeElement.videoHeight);
    if(this.videofile.code){
      this.renderer.setElementStyle(this.VideoImgDiv.nativeElement,'background','url(' + this.imageUrl +this.videofile.code + ') center ');
      this.renderer.setElementStyle(this.VideoImgDiv.nativeElement,'background-repeat','no-repeat');
      this.renderer.setElementStyle(this.VideoImgDiv.nativeElement,'background-size','100% auto');
      this.videoh = this.VideoDiv.nativeElement.videoHeight;
      this.videow = +this.VideoDiv.nativeElement.videoWidth;
      let canh:number = this.videoh * ( 550 / this.videow );
      this.renderer.setElementStyle(this.Can.nativeElement,'height',canh+"px");
    }
    if(this.Can.nativeElement){
      var flag = false;
      this.cut_x = 0; // 鼠标开始移动的位置X
      this.cut_y = 0; // 鼠标开始移动的位置Y
      var url = ''; // canvas图片的二进制格式转为dataURL格式
      
      this.renderer.listen(this.Can.nativeElement,'mousedown',(e)=>{
        var ctx = this.Can.nativeElement.getContext("2d");
        flag = true;
        // canvas 的矩形框
        var canvasRect = this.Can.nativeElement.getBoundingClientRect();
        //矩形框的左上角坐标
        var canvasLeft=canvasRect.left;
        var canvasTop=canvasRect.top;
        // console.log("canvas：");
        // console.log(canvasLeft);
        // console.log(canvasTop);
        // console.log("client：");
        // console.log(e.clientX);
        // console.log(e.clientY);
        // console.log("hahaha");
        var e = e ||event;
        var ox = e.clientX - canvasLeft;
        var oy = e.clientY - canvasTop;
        this.cut_x = ox;
        this.cut_y = oy;  
        // ctx.moveTo(ox,oy);
        // ctx.rect(20,20,150,100);
        // ctx.fillStyle="green";
        // ctx.fill();   
      })
      this.renderer.listen(this.Can.nativeElement,'mousemove',(e)=>{
        var ctx = this.Can.nativeElement.getContext("2d");
        if(flag){
          // console.log("x:");
          // console.log(x);
          // console.log("y:");
          // console.log(y);
          // console.log("e.offsetX:");
          // console.log(e.offsetX);
          // console.log("e.offsetY:");
          // console.log(e.offsetY);
          ctx.clearRect(0,0,this.Can.nativeElement.width,this.Can.nativeElement.height);
          ctx.beginPath();
          ctx.strokeStyle="#FF0000";
          // ctx.fillStyle = "rgba(203,56,55,1)";
          ctx.lineWidth=1;
          this.cut_width=e.offsetX-this.cut_x;
          this.cut_height=e.offsetY-this.cut_y;
          ctx.strokeRect(this.cut_x,this.cut_y,this.cut_width,this.cut_height);
        }
      })
      this.renderer.listen(this.Can.nativeElement,'mouseup',(e)=>{
        flag=false;
        console.log("hehehe");
        document.onmousemove =null;
        document.onmouseup = null;
      })
    }
  }

  

  ngOnInit() {

    let data = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60]];

    var dateList = data.map(function (item) {
      return item[0];
    });
    var valueList = data.map(function (item) {
      return item[1];
    });

    this.options = {
      visualMap: [{
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 400
      }],
      title: [{
          left: 'left',
          text: '目标振动波展示'
      }],
      tooltip: {
          trigger: 'axis'
      },
      xAxis: [{
          data: dateList
      }],
      yAxis: [{
          splitLine: {show: false}
      }],
      series: [{
          type: 'line',
          showSymbol: false,
          data: valueList
      }]
    };
  }

  pinpoint(){
    if(!this.videofile.code){
      this.messageService.add({ severity: 'warn', detail: '请先上传视频！' });
      return;
    }
    // this.ngAfterViewInit();
    this.displayDialog = true;
    this.ngAfterViewInit();
    // this.draw();
  }

  // draw(){
  //   setTimeout(() => { // 此处需要使用箭头函数哈，你懂的...
  //     let ctx = this.Can.nativeElement.getContext("2d");
  //     ctx.beginPath();
  //     ctx.translate(0,0);
  //     ctx.rect(10,10,250,100);
  //     ctx.fillStyle="green";
  //     ctx.fill();
  //   }, 0);
  // }

  uploadFile(){
    this.displayUploadDialog = true;
  }

  onUpload(event) {
    console.log(this.uploadUrl);
    let xhr = event.xhr;
    if (xhr.response) {
      let result = JSON.parse(xhr.response) as Result<Upload>;
      console.log("哈哈哈哈：");
      console.log(result);
      console.log(result.errmsg);
      this.videofile = result.data;
      this.displayUploadDialog=false;
      console.log(this.videofile);
      // this.ngAfterViewInit();
    }
  }

  close(){
    this.displayDialog=false;
  }

  save(){
    // cutVideoParam
    console.log(this.cut_x);
    console.log(this.cut_y);
    console.log(this.cut_width);
    console.log(this.cut_height);
    console.log(this.videow);
    console.log(this.videoh);
    let rat = this.videow/550;
    this.cutVideoParam.box = [];
    this.cutVideoParam.box.push(this.cut_x*rat);
    this.cutVideoParam.box.push(this.cut_y*rat);
    this.cutVideoParam.box.push(this.cut_width*rat);
    this.cutVideoParam.box.push(this.cut_height*rat);
    this.cutVideoParam.upload = this.videofile;
    console.log(this.cutVideoParam);
    this.cutVideoParamService.cutVideo(this.cutVideoParam).then(c => {
      this.videofile = c;
      // console.log(this.cutVideoUrl + c.cutVideoPath);
      this.renderer.setElementAttribute(this.CutVideoDiv.nativeElement,'src',this.cutVideoUrl + c.cutVideoPath);
      // this.videofile.cut_video_code = ""
      // this.VideoDiv_.nativeElement.src = this.cutVideoUrl + c.cut_video_path;
      console.log(c);
      console.log("okokook!");
      this.messageService.add({ severity: 'success', detail: '视频裁剪成功' });
      this.displayDialog=false;
    });
  }

  track(){
    this.cutVideoParamService.trackVideo(this.videofile.cutVideoPath).then(c => {
      this.videofile = c;
      console.log(this.cutVideoUrl + c.cutVideoPath);
      this.renderer.setElementAttribute(this.TrackVideoDiv.nativeElement,'src',this.videoTrackPath + c.cutVideoPath);
      this.renderer.setElementAttribute(this.selectButton.nativeElement,'disable',"false");
      // this.videofile.cut_video_code = ""
      // this.VideoDiv_.nativeElement.src = this.cutVideoUrl + c.cut_video_path;
      console.log(c);
      console.log("okokook!");
      this.messageService.add({ severity: 'success', detail: '视频裁剪成功' });
      this.displayDialog=false;
    });
  }

  changeshow(){
    if(this.selectedType.toString() == "0"){
      this.renderer.setElementAttribute(this.TrackVideoDiv.nativeElement,'src',this.videoTrackPath + this.videofile.cutVideoPath);
    }else{
      this.renderer.setElementAttribute(this.TrackVideoDiv.nativeElement,'src',this.videoMaskPath + this.videofile.cutVideoPath);
    }
  }
  // SetImage(){
  //   console.log("嘿嘿嘿");
    
  // }

  // captureImage() {
  //   console.log("嘻嘻嘻：");
  //   // this.renderer.setElementStyle(this.VideoImg.elem,'width',this.Video.videoWidth);
  //   // this.renderer.setElementStyle(this.VideoImg.elem,'height',this.Video.videoHeight);
  //   var canvas = this.renderer.createElement(this.VideoImgParentDiv.nativeElement,"canvas");
  //   canvas.width = this.Video.videoWidth;
  //   canvas.height = this.Video.videoHeight;
  //   canvas.getContext('2d').drawImage(this.Video.nativeElement, 0, 0, canvas.width, canvas.height);
  //   var img = document.createElement("img");
  //   img.src = canvas.toDataURL("image/png");
  //   this.VideoImgParentDiv.nativeElement.appendChild(img);
  // }
  // test(){
  //   console.log("test()");
  // }
  // canvas:any;
  // canvasRect:any;
  // canvasLeft:any;
  // canvasTop:any;
  // layerIndex:any;
  // layerName:any;
  // x:any;
  // y:any;

  //************************** */
  mousedowndraw($event){
    
  }
  /**************** */
  // mousedowndraw($event){
  //   var canvasId = "can";
  //   var penColor = "red";
  //   var strokeWidth = "1";

  //   this.penColor=penColor;
  //   this.penWidth=strokeWidth;
  //   this.canvas = document.getElementById(canvasId);
  //   //canvas 的矩形框
  //   this.canvasRect = this.canvas.getBoundingClientRect();
  //   //矩形框的左上角坐标
  //   this.canvasLeft=this.canvasRect.left;
  //   this.canvasTop=this.canvasRect.top;
  //   console.log(this.canvasLeft);
  //   console.log(this.canvasTop);
  //   console.log(this.canvas);
  //   console.log(this.canvasRect);
  //   this.layerIndex= this.layer;
  //   this.layerName="layer";
  //   this.x=0;
  //   this.y=0;
  //   // this.setDrawRectValue("can","red","1");
  //   //设置画笔颜色和宽度
  //   var color=this.penColor;
  //   var penWidth=this.penWidth;
  //   this.layerIndex++;
  //   this.layerName+=this.layerIndex;
  //   let x = this.canvas.clientX-this.canvasLeft;
  //   let y = this.canvas.clientY-this.canvasTop;
  //   // this.canvas.add
  //   this.canvas.addLayer({
  //     type: 'rectangle',
  //       strokeStyle: color,
  //       strokeWidth: penWidth,
  //       name:this.layerName,
  //       fromCenter: false,
  //       x: x, y: y,
  //       width: 1,
  //       height: 1
  //   });
  //   this.canvas.addLayer({
  //       type: 'rectangle',
  //       strokeStyle: color,
  //       strokeWidth: penWidth,
  //       name:this.layerName,
  //       fromCenter: false,
  //       x: x, y: y,
  //       width: 1,
  //       height: 1
  //   });
  //   this.canvas.drawLayers();
  //   this.canvas.saveCanvas();
  //   //鼠标移动事件，画图
  //   this.canvas.onmousemove=function(e){

  //       let width = e.clientX-this.canvasLeft-x;
  //       let height = e.clientY-this.canvasTop-y;

  //       this.canvas.removeLayer(this.layerName);

  //       this.canvas.addLayer({
  //           type: 'rectangle',
  //           strokeStyle: color,
  //           strokeWidth: penWidth,
  //           name:this.layerName,
  //           fromCenter: false,
  //           x: x, y: y,
  //           width: width,
  //           height: height
  //       });
  //       this.canvas.drawLayers();
  //   }
  // };

  // drawRect(){
  //   this.penColor=penColor;
  //   this.penWidth=strokeWidth;
  //   var canvas = document.getElementById(canvasId);
  //   //canvas 的矩形框
  //   var canvasRect = canvas.getBoundingClientRect();
  //   //矩形框的左上角坐标
  //   var canvasLeft=canvasRect.left;
  //   var canvasTop=canvasRect.top;

  //   var layerIndex= this.layer;
  //   var layerName="layer";
  //   var x=0;
  //   var y=0;
  // }

  // drawRect1(canvasId:string,penColor:string,strokeWidth:string){
  //   this.penColor=penColor;
  //   this.penWidth=strokeWidth;
  //   var canvas = document.getElementById(canvasId);
  //   //canvas 的矩形框
  //   var canvasRect = canvas.getBoundingClientRect();
  //   //矩形框的左上角坐标
  //   var canvasLeft=canvasRect.left;
  //   var canvasTop=canvasRect.top;

  //   var layerIndex= this.layer;
  //   var layerName="layer";
  //   var x=0;
  //   var y=0;

  //   //鼠标点击按下事件，画图准备
  //   canvas.onmousedown=function(e)

  //   canvas.onmouseup=function(e){

  //       var color=penColor;
  //       var penWidth=penWidth;

  //       canvas.onmousemove=null;

  //       let width = e.clientX-canvasLeft-x;
  //       let height = e.clientY-canvasTop-y;

  //       $("#"+canvasId).removeLayer(layerName);

  //       $("#"+canvasId).addLayer({
  //           type: 'rectangle',
  //           strokeStyle: color,
  //           strokeWidth: penWidth,
  //           name:layerName,
  //           fromCenter: false,
  //           x: x, y: y,
  //           width: width,
  //           height: height
  //       });

  //       $("#"+canvasId).drawLayers();
  //       $("#"+canvasId).saveCanvas();
  //   }
  // }
}