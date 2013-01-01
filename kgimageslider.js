(function( $ ){

var sliderOptions;
var _this;
var methods = {
	init : function(options){
		 
		sliderOptions=jQuery.extend({width:100,transitionInterval:2000,idleInterval:1000,height:100,count:1,processing:false,renderSmoothEdges:true,border:'1px solid #ccc'},options);

		return this.each(function(){
			
			$this=$(this);
			
			$this.css({
			'width':sliderOptions.width+'px',
			'height':sliderOptions.height+'px',
			'overflow':'hidden',
			'border':sliderOptions.border,
			
			});
			
			
			
			$this.children("ul.slider").css({
			'width':sliderOptions.width*$this.children("ul.slider").children("li").length+'px',
			'height':sliderOptions.height+'px',
			'padding':'0px',
			'margin':'0px',
			'list-style':'none'
			});
			
			$this.children("ul.slider").children("li").css({
			'float':'left'
			});
			
			$this.children("ul.slider").children("li").children().css({
			'width':sliderOptions.width+'px',
			'height':sliderOptions.height+'px'
			});
			
			
			$("<a id=\"prevBtn\" style=\"background-color:white;color:black;padding:10px;float:left;cursor:pointer;display:none;\">&lt;</a><a id=\"nextBtn\" style=\"background-color:white;color:black;padding:10px;float:right;cursor:pointer;display:none;\">&gt;</a>").appendTo($this);
			
			if(!methods.isMobileBrowser())
			{
			$this.children("#prevBtn").css({'margin-left':'-100px'});
			$this.children("#nextBtn").css({'margin-right':'-100px'});
			}
			
			$this.children("#prevBtn").show();
			$this.children("#nextBtn").show();
			
			$this.children("#prevBtn").css({'margin-top':'-'+(($this.height()/2)+$this.children("#prevBtn").height())+'px'});
			
			$this.children("#prevBtn").click(function(){
			
				if(!sliderOptions.processing)
				{
					sliderOptions.processing=true;
			 		sliderOptions.count=0;
			 		methods.animateSlideRight();
				}
			});
			$this.children("#nextBtn").css({'margin-top':'-'+(($this.height()/2)+$this.children("#nextBtn").height())+'px'});
			$this.children("#nextBtn").click(function(){
			
				if(!sliderOptions.processing)
				{
					sliderOptions.processing=true;
					sliderOptions.count=0;
			 		methods.animateSlideLeft();
			 	}
			
			});
			
			
			if(($.browser.webkit || $.browser.mozilla) && sliderOptions.renderSmoothEdges)
			{
				$this.css({'border-radius':'20px'});
				$this.children("#nextBtn").css({'border-top-left-radius':'10px','border-bottom-left-radius':'10px'});
				$this.children("#prevBtn").css({'border-top-right-radius':'10px','border-bottom-right-radius':'10px'});
			}
			
			
			
			
			$this.mouseenter(function(){
			if(!methods.isMobileBrowser())
			{
			$this.children("#prevBtn").animate({'margin-left':'0px'},500);
			$this.children("#nextBtn").animate({'margin-right':'0px'},500);
			}
			
			}).mouseleave(function(){
			
			if(!methods.isMobileBrowser())
			{
			$this.children("#prevBtn").animate({'margin-left':'-100px'},500);
			$this.children("#nextBtn").animate({'margin-right':'-100px'},500);
			
			
			if(sliderOptions.count==0)
			{
    		sliderOptions.count=1;
    	
			methods.animateSlideLeft();
			}
			
			}
			
			
			});
			
			
			$this.click(function(){
			
			});
			//methods['animateSlide'].apply(this,arguments);
			
			setTimeout(function(){
    	
    	if(sliderOptions.count==1)
			methods.animateSlideLeft();
			},sliderOptions.idleInterval);
			
		});
		
		

     },
    animateSlideLeft:function() { 
    
    $this.children("ul.slider").animate({'margin-left':'-='+sliderOptions.width+'px'},sliderOptions.transitionInterval,function(){
    $("<li></li>").appendTo($(this));
    $(this).children().last().css({'float':'left'});
    $($($(this).children("li")[0]).children()).appendTo($(this).children().last());
    $($(this).children("li")[0]).remove();
    $(this).css({'margin-left':'0px'});
    sliderOptions.processing=false;
    
    	setTimeout(function(){
    	
    	if(sliderOptions.count==1)
    		methods.animateSlideLeft();
    	
    	
    	},sliderOptions.idleInterval);
    
    });
      
    
    
   

    	
    },
    animateSlideRight:function() { 
    
    $("<li></li>").insertBefore($($this.children("ul.slider").children("li")[0]));
    $($this.children("ul.slider").children("li").last().children()).appendTo($this.children("ul.slider").children().first());
    $this.children("ul.slider").children("li").first().css({'float':'left'});
    $this.children("ul.slider").children("li").last().remove();
    $this.children("ul.slider").css({'margin-left':'-'+$this.width()+'px'});
    $this.children("ul.slider").animate({'margin-left':'0px'},sliderOptions.transitionInterval,function(){sliderOptions.processing=false;});	
    },
    isMobileBrowser:function() {
    	
    	var bwr=navigator.userAgent.toLowerCase();
    	if(bwr.indexOf("iphone")!=-1 || bwr.indexOf("ipad")!=-1 || bwr.indexOf("mobile")!=-1 )
    		return true;
    		else
    		return false;
    
    
    }
};

$.fn.kgimageslider = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }    
  
  };


})( jQuery );

		
		
			
			
			
			
			
			
			
			
			
			
	