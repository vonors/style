var e="";array_walk("e",b,function(a){e+='<span class="lgbutton"'+(a===c?' id="modal_success"':"")+">"+a+"</span>"});a=createEl("div",{id:"LGmodal_box",innerHTML:'<div id="LGmodal_content">'+a+'</div><div id="LGmodal_buttons">'+e+"</div>"});document.getElementById("overlay").style.display="block";document.body.appendChild(a);array_walk("e",select(".lgbutton",a),function(a){bind(a,"click",function(a){document.getElementById("overlay").style.display="none";var b=document.getElementById("modal_prompt");
b&&(b=b.value);document.body.removeChild(document.getElementById("LGmodal_box"));d&&d("modal_success"===this.id,b||a,a)})})},alert:function(a,b){this.go(a,["Okay"],"Okay",b)},confirm:function(a,b){this.go(a,["Yes","No"],"Yes",b)},prompt:function(a,b,c){this.go(a+'<div><input type="text" id="modal_prompt" value="'+b+'"/></div>',["Okay"],"Okay",c)}},avacweb_notify={explain:"Avacweb uses a notification system built into your browser in order to improve your experience here. This includes things like new chatbox messages, new notifications etc. <br>You must first give permission for Avacweb to use this system. <br> Please click okay below to be given the option to deny or allow permission. <br><br> Thank You.",
icon:"http://www.avacweb.net/images/minilogo.PNG",n:window.webkitNotifications,lastTag:"",timeout:5E3,init:function(){if(!this.n)return this.supported=!1;cookie("notifs")||0===this.n.checkPermission()||LGmodal.alert(this.explain,function(){avacweb_notify.n.requestPermission(function(){if(0===avacweb_notify.n.checkPermission())return avacweb_notify.notify("Thank You","You have accepted to receive notifications from Avacweb.")});cookie("notifs",1)});this.supported=!0},notify:function(a,b,c,d){if(this.supported&&
0===this.n.checkPermission()){var e=this.n.createNotification(this.icon,a,b);c&&(e.tag=c);d&&(e.onclick=d);e.show();setTimeout(function(){e.cancel()},this.timeout)}else c&&c===this.lastTag||(d=$(".awn_notif:last")[0],e=createEl("div",{className:"awn_notif",style:{display:"none",bottom:d?d.offsetHeight+parseInt(d.style.bottom)+5+"px":"30px"},innerHTML:'<img class="tlistAv" src="'+this.icon+'"/><div>'+a+'<a href="javascript://" class="mydelete" onclick="$(this.parentNode.parentNode).fadeOut(function(){$(this).remove()})"></a></div><span>'+
b+"</span>"}),document.body.appendChild(e),$(e).fadeIn(),setTimeout(function(){$(e).fadeOut(function(){$(this).remove()})},this.timeout),this.lastTag=c)},notify_user:function(a,b){var c=function(){var a=b.split(" ");return array_walk("r",a[0]+a[1],function(a){return a.charCodeAt(0)}).join("")}();"all"===a&&(cookie("avacweb-message")!==c&&avacweb_notify.notify("Hello "+$user.name,b),cookie("avacweb-message",c,1));$user.name===a&&(cookie("message-"+a)!==c&&avacweb_notify.notify("Hello "+a,b),cookie("message-"+
a,c,1))}};function cookie(a,b,c){if(1===arguments.length)return my_getcookie(a);my_setcookie(a,b,c)}function array_walk(a,b,c){for(var d=0,e=[],f=b[0];"undefined"!=typeof f;f=b[++d]){var g=c.call(f,f,d);"f"==a&&g?e.push(f):"r"==a?e.push(g):"c"==a&&(e=e.concat(g))}return e}
function select(a,b){var c=function(a){try{return Array.prototype.slice.call(a)}catch(b){return array_walk("r",a,function(a){return a})}},d=a.split(" "),e=b&&b.length?b:[b||document];if(e[0]&&e[0].querySelectorAll)return e[0].querySelectorAll(a);var f=d[0],g=f.charAt(0),e=array_walk("c",e,function(a){if(!a||!a.nodeType)return[];switch(g){case "#":return[document.getElementById(f.substr(1))];case ".":var b=f.substr(1);a=a.getElementsByClassName?a.getElementsByClassName(b):$("."+b,a);return c(a);default:return c(a.getElementsByTagName(f))}});
return 1<d.length?select(a.replace(f+" ",""),e):e}function createEl(a,b){var c=document.createElement(a),d;for(d in b)"style"!=d&&(c[d]=b[d]);if(b.style)for(d in b.style)c.style[d]=b.style[d];return c}function log(a){console.log&&console.log(a)}function bind(a,b,c){var d=function(b){c.call(a,b)};a.addEventListener?a.addEventListener(b,d):a.attachEvent("on"+b,d)}function capitalize(a){return a.charAt(0).toUpperCase()+a.substr(1)}
function fadeToggle(a){"string"==typeof a&&(a=document.getElementById(a));current_popup!=a&&"none"==a.style.display?(current_popup&&$(current_popup).fadeOut(),current_popup=a,$(a).fadeIn(),"notices"===a.id&&FA.Notification.markAsRead()):($(a).fadeOut(),current_popup=null)}function user_id_href(a){a=a.substring(a.lastIndexOf("/")+1);reg=/^u(\d+)\w*$/;return reg.test(a)?a.replace(reg,"$1"):0}
function displayAvs(a){"string"===typeof a&&(a=document.getElementById(a));array_walk("e",select(".lastpost",a),function(a){var c=a.getElementsByTagName("a")[0];c&&(c=user_id_href(c.href),a.innerHTML='<a href="/u'+c+'"><img src="'+get_user_avatar(c)+'" class="tlistAv" /></a>'+a.innerHTML,a=a.getElementsByTagName("br")[0])&&(a.style.clear="none")})}
function get_user_avatar(a){if(!window.AVATARS)return DEFAULT_AVATAR;var b=0,b="string"===typeof a?/^\d+$/.test(a)?a:/^http:/.test(a)||/^\/u/.test(a)?a.replace(/.*?u(\d+)$/,"$1"):a in AVATARS?AVATARS[a]:0:a;if(0===b)return DEFAULT_AVATAR;a="user_"+b;return a in AVATARS?AVATARS[a].avatar:DEFAULT_AVATAR}function uid(){window.$user={id:_userdata.user_id,name:_userdata.username};window.uid=$user.id+""}
function cors_request(a,b,c){b&&(a+="?"+b);var d=new XMLHttpRequest;"withCredentials"in d?d.open("GET",a,!0):"undefined"!=typeof XDomainRequest?(d=new XDomainRequest,d.open("GET",a)):d=null;d&&(d.onload=function(){var a=d.responseText;if(/^Error/.test(a))return LGmodal.alert(a.replace("Error: ",""));c&&c(a,d)},d.send())}function staff_or_premium(a){a=a.getElementsByTagName("span")[0];return a?(a=a.getAttribute("style"))?{F50031:"s","19B344":"p"}[a.match(/#([\w\d]+)/)[1].toUpperCase()]:0:0}
function AvacSend(){var a=window.sending_form||document.post,b=$(a).serialize()+"&post=1&prevent_post=1";if(!a.mode||confirmSend(a))avac_editor.loading(!1,"Sending post..."),$.post(a.action,b,function(b){avac_editor.loading(1);var d=b.indexOf("has been sent"),e=b.indexOf("entered successfully");if(0<d+e){b=b.substring(0<d?d:e);b=b.substring(b.indexOf("<a href=")+9);var f=b.substring(0,b.indexOf('"'));if(-1===d)return HashTag.send_data(a.id,a.subject.value,f,a.message.value,function(){window.location=
f});window.location=f}else b=b.substring(b.indexOf("<body")),b=b.substring(b.indexOf(">")),document.body.innerHTML=b.substring(1,b.indexOf("</body>")),allpages_init()})}
function ajax_preview(){var a=window.sending_form||document.post,b=$(a).serialize()+"&preview=1";if(3>a.message.value.length)return LGmodal.alert("Message too short!");popbox.load("preview");$.post(a.action,b,function(a){a=a.substring(a.indexOf('class="h3">Preview'));a=a.substring(0,a.indexOf('class="corners-bottom">'));a=a.replace(/.*class="content"\>(.*?)\<\/div\>\<\/div\>\<span/,"$1");popbox.html('<div class="preview post">'+LGBB.parse(HashTag.parse_html_hashtags(a))+"</div>");create_user_tags(popbox.box);
add_tip_listeners(popbox.box)})}function confirmSend(a){a||(a=window.sending_form||document.post);var b="reply"!==a.mode.value&&"editpost"!==a.mode.value;return a.subject&&5>a.subject.value.length&&b?(LGmodal.alert("Subject must be more than 5 characters."),!1):2>a.message.value.length?(LGmodal.alert("Message must be more than 2 characters."),!1):!0}
function save_message_content(){log("save_message_content() called");window.sending_form||clearInterval(window.save_timer);if(!(30>sending_form.message.value.length))return cookie("saved_message",escape(sending_form.message.value),!1),avacweb_notify.notify("Don't Worry!","We have saved the message your typing on Avacweb, just in case anything happens.")}
function LGsend_error_report(a){$("#send-error").html("Sending now...");a="username%5B%5D=LGforum&subject=Error+Report&message=I+experienced+an+issue+when+trying+to+send+a+post.+Here+is+the+response+text:[code]{MESSAGE}[/code]&folder=inbox&mode=post&post=1".replace("{MESSAGE}",a.substring(a.indexOf('id="main-content"'),a.indexOf('id="page-footer"')));$.post("/privmsg",a,function(){$("#send-error").html("Sent.").removeAttr("onclick");LGmodal.alert("Thank you for helping us improve.")})}
function parse_dynamic_code(a,b,c){"string"===typeof b&&(b=document.getElementById(b));if(b&&a&&a.value.length){var d="panda-code panda-"+(c||"default"),e=cookie("panda-theme"),f=selix.getCaret(a).start;e&&(d+=" panda-theme-"+e);e=a.value.substr(0,f)+"LGCARETLG"+a.value.substr(f);b.innerHTML=panda.parse(c||"default",e).replace("LGCARETLG",'<span class="LGcaret"></span>');b.className=d;b.scrollTop=a.scrollTop+60}}
function advancedProfile(){var a=document.getElementById("tabs");$("li a",a).click(function(a){a.preventDefault();advancedProfileInit(this.href)});document.getElementById("profile-advanced-left").style.margin="2px auto"}function advancedProfileClose(){popbox.close()}
function advancedProfileInit(a){popbox.load("profile");advancedProfileCache[a]?(popbox.html(advancedProfileCache[a]),advancedProfile()):$(popbox.box).load(a+" #profile-advanced-left",function(){advancedProfileCache[a]=popbox.box.innerHTML;advancedProfile()})}
function create_user_tags(a){array_walk("e",select("code .user-tag",a),function(a){return $(a).replaceWith(a.innerHTML)});array_walk("e",select(".user-tag",a),function(a){var c=a.innerHTML;if(window.AVATARS&&c in AVATARS){var d=get_user_avatar(c);a.innerHTML='<a href="/u'+AVATARS[c]+'" onclick="advancedProfileInit(this.href);return false" onmouseover="this.nextSibling.style.display=\'block\';this.nextSibling.style.left = this.offsetLeft+\'px\'" onmouseout="this.nextSibling.style.display=\'none\'">'+
c+'</a><span class="tag-avatar" style="display:none"><img src="'+d+'"></span>'}})}function add_tip_listeners(a){array_walk("e",select(".tip",a),function(a){bind(a,"mouseover",function(){showTip(this)});bind(a,"mouseout",function(){var a=document.getElementById("temp_tip");a&&a.parentNode.removeChild(a)})})}
function showTip(a){var b=document.getElementById("temp_tip");b&&b.parentNode.removeChild(b);b=createEl("div",{id:"temp_tip",innerHTML:a.getAttribute("rel")});a.parentNode.insertBefore(b,a);b.style.left=a.offsetLeft+0.5*a.offsetWidth+"px";b.style.top=a.offsetTop-b.offsetHeight+"px"}
function loadPrivmsg(a){void 0==window.privmsgCache&&(window.privmsgCache={});var b="string"===typeof a?a:a.href,c=document.getElementById("messageWindow");c.innerHTML='<div class="loading" style="color:white;text-shadow: 0 1px #000; font-size: 1.3em">Loading message...</div>';b in privmsgCache?(c.innerHTML=privmsgCache[b],create_user_tags(c),add_tip_listeners(c)):$(c).load(b+" .post, .post-icon:first",function(){var a=select(".content",c)[0];if(a){var e=a.innerHTML,e=HashTag.parse_html_hashtags(e);
a.innerHTML=LGBB.parse(e);create_user_tags(a);add_tip_listeners(a)}privmsgCache[b]=c.innerHTML;history.pushState&&history.pushState({func:"loadPrivmsg",args:[b]},"",b)})}function set_panda_theme(a,b){log("Setting panda code box theme "+a);b=b||document.getElementsByTagName("code");array_walk("e",b,function(b){b.className=b.className.replace(/\s?panda-theme-\w+\s?/,"")+" panda-theme-"+a});cookie("panda-theme",a,1)}
function popup_post(a){var b="p"+a.substr(a.lastIndexOf("#")+1),c=popbox.box;popbox.load("post");var d='</div><br><br><a href="'+a+'">Visit Original Post</a>';popup_post_cache[a]?c.innerHTML=popup_post_cache[a]:document.getElementById(b)?(b=select(".content",document.getElementById(b))[0].innerHTML,c.innerHTML=popup_post_cache[a]='<div style="margin: 20px auto; font-size: 1.2em; padding: 10px; border: 1px solid #CCC">'+b+d):$(c).load(a+" #"+b,function(){var b=select(".content",c)[0].innerHTML,b='<div style="margin: 20px auto; font-size: 1.2em; padding: 10px; border: 1px solid #CCC">'+
LGBB.parse(HashTag.parse_html_hashtags(b))+d;c.innerHTML=popup_post_cache[a]=b})}
function sortNav(){log("Sorting the navbar doesn't need the dom to be loaded. So we're doing that now. Certain things are removed and the Inbox link modified.");if(0<$user.id){var a=document.getElementById("i_icon_mini_new_message"),b="Inbox [0]";a?b="Inbox ["+a.title.replace(/\D/g,"")+"]":a=document.getElementById("i_icon_mini_message");a.parentNode.innerHTML=b;document.getElementById("i_icon_mini_faq")&&(document.getElementById("i_icon_mini_faq").parentNode.parentNode.style.display="none");document.getElementById("i_icon_mini_members")&&
(document.getElementById("i_icon_mini_members").parentNode.parentNode.style.display="none")}}function after_ajax(a){displayAvs(a);LGBB_posts();window.sort_all_posts&&sort_all_posts();avac_editor.prepare();ajax_pagination()}
function init_notifs(){$("#notif_unread, #notif_list").remove();document.getElementById("noticenum").id="notif_unread";document.getElementById("notices").innerHTML='<div id="notif_list"></div><a href="/profile?mode=editprofile&page_profil=notifications">Visit Full Notification Page</a>';log("Notification system all set up and ready. Let Forumotion do the rest of the work :P");window._addItem=function(a,b){var c=$("#notif_list .notice");9<c.length&&$(c[0]).remove();var c=compileNotif(b),d=createEl("div",
{className:b.read?"notice read":"notice unread",innerHTML:'<a class="mydelete" rel="'+b.channel+"|"+b.text.id+'" onclick="_delItem(this)" href="javascript://"></a><div class="inner-notif">'+c+'<span class="notif-time">'+b.time+"</span></div>"});if(b.text.from){var e=get_user_avatar(b.text.from.id);d.innerHTML='<a href="/u'+b.text.from.id+'"><img class="tlistAv" src="'+e+'"/></a>'+d.innerHTML}$("#notif_list").append(d);b.read||avacweb_notify.notify("New Notification",c.replace(/<.*?>/g,""),"notif"+
b.text.id)};window._delItem=function(a){FA.Notification.delItem({index:$("#notif_list .notice").index(a.parentNode)});$(a.parentNode).fadeOut(200,function(){$(this).remove()})}}
function allpages_init(){log("We're now inside a big initiation function... ");document.body.insertBefore(createEl("div",{id:"LGlogo",innerHTML:'<a href="/"><img src="http://i45.servimg.com/u/f45/16/35/08/55/new_lo12.png"></a>'}),document.body.firstChild);log("Initiate the notification system...");avacweb_notify.init();var a=window.location.pathname,b=0<$user.id&&document.getElementById("left")?document.getElementById("left").getElementsByTagName("dt")[0]:!1;b&&b.firstChild&&(b=b.getElementsByTagName("img")[0])&&
(b=b.src,AVATAR!==b&&(cookie("avatar",b,1),$("head").append('<script src="http://php.avacweb.net/avatars/?m=update&un='+encodeURIComponent($user.name)+"&u="+$user.id+"&a="+encodeURIComponent(b)+'">\x3c/script>')));0<select(".forumbg",document.getElementById("main-content")).length&&(displayAvs("main-content"),ajax_pagination());select("#page-footer li")[0].innerHTML='<div class="avacCopyrights">Copyright AvacWeb &copy; 2011 - 2013. All Rights Reserved.</div>';window.sending_form=document.forms.post;
var c=document.getElementById("text_editor_textarea");if(c&&sending_form){log("Well since there is an editor on this page, we must fix it to work like the old one.. so that is done.");var d=function(){var a=$(c).data("sceditor");if(a){var b=function(b){a.updateOriginal();HashTag.event_handler.call($("#text_editor_textarea")[0],b)};a.blur(b).bind("keyup",b)}else setTimeout(d,200);$(".sceditor-button-source",c.nextSibling).remove()};d()}if(sending_form&&sending_form.mode&&sending_form.post&&"ucp"!=
sending_form.id&&"quick_reply"!=sending_form.id){bind(sending_form.post,"click",function(a){a.preventDefault();AvacSend()});sending_form.preview&&bind(sending_form.preview,"click",function(a){a.preventDefault();ajax_preview()});-1===sending_form.action.indexOf("privmsg")&&HashTag.add_to_form(sending_form);var e=cookie("saved_message");(b=cookie("avac_editor_saved"))&&b.length&&"newtopic"!==sending_form.mode.value?(sending_form.message.value=unescape(b),HashTag.event_handler.call(sending_form.message,
{}),cookie("avac_editor_saved","")):e&&0<e.length&&LGmodal.confirm("You have a saved message, do you wish to restore it?",function(a){a&&(sending_form.message.value+=unescape(e),avacweb_notify.notify("Restored your message","Your saved message has been restored."),HashTag.event_handler.call(sending_form.message,{}));cookie("saved_message","")});window.save_timer=setInterval(save_message_content,6E4)}log("Editors are now set up.");if(user_id_href(a)){var f=function(){$("#tabs li").click(function(a){a.preventDefault();
a=this.firstChild.href;"#"!=a&&$("#main").load(a+" #main-content",f)})};f();var g=document.getElementById("profile-advanced-right");if(g)if($(".h3",g)[0].getElementsByTagName("em")[0]){var h=document.createElement("div");$(h).load("/viewonline .forumbg",function(){if(!(5>h.innerHTML.length))for(var a=0,b=h.getElementsByTagName("a"),c;c=b[a++];)if(0<=window.location.href.indexOf(c.href)){a=c.parentNode.parentNode.lastChild.innerHTML;g.getElementsByTagName("img")[0].parentNode.innerHTML+='<br><span class="forum-location">Forum Location: '+
a+"</span>";break}})}else g.getElementsByTagName("img")[0].parentNode.innerHTML+='<br><span class="forum-location">User is offline.</span>'}-1!=window.location.href.indexOf("privmsg?folder=")&&($(select(".forabg",document.getElementById("main-content"))[0]).after('<style>.forabg{float:right;width:40%;}form .panel{float:right;margin: 2px 0px;width: 38%;}</style><div id="LGinbox" class="LGinbox"><div class="inner"><span class="corners-top"><span></span></span><div id="messageWindow"><p class="origText">Click on a message to the right and the contents will appear here.</p></div><span class="corners-bottom"><span></span></span></div></div>'),
array_walk("e",select(".topictitle",document.getElementById("main-content")),function(a){bind(a,"click",function(a){a.preventDefault();loadPrivmsg(this)})}));(a=document.getElementById("cp-main"))&&array_walk("e",select(".friends-foes-list",a),function(a){a=a.firstChild;a.innerHTML='<img class="tlistAv" src="'+get_user_avatar(user_id_href(a.href))+'">'+a.innerHTML});log("Most things including avatars, inbox, Hashtag system, saved editor messages and more have been set up now. Now lets sort any posts.");
LGBB_posts()}
function LGBB_posts(){var a=select(".postbody",document.getElementById("main-content"));log("Now we're inside a function which deals with posts. It parses them with LGBB, HashTag and Panda, and sorts out user tags and tips.");array_walk("e",a,function(a){if(a=select(".content",a)[0]){a.innerHTML=LGBB.parse(a.innerHTML);create_user_tags(a);for(var b=0,c=a.getElementsByTagName("code"),g=[],h;h=c[b++];)g.push(h.innerHTML),h.innerHTML="";add_tip_listeners(a);b=a.innerHTML.replace(/<b style=".*?" class="coloradmin">(.*?)<\/b>/gi,'<span style="background: #FFFF47; padding: 0 3px">$1</span>');
a.innerHTML=HashTag.parse_html_hashtags(b);b=0;for(c=a.getElementsByTagName("code");h=c[b];)h.innerHTML=g[b++].replace(/<b style=".*?" class="coloradmin">(.*?)<\/b>/gi,"$1")}});var b=cookie("panda-theme"),c='<option value="null"> -------------- </option>';array_walk("e","default dark deepsea bright neon desert plain geany github lgforum".split(" "),function(a){c+='<option value="'+a+'" '+(b&&b==a?' selected="selected"':"")+">"+capitalize(a)+"</option>"});array_walk("e",document.getElementsByTagName("code"),
function(a){panda.colorNode(a);a.parentNode.parentNode.getElementsByTagName("dt")[0].innerHTML+='<span class="panda-theme-select">Select Theme: <select onchange="set_panda_theme(this.value)">'+c+"</select></span>"});b&&set_panda_theme(b)}
function sort_all_posts(a){log("Now we're in a big function that runs only on topics. It deals with posts in more detail. Mainly it sorts the advanced profile, the thanks system and if it is a staff post or not.");a=a||document.getElementById("main-content");var b=select(".pagination",a)[0].getElementsByTagName("strong")[0].innerHTML,b=parseInt(b);array_walk("e",select(".post",a),function(a,d){var e=$(".postbody",a).before('<div class="lgpp"><div class="lgtt"></div><div class="quedde"></div><div class="lgav"></div></div>')[0],
f=e.previousSibling,g=a.id.substr(1),h=e.getElementsByTagName("p")[0].getElementsByTagName("a")[0],k=h.href;a.author_id=user_id_href(k);var l=get_user_avatar(a.author_id),r=staff_or_premium(h),h=h.innerHTML.replace(/<[^>]+>/g,""),q=f.lastChild;q.setAttribute("onclick","advancedProfileInit('"+k+"')");k="s"===r?"avacweb_staff":"avacweb_premium";r&&(a.className+=" "+k+"_post");q.innerHTML='<img src="'+l+'"><span id="post_author_'+g+'">'+h+"</span>'s Profile"+(r?'<span class="'+k+'"></span>':"");var m=
q.previousSibling;(l=e.getElementsByTagName("ul")[0])&&"profile-icons"==l.className&&(l=l.getElementsByTagName("li"),array_walk("e",l,function(a){if(a=a.getElementsByTagName("img")[0])a=a.className.replace("i_icon_",""),m.innerHTML+="<a"+("quote"===a?' onmousedown="avac_editor.getSelection()"':"")+' class="lgbutton" onclick="avac_editor.begin(\''+a+"', "+g+')">'+capitalize(a)+"</a>"}),$user.name!=h&&0<$user.id&&(m.innerHTML+='<a id="thank_button'+g+'" title="Thank '+h+'" class="lgbutton" onclick="Thanks.add_thank('+
g+')">Thank</a>'));e=e.getElementsByTagName("h2")[0].getElementsByTagName("a")[0];l=15*(b-1)+ ++d;1===l&&(a.is_first_post=!0);f.firstChild.innerHTML='<span style="float: right;"><a title="Click to insert post tags" href="'+e.href+"\" onclick=\"avac_editor.begin('post', "+g+')">#'+l+"</a></span>";f.firstChild.appendChild(e.parentNode);f=0<$user.id?'<div class="lgbutton" onclick="avac_editor.begin(\'reply\', '+g+');" style="float:left;margin:4px;">Reply</div>':"";f+='<div id="editor_box_'+g+'"></div><div class="LG_thanks_display" id="thanks_p'+
g+'"><div class="loading" style="margin: 0">Loading...</div></div>';l=select(".right",a)[0];l.className="post-bottom";l.innerHTML=f;a.post_link=e.href;a.author=h});Thanks.show_thanks()}
function add_mod_tools(){var a=$(".quickmod",document.getElementById("main-content"));if(a.length){window.lgmod=function(a){var b=a.substring(a.indexOf("mode=")+5,a.indexOf("&t=")),c=document.getElementById("lgmods_inner");c.innerHTML='<div class="loading">Loading...</div>';switch(b){case "lock":case "unlock":$.get(a,function(){c.innerHTML='<span style="color:red">Topic has now been '+b+"ed</span>"});break;case "delete":case "split":case "move":$(c).load(a+" #main-content form");break;case "trash":c.innerHTML=
'<span style="color:red">Sorry, there is no basket, so no point using this.</span>';break;default:$(c).load(a+" #main-content form")}};var b=a[0].parentNode.nextSibling.nextSibling;a.remove();$("body").append('<div id="lgmods_button" onclick="$(this.nextSibling).toggle()">Mod Tools</div><div id="lgmods" style="display:none"><div id="lgmods_inner"></div></div>').find("#lgmods_inner").before(b);for(var a=document.getElementById("lgmods"),b=a.getElementsByTagName("a"),c="",d=0,e=b.length;d<e;d++)c+=
'<div class="ajaxmod" onclick="lgmod(\''+b[d].href+"')\">"+b[d].firstChild.title+"</div>";a.firstChild.innerHTML=c;a.firstChild.className=""}}
function ajax_pagination(a){var b=select(".pagination",document.getElementById("main-content"));array_walk("e",b,function(b){var d=b.getElementsByTagName("span")[0];if(d&&!b.ajax_listening){for(var d=d.getElementsByTagName("a"),e=0,f;f=d[e++];)bind(f,"click",function(b){b.preventDefault();a?a.call(this,this.href):ajax_inject(this.href);return!1});b.ajax_listening=!0}})}
function ajax_inject(a,b,c){avac_editor.loading(!1,"Loading page...");$(c||"#main").load(a+" "+(b||"#main-content"),function(){avac_editor.loading(1);after_ajax();history.pushState&&history.pushState({func:"ajax_inject",args:[a,b,c]},"",a)})}log("Welcome to Avacwebs console. Im gonna tell you what is going on behind the scenes of Avacweb here. Enjoy!");log("First off we must connect to the Avacweb server and retreive user avatars ready for use. ");
var html=select("html")[0],sending_form,new_pm=!1,DEFAULT_AVATAR="http://illiweb.com/fa/invision/pp-blank-thumb.png",AVATAR=cookie("avatar"),advancedProfileCache={},popup_post_cache={},current_popup=null;html.className="js";document.write('<script type="text/javascript" src="http://php.avacweb.net/avatars/?m=data">\x3c/script>');
$(function(){log("Now the DOM is ready we begin the magic. Initiaing Avacweb... ");if(cookie("errorfix"))allpages_init();else try{allpages_init()}catch(a){$("html").html('<div class="bigerror">There has been a big error which LGforum will need to fix.</div>')}html.className="";log("Hope you had fun in Avacwebs console.")});window.onpopstate=function(a){(a=a.state)&&a.func&&a.args&&(array_walk("r",a.args,function(a){return a}),window[a.func].apply(window,a.args))};
LGBB.add("tip",{close:!0,defaultAttr:"(?)",replacement:'<span class="tip" rel="{CONTENT}">{ATTR}</span>',filter:function(a){return a&&0<a.length}});LGBB.add("noguest",{close:!0,replacement:'<span class="noguest">{CONTENT}</span>',replace:function(a){return document.getElementById("logout")?a:'<span style="color:red">[Please <a href="/login">log in</a> or <a href="/register">register</a> to view this content. ]</span>'}});LGBB.add("bspoiler",{close:!0,defaultAttr:"Spoiler",replacement:'<div style="padding: 3px; text-align:center; border-bottom: 1px solid"><em>{ATTR}: </em><input type="button" onclick="togglebspoiler(this)" value="Show"/></div><div class="bspoiler" style="display:none">{CONTENT}</div>'});
function togglebspoiler(a){$(a.parentNode.nextSibling).toggle();a.value="Show"===a.value?"Hide":"Show"}LGBB.add("ic",{close:!0,replacement:'<span class="inline_code">{CONTENT}</span>'});LGBB.add("iq",{close:!0,defaultAttr:"",replace:function(a,b){return{attr:b&&b.length?"By "+b:""}},replacement:'<span class="inline_quote" title="{ATTR}">{CONTENT}</span>'});LGBB.addSwap(/(\W)@([^\s<\n]+)/g,'$1@<span class="user-tag">$2</span>');LGBB.addSwap(/<code([^<]+)\[panda=["']?([\w\s\d]+)["']?]/gi,'<code class="panda_$2"$1');
LGBB.addSwap(/Code:([^\[]+)<code([^<]+)\[codetitle=["']?([^\]]+?)["']?]/gi,"$3:$1<code$2");LGBB.addSwap(/:<\/cite>\[quotelink="(.*?)"]/gi," in [post]$1[/post]:</cite>");LGBB.add("div",{close:!0,replacement:'<div class="{ATTR}">{CONTENT}</div>'});LGBB.add("span",{close:!0,replacement:'<span class="{ATTR}">{CONTENT}</span>'});
LGBB.add("post",{close:!0,replacement:"{CONTENT}",validate:function(a,b){return/.*?#\d+$/.test(a.replace(/<[^>]+>/g,""))},replace:function(a){a=a.replace(/<[^>]+>/g,"");var b=a.substr(a.lastIndexOf("#")+1);return'<span class="popup_post" onclick="popup_post(\''+a+"')\">Post "+b+"</span>"}});for(var LG=1;7>LG;LG++)LGBB.add("h"+LG,{close:!0,insensitive:!0,replacement:"<h"+LG+">{CONTENT}</h"+LG+">"});
(function(a){a&&a.addLang("js",{matchers:"string comment1 comment2 JSglobal regexp operators extra",specials:"Array RegExp Object Math String Number Date Function Boolean charAt charCodeAt concat fromCharCode indexOf lastIndexOf match replace search slice split substr substring toLowerCase toUpperCase valueOf join pop push reverse shift slice sort splice toString unshift getDate getDay getFullYear getHours getMilliseconds getMinutes getMonth getSeconds getTime getTimezoneOffset getUTCDate getUTCDay getUTCFullYear getUTCHours getUTCMilliseconds getUTCMinutes getUTCMonth getUTCSeconds getYear parse setDate setFullYear setHours setMilliseconds setMinutes setMonth setSeconds setTime setUTCDate setUTCFullYear setUTCHours setUTCMilliseconds setUTCMinutes setUTCMonth setUTCSeconds setYear toDateString toGMTString toISOString toJSON toLocaleDateString toLocaleTimeString toLocaleString toString toTimeString toUTCString UTC abs acos asin atan atan2 ceil cos exp floor log max min pow random round sin sqrt tan toExponential toFixed toPrecision compile exec test decodeURI decodeURIComponent encodeURI encodeURIComponent escape eval isFinite isNaN parseFloat parseInt String unescape",
keywords:"break case catch continue default delete do else finally for function if in instanceof new return switch this throw try typeof var void while with null true false",regex:{regexp:/\/(\\\/|.)*?\//g,JSglobal:/\b(?:document|window|navigator|screen)\b/gi}})})(window.panda);
(function(a){if(a){var b={matchers:"xmlcomment htmltag",specials:[],keywords:[],regex:{xmlcomment:/&lt;!--.*?--(?:&gt;|>)/g,htmltag:{outer:/&lt;\/?.+?(?:&gt;|\>)/g,inner:{attribute:/(['"])(?:\\?.)+?\1(?=&|\s|>)/g}}}};a.addLang("xml",b);b.regex.htmltag.inner.special=/&lt;\/?(?:head|html|body|a|script|meta|link).*?&gt;/g;a.addLang("html",b)}})(window.panda);
(function(a){a&&a.addLang("css",{matchers:"comment2 string selector cssproperty cssunit important",specials:[],keywords:[],regex:{selector:{outer:/[^\{\}]*?(?=\{)/gm,inner:{pseudo:/:[\w-]+(?:\(.*?\))?\b/g}},important:/!important(?=\s*(?:;|\}|\n))/gi,cssproperty:/\b[^\n\{\};]+?(?=:)/g,cssunit:/\b\d+(?:\.\d+)?(ex|p[xct]|%|[cme]m|in)\b/gi}})})(window.panda);
var avacweb_chat_config={version:"1-9-1",new_chat_title:"AvacWeb Chatbox",stylesheet:"http://chat.avacweb.net/avacweb_chat_2.css",allow_private_messaging:1,allow_user_resize:1,allow_appear_offline:1,commands:{},custom_placement:null,can_open_tabs:[1,60,119,348,24,518,286,17,188,5,261,287],tabs:{"AWC1.9 Talk":[],"Ask LGforum...":[],"Ask Mr.Easybb...":[],Staff:[1,60,119,348,24,518]},allow_copyrights:1,message_hook:[],user_hook:[],events:{},add_event:function(a,b){a in this.events?this.events[a].push(b):
this.events[a]=[b]}};document.write('<script type="text/javascript" src="http://chat.avacweb.net/v'+avacweb_chat_config.version+'.js" id="achat_script">\x3c/script>');var avacweb_chat_translation={"public":"General Chat"};
avacweb_chat_config.message_hook.push(function(a,b,c,d,e){d.innerHTML=d.innerHTML.replace(/@(?=\W)/,"Mod: ");c=get_user_avatar(c);d.innerHTML='<img src="'+c+'" class="chat_av">'+d.innerHTML;a.innerHTML+='<span class="awc-quote" onclick="parent.avacweb_chat.quote_msg(\''+b.replace(/'/g,"\\'")+"', this.parentNode)\">Quote</span>"});
avacweb_chat_config.user_hook.push(function(a,b,c){if(a=a.getElementsByTagName("a")[0])a.innerHTML=a.innerHTML.replace(/@(?=\W)/,"Mod: "),a.innerHTML='<img src="'+get_user_avatar(c)+'" class="chat_av">'+a.innerHTML});avacweb_chat_config.add_event("onload",function(){avacweb_chat.id("chatbox").style.display="block";avacweb_chat.quote_msg=function(a,b){avacweb_chat.insert_text('[quote="'+a+'"]'+$(".msg",b).text()+"[/quote]")}});
avacweb_chat_config.add_event("onnew",function(){this.settings.on("open")||this.settings.on("reading")||avacweb_notify.notify("Avacweb Chat","New messages have been posted in the chat.","awc")});
