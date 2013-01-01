kgimageslider
=============

a jquery image slider plugin


it is a simple image slider plugin with buttons to traverse the slides in plugin.


the usage is very simple.


First add the two files to you page .

<pre>
<script type="text/javascript" src="jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="kgimageslider.js"></script>
</pre>
Add this script to initialize the plugin 
<pre>
<script type="text/javascript">
  
$(document).ready(function(){
		$('#slider').kgimageslider({width:800,height:400});
	});

</script>
</pre>

use the same dom structure and retain the same class of the <code><UL></code> tag as it is crucial for the plugin to work.
<pre>
<div id="slider" >
<ul class="slider">
<li><img src="Rocky-Balboa1.jpg"></li>
<li><img  src="Sylvester_Stallone_in_Rocky_Balboa_Wallpaper.jpg"></li>
<li><img src="rocky-balboa-wallpaper-1.jpg"></li>
</ul>
</div>
</pre>
