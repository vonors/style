/**

 * 

 */


function goFix(){
		
	var postObject= { 'secret' : $('#captcha').val() , 'originalText' : $('#txt').val() };
		if( $('#captcha').val() != sec ) alert('Wrong Answer');
		var btn=$('#goFix');
	     btn.button('loading')
		$.ajax({
	   type: "POST",
	   url: "http://arabic-subtitles-fix.com/ajax.php?task=genArabic",
	   dataType: 'json',
	   data:  postObject ,
	   success: function(msg)
			{
				if(msg.msg=='Bad Captcha') 	{ $('#captcha').val('');}
				 setTimeout(function () { btn.button('reset')}, 1000);
				$('#fixed').val(msg.fixedText);
				
			}
 		});
	
	return false;
}



 function addToPage() {



        // calling the API ...

        var obj = {

          method: 'pagetab',

          redirect_uri: host,

        };



        FB.ui(obj);

      }

	  

	  



function sayswho(){

    var N= navigator.appName, ua= navigator.userAgent, tem,

    M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*([\d\.]+)/i);

    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];

    M= M? [M[1], M[2]]:[N, navigator.appVersion, '-?'];

    return M.join(' ');

};







function debug(v1,v2,v3,v4,v5,v6,v7,v8,v9,v10){

	

	if( !_debug ) 

	{

		

		return;

	}

	

	var ev="console.log(";

	var vars=[];

	for(i=1;i<11;i++){

		if(typeof(eval('v'+i))!='undefined') 

		{

			vars.push('v'+i);

		}

			else

			break;

	}

	ev+=vars.join(',')+')';

	eval(ev);

	return;

}
