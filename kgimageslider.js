//this is a utility to have Object.create() work on browsers that do not support
if(typeof Object.create !=='function'){
	Object.create=function(obj){
		function F(){};
		f.prototype=obj;
		return new F();
	};
}



(function( $ ,window, document,undefined){

var kgImageSlider={

	init:function(options,elem){

		var self=this;
		self.$elem=$(elem);
		self.options=$.extend({},$.fn.kgimageslider.options,options);
		

		self.$elem.css({
			'width':self.options.width+'px',
			'height':self.options.height+'px',
			'overflow':'hidden',
			'border':self.options.border,
			
			});
			
			
			
			self.$elem.children("ul.slider").css({
			'width':self.options.width*self.$elem.children("ul.slider").children("li").length+'px',
			'height':self.options.height+'px',
			'padding':'0px',
			'margin':'0px',
			'list-style':'none'
			});
			
			self.$elem.children("ul.slider").children("li").css({
			'float':'left'
			});
			
			self.$elem.children("ul.slider").children("li").children().css({
			'width':self.options.width+'px',
			'height':self.options.height+'px'
			});
			
			
			$("<a id=\"prevBtn\" style=\"background-color:white;color:black;padding:10px;float:left;cursor:pointer;display:none;\">&lt;</a><a id=\"nextBtn\" style=\"background-color:white;color:black;padding:10px;float:right;cursor:pointer;display:none;\">&gt;</a>").appendTo(self.$elem);
			
			if(!self.isMobileBrowser())
			{
			self.$elem.children("#prevBtn").css({'margin-left':'-100px'});
			self.$elem.children("#nextBtn").css({'margin-right':'-100px'});
			}
			
			self.$elem.children("#prevBtn").show();
			self.$elem.children("#nextBtn").show();
			
			self.$elem.children("#prevBtn").css({'margin-top':'-'+((self.$elem.height()/2)+self.$elem.children("#prevBtn").height())+'px'});
			
			self.$elem.children("#prevBtn").click(function(){
			
				if(!self.options.processing)
				{
					self.options.processing=true;
			 		self.options.count=0;
			 		self.animateSlideRight();
				}
			});
			self.$elem.children("#nextBtn").css({'margin-top':'-'+((self.$elem.height()/2)+self.$elem.children("#nextBtn").height())+'px'});
			self.$elem.children("#nextBtn").click(function(){
			
				if(!self.options.processing)
				{
					self.options.processing=true;
					self.options.count=0;
			 		self.animateSlideLeft();
			 	}
			
			});
			
			
			if(($.browser.webkit || $.browser.mozilla) && self.options.renderSmoothEdges)
			{
				self.$elem.css({'border-radius':'20px'});
				self.$elem.children("#nextBtn").css({'border-top-left-radius':'10px','border-bottom-left-radius':'10px'});
				self.$elem.children("#prevBtn").css({'border-top-right-radius':'10px','border-bottom-right-radius':'10px'});
			}
			
			
			
			
			self.$elem.mouseenter(function(){
			if(!self.isMobileBrowser())
			{
			self.$elem.children("#prevBtn").animate({'margin-left':'0px'},500);
			self.$elem.children("#nextBtn").animate({'margin-right':'0px'},500);
			}
			
			}).mouseleave(function(){
			
			if(!self.isMobileBrowser())
			{
			self.$elem.children("#prevBtn").animate({'margin-left':'-100px'},500);
			self.$elem.children("#nextBtn").animate({'margin-right':'-100px'},500);
			
			
			if(self.options.count==0)
			{
    		self.options.count=1;
    	
			self.animateSlideLeft();
			}
			
			}
			
			
			});
			
			
			
			//methods['animateSlide'].apply(this,arguments);
			
			setTimeout(function(){
    	
    	if(self.options.count==1)
			self.animateSlideLeft();
			},self.options.idleInterval);
			
	




	},
	animateSlideLeft:function() { 
    	
    	var self=this;
    self.$elem.children("ul.slider").animate({'margin-left':'-='+self.options.width+'px'},self.options.transitionInterval,function(){
    $("<li></li>").appendTo(self.$elem.children("ul.slider"));
    self.$elem.children("ul.slider").children().last().css({'float':'left'});
    $($(self.$elem.children("ul.slider").children("li")[0]).children()).appendTo($(this).children().last());
    $(self.$elem.children("ul.slider").children("li")[0]).remove();
    self.$elem.children("ul.slider").css({'margin-left':'0px'});
    self.options.processing=false;
    
    	setTimeout(function(){
    	
    	if(self.options.count==1)
    		self.animateSlideLeft();
    	
    	
    	},self.options.idleInterval);
    
    });
      
 	
    },
    animateSlideRight:function() { 
    
    var self=this;

    $("<li></li>").insertBefore(self.$elem.children("ul.slider").children("li").first());
    $(self.$elem.children("ul.slider").children("li").last().children()).appendTo(self.$elem.children("ul.slider").children("li").first());
    self.$elem.children("ul.slider").children("li").first().css({'float':'left'});
    self.$elem.children("ul.slider").children("li").last().remove();
    self.$elem.children("ul.slider").css({'margin-left':'-'+self.options.width+'px'});
    self.$elem.children("ul.slider").animate({'margin-left':'0px'},self.options.transitionInterval,function(){self.options.processing=false;});	
    },
    isMobileBrowser:function() {
    	
    	var bwr=navigator.userAgent.toLowerCase();
    	if(bwr.indexOf("iphone")!=-1 || bwr.indexOf("ipad")!=-1 || bwr.indexOf("mobile")!=-1 )
    		return true;
    		else
    		return false;

    }

};


$.fn.kgimageslider = function( options ) {
    
    return this.each(function(){

    	var slider=Object.create(kgImageSlider);
    	console.log(slider);
    	slider.init(options,this);
    });
  
 };

$.fn.kgimageslider.options={
width:100,
transitionInterval:2000,
idleInterval:1000,
height:100,
count:1,
processing:false,
renderSmoothEdges:true,
border:'1px solid #ccc'
};

})( jQuery ,window,document);

		
		
			
			
			
			
			
			
			
			
			
			
	