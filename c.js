/**
 * Program part
 r: requires 
 w: write...
 ts: tag as string
 */

var TEST={toto:"toto"};
var header;

var log=function(msg){
	console.log(msg);
}

function init(){
//load page 0
		console.log('test C');
		console.log(TEST.toto);
		I18N.loadI18n('example');
		//alert(I18N.example.test);
		log('PAGE 0');
		docw(t('h1', 'hello')+t('button','','onclick="doShow()"'),'');
		
}



function doShow(){
//load page 1	
	//reload because of suicide of document.write
	header = r('js/js-yaml.js')+
	r('js/i18n.js')+
	r('b.js')+
	r('c.js');
	//loads yaml as js
	I18N.loadI18n('page');
	//then js as html
	var  text= js2Html(I18N.page);
	console.log(text);
	log('PAGE 1');
	docw(header,text);
	//tw('button','test1','onclick="doShow()"');
	//tw('button','test2','onclick="show2()"');
	//close stream, (autoclosed in html loading) note that Chrome supports not closed document, but not firefox.
	
}
function show2(){
//load page 2
 w('toto');
}
function page(no){
//load page 2
 docw(header,js2Html(I18N.getI18n(no)));
}


/**
 * best compiler ever: from js to html
 */
function js2Html(elem, attributes){
	if (typeof (elem) === 'string') return elem;
	var res='';
	for(var i in elem){
		if(isNaN(i)){
			//hack for attributes
			if(attributes){
			    if(i==='text')
					res += js2Html(elem[i]);
				else
					attributes.mutable += i+'="'+elem[i]+'" '
			}else{
				var innerAtt={mutable:''};
				var recur=js2Html(elem[i],innerAtt );
				//var recur=js2Html(elem[i]);
				res += t(i,recur,innerAtt.mutable);
			}
		}else{
			res += js2Html(elem[i]);
		}
	}
	return res
}

(function(){
  t('button','from c','onclick="doShow()"');
}() )