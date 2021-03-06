//
// officegen: All the code to generate DOCX files.
//
// Please refer to README.md for this module's documentations.
//
// NOTE:
// - Before changing this code please refer to the hacking the code section on README.md.
//
// Copyright (c) 2013 Ziv Barber;
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// 'Software'), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
// CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

var baseobj = require("./basicgen.js");
var msdoc = require("./msofficegen.js");

var path = require('path');

var fast_image_size = require('fast-image-size');

if ( !String.prototype.encodeHTML ) {
	String.prototype.encodeHTML = function () {
		return this.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	};
}

///
/// @brief Extend officegen object with DOCX support.
///
/// This method extending the given officegen object to create DOCX document.
///
/// @param[in] genobj The object to extend.
/// @param[in] new_type The type of object to create.
/// @param[in] options The object's options.
/// @param[in] gen_private Access to the internals of this object.
/// @param[in] type_info Additional information about this type.
///
function makeDocx ( genobj, new_type, options, gen_private, type_info ) {
	///
	/// @brief ???.
	///
	/// ???.
	///
	/// @param[in] data Ignored by this callback function.
	/// @return Text string.
	///
	function cbMakeDocxFontsTable ( data ) {
		return gen_private.plugs.type.msoffice.cbMakeMsOfficeBasicXml ( data ) + '<w:fonts xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:font w:name="Calibri"><w:panose1 w:val="020F0502020204030204"/><w:charset w:val="00"/><w:family w:val="swiss"/><w:pitch w:val="variable"/><w:sig w:usb0="A00002EF" w:usb1="4000207B" w:usb2="00000000" w:usb3="00000000" w:csb0="0000009F" w:csb1="00000000"/></w:font><w:font w:name="Arial"><w:panose1 w:val="020B0604020202020204"/><w:charset w:val="00"/><w:family w:val="swiss"/><w:pitch w:val="variable"/><w:sig w:usb0="20002A87" w:usb1="80000000" w:usb2="00000008" w:usb3="00000000" w:csb0="000001FF" w:csb1="00000000"/></w:font><w:font w:name="Times New Roman"><w:panose1 w:val="02020603050405020304"/><w:charset w:val="00"/><w:family w:val="roman"/><w:pitch w:val="variable"/><w:sig w:usb0="20002A87" w:usb1="80000000" w:usb2="00000008" w:usb3="00000000" w:csb0="000001FF" w:csb1="00000000"/></w:font><w:font w:name="Cambria"><w:panose1 w:val="02040503050406030204"/><w:charset w:val="00"/><w:family w:val="roman"/><w:pitch w:val="variable"/><w:sig w:usb0="A00002EF" w:usb1="4000004B" w:usb2="00000000" w:usb3="00000000" w:csb0="0000009F" w:csb1="00000000"/></w:font></w:fonts>';
	}

	///
	/// @brief ???.
	///
	/// ???.
	///
	/// @param[in] data Ignored by this callback function.
	/// @return Text string.
	///
	function cbMakeDocxSettings ( data ) {
		return gen_private.plugs.type.msoffice.cbMakeMsOfficeBasicXml ( data ) + '<w:settings xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:sl="http://schemas.openxmlformats.org/schemaLibrary/2006/main"><w:zoom w:percent="120"/><w:defaultTabStop w:val="720"/><w:characterSpacingControl w:val="doNotCompress"/><w:compat/><w:rsids><w:rsidRoot w:val="00A94AF2"/><w:rsid w:val="00A02F19"/><w:rsid w:val="00A94AF2"/></w:rsids><m:mathPr><m:mathFont m:val="Cambria Math"/><m:brkBin m:val="before"/><m:brkBinSub m:val="--"/><m:smallFrac m:val="off"/><m:dispDef/><m:lMargin m:val="0"/><m:rMargin m:val="0"/><m:defJc m:val="centerGroup"/><m:wrapIndent m:val="1440"/><m:intLim m:val="subSup"/><m:naryLim m:val="undOvr"/></m:mathPr><w:themeFontLang w:val="en-US" w:bidi="en-US"/><w:clrSchemeMapping w:bg1="light1" w:t1="dark1" w:bg2="light2" w:t2="dark2" w:accent1="accent1" w:accent2="accent2" w:accent3="accent3" w:accent4="accent4" w:accent5="accent5" w:accent6="accent6" w:hyperlink="hyperlink" w:followedHyperlink="followedHyperlink"/><w:shapeDefaults><o:shapedefaults v:ext="edit" spidmax="2050"/><o:shapelayout v:ext="edit"><o:idmap v:ext="edit" data="1"/></o:shapelayout></w:shapeDefaults><w:decimalSymbol w:val="."/><w:listSeparator w:val=","/></w:settings>';
	}

	///
	/// @brief ???.
	///
	/// ???.
	///
	/// @param[in] data Ignored by this callback function.
	/// @return Text string.
	///
	function cbMakeDocxWeb ( data ) {
		return gen_private.plugs.type.msoffice.cbMakeMsOfficeBasicXml ( data ) + '<w:webSettings xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:optimizeForBrowser/></w:webSettings>';
	}

	///
	/// @brief ???.
	///
	/// ???.
	///
	/// @param[in] data Ignored by this callback function.
	/// @return Text string.
	///
	function cbMakeDocxStyles ( data ) {
		return gen_private.plugs.type.msoffice.cbMakeMsOfficeBasicXml ( data ) + '<w:styles xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:asciiTheme="minorHAnsi" w:eastAsiaTheme="minorHAnsi" w:hAnsiTheme="minorHAnsi" w:cstheme="minorBidi"/><w:sz w:val="22"/><w:szCs w:val="22"/><w:lang w:val="en-US" w:eastAsia="en-US" w:bidi="en-US"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="200" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:latentStyles w:defLockedState="0" w:defUIPriority="99" w:defSemiHidden="1" w:defUnhideWhenUsed="1" w:defQFormat="0" w:count="267"><w:lsdException w:name="Normal" w:semiHidden="0" w:uiPriority="0" w:unhideWhenUsed="0" w:qFormat="1"/><w:lsdException w:name="heading 1" w:semiHidden="0" w:uiPriority="9" w:unhideWhenUsed="0" w:qFormat="1"/><w:lsdException w:name="heading 2" w:uiPriority="9" w:qFormat="1"/><w:lsdException w:name="heading 3" w:uiPriority="9" w:qFormat="1"/><w:lsdException w:name="heading 4" w:uiPriority="9" w:qFormat="1"/><w:lsdException w:name="heading 5" w:uiPriority="9" w:qFormat="1"/><w:lsdException w:name="heading 6" w:uiPriority="9" w:qFormat="1"/><w:lsdException w:name="heading 7" w:uiPriority="9" w:qFormat="1"/><w:lsdException w:name="heading 8" w:uiPriority="9" w:qFormat="1"/><w:lsdException w:name="heading 9" w:uiPriority="9" w:qFormat="1"/><w:lsdException w:name="toc 1" w:uiPriority="39"/><w:lsdException w:name="toc 2" w:uiPriority="39"/><w:lsdException w:name="toc 3" w:uiPriority="39"/><w:lsdException w:name="toc 4" w:uiPriority="39"/><w:lsdException w:name="toc 5" w:uiPriority="39"/><w:lsdException w:name="toc 6" w:uiPriority="39"/><w:lsdException w:name="toc 7" w:uiPriority="39"/><w:lsdException w:name="toc 8" w:uiPriority="39"/><w:lsdException w:name="toc 9" w:uiPriority="39"/><w:lsdException w:name="caption" w:uiPriority="35" w:qFormat="1"/><w:lsdException w:name="Title" w:semiHidden="0" w:uiPriority="10" w:unhideWhenUsed="0" w:qFormat="1"/><w:lsdException w:name="Default Paragraph Font" w:uiPriority="1"/><w:lsdException w:name="Subtitle" w:semiHidden="0" w:uiPriority="11" w:unhideWhenUsed="0" w:qFormat="1"/><w:lsdException w:name="Strong" w:semiHidden="0" w:uiPriority="22" w:unhideWhenUsed="0" w:qFormat="1"/><w:lsdException w:name="Emphasis" w:semiHidden="0" w:uiPriority="20" w:unhideWhenUsed="0" w:qFormat="1"/><w:lsdException w:name="Table Grid" w:semiHidden="0" w:uiPriority="59" w:unhideWhenUsed="0"/><w:lsdException w:name="Placeholder Text" w:unhideWhenUsed="0"/><w:lsdException w:name="No Spacing" w:semiHidden="0" w:uiPriority="1" w:unhideWhenUsed="0" w:qFormat="1"/><w:lsdException w:name="Light Shading" w:semiHidden="0" w:uiPriority="60" w:unhideWhenUsed="0"/><w:lsdException w:name="Light List" w:semiHidden="0" w:uiPriority="61" w:unhideWhenUsed="0"/><w:lsdException w:name="Light Grid" w:semiHidden="0" w:uiPriority="62" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Shading 1" w:semiHidden="0" w:uiPriority="63" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Shading 2" w:semiHidden="0" w:uiPriority="64" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium List 1" w:semiHidden="0" w:uiPriority="65" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium List 2" w:semiHidden="0" w:uiPriority="66" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 1" w:semiHidden="0" w:uiPriority="67" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 2" w:semiHidden="0" w:uiPriority="68" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 3" w:semiHidden="0" w:uiPriority="69" w:unhideWhenUsed="0"/><w:lsdException w:name="Dark List" w:semiHidden="0" w:uiPriority="70" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful Shading" w:semiHidden="0" w:uiPriority="71" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful List" w:semiHidden="0" w:uiPriority="72" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful Grid" w:semiHidden="0" w:uiPriority="73" w:unhideWhenUsed="0"/><w:lsdException w:name="Light Shading Accent 1" w:semiHidden="0" w:uiPriority="60" w:unhideWhenUsed="0"/><w:lsdException w:name="Light List Accent 1" w:semiHidden="0" w:uiPriority="61" w:unhideWhenUsed="0"/><w:lsdException w:name="Light Grid Accent 1" w:semiHidden="0" w:uiPriority="62" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Shading 1 Accent 1" w:semiHidden="0" w:uiPriority="63" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Shading 2 Accent 1" w:semiHidden="0" w:uiPriority="64" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium List 1 Accent 1" w:semiHidden="0" w:uiPriority="65" w:unhideWhenUsed="0"/><w:lsdException w:name="Revision" w:unhideWhenUsed="0"/><w:lsdException w:name="List Paragraph" w:semiHidden="0" w:uiPriority="34" w:unhideWhenUsed="0" w:qFormat="1"/><w:lsdException w:name="Quote" w:semiHidden="0" w:uiPriority="29" w:unhideWhenUsed="0" w:qFormat="1"/><w:lsdException w:name="Intense Quote" w:semiHidden="0" w:uiPriority="30" w:unhideWhenUsed="0" w:qFormat="1"/><w:lsdException w:name="Medium List 2 Accent 1" w:semiHidden="0" w:uiPriority="66" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 1 Accent 1" w:semiHidden="0" w:uiPriority="67" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 2 Accent 1" w:semiHidden="0" w:uiPriority="68" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 3 Accent 1" w:semiHidden="0" w:uiPriority="69" w:unhideWhenUsed="0"/><w:lsdException w:name="Dark List Accent 1" w:semiHidden="0" w:uiPriority="70" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful Shading Accent 1" w:semiHidden="0" w:uiPriority="71" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful List Accent 1" w:semiHidden="0" w:uiPriority="72" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful Grid Accent 1" w:semiHidden="0" w:uiPriority="73" w:unhideWhenUsed="0"/><w:lsdException w:name="Light Shading Accent 2" w:semiHidden="0" w:uiPriority="60" w:unhideWhenUsed="0"/><w:lsdException w:name="Light List Accent 2" w:semiHidden="0" w:uiPriority="61" w:unhideWhenUsed="0"/><w:lsdException w:name="Light Grid Accent 2" w:semiHidden="0" w:uiPriority="62" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Shading 1 Accent 2" w:semiHidden="0" w:uiPriority="63" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Shading 2 Accent 2" w:semiHidden="0" w:uiPriority="64" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium List 1 Accent 2" w:semiHidden="0" w:uiPriority="65" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium List 2 Accent 2" w:semiHidden="0" w:uiPriority="66" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 1 Accent 2" w:semiHidden="0" w:uiPriority="67" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 2 Accent 2" w:semiHidden="0" w:uiPriority="68" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 3 Accent 2" w:semiHidden="0" w:uiPriority="69" w:unhideWhenUsed="0"/><w:lsdException w:name="Dark List Accent 2" w:semiHidden="0" w:uiPriority="70" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful Shading Accent 2" w:semiHidden="0" w:uiPriority="71" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful List Accent 2" w:semiHidden="0" w:uiPriority="72" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful Grid Accent 2" w:semiHidden="0" w:uiPriority="73" w:unhideWhenUsed="0"/><w:lsdException w:name="Light Shading Accent 3" w:semiHidden="0" w:uiPriority="60" w:unhideWhenUsed="0"/><w:lsdException w:name="Light List Accent 3" w:semiHidden="0" w:uiPriority="61" w:unhideWhenUsed="0"/><w:lsdException w:name="Light Grid Accent 3" w:semiHidden="0" w:uiPriority="62" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Shading 1 Accent 3" w:semiHidden="0" w:uiPriority="63" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Shading 2 Accent 3" w:semiHidden="0" w:uiPriority="64" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium List 1 Accent 3" w:semiHidden="0" w:uiPriority="65" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium List 2 Accent 3" w:semiHidden="0" w:uiPriority="66" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 1 Accent 3" w:semiHidden="0" w:uiPriority="67" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 2 Accent 3" w:semiHidden="0" w:uiPriority="68" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 3 Accent 3" w:semiHidden="0" w:uiPriority="69" w:unhideWhenUsed="0"/><w:lsdException w:name="Dark List Accent 3" w:semiHidden="0" w:uiPriority="70" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful Shading Accent 3" w:semiHidden="0" w:uiPriority="71" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful List Accent 3" w:semiHidden="0" w:uiPriority="72" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful Grid Accent 3" w:semiHidden="0" w:uiPriority="73" w:unhideWhenUsed="0"/><w:lsdException w:name="Light Shading Accent 4" w:semiHidden="0" w:uiPriority="60" w:unhideWhenUsed="0"/><w:lsdException w:name="Light List Accent 4" w:semiHidden="0" w:uiPriority="61" w:unhideWhenUsed="0"/><w:lsdException w:name="Light Grid Accent 4" w:semiHidden="0" w:uiPriority="62" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Shading 1 Accent 4" w:semiHidden="0" w:uiPriority="63" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Shading 2 Accent 4" w:semiHidden="0" w:uiPriority="64" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium List 1 Accent 4" w:semiHidden="0" w:uiPriority="65" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium List 2 Accent 4" w:semiHidden="0" w:uiPriority="66" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 1 Accent 4" w:semiHidden="0" w:uiPriority="67" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 2 Accent 4" w:semiHidden="0" w:uiPriority="68" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 3 Accent 4" w:semiHidden="0" w:uiPriority="69" w:unhideWhenUsed="0"/><w:lsdException w:name="Dark List Accent 4" w:semiHidden="0" w:uiPriority="70" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful Shading Accent 4" w:semiHidden="0" w:uiPriority="71" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful List Accent 4" w:semiHidden="0" w:uiPriority="72" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful Grid Accent 4" w:semiHidden="0" w:uiPriority="73" w:unhideWhenUsed="0"/><w:lsdException w:name="Light Shading Accent 5" w:semiHidden="0" w:uiPriority="60" w:unhideWhenUsed="0"/><w:lsdException w:name="Light List Accent 5" w:semiHidden="0" w:uiPriority="61" w:unhideWhenUsed="0"/><w:lsdException w:name="Light Grid Accent 5" w:semiHidden="0" w:uiPriority="62" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Shading 1 Accent 5" w:semiHidden="0" w:uiPriority="63" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Shading 2 Accent 5" w:semiHidden="0" w:uiPriority="64" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium List 1 Accent 5" w:semiHidden="0" w:uiPriority="65" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium List 2 Accent 5" w:semiHidden="0" w:uiPriority="66" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 1 Accent 5" w:semiHidden="0" w:uiPriority="67" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 2 Accent 5" w:semiHidden="0" w:uiPriority="68" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 3 Accent 5" w:semiHidden="0" w:uiPriority="69" w:unhideWhenUsed="0"/><w:lsdException w:name="Dark List Accent 5" w:semiHidden="0" w:uiPriority="70" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful Shading Accent 5" w:semiHidden="0" w:uiPriority="71" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful List Accent 5" w:semiHidden="0" w:uiPriority="72" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful Grid Accent 5" w:semiHidden="0" w:uiPriority="73" w:unhideWhenUsed="0"/><w:lsdException w:name="Light Shading Accent 6" w:semiHidden="0" w:uiPriority="60" w:unhideWhenUsed="0"/><w:lsdException w:name="Light List Accent 6" w:semiHidden="0" w:uiPriority="61" w:unhideWhenUsed="0"/><w:lsdException w:name="Light Grid Accent 6" w:semiHidden="0" w:uiPriority="62" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Shading 1 Accent 6" w:semiHidden="0" w:uiPriority="63" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Shading 2 Accent 6" w:semiHidden="0" w:uiPriority="64" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium List 1 Accent 6" w:semiHidden="0" w:uiPriority="65" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium List 2 Accent 6" w:semiHidden="0" w:uiPriority="66" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 1 Accent 6" w:semiHidden="0" w:uiPriority="67" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 2 Accent 6" w:semiHidden="0" w:uiPriority="68" w:unhideWhenUsed="0"/><w:lsdException w:name="Medium Grid 3 Accent 6" w:semiHidden="0" w:uiPriority="69" w:unhideWhenUsed="0"/><w:lsdException w:name="Dark List Accent 6" w:semiHidden="0" w:uiPriority="70" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful Shading Accent 6" w:semiHidden="0" w:uiPriority="71" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful List Accent 6" w:semiHidden="0" w:uiPriority="72" w:unhideWhenUsed="0"/><w:lsdException w:name="Colorful Grid Accent 6" w:semiHidden="0" w:uiPriority="73" w:unhideWhenUsed="0"/><w:lsdException w:name="Subtle Emphasis" w:semiHidden="0" w:uiPriority="19" w:unhideWhenUsed="0" w:qFormat="1"/><w:lsdException w:name="Intense Emphasis" w:semiHidden="0" w:uiPriority="21" w:unhideWhenUsed="0" w:qFormat="1"/><w:lsdException w:name="Subtle Reference" w:semiHidden="0" w:uiPriority="31" w:unhideWhenUsed="0" w:qFormat="1"/><w:lsdException w:name="Intense Reference" w:semiHidden="0" w:uiPriority="32" w:unhideWhenUsed="0" w:qFormat="1"/><w:lsdException w:name="Book Title" w:semiHidden="0" w:uiPriority="33" w:unhideWhenUsed="0" w:qFormat="1"/><w:lsdException w:name="Bibliography" w:uiPriority="37"/><w:lsdException w:name="TOC Heading" w:uiPriority="39" w:qFormat="1"/></w:latentStyles><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/><w:rsid w:val="00A02F19"/></w:style><w:style w:type="character" w:default="1" w:styleId="DefaultParagraphFont"><w:name w:val="Default Paragraph Font"/><w:uiPriority w:val="1"/><w:semiHidden/><w:unhideWhenUsed/></w:style><w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:uiPriority w:val="99"/><w:semiHidden/><w:unhideWhenUsed/><w:qFormat/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style><w:style w:type="numbering" w:default="1" w:styleId="NoList"><w:name w:val="No List"/><w:uiPriority w:val="99"/><w:semiHidden/><w:unhideWhenUsed/></w:style></w:styles>';
	}

	///
	/// @brief ???.
	///
	/// ???.
	///
	/// @param[in] data Ignored by this callback function.
	/// @return Text string.
	///
	function cbMakeDocxApp ( data ) {
		var userName = genobj.options.creator || 'officegen';
		var outString = gen_private.plugs.type.msoffice.cbMakeMsOfficeBasicXml ( data ) + '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Template>Normal.dotm</Template><TotalTime>1</TotalTime><Pages>1</Pages><Words>0</Words><Characters>0</Characters><Application>Microsoft Office Word</Application><DocSecurity>0</DocSecurity><Lines>1</Lines><Paragraphs>1</Paragraphs><ScaleCrop>false</ScaleCrop><Company>' + userName + '</Company><LinksUpToDate>false</LinksUpToDate><CharactersWithSpaces>0</CharactersWithSpaces><SharedDoc>false</SharedDoc><HyperlinksChanged>false</HyperlinksChanged><AppVersion>12.0000</AppVersion></Properties>';
		return outString;
	}

	///
	/// @brief ???.
	///
	/// ???.
	///
	/// @param[in] data Ignored by this callback function.
	/// @return Text string.
	///
	function cbMakeDocxDocument ( data ) {
		var outString = gen_private.plugs.type.msoffice.cbMakeMsOfficeBasicXml ( data ) + '<w:document xmlns:ve="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml"><w:body>';
		var objs_list = data.data;

		// Work on all the stored paragraphs inside this document:
		for ( var i = 0, total_size = objs_list.length; i < total_size; i++ ) {
			outString += '<w:p w:rsidR="00A77427" w:rsidRDefault="007F1D13">';
			var pPrData = '';

			if ( objs_list[i].options ) {
				if ( objs_list[i].options.align ) {
					switch ( objs_list[i].options.align ) {
						case 'center':
							pPrData += '<w:jc w:val="center"/>';
							break;

						case 'right':
							pPrData += '<w:jc w:val="right"/>';
							break;

						case 'justify':
							pPrData += '<w:jc w:val="both"/>';
							break;
					} // End of switch.
				} // Endif.

				if ( objs_list[i].options.list_type ) {
					pPrData += '<w:pStyle w:val="ListParagraph"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="' + objs_list[i].options.list_type + '"/></w:numPr>';
				} // Endif.
			} // Endif.

			if ( pPrData ) {
				outString += '<w:pPr>' + pPrData + '</w:pPr>';
			} // Endif.

			// Work on all the objects in the document:
			for ( var j = 0, total_size_j = objs_list[i].data.length; j < total_size_j; j++ ) {
				if ( objs_list[i].data[j] ) {
					var rExtra = '';
					var tExtra = '';
					var rPrData = '';

					if ( objs_list[i].data[j].options ) {
						if ( objs_list[i].data[j].options.color ) {
							rPrData += '<w:color w:val="' + objs_list[i].data[j].options.color + '"/>';
						} // Endif.

						if ( objs_list[i].data[j].options.back ) {
							rPrData += '<w:shd w:val="clear" w:color="auto" w:fill="' + objs_list[i].data[j].options.back + '"/>';
						} // Endif.

						if ( objs_list[i].data[j].options.bold ) {
							rPrData += '<w:b/><w:bCs/>';
						} // Endif.

						if ( objs_list[i].data[j].options.underline ) {
							rPrData += '<w:u w:val="single"/>';
						} // Endif.

						if ( objs_list[i].data[j].options.font_face ) {
							rPrData += '<w:rFonts w:ascii="' + objs_list[i].data[j].options.font_face + '" w:hAnsi="' + objs_list[i].data[j].options.font_face + '" w:cs="' + objs_list[i].data[j].options.font_face + '"/>';
						} // Endif.

						if ( objs_list[i].data[j].options.font_size ) {
							rPrData += '<w:sz w:val="' + objs_list[i].data[j].options.font_size + '"/><w:szCs w:val="' + objs_list[i].data[j].options.font_size + '"/>';
						} // Endif.

						if ( objs_list[i].data[j].options.border ) {
							switch ( objs_list[i].data[j].options.border )
							{
								case 'single':
								case true:
									rPrData += '<w:bdr w:val="single" w:sz="4" w:space="0" w:color="auto"/>';
									break;
							} // End of switch.
						} // Endif.
					} // Endif.

					if ( objs_list[i].data[j].text ) {
						if ( objs_list[i].data[j].text[0] == ' ' ) {
							tExtra += ' xml:space="preserve"';
						} // Endif.

						outString += '<w:r' + rExtra + '>';

						if ( rPrData ) {
							outString += '<w:rPr>' + rPrData + '</w:rPr>';
						} // Endif.

						outString += '<w:t' + tExtra + '>' + objs_list[i].data[j].text.encodeHTML () + '</w:t></w:r>';

					} else if ( objs_list[i].data[j].page_break ) {
						outString += '<w:r><w:br w:type="page"/></w:r>';
						
					} else if ( objs_list[i].data[j].image ) {
						outString += '<w:r' + rExtra + '>';

						rPrData += '<w:noProof/>';

						if ( rPrData ) {
							outString += '<w:rPr>' + rPrData + '</w:rPr>';
						} // Endif.

						outString += '<w:drawing>';
						outString += '<wp:inline distT="0" distB="0" distL="0" distR="0">';
						outString += '<wp:extent cx="' + (objs_list[i].data[j].options.cx * 10000) + '" cy="' + (objs_list[i].data[j].options.cy * 10000) + '"/>';
						outString += '<wp:effectExtent l="19050" t="0" r="9525" b="0"/>';
						outString += '<wp:docPr id="' + (objs_list[i].data[j].image_id + 1) + '" name="Picture ' + objs_list[i].data[j].image_id + '" descr="Picture ' + objs_list[i].data[j].image_id + '"/>';
						outString += '<wp:cNvGraphicFramePr>';
						outString += '<a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>';
						outString += '</wp:cNvGraphicFramePr>';
						outString += '<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">';
						outString += '<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">';
						outString += '<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">';
						outString += '<pic:nvPicPr>';
						outString += '<pic:cNvPr id="0" name="Picture ' + objs_list[i].data[j].image_id + '"/>';
						outString += '<pic:cNvPicPr/>';
						outString += '</pic:nvPicPr>';
						outString += '<pic:blipFill>';
						outString += '<a:blip r:embed="rId' + objs_list[i].data[j].rel_id + '" cstate="print"/>';
						outString += '<a:stretch>';
						outString += '<a:fillRect/>';
						outString += '</a:stretch>';
						outString += '</pic:blipFill>';
						outString += '<pic:spPr>';
						outString += '<a:xfrm>';
						outString += '<a:off x="0" y="0"/>';
						outString += '<a:ext cx="' + objs_list[i].data[j].options.cx + '" cy="' + objs_list[i].data[j].options.cy + '"/>';
						outString += '</a:xfrm>';
						outString += '<a:prstGeom prst="rect">';
						outString += '<a:avLst/>';
						outString += '</a:prstGeom>';
						outString += '</pic:spPr>';
						outString += '</pic:pic>';
						outString += '</a:graphicData>';
						outString += '</a:graphic>';
						outString += '</wp:inline>';
						outString += '</w:drawing>';

						outString += '</w:r>';
					} // Endif.
				} // Endif.
			} // Endif.

			outString += '</w:p>';
		} // End of for loop.

		outString += '<w:p w:rsidR="00A02F19" w:rsidRDefault="00A02F19"/><w:sectPr w:rsidR="00A02F19" w:rsidSect="00A02F19"><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1800" w:bottom="1440" w:left="1800" w:header="720" w:footer="720" w:gutter="0"/><w:cols w:space="720"/><w:docGrid w:linePitch="360"/></w:sectPr></w:body></w:document>';
		return outString;
	}

	// Prepare genobj for MS-Office:
	msdoc.makemsdoc ( genobj, new_type, options, gen_private, type_info );
	gen_private.plugs.type.msoffice.makeOfficeGenerator ( 'word', 'document', {} );

	genobj.on ( 'clearData', function () {
		genobj.data.length = 0;
	});

	gen_private.plugs.type.msoffice.addInfoType ( 'dc:title', '', 'title', 'setDocTitle' );
	gen_private.plugs.type.msoffice.addInfoType ( 'dc:subject', '', 'subject', 'setDocSubject' );
	gen_private.plugs.type.msoffice.addInfoType ( 'cp:keywords', '', 'keywords', 'setDocKeywords' );
	gen_private.plugs.type.msoffice.addInfoType ( 'dc:description', '', 'description', 'setDescription' );

	gen_private.type.msoffice.files_list.push (
		{
			name: '/word/settings.xml',
			type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml',
			clear: 'type'
		},
		{
			name: '/word/fontTable.xml',
			type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml',
			clear: 'type'
		},
		{
			name: '/word/webSettings.xml',
			type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.webSettings+xml',
			clear: 'type'
		},
		{
			name: '/word/styles.xml',
			type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml',
			clear: 'type'
		},
		{
			name: '/word/document.xml',
			type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml',
			clear: 'type'
		}
	);

	gen_private.type.msoffice.rels_app.push (
		{
			type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles',
			target: 'styles.xml',
			clear: 'type'
		},
		{
			type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings',
			target: 'settings.xml',
			clear: 'type'
		},
		{
			type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings',
			target: 'webSettings.xml',
			clear: 'type'
		},
		{
			type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable',
			target: 'fontTable.xml',
			clear: 'type'
		},
		{
			type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme',
			target: 'theme/theme1.xml',
			clear: 'type'
		}
	);

	genobj.data = []; // All the data will be placed here.

	gen_private.plugs.intAddAnyResourceToParse ( 'docProps\\app.xml', 'buffer', null, cbMakeDocxApp, true );
	gen_private.plugs.intAddAnyResourceToParse ( 'word\\fontTable.xml', 'buffer', null, cbMakeDocxFontsTable, true );
	gen_private.plugs.intAddAnyResourceToParse ( 'word\\settings.xml', 'buffer', null, cbMakeDocxSettings, true );
	gen_private.plugs.intAddAnyResourceToParse ( 'word\\webSettings.xml', 'buffer', null, cbMakeDocxWeb, true );
	gen_private.plugs.intAddAnyResourceToParse ( 'word\\styles.xml', 'buffer', null, cbMakeDocxStyles, true );
	gen_private.plugs.intAddAnyResourceToParse ( 'word\\document.xml', 'buffer', genobj, cbMakeDocxDocument, true );

	gen_private.plugs.intAddAnyResourceToParse ( 'word\\_rels\\document.xml.rels', 'buffer', gen_private.type.msoffice.rels_app, gen_private.plugs.type.msoffice.cbMakeRels, true );

	// ----- API for Word documents: -----

	///
	/// @brief Create a new paragraph.
	///
	/// ???.
	///
	/// @param[in] options Default options for all the objects inside this paragraph.
	///
	genobj.createP = function ( options ) {
		var newP = {};

		newP.data = [];
		newP.options = options || {};

		///
		/// @brief Insert text inside this paragraph.
		///
		/// ???.
		///
		/// @param[in] text_msg The text message itself.
		/// @param[in] opt ???.
		/// @param[in] flag_data ???.
		///
		newP.addText = function ( text_msg, opt, flag_data ) {
			newP.data[newP.data.length] = { text: text_msg, options: opt || {}, ext_data: flag_data };
		};

		///
		/// @brief Insert an image into the current paragraph.
		///
		/// ???.
		///
		/// @param[in] image_path The image file to add.
		/// @param[in] opt Additional options (cx, cy).
		/// @param[in] image_format_type ???.
		///
		newP.addImage = function ( image_path, opt, image_format_type ) {
			var image_type = (typeof image_format_type == 'string') ? image_format_type : 'png';
			var defWidth = 320;
			var defHeight = 200;

			if ( typeof image_path == 'string' ) {
				var ret_data = fast_image_size ( image_path );
				if ( ret_data.type == 'unknown' ) {
					var image_ext = path.extname ( image_path );

					switch ( image_ext ) {
						case '.bmp':
							image_type = 'bmp';
							break;

						case '.gif':
							image_type = 'gif';
							break;

						case '.jpg':
						case '.jpeg':
							image_type = 'jpeg';
							break;

						case '.emf':
							image_type = 'emf';
							break;

						case '.tiff':
							image_type = 'tiff';
							break;
					} // End of switch.

				} else {
					if ( ret_data.width ) {
						defWidth = ret_data.width;
					} // Endif.

					if ( ret_data.height ) {
						defHeight = ret_data.height;
					} // Endif.

					image_type = ret_data.type;
					if ( image_type == 'jpg' ) {
						image_type = 'jpeg';
					} // Endif.
				} // Endif.
			} // Endif.

			var objNum = newP.data.length;
			newP.data[objNum] = { image: image_path, options: opt || {} };

			if ( !newP.data[objNum].options.cx && defWidth ) {
				newP.data[objNum].options.cx = defWidth;
			} // Endif.

			if ( !newP.data[objNum].options.cy && defHeight ) {
				newP.data[objNum].options.cy = defHeight;
			} // Endif.

			var image_id = gen_private.type.msoffice.src_files_list.indexOf ( image_path );
			var image_rel_id = -1;

			if ( image_id >= 0 ) {
				for ( var j = 0, total_size_j = gen_private.type.msoffice.rels_app.length; j < total_size_j; j++ ) {
					if ( gen_private.type.msoffice.rels_app[j].target == ('media/image' + (image_id + 1) + '.' + image_type) ) {
						image_rel_id = j + 1;
					} // Endif.
				} // Endif.
			
			} else
			{
				image_id = gen_private.type.msoffice.src_files_list.length;
				gen_private.type.msoffice.src_files_list[image_id] = image_path;
				gen_private.plugs.intAddAnyResourceToParse ( 'word\\media\\image' + (image_id + 1) + '.' + image_type, (typeof image_path == 'string') ? 'file' : 'stream', image_path, null, false );
			} // Endif.

			if ( image_rel_id == -1 ) {
				image_rel_id = gen_private.type.msoffice.rels_app.length + 1;

				gen_private.type.msoffice.rels_app.push (
					{
						type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image',
						target: 'media/image' + (image_id + 1) + '.' + image_type,
						clear: 'data'
					}
				);
			} // Endif.

			newP.data[objNum].image_id = image_id;
			newP.data[objNum].rel_id = image_rel_id;
		};

		genobj.data[genobj.data.length] = newP;
		return newP;
	};

	///
	/// @brief ???.
	///
	/// ???.
	///
	/// @param[in] options ???.
	///
	genobj.createListOfDots = function ( options ) {
		var newP = genobj.createP ( options );

		newP.options.list_type = '1';

		return newP;
	};

	///
	/// @brief Create a list of numbers based paragraph.
	///
	/// ???.
	///
	/// @param[in] options ???.
	///
	genobj.createListOfNumbers = function ( options ) {
		var newP = genobj.createP ( options );

		newP.options.list_type = '2';

		return newP;
	};

	///
	/// @brief Add a page break.
	///
	/// This method add a page break to the current Word document.
	///
	genobj.putPageBreak = function () {
		var newP = {};

		newP.data = [ { 'page_break': true } ];

		genobj.data[genobj.data.length] = newP;
		return newP;
	};
}

baseobj.plugins.registerDocType ( 'docx', makeDocx, {}, baseobj.docType.TEXT, "Microsoft Word Document" );

