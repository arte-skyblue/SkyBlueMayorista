////////////////////////////////////////////////////////////////////////////////////////////////////////
// coreFunctionsv2.js  —  versión iPN2 / jQuery 4 de coreFunctions.js.
// La usan SOLO las páginas de secure/ modernizadas al stack iPN2 (jQuery 4 + Tippy/Choices/jQuery UI).
// El original coreFunctions.js queda intacto para las páginas legacy (jQuery 1.12.4).
// Diferencia clave vs. el original: sin APIs removidas por jQuery 4 (.bind/.unbind → .on/.off, $.trim → String.trim).
// NO usar en páginas legacy. Mantener sincronizado con la modernización iPN2.
////////////////////////////////////////////////////////////////////////////////////////////////////////
// Begin Region Public Functions ///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

	function formatMoney(strValue){
		strValue = strValue.toString().replace(/\$|\,/g,'');
		dblValue = parseFloat(strValue);
		blnSign = (dblValue == (dblValue = Math.abs(dblValue)));
		dblValue = Math.floor(dblValue*100+0.50000000001);
		intCents = dblValue%100;
		strCents = intCents.toString();
		dblValue = Math.floor(dblValue/100).toString();
		if(intCents<10)
			strCents = "0" + strCents;
		for (var i = 0; i < Math.floor((dblValue.length-(1+i))/3); i++)
			dblValue = dblValue.substring(0,dblValue.length-(4*i+3))+'.'+
			dblValue.substring(dblValue.length-(4*i+3));
		return (((blnSign)?'':'-') + '$ ' + dblValue + ',' + strCents);
	}

	// ******************************************************************************************************
	// Comment: Funcion utilizada para foramtear string a currency.
	//          Requiere de: none.
	function formatCurrency(strValue){
		strValue = strValue.toString().replace(/\$|\,/g,'');
		dblValue = parseFloat(strValue);
		blnSign = (dblValue == (dblValue = Math.abs(dblValue)));
		dblValue = Math.floor(dblValue*100+0.50000000001);
		intCents = dblValue%100;
		strCents = intCents.toString();
		dblValue = Math.floor(dblValue/100).toString();
		if(intCents<10)
			strCents = "0" + strCents;
		for (var i = 0; i < Math.floor((dblValue.length-(1+i))/3); i++)
			dblValue = dblValue.substring(0,dblValue.length-(4*i+3))+','+
			dblValue.substring(dblValue.length-(4*i+3));
		return (((blnSign)?'':'-') + '$ ' + dblValue + '.' + strCents);
	}

	function getCurrencyDescByID(currencyID){
		switch (currencyID){
			case '1':
				strSymbol = 'Peso argentino';
				break;
			case '2':
				strSymbol = 'Dólar estadounidense';
				break;
			case '3':
				strSymbol = 'Euro';
				break;
			case '4':
				strSymbol = 'Real brasileño';
				break;
			case '5':
				strSymbol = 'Peso uruguayo';
				break;
			case '6':
				strSymbol = 'Unidad indexada';
				break;
			case '7':
				strSymbol = 'Peso boliviano';
				break;
			case '8':
				strSymbol = 'Sol';
				break;
			case '9':
				strSymbol = 'Peso colombiano';
				break;
			case '10':
				strSymbol = 'Peso chileno';
				break;
			case '12':
				strSymbol = 'Güaraní';
				break;
			case '13':
				strSymbol = 'Peso mexicano';
				break;
			default:
				strSymbol = 'Peso argentino';
		}
		return strSymbol;
	}
	// ******************************************************************************************************
	// Comment: Funcion utilizada para foramtear string a currency por CurrencyID.
	//          Requiere de: none.
	function formatCurrencyByID(currencyID,strValue){
		//var strSymbol = '';
		switch (currencyID){
			case '2':
				strSymbol = 'U$S ';
				break;
			case '3':
				strSymbol = '&euro; ';
				break;
			case '4':
				strSymbol = 'R$ ';
				break;
			case '5':
				strSymbol = '$ ';
				break;
			default:
				strSymbol = '$ ';
		}
		// AV: 2026-08-08: JAVASCRIPT-90 — evitar TypeError si strValue viene undefined/null
		if (strValue === undefined || strValue === null || strValue === '') {
			strValue = 0;
		}
		strValue = strValue.toString().replace('U$S','')
		strValue = strValue.toString().replace('&euro;','')
		strValue = strValue.toString().replace('R$','')
		strValue = strValue.toString().replace('$','')
		strValue = strValue.toString().replace(/\$|\,/g,'');
		dblValue = parseFloat(strValue);
		
		blnSign = (dblValue == (dblValue = Math.abs(dblValue)));
		
		dblValue = Math.floor(dblValue * 100 + 0.50000000001);//Math.floor( 
		intCents = dblValue % 100;
		
		strCents = intCents.toString();
		dblValue = Math.floor(dblValue/100).toString();
		if(intCents<10)
			strCents = "0" + strCents;
		for (var i = 0; i < Math.floor((dblValue.length-(1+i))/3); i++)
			dblValue = dblValue.substring(0,dblValue.length-(4*i+3))+','+
			dblValue.substring(dblValue.length-(4*i+3));
		return (((blnSign)?'':'-') + strSymbol + dblValue + '.' + strCents);
	}
	// AV: 2026-08-08: JAVASCRIPT-90 — pin explícito en window (Handlebars helpers / scripts externos)
	if (typeof window !== "undefined") { window.formatCurrencyByID = formatCurrencyByID; }


	function formatCurrency4D(strValue) {
	    strValue = strValue.toString().replace(/\$|\,/g, '');
	    dblValue = parseFloat(strValue);
	    blnSign = (dblValue == (dblValue = Math.abs(dblValue)));
	    dblValue = Math.floor(dblValue * 10000);
	    intCents = dblValue % 10000;
	    strCents = intCents.toString();
	    dblValue = Math.floor(dblValue / 10000).toString();
	    if (intCents < 1000)
	        strCents = "0" + strCents;
	    for (var i = 0; i < Math.floor((dblValue.length - (1 + i)) / 3) ; i++)
	        dblValue = dblValue.substring(0, dblValue.length - (4 * i + 3)) + ',' +
			dblValue.substring(dblValue.length - (4 * i + 3));
	    return (((blnSign) ? '' : '-') + '$ ' + dblValue + '.' + strCents);
	}

	function formatCurrencyByID4D(currencyID, strValue) {
	    //var strSymbol = '';
	    switch (currencyID) {
	        case '2':
	            strSymbol = 'U$S ';
	            break;
	        case '3':
	            strSymbol = '&euro; ';
	            break;
	        case '4':
	            strSymbol = 'R$ ';
	            break;
	        default:
	            strSymbol = '$ ';
	    }
	    strValue = strValue.toString().replace('U$S', '')
	    strValue = strValue.toString().replace('&euro;', '')
	    strValue = strValue.toString().replace('R$', '')
	    strValue = strValue.toString().replace(/\$|\,/g, '');
	    dblValue = parseFloat(strValue);

	    blnSign = (dblValue == (dblValue = Math.abs(dblValue)));

	    dblValue = Math.floor(dblValue * 10000);//Math.floor( + 0.50000000001
	    
	    intCents = dblValue % 10000;
	    strCents = intCents.toString();
	    dblValue = Math.floor(dblValue / 10000).toString();
	    if (intCents < 1000)
	        strCents = "0000" //ML + JM 07/08/2015 :: Si el resto es 0 entonces ponemos los 4 0
	    for (var i = 0; i < Math.floor((dblValue.length - (1 + i)) / 3) ; i++)
	        dblValue = dblValue.substring(0, dblValue.length - (4 * i + 3)) + ',' +
			dblValue.substring(dblValue.length - (4 * i + 3));
	    return (((blnSign) ? '' : '-') + strSymbol + dblValue + '.' + strCents);
	}
    
// ******************************************************************************************************
// JM: 14/07/2014 Funcion utilizada para aplicar la siguiente funcion, en base a los decimales seleccionados como redondeo.
//CA::2018-04-24:: Agrego currencyFormat para formatear con comas para los decimales.
	function formatCurrencySelect(decimals, currencyID, strValue, currencyFormat) {
	    if (decimals == 2)
	    {
	    	//if (currencyFormat == 0)
	        	return formatCurrencyByID(currencyID, strValue);
	        //else
	        //	return formatMoneyCurrencyByID(currencyID, strValue);
	    }
	    else
	    {
	        return formatCurrencyByID4D(currencyID, strValue);
	    }

	}

	// ******************************************************************************************************
	// Comment: Funcion utilizada para aplicar colores a objetos.
	//          Requiere de: none.
	function applyColor(obj){
		obj.style.background = "#FFFDE9";
	}
	function restoreColor(obj){
		obj.style.background = "#FFFFFF";
	}
	
	function applyColorToCss(obj, cssClass){
		obj.style.background = "#FFFDE9";
		obj.className = cssClass;
	}
	
	function restoreColorToCss(obj, cssClass){
		obj.className = cssClass;
	}
	// ******************************************************************************************************
	// Comment: Funcion utilizada para tomar datos e cookie
	//         
	function getCookie(cookieName){ 
		var cookieValue = '';
		var posName = document.cookie.indexOf(escape(cookieName) + '=');
		if (posName != -1) {
			var posValue = posName + (escape(cookieName) + '=').length;
			var endPos = document.cookie.indexOf(';', posValue);
			if (endPos != -1) cookieValue = unescape(document.cookie.substring(posValue, endPos));
			else cookieValue = unescape(document.cookie.substring(posValue));
		}else{
		   cookieValue  = '0'; 
		}
		return (cookieValue);
	}

	function setCookie(cookieName, cookieValue ){
		document.cookie = escape(cookieName) + '=' + escape(cookieValue);
	}
	
	function clearCookies (){
		var expirationDate = new Date();
		expirationDate.setYear(expirationDate.getFullYear - 1);
		expirationDate = expirationDate.toGMTString();

		var dc = document.cookie;
		var tempString = "";
		var tempChar;
		var count = 0;
		var cookieLength = dc.length;

		while (count < cookieLength) {
			tempChar = dc.charAt(count);
			if (tempChar == '=') {
				if (tempString.indexOf('tr_') != -1) {
					document.cookie = tempString + "=0; expires= " + expirationDate;
				}
				tempString = "";
			}
			if (tempChar == ';') {
				tempString = "";
			} 
			if (tempChar != '=' && tempChar != ';' && tempChar != " ") {
				tempString += tempChar;
			}
			
			count += 1;
		}	
	}
////////////////////////////////////////////////////////////////////////////////////////////////////////
	function scrollToElement (target) {
        $('html, body').animate({
            scrollTop: ($("#" + target).offset().top - 200) //AG::27-01-2014::Movemos la scrollbar hasta la posición del elemento
        }, 500);
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////
	function Left(str, n){
		if (n <= 0)
			return "";
		else if (n > String(str).length)
			return str;
		else
			return String(str).substring(0,n);
	}

   function Right(str, n){
		if (n <= 0)
		   return "";
		else if (n > String(str).length)
		   return str;
		else {
		   var iLen = String(str).length;
		   return String(str).substring(iLen, iLen - n);
		}
	}

	function trim(stringToTrim) {
		// AV: 2026-07-27: JAVASCRIPT-74 — evita TypeError si llega undefined/null
		if (stringToTrim == null) return "";
		return String(stringToTrim).replace(/^\s+|\s+$/g, "");
	}
	function ltrim(stringToTrim) {
		// AV: 2026-07-27: JAVASCRIPT-74 — evita TypeError si llega undefined/null
		if (stringToTrim == null) return "";
		return String(stringToTrim).replace(/^\s+/, "");
	}
	function rtrim(stringToTrim) {
		// AV: 2026-07-27: JAVASCRIPT-74 — evita TypeError si llega undefined/null
		if (stringToTrim == null) return "";
		return String(stringToTrim).replace(/\s+$/, "");
	}

	// AV: 2026-07-27: JAVASCRIPT-74 — TypeError: Cannot read properties of undefined (reading 'split')
	// En producción (secure/support/default.asp → checkSubmit) se llamaba con undefined porque
	// los selectores apuntaban a #dateFrom/#dateTo (inexistentes) en vez de #dateFromFilter/#dateToFilter.
	// Guardamos str vacío/null/undefined y formatos incompletos para no romper el submit.
	function parseDateFromChr(str) {
		if (str == null || String(str).trim() === "") {
			return null;
		}
		var mdy = String(str).split('/');
		if (mdy.length < 3) {
			return null;
		}
		return new Date(mdy[2], mdy[1] - 1, mdy[0]);
	}

	function monthDiff(first, second) {
		// AV: 2026-07-27: JAVASCRIPT-74 — misma guarda que parseDateFromChr (no .split sobre undefined)
		if (first == null || second == null || String(first).trim() === "" || String(second).trim() === "") {
			return 0;
		}
		var firstDate = String(first).split('/');
		var secondDate = String(second).split('/');
		if (firstDate.length < 3 || secondDate.length < 3) {
			return 0;
		}

		var yearAdd = (parseInt(secondDate[2], 10) - parseInt(firstDate[2], 10)) * 12;

		return ((parseInt(secondDate[1], 10) + yearAdd) - firstDate[1]);
	}

	function daydiff(first, second) {
		return (second - first) / (1000 * 60 * 60 * 24)
	}
////////////////////////////////////////////////////////////////////////////////////////////////////////
// End Region Public Functions ///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
//    * Browser name: BrowserDetect.browser
//    * Browser version: BrowserDetect.version
//    * OS name: BrowserDetect.OS
////////////////////////////////////////////////////////////////////////////////////////////////////////

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();


////////////////////////////////////////////////////////////////////////////////////////////////////////

function IsInteger(sText)
{
	var ValidChars = "0123456789";
	var IsNumber = true;
	var Char;

	for (i = 0; i < sText.length && IsNumber == true; i++) 
	{ 
		Char = sText.charAt(i); 
		if (ValidChars.indexOf(Char) == -1) 
		{
			IsNumber = false;
		}
	}

	return IsNumber;
}

function ReplaceAlphaChars(inputString)
{
  // AV: 2026-07-27: JAVASCRIPT-74 — no .replace sobre undefined/null
  if (inputString == null) return "";
  return String(inputString).replace(/\D/g,"");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

function HtmlDecode(s) {
	var out = "";
	if (s == null) return;
	var l = s.length;

	for (var i = 0; i < l; i++) {
		var ch = s.charAt(i);
		if (ch == '&') {
			var semicolonIndex = s.indexOf(';', i + 1);
			if (semicolonIndex > 0) {
				var entity = s.substring(i + 1, semicolonIndex);
				if (entity.length > 1 && entity.charAt(0) == '#') {
					if (entity.charAt(1) == 'x' || entity.charAt(1) == 'X')
						ch = String.fromCharCode(eval('0' + entity.substring(1)));
					else
						ch = String.fromCharCode(eval(entity.substring(1)));
				}
				else {
					switch (entity) {
						case 'quot': ch = String.fromCharCode(0x0022); break;
						case 'amp': ch = String.fromCharCode(0x0026); break;
						case 'lt': ch = String.fromCharCode(0x003c); break;
						case 'gt': ch = String.fromCharCode(0x003e); break;
						case 'nbsp': ch = String.fromCharCode(0x00a0); break;
						case 'iexcl': ch = String.fromCharCode(0x00a1); break;
						case 'cent': ch = String.fromCharCode(0x00a2); break;
						case 'pound': ch = String.fromCharCode(0x00a3); break;
						case 'curren': ch = String.fromCharCode(0x00a4); break;
						case 'yen': ch = String.fromCharCode(0x00a5); break;
						case 'brvbar': ch = String.fromCharCode(0x00a6); break;
						case 'sect': ch = String.fromCharCode(0x00a7); break;
						case 'uml': ch = String.fromCharCode(0x00a8); break;
						case 'copy': ch = String.fromCharCode(0x00a9); break;
						case 'ordf': ch = String.fromCharCode(0x00aa); break;
						case 'laquo': ch = String.fromCharCode(0x00ab); break;
						case 'not': ch = String.fromCharCode(0x00ac); break;
						case 'shy': ch = String.fromCharCode(0x00ad); break;
						case 'reg': ch = String.fromCharCode(0x00ae); break;
						case 'macr': ch = String.fromCharCode(0x00af); break;
						case 'deg': ch = String.fromCharCode(0x00b0); break;
						case 'plusmn': ch = String.fromCharCode(0x00b1); break;
						case 'sup2': ch = String.fromCharCode(0x00b2); break;
						case 'sup3': ch = String.fromCharCode(0x00b3); break;
						case 'acute': ch = String.fromCharCode(0x00b4); break;
						case 'micro': ch = String.fromCharCode(0x00b5); break;
						case 'para': ch = String.fromCharCode(0x00b6); break;
						case 'middot': ch = String.fromCharCode(0x00b7); break;
						case 'cedil': ch = String.fromCharCode(0x00b8); break;
						case 'sup1': ch = String.fromCharCode(0x00b9); break;
						case 'ordm': ch = String.fromCharCode(0x00ba); break;
						case 'raquo': ch = String.fromCharCode(0x00bb); break;
						case 'frac14': ch = String.fromCharCode(0x00bc); break;
						case 'frac12': ch = String.fromCharCode(0x00bd); break;
						case 'frac34': ch = String.fromCharCode(0x00be); break;
						case 'iquest': ch = String.fromCharCode(0x00bf); break;
						case 'Agrave': ch = String.fromCharCode(0x00c0); break;
						case 'Aacute': ch = String.fromCharCode(0x00c1); break;
						case 'Acirc': ch = String.fromCharCode(0x00c2); break;
						case 'Atilde': ch = String.fromCharCode(0x00c3); break;
						case 'Auml': ch = String.fromCharCode(0x00c4); break;
						case 'Aring': ch = String.fromCharCode(0x00c5); break;
						case 'AElig': ch = String.fromCharCode(0x00c6); break;
						case 'Ccedil': ch = String.fromCharCode(0x00c7); break;
						case 'Egrave': ch = String.fromCharCode(0x00c8); break;
						case 'Eacute': ch = String.fromCharCode(0x00c9); break;
						case 'Ecirc': ch = String.fromCharCode(0x00ca); break;
						case 'Euml': ch = String.fromCharCode(0x00cb); break;
						case 'Igrave': ch = String.fromCharCode(0x00cc); break;
						case 'Iacute': ch = String.fromCharCode(0x00cd); break;
						case 'Icirc': ch = String.fromCharCode(0x00ce); break;
						case 'Iuml': ch = String.fromCharCode(0x00cf); break;
						case 'ETH': ch = String.fromCharCode(0x00d0); break;
						case 'Ntilde': ch = String.fromCharCode(0x00d1); break;
						case 'Ograve': ch = String.fromCharCode(0x00d2); break;
						case 'Oacute': ch = String.fromCharCode(0x00d3); break;
						case 'Ocirc': ch = String.fromCharCode(0x00d4); break;
						case 'Otilde': ch = String.fromCharCode(0x00d5); break;
						case 'Ouml': ch = String.fromCharCode(0x00d6); break;
						case 'times': ch = String.fromCharCode(0x00d7); break;
						case 'Oslash': ch = String.fromCharCode(0x00d8); break;
						case 'Ugrave': ch = String.fromCharCode(0x00d9); break;
						case 'Uacute': ch = String.fromCharCode(0x00da); break;
						case 'Ucirc': ch = String.fromCharCode(0x00db); break;
						case 'Uuml': ch = String.fromCharCode(0x00dc); break;
						case 'Yacute': ch = String.fromCharCode(0x00dd); break;
						case 'THORN': ch = String.fromCharCode(0x00de); break;
						case 'szlig': ch = String.fromCharCode(0x00df); break;
						case 'agrave': ch = String.fromCharCode(0x00e0); break;
						case 'aacute': ch = String.fromCharCode(0x00e1); break;
						case 'acirc': ch = String.fromCharCode(0x00e2); break;
						case 'atilde': ch = String.fromCharCode(0x00e3); break;
						case 'auml': ch = String.fromCharCode(0x00e4); break;
						case 'aring': ch = String.fromCharCode(0x00e5); break;
						case 'aelig': ch = String.fromCharCode(0x00e6); break;
						case 'ccedil': ch = String.fromCharCode(0x00e7); break;
						case 'egrave': ch = String.fromCharCode(0x00e8); break;
						case 'eacute': ch = String.fromCharCode(0x00e9); break;
						case 'ecirc': ch = String.fromCharCode(0x00ea); break;
						case 'euml': ch = String.fromCharCode(0x00eb); break;
						case 'igrave': ch = String.fromCharCode(0x00ec); break;
						case 'iacute': ch = String.fromCharCode(0x00ed); break;
						case 'icirc': ch = String.fromCharCode(0x00ee); break;
						case 'iuml': ch = String.fromCharCode(0x00ef); break;
						case 'eth': ch = String.fromCharCode(0x00f0); break;
						case 'ntilde': ch = String.fromCharCode(0x00f1); break;
						case 'ograve': ch = String.fromCharCode(0x00f2); break;
						case 'oacute': ch = String.fromCharCode(0x00f3); break;
						case 'ocirc': ch = String.fromCharCode(0x00f4); break;
						case 'otilde': ch = String.fromCharCode(0x00f5); break;
						case 'ouml': ch = String.fromCharCode(0x00f6); break;
						case 'divide': ch = String.fromCharCode(0x00f7); break;
						case 'oslash': ch = String.fromCharCode(0x00f8); break;
						case 'ugrave': ch = String.fromCharCode(0x00f9); break;
						case 'uacute': ch = String.fromCharCode(0x00fa); break;
						case 'ucirc': ch = String.fromCharCode(0x00fb); break;
						case 'uuml': ch = String.fromCharCode(0x00fc); break;
						case 'yacute': ch = String.fromCharCode(0x00fd); break;
						case 'thorn': ch = String.fromCharCode(0x00fe); break;
						case 'yuml': ch = String.fromCharCode(0x00ff); break;
						case 'OElig': ch = String.fromCharCode(0x0152); break;
						case 'oelig': ch = String.fromCharCode(0x0153); break;
						case 'Scaron': ch = String.fromCharCode(0x0160); break;
						case 'scaron': ch = String.fromCharCode(0x0161); break;
						case 'Yuml': ch = String.fromCharCode(0x0178); break;
						case 'fnof': ch = String.fromCharCode(0x0192); break;
						case 'circ': ch = String.fromCharCode(0x02c6); break;
						case 'tilde': ch = String.fromCharCode(0x02dc); break;
						case 'Alpha': ch = String.fromCharCode(0x0391); break;
						case 'Beta': ch = String.fromCharCode(0x0392); break;
						case 'Gamma': ch = String.fromCharCode(0x0393); break;
						case 'Delta': ch = String.fromCharCode(0x0394); break;
						case 'Epsilon': ch = String.fromCharCode(0x0395); break;
						case 'Zeta': ch = String.fromCharCode(0x0396); break;
						case 'Eta': ch = String.fromCharCode(0x0397); break;
						case 'Theta': ch = String.fromCharCode(0x0398); break;
						case 'Iota': ch = String.fromCharCode(0x0399); break;
						case 'Kappa': ch = String.fromCharCode(0x039a); break;
						case 'Lambda': ch = String.fromCharCode(0x039b); break;
						case 'Mu': ch = String.fromCharCode(0x039c); break;
						case 'Nu': ch = String.fromCharCode(0x039d); break;
						case 'Xi': ch = String.fromCharCode(0x039e); break;
						case 'Omicron': ch = String.fromCharCode(0x039f); break;
						case 'Pi': ch = String.fromCharCode(0x03a0); break;
						case ' Rho ': ch = String.fromCharCode(0x03a1); break;
						case 'Sigma': ch = String.fromCharCode(0x03a3); break;
						case 'Tau': ch = String.fromCharCode(0x03a4); break;
						case 'Upsilon': ch = String.fromCharCode(0x03a5); break;
						case 'Phi': ch = String.fromCharCode(0x03a6); break;
						case 'Chi': ch = String.fromCharCode(0x03a7); break;
						case 'Psi': ch = String.fromCharCode(0x03a8); break;
						case 'Omega': ch = String.fromCharCode(0x03a9); break;
						case 'alpha': ch = String.fromCharCode(0x03b1); break;
						case 'beta': ch = String.fromCharCode(0x03b2); break;
						case 'gamma': ch = String.fromCharCode(0x03b3); break;
						case 'delta': ch = String.fromCharCode(0x03b4); break;
						case 'epsilon': ch = String.fromCharCode(0x03b5); break;
						case 'zeta': ch = String.fromCharCode(0x03b6); break;
						case 'eta': ch = String.fromCharCode(0x03b7); break;
						case 'theta': ch = String.fromCharCode(0x03b8); break;
						case 'iota': ch = String.fromCharCode(0x03b9); break;
						case 'kappa': ch = String.fromCharCode(0x03ba); break;
						case 'lambda': ch = String.fromCharCode(0x03bb); break;
						case 'mu': ch = String.fromCharCode(0x03bc); break;
						case 'nu': ch = String.fromCharCode(0x03bd); break;
						case 'xi': ch = String.fromCharCode(0x03be); break;
						case 'omicron': ch = String.fromCharCode(0x03bf); break;
						case 'pi': ch = String.fromCharCode(0x03c0); break;
						case 'rho': ch = String.fromCharCode(0x03c1); break;
						case 'sigmaf': ch = String.fromCharCode(0x03c2); break;
						case 'sigma': ch = String.fromCharCode(0x03c3); break;
						case 'tau': ch = String.fromCharCode(0x03c4); break;
						case 'upsilon': ch = String.fromCharCode(0x03c5); break;
						case 'phi': ch = String.fromCharCode(0x03c6); break;
						case 'chi': ch = String.fromCharCode(0x03c7); break;
						case 'psi': ch = String.fromCharCode(0x03c8); break;
						case 'omega': ch = String.fromCharCode(0x03c9); break;
						case 'thetasym': ch = String.fromCharCode(0x03d1); break;
						case 'upsih': ch = String.fromCharCode(0x03d2); break;
						case 'piv': ch = String.fromCharCode(0x03d6); break;
						case 'ensp': ch = String.fromCharCode(0x2002); break;
						case 'emsp': ch = String.fromCharCode(0x2003); break;
						case 'thinsp': ch = String.fromCharCode(0x2009); break;
						case 'zwnj': ch = String.fromCharCode(0x200c); break;
						case 'zwj': ch = String.fromCharCode(0x200d); break;
						case 'lrm': ch = String.fromCharCode(0x200e); break;
						case 'rlm': ch = String.fromCharCode(0x200f); break;
						case 'ndash': ch = String.fromCharCode(0x2013); break;
						case 'mdash': ch = String.fromCharCode(0x2014); break;
						case 'lsquo': ch = String.fromCharCode(0x2018); break;
						case 'rsquo': ch = String.fromCharCode(0x2019); break;
						case 'sbquo': ch = String.fromCharCode(0x201a); break;
						case 'ldquo': ch = String.fromCharCode(0x201c); break;
						case 'rdquo': ch = String.fromCharCode(0x201d); break;
						case 'bdquo': ch = String.fromCharCode(0x201e); break;
						case 'dagger': ch = String.fromCharCode(0x2020); break;
						case 'Dagger': ch = String.fromCharCode(0x2021); break;
						case 'bull': ch = String.fromCharCode(0x2022); break;
						case 'hellip': ch = String.fromCharCode(0x2026); break;
						case 'permil': ch = String.fromCharCode(0x2030); break;
						case 'prime': ch = String.fromCharCode(0x2032); break;
						case 'Prime': ch = String.fromCharCode(0x2033); break;
						case 'lsaquo': ch = String.fromCharCode(0x2039); break;
						case 'rsaquo': ch = String.fromCharCode(0x203a); break;
						case 'oline': ch = String.fromCharCode(0x203e); break;
						case 'frasl': ch = String.fromCharCode(0x2044); break;
						case 'euro': ch = String.fromCharCode(0x20ac); break;
						case 'image': ch = String.fromCharCode(0x2111); break;
						case 'weierp': ch = String.fromCharCode(0x2118); break;
						case 'real': ch = String.fromCharCode(0x211c); break;
						case 'trade': ch = String.fromCharCode(0x2122); break;
						case 'alefsym': ch = String.fromCharCode(0x2135); break;
						case 'larr': ch = String.fromCharCode(0x2190); break;
						case 'uarr': ch = String.fromCharCode(0x2191); break;
						case 'rarr': ch = String.fromCharCode(0x2192); break;
						case 'darr': ch = String.fromCharCode(0x2193); break;
						case 'harr': ch = String.fromCharCode(0x2194); break;
						case 'crarr': ch = String.fromCharCode(0x21b5); break;
						case 'lArr': ch = String.fromCharCode(0x21d0); break;
						case 'uArr': ch = String.fromCharCode(0x21d1); break;
						case 'rArr': ch = String.fromCharCode(0x21d2); break;
						case 'dArr': ch = String.fromCharCode(0x21d3); break;
						case 'hArr': ch = String.fromCharCode(0x21d4); break;
						case 'forall': ch = String.fromCharCode(0x2200); break;
						case 'part': ch = String.fromCharCode(0x2202); break;
						case 'exist': ch = String.fromCharCode(0x2203); break;
						case 'empty': ch = String.fromCharCode(0x2205); break;
						case 'nabla': ch = String.fromCharCode(0x2207); break;
						case 'isin': ch = String.fromCharCode(0x2208); break;
						case 'notin': ch = String.fromCharCode(0x2209); break;
						case 'ni': ch = String.fromCharCode(0x220b); break;
						case 'prod': ch = String.fromCharCode(0x220f); break;
						case 'sum': ch = String.fromCharCode(0x2211); break;
						case 'minus': ch = String.fromCharCode(0x2212); break;
						case 'lowast': ch = String.fromCharCode(0x2217); break;
						case 'radic': ch = String.fromCharCode(0x221a); break;
						case 'prop': ch = String.fromCharCode(0x221d); break;
						case 'infin': ch = String.fromCharCode(0x221e); break;
						case 'ang': ch = String.fromCharCode(0x2220); break;
						case 'and': ch = String.fromCharCode(0x2227); break;
						case 'or': ch = String.fromCharCode(0x2228); break;
						case 'cap': ch = String.fromCharCode(0x2229); break;
						case 'cup': ch = String.fromCharCode(0x222a); break;
						case 'int': ch = String.fromCharCode(0x222b); break;
						case 'there4': ch = String.fromCharCode(0x2234); break;
						case 'sim': ch = String.fromCharCode(0x223c); break;
						case 'cong': ch = String.fromCharCode(0x2245); break;
						case 'asymp': ch = String.fromCharCode(0x2248); break;
						case 'ne': ch = String.fromCharCode(0x2260); break;
						case 'equiv': ch = String.fromCharCode(0x2261); break;
						case 'le': ch = String.fromCharCode(0x2264); break;
						case 'ge': ch = String.fromCharCode(0x2265); break;
						case 'sub': ch = String.fromCharCode(0x2282); break;
						case 'sup': ch = String.fromCharCode(0x2283); break;
						case 'nsub': ch = String.fromCharCode(0x2284); break;
						case 'sube': ch = String.fromCharCode(0x2286); break;
						case 'supe': ch = String.fromCharCode(0x2287); break;
						case 'oplus': ch = String.fromCharCode(0x2295); break;
						case 'otimes': ch = String.fromCharCode(0x2297); break;
						case 'perp': ch = String.fromCharCode(0x22a5); break;
						case 'sdot': ch = String.fromCharCode(0x22c5); break;
						case 'lceil': ch = String.fromCharCode(0x2308); break;
						case 'rceil': ch = String.fromCharCode(0x2309); break;
						case 'lfloor': ch = String.fromCharCode(0x230a); break;
						case 'rfloor': ch = String.fromCharCode(0x230b); break;
						case 'lang': ch = String.fromCharCode(0x2329); break;
						case 'rang': ch = String.fromCharCode(0x232a); break;
						case 'loz': ch = String.fromCharCode(0x25ca); break;
						case 'spades': ch = String.fromCharCode(0x2660); break;
						case 'clubs': ch = String.fromCharCode(0x2663); break;
						case 'hearts': ch = String.fromCharCode(0x2665); break;
						case 'diams': ch = String.fromCharCode(0x2666); break;
						default: ch = ''; break;
					}
				}

				i = semicolonIndex;
			}
		}
		out += ch;
	}

	return out;
}

if (typeof jQuery != 'undefined') {
	$.extend({ URLEncode: function (c) {
		var o = ''; var x = 0; c = c.toString(); var r = /(^[a-zA-Z0-9_.]*)/;
		while (x < c.length) {
			var m = r.exec(c.substr(x));
			if (m != null && m.length > 1 && m[1] != '') {
				o += m[1]; x += m[1].length;
			} else {
				if (c[x] == ' ') o += '+'; else {
					var d = c.charCodeAt(x); var h = d.toString(16);
					o += '%' + (h.length < 2 ? '0' : '') + h.toUpperCase();
				} x++;
			} 
		} return o;
	},
		URLDecode: function (s) {
			var o = s; var binVal, t; var r = /(%[^%]{2})/;
			while ((m = r.exec(o)) != null && m.length > 1 && m[1] != '') {
				b = parseInt(m[1].substr(1), 16);
				t = String.fromCharCode(b); o = o.replace(m[1], t);
			} return o;
		}
	});

	function execGenericInsert(addValueTo, strIDFieldName, strDescFieldName, strDescFieldValue, extraFieldsName_Str, extraFieldsValue_Str, elementType, elementName, elementID, elementExtraAttribs, parentElementID) {
		$.get(_sSystemPath + "/core/genericInsert.asp",
					{
					    addValueTo: addValueTo,
						strIDFieldName: strIDFieldName,
						strDescFieldName: strDescFieldName,
						strDescFieldValue: strDescFieldValue,
						extraFieldsName_Str: extraFieldsName_Str,
						extraFieldsValue_Str: extraFieldsValue_Str
					},
			function getNewElementID(newElementID) {
				if (newElementID != 0) {
					// elementType: 1 - ComboBox / 2 - Checkbox
					var elementHTML = "";

					if (elementType == 2) {
						var parentCheckboxEnablerID = parentElementID.substr(3);
						var attributename = $("[id='" + parentElementID + "'] input:last").attr("attributename");
						$("[attributename='" + attributename + "']").removeAttr("disabled");
                        //MP::06/01/2015:: Agrego value='1' ya que de lo contrario se postea con el valor "on"
						elementHTML = "<input type='checkbox' id='" + elementID + newElementID + "' name='" + elementName + "' " + elementExtraAttribs + " attrvalueid='" + newElementID + "' attributename='" + attributename + "' checked='checked' value='1' /> " + strDescFieldValue + "<br />"
					} else {
						var parentCheckboxEnablerID = parentElementID.substr(11);
						var attributename = $("[id='attrFilter_" + parentCheckboxEnablerID + "'] option").removeAttr("selected");
						$("[id='attrFilter_" + parentCheckboxEnablerID + "']").removeAttr("disabled");
						elementHTML = "<option value='" + newElementID + "' " + elementExtraAttribs + " selected='selected'>&nbsp;" + strDescFieldValue + "</option>"
						$("[id='" + parentElementID + "']").attr("attrvalueid", newElementID);
					}
					if (!$("[id='isAttrEnabled_" + parentCheckboxEnablerID + "']").is(":checked")) {
						$("[id='isAttrEnabled_" + parentCheckboxEnablerID + "']").attr("checked", "checked");
					}
					$("[id='" + parentElementID + "']").append(elementHTML);
				} else {
	                alert("Error al procesar la informaci\u00f3n. Aseg\u00farese de que la opci\u00f3n ingresada no genere duplicidad con una existente.");
				}
			});
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//Devuelve un porcentual de un número
//
//INPUTS: first input argument a number: this represents the fraction of the next argument.  
// 
//Second input argument a number: this is the whole whose previous argument represents a fractional part.  
// 
//Third input argument optional:
//If zero (default), the function assumes that what is wanted is what percentage of the second input is represented by the first input.
//If number one, the function assumes that the first input number represents a percentage already, and that what is wanted is what number such percentage would yield when applied to the second argument.
//Fourth input argument optional: if passed must be a power of number 10 (10, 100, 100 etc): the returned number, if fractional, will be rounded in its floating part (if any) by this argument.  
//Defaults to 100.  
// 
//RETURNS: number.
// 
//CAVEATS: if either of the first two input arguments is zero, the function always returns zero.

function percent(number, whole, inverse, rounder) {
	whole = parseFloat(whole);
	if (!whole || whole == 0) { whole = 100; };
	number = parseFloat(number);
	if (!number) { number = 0; };
	if (!whole || !number) { return 0; };
	rounder = parseFloat(rounder);
	rounder = (rounder && (!(rounder % 10) || rounder == 1)) ? rounder : 100;
	return (!inverse) ? Math.round(((number * 100) / whole) * rounder) / rounder :
	Math.round(((whole * number) / 100) * rounder) / rounder;
}


function toFixedPro(number, n) {
	var k = Math.pow(10, n);
	return (Math.round(number * k) / k);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//Genera un popup dentro del HTML normal (sin iframes; sólo muestra contenido del HTML)
//
//Modo de empleo: crear un div <div id="iPNpopUpDiv"> en la UI aparecerá el popup justo después de la apertura del tag <body>.
//En el click del elemento que desea hacer aparecer el popup, agregar la función js iPNpopup() al onclick.

//La función admite un parámetro; el "backgroundClosesPopup"

//backgroundClosesPopup: Si se setea en 1, el popup se cierra al hacer click en el fondo (útil para generar popups requeridos de confirmación).
// 
//Para cerrar el popup, agregar la función iPNpopupClose() al onclick del elemento que se desea que cierre el popup.

//En caso de querer generar un popup en un div con un ID distinto a "iPNpopUpDiv", simplemente mandarlo como segundo parámetro; sino se deja vacío.

// (*) Requiere jQuery 1.4 o superior cargado antes de la ejecución de la función.

function iPNpopup(backgroundClosesPopup, divName) {
    if (!divName) { divName = "iPNpopUpDiv"; }

    if ($("#" + divName).length == 0) { $("body").prepend("<div id='" + divName + "'></div>"); }

    var fixToScreen = false;
    if ($("#iPNpopUpDiv iframe").attr('fixToScreen') != undefined)
    {
        if ($("#iPNpopUpDiv iframe").attr('fixToScreen').toUpperCase() == "TRUE")
            fixToScreen = true;
    }

	$("#" + divName).addClass("iPNpopUpDiv");
	if ($("#popUpDivBorder").length == 0) {
		var blackDiv = $("<div class='blackBackground'></div>");
		if (backgroundClosesPopup == 1) {
			blackDiv = blackDiv.click(function () { iPNpopupClose(divName); });
		}
		$("#" + divName).after(blackDiv).after('<div id="popUpDivBorder"></div>');
	} else {
	    //SDC::15/09/2016:: Aplico este ELSE para cuando tenes mas de un popUp distinto y se aplique correctamente el funcionamiento del backgroundClosesPopup.
	    if ($(".blackBackground").length != 0) {
	        blackDiv = $(".blackBackground");
	        blackDiv = blackDiv.off("click");
	        if (backgroundClosesPopup == 1) {
	            blackDiv = blackDiv.click(function () { iPNpopupClose(divName); });
	        }
	    }
	}
	$(".blackBackground").css("opacity", "0.1").animate({ opacity: 0.6 }, 500);

	if (fixToScreen) {
	    var divHeight = (window.innerHeight - 180);//$("#" + divName).height();
	    if (divHeight < 300) {
	        divHeight = 300;
		}
	    $("#iPNpopUpDiv iframe").attr({
	        "height": divHeight + "px",
	    });
	}
	else {
		var iframe = $("#" + divName + " iframe");
		var windowHeight = window.innerHeight;
		var maxPopupHeight = windowHeight - 200; 
	
		if (iframe.length > 0) {
			iframe.css({
				"max-height": maxPopupHeight + "px",
				"overflow": "auto"
			});
		}
	
		var divHeight = $("#" + divName).height();
	}
	var divWidth = $("#" + divName).width();
	var divPadding = $("#" + divName).css("padding-top");
    
	$("#" + divName).css("top", 105 + "px").css("margin-left", "-" + ((divWidth / 2) + 10) + "px");
	$("#popUpDivBorder").css("height", (divHeight + 20) + "px").css("width", (divWidth + 20) + "px");
	
    //$("#popUpDivBorder").css("margin-top", "-" + (bkg_margin_top) + "px").css("margin-left", "-" + (((divWidth + 20) / 2) + 10) + "px").css("padding", divPadding);
	$("#popUpDivBorder").css("top",95 + "px").css("margin-left", "-" + (((divWidth + 20) / 2) + 10) + "px").css("padding", divPadding);
	$(".blackBackground, #popUpDivBorder, #" + divName).show();
}

function iPNpopupClose(divName) {
	if (!divName) { divName = "iPNpopUpDiv" }
	$(".blackBackground, #popUpDivBorder, #" + divName).hide();
}

window.onresize = function(event) {
    // AV: 2026-07-27: Páginas iPN2 con avoidUsingJquery=True no cargan jQuery; $ no existe.
    // Sin esta guarda, cada resize tiraba ReferenceError: $ is not defined (ej. borrar padrón ARBA).
    if (typeof jQuery === 'undefined') { return; }
    if ($("#iPNpopUpDiv iframe") != undefined) {

        var fixToScreen = false;
        if ($("#iPNpopUpDiv iframe").attr('fixToScreen') != undefined) {
            if ($("#iPNpopUpDiv iframe").attr('fixToScreen').toUpperCase() == "TRUE")
                fixToScreen = true;
        }

        if (fixToScreen) {
            var newHeight = window.innerHeight - 180;
            if (newHeight < 300)
                newHeight = 300;
            $("#iPNpopUpDiv iframe").attr({
                "height": (newHeight) + "px",
            });
        }
        iPNpopupResize();
    }
}    

// En caso de que se cambie el contenido del popup, ejecutar esta función para redimensionarlo.
function iPNpopupResize(divName) {
    if (!divName) { divName = "iPNpopUpDiv" }

    var fixToScreen = false;
    if ($("#iPNpopUpDiv iframe").attr('fixToScreen') != undefined) {
        if ($("#iPNpopUpDiv iframe").attr('fixToScreen').toUpperCase() == "TRUE")
            fixToScreen = true;
    }
    $("#popUpDivBorder").css({ "height": ($("#" + divName).height() + 20) + "px", "width": ($("#" + divName).width() + 20) + "px" });
   
	var divWidth = $("#" + divName).width();
	var divPadding = $("#" + divName).css("padding-top");
	
	$("#" + divName).css("top", 105 + "px").css("margin-left", "-" + ((divWidth / 2) + 10) + "px");
	
	$("#popUpDivBorder").css("top", 95 + "px").css("margin-left", "-" + (((divWidth + 20) / 2) + 10) + "px").css("padding", divPadding);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//Deshabilita un botón y lo setea como "cargando", para el posteo de forms.
//IMPORTANTE: Requiere definir la variable "_sSystemPath" primero con el valor de la variable ASP.

function onlyLoadAfterClick(elem,callback) {
	// AV: 2026-07-27: Guarda defensiva — mismo patrón que loadAfterClick (JAVASCRIPT-7A).
	if (!elem) { return; }
	elem.onclick = '';
	// AV: 2026-07-27: `if (jQuery)` lanza ReferenceError si jQuery no está definido (no es falsy).
	if (typeof jQuery !== 'undefined') {
		$(elem).off();
	}
	
	elem.setAttribute('class', 'btnDisabled');

	elem.value = 'Procesando datos...';
	setTimeout(function() {
        callback(); // Llamamos al callback una vez que termine
    }, 500); // Esto es solo un ejemplo de retardo
	
}

// iPN2: si el botón tiene la clase .ipn-btn, conservamos su estilo y mostramos un estado de
// carga (.is-loading, con spinner) en lugar de reemplazar la clase por el gris legacy `btnDisabled`,
// que borraba las clases iPN2 y dejaba el botón "raro" al clickear (ej. Buscar).
function ipnIsModernBtn(elem) {
	return elem && elem.className && (' ' + elem.className + ' ').indexOf(' ipn-btn ') !== -1;
}
function ipnSetBtnLoading(elem, buttonText) {
	if (!elem || elem.getAttribute('data-ipn-loading') === '1') return;
	elem.setAttribute('data-ipn-loading', '1');
	elem.setAttribute('aria-busy', 'true');
	if (elem.classList) { elem.classList.add('is-loading'); }
	if (buttonText) {
		if (elem.tagName === 'INPUT') {
			elem.value = buttonText;
		} else {
			var icon = elem.querySelector ? elem.querySelector('.material-symbols-rounded') : null;
			elem.textContent = '';
			if (icon) { elem.appendChild(icon); elem.appendChild(document.createTextNode(' ')); }
			elem.appendChild(document.createTextNode(buttonText));
		}
	}
}

function loadAfterClick(elem, removeMargin, buttonText) {
	// AV: 2026-07-27: JAVASCRIPT-7A — si el caller pasa undefined (ej. $("#btnX")[0] con id inexistente),
	// no setear .onclick: evita TypeError en producción (Sentry heartbeat/default.asp).
	if (!elem) { return; }
	elem.onclick = '';
	// AV: 2026-07-27: Misma guarda typeof. Con avoidUsingJquery=True (p.ej. IIBB_ByJurisdiction/delete.asp
	// padrón ARBA) jQuery no se carga; el `if (jQuery)` rompía el submit tras ipnConfirm y dejaba
	// "jQuery is not defined" en consola. El estado .is-loading de .ipn-btn no necesita jQuery.
	if (typeof jQuery !== 'undefined') {
		$(elem).off();
	}
	if (removeMargin) {
		elem.style.margin = "0";
	}
	if (ipnIsModernBtn(elem)) {
		ipnSetBtnLoading(elem, buttonText);
		return;
	}
	elem.setAttribute('class', 'btnDisabled');
	if (buttonText) {
		elem.value = buttonText;
	} else {
		elem.value = 'Procesando datos...';
	}
}

function loadAfterClickBind(elem, removeMargin, buttonText) {
    // AV: 2026-07-27: Misma guarda que loadAfterClick — evita TypeError si elem es undefined.
    if (!elem) { return; }
    elem.onclick = '';
    if (removeMargin) {
        elem.style.margin = "0";
    }
    if (ipnIsModernBtn(elem)) {
        ipnSetBtnLoading(elem, buttonText);
        return;
    }
    elem.setAttribute('class', 'btnDisabled');
    if (buttonText) {
        elem.value = buttonText;
    } else {
        elem.value = 'Procesando datos...';
    }
}

function insertAtTextarea(areaId, text) {
	var txtarea = document.getElementById(areaId);
	var scrollPos = txtarea.scrollTop;
	var strPos = 0;
	var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
        "ff" : (document.selection ? "ie" : false));
	if (br == "ie") {
		txtarea.focus();
		var range = document.selection.createRange();
		range.moveStart('character', -txtarea.value.length);
		strPos = range.text.length;
	}
	else if (br == "ff") strPos = txtarea.selectionStart;

	var front = (txtarea.value).substring(0, strPos);
	var back = (txtarea.value).substring(strPos, txtarea.value.length);
	txtarea.value = front + text + back;
	strPos = strPos + text.length;
	if (br == "ie") {
		txtarea.focus();
		var range = document.selection.createRange();
		range.moveStart('character', -txtarea.value.length);
		range.moveStart('character', strPos);
		range.moveEnd('character', 0);
		range.select();
	}
	else if (br == "ff") {
		txtarea.selectionStart = strPos;
		txtarea.selectionEnd = strPos;
		txtarea.focus();
	}
	txtarea.scrollTop = scrollPos;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//Inicializa el JS para el menú de acciones disponibles.
//IMPORTANTE: Requiere jQuery inicializado para ejecutarse correctamente.

function accDispInit() {
	$(".accDisp").on("click", function () {
		$(".accDisp").toggleClass("ADopen");
		if ($(".accDisp").hasClass("ADopen")) {
			$("#footAD").show();
			$("#menuAD").slideDown(100);
		} else {
			$("#footAD").hide();
			$("#menuAD").slideUp(10, function () { $(".accDisp").removeClass("ADopen"); });
		}
	}).on("mouseleave", function () {
		setTimeout(function () {
			if ($(".accDisp").hasClass("ADopen")) {
				$("#footAD").hide();
				$("#menuAD").slideUp(70, function () { $(".accDisp").removeClass("ADopen"); });
			}
		}, 400)
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//Postea los valores de búsqueda nuevamente con el número de página para evitar mandar todo por QS.
//IMPORTANTE: Requiere jQuery inicializado para ejecutarse correctamente.

function switchPage(pagePos,submitFormID) {
	$("#page").val(pagePos);
	if (submitFormID) {
		$("#" + submitFormID).submit();
	} else {
		$("form").submit();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//Formatea un entero a CUIT

function formatCUIT(numberToFormat) {
	numberToFormat = (numberToFormat == null ? "" : ("" + numberToFormat).trim());
	if ((parseFloat(numberToFormat) == parseInt(numberToFormat)) && !isNaN(numberToFormat)) {
		var part1 = numberToFormat.substr(0, 2);
		var part2 = numberToFormat.substr(2, numberToFormat.length - 3);
		var part3 = numberToFormat.substr(numberToFormat.length - 1);
		return (part1 + "-" + part2 + "-" + part3);
	} else {
		return numberToFormat;
	}
}

//REC::2014/07/08:: Esta func le pasamos id del elemento "seleccionador" y el name de los elementos a seleccionar
function selectAll(idSelector, nameElems) {
    if ($("#" + idSelector).is(":checked")) {
        $("[name='" + nameElems + "']").attr("checked", "checked");
    } else {
        $("[name='" + nameElems + "']").removeAttr("checked");
    }
}

//IPV 2015-07-02: Función para devolver la fecha de hoy formateada
function getFormattedDate() {
    today = new Date();
    dd = today.getDate();
    mm = today.getMonth() + 1;

    yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

//ML 27/04/2016 :: Agrego función que devuelve labelDesc formateado ya que lo necesitamos para ventas iGE
function formatProductDesc(masterProductUID, labelDesc, productDesc, colorName, sizeName, renderHREF)
{
    // AV: 2026-07-27: JAVASCRIPT-74 — .trim() nativo falla si el arg es undefined/null
    colorName = (colorName == null ? "" : String(colorName)).trim();
    sizeName  = (sizeName == null ? "" : String(sizeName)).trim();
    labelDesc = (labelDesc == null ? "" : String(labelDesc));
    productDesc = (productDesc == null ? "" : String(productDesc));

    if(colorName != "")
        labelDesc = labelDesc + " ("+colorName+")"

    if(sizeName != "")
        labelDesc = labelDesc + " ("+sizeName+")"

    if (renderHREF)
        labelDesc = labelDesc.replace("[" + productDesc.trim() + "]", "<a target='_blank' href='" + sSystemServ + "control/products/details.asp?masterProductUID=" + masterProductUID + "'>[" + productDesc.trim() + "]</a>");

    return labelDesc.trim();
}

//IPV 2016-06-21: Función para postear a otra página valores y evitar pasar parametros por URL. Recibe un JSON y  crea un input por cada elemento del mismo.
// Arguments :
//  target : an optional opening target (a name, or "_blank"), defaults to "_self"
function URLOpen(url, data, target) {
    var form = document.createElement("form");
    form.action = url;
    form.method = 'POST';
    form.target = target || "_self";
	//Agrego opción para aceptar directamente objetos armados.
    // AV: 2026-07-27: JAVASCRIPT-74 — jQuery.parseJSON removido en jQuery 4; usar JSON.parse
    var objData = typeof(data) == "object" ? data : JSON.parse(data) ;
    if (objData) {
        $.each(objData, function (key, value) {
            var input = document.createElement("textarea");
            input.name = key;
            input.value = typeof value === "object" ? JSON.stringify(value) : value;
            form.appendChild(input);
        });

    }
    form.style.display = 'none';
    document.body.appendChild(form);
    form.submit();
};

function formatMoneyAccountingNegative(strValue) {
    strValue = strValue.toString().replace(/\$|\,/g, '');
    dblValue = parseFloat(strValue);
    blnSign = (dblValue == (dblValue = Math.abs(dblValue)));
    dblValue = Math.floor(dblValue * 100 + 0.50000000001);
    intCents = dblValue % 100;
    strCents = intCents.toString();
    dblValue = Math.floor(dblValue / 100).toString();
    if (intCents < 10)
        strCents = "0" + strCents;
    for (var i = 0; i < Math.floor((dblValue.length - (1 + i)) / 3) ; i++)
        dblValue = dblValue.substring(0, dblValue.length - (4 * i + 3)) + '.' +
        dblValue.substring(dblValue.length - (4 * i + 3));
    return (((blnSign) ? '' : '(') + '$' + dblValue + ',' + strCents + ((blnSign) ? '' : ')'));
}

// CA+ST::26/12/2016:: Creamos calculateDateTo().
// Descripción: Calcula el último día del mes requerido.
function calculateDateTo(dateFrom, dateTo) {
    // AV: 2026-07-27: JAVASCRIPT-74 — misma clase de bug que parseDateFromChr (.split sobre undefined)
    var today = dateFrom && dateFrom.val ? dateFrom.val() : null;
    if (today == null || String(today).trim() === "") {
        return;
    }
    var arrToday = String(today).split("/");
    if (arrToday.length < 3) {
        return;
    }
    var month = arrToday[1];
    var year = arrToday[2];
    var lastDay = new Date(year, month, 0);
    var dateStr = lastDay.getDate() + '/'
    if((month) < 10)
	    dateStr = dateStr + '0' + (lastDay.getMonth() + 1)
	else
	    dateStr = dateStr + (lastDay.getMonth() + 1)
		    
    dateStr = dateStr + '/' + lastDay.getFullYear();
    if (dateTo && dateTo.val) {
        dateTo.val(dateStr);
    }
}

//CA::2018-04-24:: Esta función formatea con una coma para los decimales, a diferencia de formatCurrencyByID.
function formatMoneyCurrencyByID(currencyID, strValue) {
    //var strSymbol = '';
    switch (currencyID) {
        case '2':
            strSymbol = 'U$S ';
            break;
        case '3':
            strSymbol = '&euro; ';
            break;
        case '4':
            strSymbol = 'R$ ';
            break;
        default:
            strSymbol = '$ ';
    }
    strValue = strValue.toString().replace('U$S', '')
    strValue = strValue.toString().replace('&euro;', '')
    strValue = strValue.toString().replace('R$', '')
    strValue = strValue.toString().replace(/\$|\,/g, '');
    dblValue = parseFloat(strValue);

    blnSign = (dblValue == (dblValue = Math.abs(dblValue)));

    dblValue = Math.floor(dblValue * 100 + 0.50000000001);//Math.floor( 
    intCents = dblValue % 100;

    strCents = intCents.toString();
    dblValue = Math.floor(dblValue / 100).toString();
    if (intCents < 10)
        strCents = "0" + strCents;
    for (var i = 0; i < Math.floor((dblValue.length - (1 + i)) / 3) ; i++)
        dblValue = dblValue.substring(0, dblValue.length - (4 * i + 3)) + '.' +
        dblValue.substring(dblValue.length - (4 * i + 3));
    return (((blnSign) ? '' : '-') + strSymbol + dblValue + ',' + strCents);
}

function replaceNullValues(val){
	return val || 0;
}

//IF - 15/07/2024: Muevo funcion para poder usarla en el resto del sistema
function getTaxIdentification(countryID, ivaConditionID){
	switch(countryID){
		case 1:
			return ivaConditionID == 3 ? "DNI" : "CUIT";
		case 6:
			return ivaConditionID == 11 ? "RUT" : "C.I.";
			break;
		case 11:
			return "RFC";
	}    
}

//Los combos de IVA tienen los values separados por punto.
//Por temas de formato regional, puede llegarse a intentar asignar el valor al combo usando un iva con un formato inadecuado. 
//El combo espera el formato XX.XX (dos decimales y separacion por punto).
//Con esta función nos quedan válidas asignaciones como "21.0" o "10,5"
function formatIvaForCombo(strValue){
	strValue = strValue.toString().replace(/\$,/g,'')
						.replace(',','.');
	dblValue = parseFloat(strValue);
	return dblValue.toFixed(2);
}