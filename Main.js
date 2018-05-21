// ==UserScript==
// @id             exhen32@live.com
// @name           豆瓣电影助手|douban movie helper
// @description    豆瓣电影助手|电影黑名单|PT资源搜索链接|更多评分|字幕搜索|增加查看原图链接|增加IMDB top 250标签|一键生成简介|在changhw版本基础上修改，增加pt站搜索，去除垃圾视频站。自用脚本，代码粗糙，欢迎捉虫。
// @author         Exhen
// @connect        *
// @grant          GM_xmlhttpRequest
// @grant          GM_setClipboard
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_deleteValue
// @grant          GM_listValues
// @require        http://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @require        https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.min.js
// @resource       icon_off https://raw.githubusercontent.com/Exhen/douban-movie-helper/master/off.png
// @resource       icon_on https://raw.githubusercontent.com/Exhen/douban-movie-helper/master/on.png
// @include        https://movie.douban.com/
// @match          https://movie.douban.com/*
// @version        2018042901
// @run-at         document-start
// @namespace      exhen_js 

// ==/UserScript==

var myScriptStyle = document.createElement("style");
myScriptStyle.innerHTML = "@charset utf-8;#dale_movie_subject_top_right,#dale_movie_subject_top_right,#dale_movie_subject_top_midle,#dale_movie_subject_middle_right,#dale_movie_subject_bottom_super_banner,#footer,#dale_movie_subject_download_middle,#dale_movie_subject_inner_middle,#movie_home_left_bottom,#dale_movie_home_top_right,#dale_movie_home_side_top,#dale_movie_home_bottom_right,#dale_movie_home_inner_bottom,#dale_movie_home_download_bottom,#dale_movie_home_bottom_right_down,#dale_movie_towhome_explore_right,#dale_movie_chart_top_right,#dale_movie_tags_top_right,#dale_review_best_top_right,.mobile-app-entrance.block5.app-movie,.qrcode-app,.top-nav-doubanapp,.extra,div.gray_ad,p.pl,div.ticket{display:none}.c-aside{margin-bottom:30px}.c-aside-body{*letter-spacing:normal}.c-aside-body a{border-radius:6px;color:#37A;display:inline-block;letter-spacing:normal;margin:0 8px 8px 0;padding:0 8px;text-align:center;width:65px}.c-aside-body a:link,.c-aside-body a:visited{background-color:#f5f5f5;color:#37A}.c-aside-body a:hover,.c-aside-body a:active{background-color:#e8e8e8;color:#37A}.c-aside-body a.disabled{text-decoration:line-through}.c-aside-body a.available{background-color:#5ccccc;color:#006363}.c-aside-body a.available:hover,.c-aside-body a.available:active{background-color:#3cc}.c-aside-body a.sites_r0{text-decoration:line-through}#c_dialog li{margin:10px}#c_dialog{text-align:center}#interest_sectl .rating_imdb{border-bottom:1px solid #eaeaea;padding-bottom:0}#interest_sectl .rating_wrap{padding-top:15px}#interest_sectl .rating_more{border-bottom:1px solid #eaeaea;color:#9b9b9b;margin:0;padding:15px 0;position:relative}#interest_sectl .rating_more a{left:80px;position:absolute}#interest_sectl .rating_more .titleOverviewSprite{background:url(https://coding.net/u/Changhw/p/MyDoubanMovieHelper/git/raw/master/title_overview_sprite.png) no-repeat;display:inline-block;vertical-align:middle}#interest_sectl .rating_more .popularityImageUp{background-position:-14px -478px;height:8px;width:8px}#interest_sectl .rating_more .popularityImageDown{background-position:-34px -478px;height:8px;width:8px}#interest_sectl .rating_more .popularityUpOrFlat{color:#83C40B}#interest_sectl .rating_more .popularityDown{color:#930E02}/*!jQuery UI - v1.12.1 - 2016-09-14 * http://jqueryui.com * Includes:core.css,accordion.css,autocomplete.css,menu.css,button.css,controlgroup.css,checkboxradio.css,datepicker.css,dialog.css,draggable.css,resizable.css,progressbar.css,selectable.css,selectmenu.css,slider.css,sortable.css,spinner.css,tabs.css,tooltip.css,theme.css * To view and modify this theme,visit http://jqueryui.com/themeroller/?bgShadowXPos=&bgOverlayXPos=&bgErrorXPos=&bgHighlightXPos=&bgContentXPos=&bgHeaderXPos=&bgActiveXPos=&bgHoverXPos=&bgDefaultXPos=&bgShadowYPos=&bgOverlayYPos=&bgErrorYPos=&bgHighlightYPos=&bgContentYPos=&bgHeaderYPos=&bgActiveYPos=&bgHoverYPos=&bgDefaultYPos=&bgShadowRepeat=&bgOverlayRepeat=&bgErrorRepeat=&bgHighlightRepeat=&bgContentRepeat=&bgHeaderRepeat=&bgActiveRepeat=&bgHoverRepeat=&bgDefaultRepeat=&iconsHover=url(%22images%2Fui-icons_555555_256x240.png%22)&iconsHighlight=url(%22images%2Fui-icons_777620_256x240.png%22)&iconsHeader=url(%22images%2Fui-icons_444444_256x240.png%22)&iconsError=url(%22images%2Fui-icons_cc0000_256x240.png%22)&iconsDefault=url(%22images%2Fui-icons_777777_256x240.png%22)&iconsContent=url(%22images%2Fui-icons_444444_256x240.png%22)&iconsActive=url(%22images%2Fui-icons_ffffff_256x240.png%22)&bgImgUrlShadow=&bgImgUrlOverlay=&bgImgUrlHover=&bgImgUrlHighlight=&bgImgUrlHeader=&bgImgUrlError=&bgImgUrlDefault=&bgImgUrlContent=&bgImgUrlActive=&opacityFilterShadow=Alpha(Opacity%3D30)&opacityFilterOverlay=Alpha(Opacity%3D30)&opacityShadowPerc=30&opacityOverlayPerc=30&iconColorHover=%23555555&iconColorHighlight=%23777620&iconColorHeader=%23444444&iconColorError=%23cc0000&iconColorDefault=%23777777&iconColorContent=%23444444&iconColorActive=%23ffffff&bgImgOpacityShadow=0&bgImgOpacityOverlay=0&bgImgOpacityError=95&bgImgOpacityHighlight=55&bgImgOpacityContent=75&bgImgOpacityHeader=75&bgImgOpacityActive=65&bgImgOpacityHover=75&bgImgOpacityDefault=75&bgTextureShadow=flat&bgTextureOverlay=flat&bgTextureError=flat&bgTextureHighlight=flat&bgTextureContent=flat&bgTextureHeader=flat&bgTextureActive=flat&bgTextureHover=flat&bgTextureDefault=flat&cornerRadius=3px&fwDefault=normal&ffDefault=Arial%2CHelvetica%2Csans-serif&fsDefault=1em&cornerRadiusShadow=8px&thicknessShadow=5px&offsetLeftShadow=0px&offsetTopShadow=0px&opacityShadow=.3&bgColorShadow=%23666666&opacityOverlay=.3&bgColorOverlay=%23aaaaaa&fcError=%235f3f3f&borderColorError=%23f1a899&bgColorError=%23fddfdf&fcHighlight=%23777620&borderColorHighlight=%23dad55e&bgColorHighlight=%23fffa90&fcContent=%23333333&borderColorContent=%23dddddd&bgColorContent=%23ffffff&fcHeader=%23333333&borderColorHeader=%23dddddd&bgColorHeader=%23e9e9e9&fcActive=%23ffffff&borderColorActive=%23003eff&bgColorActive=%23007fff&fcHover=%232b2b2b&borderColorHover=%23cccccc&bgColorHover=%23ededed&fcDefault=%23454545&borderColorDefault=%23c5c5c5&bgColorDefault=%23f6f6f6 * Copyright jQuery Foundation and other contributors;Licensed MIT */ .ui-helper-hidden{display:none}.ui-helper-hidden-accessible{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.ui-helper-reset{border:0;font-size:100%;line-height:1.3;list-style:none;margin:0;outline:0;padding:0;text-decoration:none}.ui-helper-clearfix:before,.ui-helper-clearfix:after{border-collapse:collapse;content:'';display:table}.ui-helper-clearfix:after{clear:both}.ui-helper-zfix{height:100%;left:0;opacity:0;position:absolute;top:0;width:100%;filter:Alpha(Opacity=0)}.ui-front{z-index:100}.ui-state-disabled{cursor:default !important;pointer-events:none}.ui-icon{background-repeat:no-repeat;display:inline-block;margin-top:-.25em;overflow:hidden;position:relative;text-indent:-99999px;vertical-align:middle}.ui-widget-icon-block{display:block;left:50%;margin-left:-8px}.ui-widget-overlay{height:100%;left:0;position:fixed;top:0;width:100%}.ui-accordion .ui-accordion-header{cursor:pointer;display:block;font-size:100%;margin:2px 0 0 0;padding:.5em .5em .5em .7em;position:relative}.ui-accordion .ui-accordion-content{border-top:0;overflow:auto;padding:1em 2.2em}.ui-autocomplete{cursor:default;left:0;position:absolute;top:0}.ui-menu{display:block;list-style:none;margin:0;outline:0;padding:0}.ui-menu .ui-menu{position:absolute}.ui-menu .ui-menu-item{cursor:pointer;list-style-image:url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7);margin:0}.ui-menu .ui-menu-item-wrapper{padding:3px 1em 3px .4em;position:relative}.ui-menu .ui-menu-divider{border-width:1px 0 0 0;font-size:0;height:0;line-height:0;margin:5px 0}.ui-menu .ui-state-focus,.ui-menu .ui-state-active{margin:-1px}.ui-menu-icons{position:relative}.ui-menu-icons .ui-menu-item-wrapper{padding-left:2em}.ui-menu .ui-icon{bottom:0;left:.2em;margin:auto 0;position:absolute;top:0}.ui-menu .ui-menu-icon{left:auto;right:0}.ui-button{cursor:pointer;display:inline-block;line-height:normal;margin-right:.1em;overflow:visible;padding:.4em 1em;position:relative;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ui-button,.ui-button:link,.ui-button:visited,.ui-button:hover,.ui-button:active{text-decoration:none}.ui-button-icon-only{box-sizing:border-box;text-indent:-9999px;white-space:nowrap;width:2em}input.ui-button.ui-button-icon-only{text-indent:0}.ui-button-icon-only .ui-icon{left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%}.ui-button.ui-icon-notext .ui-icon{height:2.1em;padding:0;text-indent:-9999px;white-space:nowrap;width:2.1em}input.ui-button.ui-icon-notext .ui-icon{height:auto;padding:.4em 1em;text-indent:0;white-space:normal;width:auto}input.ui-button::-moz-focus-inner,button.ui-button::-moz-focus-inner{border:0;padding:0}.ui-controlgroup{display:inline-block;vertical-align:middle}.ui-controlgroup>.ui-controlgroup-item{float:left;margin-left:0;margin-right:0}.ui-controlgroup>.ui-controlgroup-item:focus,.ui-controlgroup>.ui-controlgroup-item.ui-visual-focus{z-index:9999}.ui-controlgroup-vertical>.ui-controlgroup-item{display:block;float:none;margin-bottom:0;margin-top:0;text-align:left;width:100%}.ui-controlgroup-vertical .ui-controlgroup-item{box-sizing:border-box}.ui-controlgroup .ui-controlgroup-label{padding:.4em 1em}.ui-controlgroup .ui-controlgroup-label span{font-size:80%}.ui-controlgroup-horizontal .ui-controlgroup-label + .ui-controlgroup-item{border-left:none}.ui-controlgroup-vertical .ui-controlgroup-label + .ui-controlgroup-item{border-top:none}.ui-controlgroup-horizontal .ui-controlgroup-label.ui-widget-content{border-right:none}.ui-controlgroup-vertical .ui-controlgroup-label.ui-widget-content{border-bottom:none}.ui-controlgroup-vertical .ui-spinner-input{width:75%;width:calc(100% - 2.4em)}.ui-controlgroup-vertical .ui-spinner .ui-spinner-up{border-top-style:solid}.ui-checkboxradio-label .ui-icon-background{border:0;border-radius:.12em;box-shadow:inset 1px 1px 1px #ccc}.ui-checkboxradio-radio-label .ui-icon-background{border:0;border-radius:1em;height:16px;overflow:visible;width:16px}.ui-checkboxradio-radio-label.ui-checkboxradio-checked .ui-icon,.ui-checkboxradio-radio-label.ui-checkboxradio-checked:hover .ui-icon{background-image:none;border-style:solid;border-width:4px;height:8px;width:8px}.ui-checkboxradio-disabled{pointer-events:none}.ui-datepicker{display:none;padding:.2em .2em 0;width:17em}.ui-datepicker .ui-datepicker-header{padding:.2em 0;position:relative}.ui-datepicker .ui-datepicker-prev,.ui-datepicker .ui-datepicker-next{height:1.8em;position:absolute;top:2px;width:1.8em}.ui-datepicker .ui-datepicker-prev-hover,.ui-datepicker .ui-datepicker-next-hover{top:1px}.ui-datepicker .ui-datepicker-prev{left:2px}.ui-datepicker .ui-datepicker-next{right:2px}.ui-datepicker .ui-datepicker-prev-hover{left:1px}.ui-datepicker .ui-datepicker-next-hover{right:1px}.ui-datepicker .ui-datepicker-prev span,.ui-datepicker .ui-datepicker-next span{display:block;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%}.ui-datepicker .ui-datepicker-title{line-height:1.8em;margin:0 2.3em;text-align:center}.ui-datepicker .ui-datepicker-title select{font-size:1em;margin:1px 0}.ui-datepicker select.ui-datepicker-month,.ui-datepicker select.ui-datepicker-year{width:45%}.ui-datepicker table{border-collapse:collapse;font-size:.9em;margin:0 0 .4em;width:100%}.ui-datepicker th{border:0;font-weight:bold;padding:.7em .3em;text-align:center}.ui-datepicker td{border:0;padding:1px}.ui-datepicker td span,.ui-datepicker td a{display:block;padding:.2em;text-align:right;text-decoration:none}.ui-datepicker .ui-datepicker-buttonpane{background-image:none;border-bottom:0;border-left:0;border-right:0;margin:.7em 0 0 0;padding:0 .2em}.ui-datepicker .ui-datepicker-buttonpane button{cursor:pointer;float:right;margin:.5em .2em .4em;overflow:visible;padding:.2em .6em .3em .6em;width:auto}.ui-datepicker .ui-datepicker-buttonpane button.ui-datepicker-current{float:left}.ui-datepicker.ui-datepicker-multi{width:auto}.ui-datepicker-multi .ui-datepicker-group{float:left}.ui-datepicker-multi .ui-datepicker-group table{margin:0 auto .4em;width:95%}.ui-datepicker-multi-2 .ui-datepicker-group{width:50%}.ui-datepicker-multi-3 .ui-datepicker-group{width:33.3%}.ui-datepicker-multi-4 .ui-datepicker-group{width:25%}.ui-datepicker-multi .ui-datepicker-group-last .ui-datepicker-header,.ui-datepicker-multi .ui-datepicker-group-middle .ui-datepicker-header{border-left-width:0}.ui-datepicker-multi .ui-datepicker-buttonpane{clear:left}.ui-datepicker-row-break{clear:both;font-size:0;width:100%}.ui-datepicker-rtl{direction:rtl}.ui-datepicker-rtl .ui-datepicker-prev{left:auto;right:2px}.ui-datepicker-rtl .ui-datepicker-next{left:2px;right:auto}.ui-datepicker-rtl .ui-datepicker-prev:hover{left:auto;right:1px}.ui-datepicker-rtl .ui-datepicker-next:hover{left:1px;right:auto}.ui-datepicker-rtl .ui-datepicker-buttonpane{clear:right}.ui-datepicker-rtl .ui-datepicker-buttonpane button{float:left}.ui-datepicker-rtl .ui-datepicker-buttonpane button.ui-datepicker-current,.ui-datepicker-rtl .ui-datepicker-group{float:right}.ui-datepicker-rtl .ui-datepicker-group-last .ui-datepicker-header,.ui-datepicker-rtl .ui-datepicker-group-middle .ui-datepicker-header{border-left-width:1px;border-right-width:0}.ui-datepicker .ui-icon{background-repeat:no-repeat;display:block;left:.5em;overflow:hidden;text-indent:-99999px;top:.3em}.ui-dialog{left:0;outline:0;padding:.2em;position:absolute;top:0}.ui-dialog .ui-dialog-titlebar{padding:.4em 1em;position:relative}.ui-dialog .ui-dialog-title{float:left;margin:.1em 0;overflow:hidden;white-space:nowrap;width:90%;text-overflow:ellipsis}.ui-dialog .ui-dialog-titlebar-close{height:20px;margin:-10px 0 0 0;padding:1px;position:absolute;right:.3em;top:50%;width:20px}.ui-dialog .ui-dialog-content{background:none;border:0;overflow:auto;padding:.5em 1em;position:relative}.ui-dialog .ui-dialog-buttonpane{background-image:none;border-width:1px 0 0 0;margin-top:.5em;padding:.3em 1em .5em .4em;text-align:left}.ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset{float:right}.ui-dialog .ui-dialog-buttonpane button{cursor:pointer;margin:.5em .4em .5em 0}.ui-dialog .ui-resizable-n{height:2px;top:0}.ui-dialog .ui-resizable-e{right:0;width:2px}.ui-dialog .ui-resizable-s{bottom:0;height:2px}.ui-dialog .ui-resizable-w{left:0;width:2px}.ui-dialog .ui-resizable-se,.ui-dialog .ui-resizable-sw,.ui-dialog .ui-resizable-ne,.ui-dialog .ui-resizable-nw{height:7px;width:7px}.ui-dialog .ui-resizable-se{bottom:0;right:0}.ui-dialog .ui-resizable-sw{bottom:0;left:0}.ui-dialog .ui-resizable-ne{right:0;top:0}.ui-dialog .ui-resizable-nw{left:0;top:0}.ui-draggable .ui-dialog-titlebar{cursor:move}.ui-draggable-handle{-ms-touch-action:none;touch-action:none}.ui-resizable{position:relative}.ui-resizable-handle{display:block;font-size:.1px;position:absolute;-ms-touch-action:none;touch-action:none}.ui-resizable-disabled .ui-resizable-handle,.ui-resizable-autohide .ui-resizable-handle{display:none}.ui-resizable-n{cursor:n-resize;height:7px;left:0;top:-5px;width:100%}.ui-resizable-s{bottom:-5px;cursor:s-resize;height:7px;left:0;width:100%}.ui-resizable-e{cursor:e-resize;height:100%;right:-5px;top:0;width:7px}.ui-resizable-w{cursor:w-resize;height:100%;left:-5px;top:0;width:7px}.ui-resizable-se{bottom:1px;cursor:se-resize;height:12px;right:1px;width:12px}.ui-resizable-sw{bottom:-5px;cursor:sw-resize;height:9px;left:-5px;width:9px}.ui-resizable-nw{cursor:nw-resize;height:9px;left:-5px;top:-5px;width:9px}.ui-resizable-ne{cursor:ne-resize;height:9px;right:-5px;top:-5px;width:9px}.ui-progressbar{height:2em;overflow:hidden;text-align:left}.ui-progressbar .ui-progressbar-value{height:100%;margin:-1px}.ui-progressbar .ui-progressbar-overlay{background:url(data:image/gif;base64,R0lGODlhKAAoAIABAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAQABACwAAAAAKAAoAAACkYwNqXrdC52DS06a7MFZI+4FHBCKoDeWKXqymPqGqxvJrXZbMx7Ttc+w9XgU2FB3lOyQRWET2IFGiU9m1frDVpxZZc6bfHwv4c1YXP6k1Vdy292Fb6UkuvFtXpvWSzA+HycXJHUXiGYIiMg2R6W459gnWGfHNdjIqDWVqemH2ekpObkpOlppWUqZiqr6edqqWQAAIfkECQEAAQAsAAAAACgAKAAAApSMgZnGfaqcg1E2uuzDmmHUBR8Qil95hiPKqWn3aqtLsS18y7G1SzNeowWBENtQd+T1JktP05nzPTdJZlR6vUxNWWjV+vUWhWNkWFwxl9VpZRedYcflIOLafaa28XdsH/ynlcc1uPVDZxQIR0K25+cICCmoqCe5mGhZOfeYSUh5yJcJyrkZWWpaR8doJ2o4NYq62lAAACH5BAkBAAEALAAAAAAoACgAAAKVDI4Yy22ZnINRNqosw0Bv7i1gyHUkFj7oSaWlu3ovC8GxNso5fluz3qLVhBVeT/Lz7ZTHyxL5dDalQWPVOsQWtRnuwXaFTj9jVVh8pma9JjZ4zYSj5ZOyma7uuolffh+IR5aW97cHuBUXKGKXlKjn+DiHWMcYJah4N0lYCMlJOXipGRr5qdgoSTrqWSq6WFl2ypoaUAAAIfkECQEAAQAsAAAAACgAKAAAApaEb6HLgd/iO7FNWtcFWe+ufODGjRfoiJ2akShbueb0wtI50zm02pbvwfWEMWBQ1zKGlLIhskiEPm9R6vRXxV4ZzWT2yHOGpWMyorblKlNp8HmHEb/lCXjcW7bmtXP8Xt229OVWR1fod2eWqNfHuMjXCPkIGNileOiImVmCOEmoSfn3yXlJWmoHGhqp6ilYuWYpmTqKUgAAIfkECQEAAQAsAAAAACgAKAAAApiEH6kb58biQ3FNWtMFWW3eNVcojuFGfqnZqSebuS06w5V80/X02pKe8zFwP6EFWOT1lDFk8rGERh1TTNOocQ61Hm4Xm2VexUHpzjymViHrFbiELsefVrn6XKfnt2Q9G/+Xdie499XHd2g4h7ioOGhXGJboGAnXSBnoBwKYyfioubZJ2Hn0RuRZaflZOil56Zp6iioKSXpUAAAh+QQJAQABACwAAAAAKAAoAAACkoQRqRvnxuI7kU1a1UU5bd5tnSeOZXhmn5lWK3qNTWvRdQxP8qvaC+/yaYQzXO7BMvaUEmJRd3TsiMAgswmNYrSgZdYrTX6tSHGZO73ezuAw2uxuQ+BbeZfMxsexY35+/Qe4J1inV0g4x3WHuMhIl2jXOKT2Q+VU5fgoSUI52VfZyfkJGkha6jmY+aaYdirq+lQAACH5BAkBAAEALAAAAAAoACgAAAKWBIKpYe0L3YNKToqswUlvznigd4wiR4KhZrKt9Upqip61i9E3vMvxRdHlbEFiEXfk9YARYxOZZD6VQ2pUunBmtRXo1Lf8hMVVcNl8JafV38aM2/Fu5V16Bn63r6xt97j09+MXSFi4BniGFae3hzbH9+hYBzkpuUh5aZmHuanZOZgIuvbGiNeomCnaxxap2upaCZsq+1kAACH5BAkBAAEALAAAAAAoACgAAAKXjI8By5zf4kOxTVrXNVlv1X0d8IGZGKLnNpYtm8Lr9cqVeuOSvfOW79D9aDHizNhDJidFZhNydEahOaDH6nomtJjp1tutKoNWkvA6JqfRVLHU/QUfau9l2x7G54d1fl995xcIGAdXqMfBNadoYrhH+Mg2KBlpVpbluCiXmMnZ2Sh4GBqJ+ckIOqqJ6LmKSllZmsoq6wpQAAAh+QQJAQABACwAAAAAKAAoAAAClYx/oLvoxuJDkU1a1YUZbJ59nSd2ZXhWqbRa2/gF8Gu2DY3iqs7yrq+xBYEkYvFSM8aSSObE+ZgRl1BHFZNr7pRCavZ5BW2142hY3AN/zWtsmf12p9XxxFl2lpLn1rseztfXZjdIWIf2s5dItwjYKBgo9yg5pHgzJXTEeGlZuenpyPmpGQoKOWkYmSpaSnqKileI2FAAACH5BAkBAAEALAAAAAAoACgAAAKVjB+gu+jG4kORTVrVhRlsnn2dJ3ZleFaptFrb+CXmO9OozeL5VfP99HvAWhpiUdcwkpBH3825AwYdU8xTqlLGhtCosArKMpvfa1mMRae9VvWZfeB2XfPkeLmm18lUcBj+p5dnN8jXZ3YIGEhYuOUn45aoCDkp16hl5IjYJvjWKcnoGQpqyPlpOhr3aElaqrq56Bq7VAAAOw==);height:100%;opacity:.25;filter:alpha(opacity=25)}.ui-progressbar-indeterminate .ui-progressbar-value{background-image:none}.ui-selectable{-ms-touch-action:none;touch-action:none}.ui-selectable-helper{border:1px dotted black;position:absolute;z-index:100}.ui-selectmenu-menu{display:none;left:0;margin:0;padding:0;position:absolute;top:0}.ui-selectmenu-menu .ui-menu{overflow:auto;overflow-x:hidden;padding-bottom:1px}.ui-selectmenu-menu .ui-menu .ui-selectmenu-optgroup{border:0;font-size:1em;font-weight:bold;height:auto;line-height:1.5;margin:.5em 0 0 0;padding:2px .4em}.ui-selectmenu-open{display:block}.ui-selectmenu-text{display:block;margin-right:20px;overflow:hidden;text-overflow:ellipsis}.ui-selectmenu-button.ui-button{text-align:left;white-space:nowrap;width:14em}.ui-selectmenu-icon.ui-icon{float:right;margin-top:0}.ui-slider{position:relative;text-align:left}.ui-slider .ui-slider-handle{cursor:default;height:1.2em;position:absolute;width:1.2em;z-index:2;-ms-touch-action:none;touch-action:none}.ui-slider .ui-slider-range{background-position:0 0;border:0;display:block;font-size:.7em;position:absolute;z-index:1}.ui-slider.ui-state-disabled .ui-slider-handle,.ui-slider.ui-state-disabled .ui-slider-range{filter:inherit}.ui-slider-horizontal{height:.8em}.ui-slider-horizontal .ui-slider-handle{margin-left:-.6em;top:-.3em}.ui-slider-horizontal .ui-slider-range{height:100%;top:0}.ui-slider-horizontal .ui-slider-range-min{left:0}.ui-slider-horizontal .ui-slider-range-max{right:0}.ui-slider-vertical{height:100px;width:.8em}.ui-slider-vertical .ui-slider-handle{left:-.3em;margin-bottom:-.6em;margin-left:0}.ui-slider-vertical .ui-slider-range{left:0;width:100%}.ui-slider-vertical .ui-slider-range-min{bottom:0}.ui-slider-vertical .ui-slider-range-max{top:0}.ui-sortable-handle{-ms-touch-action:none;touch-action:none}.ui-spinner{display:inline-block;overflow:hidden;padding:0;position:relative;vertical-align:middle}.ui-spinner-input{background:none;border:0;color:inherit;margin:.2em 0;margin-left:.4em;margin-right:2em;padding:.222em 0;vertical-align:middle}.ui-spinner-button{cursor:default;display:block;font-size:.5em;height:50%;margin:0;overflow:hidden;padding:0;position:absolute;right:0;text-align:center;width:1.6em}.ui-spinner a.ui-spinner-button{border-bottom-style:none;border-right-style:none;border-top-style:none}.ui-spinner-up{top:0}.ui-spinner-down{bottom:0}.ui-tabs{padding:.2em;position:relative}.ui-tabs .ui-tabs-nav{margin:0;padding:.2em .2em 0}.ui-tabs .ui-tabs-nav li{border-bottom-width:0;float:left;list-style:none;margin:1px .2em 0 0;padding:0;position:relative;top:0;white-space:nowrap}.ui-tabs .ui-tabs-nav .ui-tabs-anchor{float:left;padding:.5em 1em;text-decoration:none}.ui-tabs .ui-tabs-nav li.ui-tabs-active{margin-bottom:-1px;padding-bottom:1px}.ui-tabs .ui-tabs-nav li.ui-tabs-active .ui-tabs-anchor,.ui-tabs .ui-tabs-nav li.ui-state-disabled .ui-tabs-anchor,.ui-tabs .ui-tabs-nav li.ui-tabs-loading .ui-tabs-anchor{cursor:text}.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-active .ui-tabs-anchor{cursor:pointer}.ui-tabs .ui-tabs-panel{background:none;border-width:0;display:block;padding:1em 1.4em}.ui-tooltip{max-width:300px;padding:8px;position:absolute;z-index:9999}body .ui-tooltip{border-width:2px}.ui-widget{font-family:Arial,Helvetica,sans-serif;font-size:1em}.ui-widget .ui-widget{font-size:1em}.ui-widget input,.ui-widget select,.ui-widget textarea,.ui-widget button{font-family:Arial,Helvetica,sans-serif;font-size:1em}.ui-widget.ui-widget-content{border:1px solid #c5c5c5}.ui-widget-content{background:#fff;border:1px solid #ddd;color:#333}.ui-widget-content a{color:#333}.ui-widget-header{background:#e9e9e9;border:1px solid #ddd;color:#333;font-weight:bold}.ui-widget-header a{color:#333}.ui-state-default,.ui-widget-content .ui-state-default,.ui-widget-header .ui-state-default,.ui-button,html .ui-button.ui-state-disabled:hover,html .ui-button.ui-state-disabled:active{background:#f6f6f6;border:1px solid #c5c5c5;color:#454545;font-weight:normal}.ui-state-default a,.ui-state-default a:link,.ui-state-default a:visited,a.ui-button,a:link.ui-button,a:visited.ui-button,.ui-button{color:#454545;text-decoration:none}.ui-state-hover,.ui-widget-content .ui-state-hover,.ui-widget-header .ui-state-hover,.ui-state-focus,.ui-widget-content .ui-state-focus,.ui-widget-header .ui-state-focus,.ui-button:hover,.ui-button:focus{background:#ededed;border:1px solid #ccc;color:#2b2b2b;font-weight:normal}.ui-state-hover a,.ui-state-hover a:hover,.ui-state-hover a:link,.ui-state-hover a:visited,.ui-state-focus a,.ui-state-focus a:hover,.ui-state-focus a:link,.ui-state-focus a:visited,a.ui-button:hover,a.ui-button:focus{color:#2b2b2b;text-decoration:none}.ui-visual-focus{box-shadow:0 0 3px 1px #5e9ed6}.ui-state-active,.ui-widget-content .ui-state-active,.ui-widget-header .ui-state-active,a.ui-button:active,.ui-button:active,.ui-button.ui-state-active:hover{background:#007fff;border:1px solid #003eff;color:#fff;font-weight:normal}.ui-icon-background,.ui-state-active .ui-icon-background{background-color:#fff;border:#003eff}.ui-state-active a,.ui-state-active a:link,.ui-state-active a:visited{color:#fff;text-decoration:none}.ui-state-highlight,.ui-widget-content .ui-state-highlight,.ui-widget-header .ui-state-highlight{background:#fffa90;border:1px solid #dad55e;color:#777620}.ui-state-checked{background:#fffa90;border:1px solid #dad55e}.ui-state-highlight a,.ui-widget-content .ui-state-highlight a,.ui-widget-header .ui-state-highlight a{color:#777620}.ui-state-error,.ui-widget-content .ui-state-error,.ui-widget-header .ui-state-error{background:#fddfdf;border:1px solid #f1a899;color:#5f3f3f}.ui-state-error a,.ui-widget-content .ui-state-error a,.ui-widget-header .ui-state-error a{color:#5f3f3f}.ui-state-error-text,.ui-widget-content .ui-state-error-text,.ui-widget-header .ui-state-error-text{color:#5f3f3f}.ui-priority-primary,.ui-widget-content .ui-priority-primary,.ui-widget-header .ui-priority-primary{font-weight:bold}.ui-priority-secondary,.ui-widget-content .ui-priority-secondary,.ui-widget-header .ui-priority-secondary{font-weight:normal;opacity:.7;filter:Alpha(Opacity=70)}.ui-state-disabled,.ui-widget-content .ui-state-disabled,.ui-widget-header .ui-state-disabled{background-image:none;opacity:.35;filter:Alpha(Opacity=35)}.ui-state-disabled .ui-icon{filter:Alpha(Opacity=35)}.ui-icon{height:16px;width:16px}.ui-icon,.ui-widget-content .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_444444_256x240.png)}.ui-widget-header .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_444444_256x240.png)}.ui-state-hover .ui-icon,.ui-state-focus .ui-icon,.ui-button:hover .ui-icon,.ui-button:focus .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_555555_256x240.png)}.ui-state-active .ui-icon,.ui-button:active .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_ffffff_256x240.png)}.ui-state-highlight .ui-icon,.ui-button .ui-state-highlight.ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_777620_256x240.png)}.ui-state-error .ui-icon,.ui-state-error-text .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_cc0000_256x240.png)}.ui-button .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_777777_256x240.png)}.ui-icon-blank{background-position:16px 16px}.ui-icon-caret-1-n{background-position:0 0}.ui-icon-caret-1-ne{background-position:-16px 0}.ui-icon-caret-1-e{background-position:-32px 0}.ui-icon-caret-1-se{background-position:-48px 0}.ui-icon-caret-1-s{background-position:-65px 0}.ui-icon-caret-1-sw{background-position:-80px 0}.ui-icon-caret-1-w{background-position:-96px 0}.ui-icon-caret-1-nw{background-position:-112px 0}.ui-icon-caret-2-n-s{background-position:-128px 0}.ui-icon-caret-2-e-w{background-position:-144px 0}.ui-icon-triangle-1-n{background-position:0 -16px}.ui-icon-triangle-1-ne{background-position:-16px -16px}.ui-icon-triangle-1-e{background-position:-32px -16px}.ui-icon-triangle-1-se{background-position:-48px -16px}.ui-icon-triangle-1-s{background-position:-65px -16px}.ui-icon-triangle-1-sw{background-position:-80px -16px}.ui-icon-triangle-1-w{background-position:-96px -16px}.ui-icon-triangle-1-nw{background-position:-112px -16px}.ui-icon-triangle-2-n-s{background-position:-128px -16px}.ui-icon-triangle-2-e-w{background-position:-144px -16px}.ui-icon-arrow-1-n{background-position:0 -32px}.ui-icon-arrow-1-ne{background-position:-16px -32px}.ui-icon-arrow-1-e{background-position:-32px -32px}.ui-icon-arrow-1-se{background-position:-48px -32px}.ui-icon-arrow-1-s{background-position:-65px -32px}.ui-icon-arrow-1-sw{background-position:-80px -32px}.ui-icon-arrow-1-w{background-position:-96px -32px}.ui-icon-arrow-1-nw{background-position:-112px -32px}.ui-icon-arrow-2-n-s{background-position:-128px -32px}.ui-icon-arrow-2-ne-sw{background-position:-144px -32px}.ui-icon-arrow-2-e-w{background-position:-160px -32px}.ui-icon-arrow-2-se-nw{background-position:-176px -32px}.ui-icon-arrowstop-1-n{background-position:-192px -32px}.ui-icon-arrowstop-1-e{background-position:-208px -32px}.ui-icon-arrowstop-1-s{background-position:-224px -32px}.ui-icon-arrowstop-1-w{background-position:-240px -32px}.ui-icon-arrowthick-1-n{background-position:1px -48px}.ui-icon-arrowthick-1-ne{background-position:-16px -48px}.ui-icon-arrowthick-1-e{background-position:-32px -48px}.ui-icon-arrowthick-1-se{background-position:-48px -48px}.ui-icon-arrowthick-1-s{background-position:-64px -48px}.ui-icon-arrowthick-1-sw{background-position:-80px -48px}.ui-icon-arrowthick-1-w{background-position:-96px -48px}.ui-icon-arrowthick-1-nw{background-position:-112px -48px}.ui-icon-arrowthick-2-n-s{background-position:-128px -48px}.ui-icon-arrowthick-2-ne-sw{background-position:-144px -48px}.ui-icon-arrowthick-2-e-w{background-position:-160px -48px}.ui-icon-arrowthick-2-se-nw{background-position:-176px -48px}.ui-icon-arrowthickstop-1-n{background-position:-192px -48px}.ui-icon-arrowthickstop-1-e{background-position:-208px -48px}.ui-icon-arrowthickstop-1-s{background-position:-224px -48px}.ui-icon-arrowthickstop-1-w{background-position:-240px -48px}.ui-icon-arrowreturnthick-1-w{background-position:0 -64px}.ui-icon-arrowreturnthick-1-n{background-position:-16px -64px}.ui-icon-arrowreturnthick-1-e{background-position:-32px -64px}.ui-icon-arrowreturnthick-1-s{background-position:-48px -64px}.ui-icon-arrowreturn-1-w{background-position:-64px -64px}.ui-icon-arrowreturn-1-n{background-position:-80px -64px}.ui-icon-arrowreturn-1-e{background-position:-96px -64px}.ui-icon-arrowreturn-1-s{background-position:-112px -64px}.ui-icon-arrowrefresh-1-w{background-position:-128px -64px}.ui-icon-arrowrefresh-1-n{background-position:-144px -64px}.ui-icon-arrowrefresh-1-e{background-position:-160px -64px}.ui-icon-arrowrefresh-1-s{background-position:-176px -64px}.ui-icon-arrow-4{background-position:0 -80px}.ui-icon-arrow-4-diag{background-position:-16px -80px}.ui-icon-extlink{background-position:-32px -80px}.ui-icon-newwin{background-position:-48px -80px}.ui-icon-refresh{background-position:-64px -80px}.ui-icon-shuffle{background-position:-80px -80px}.ui-icon-transfer-e-w{background-position:-96px -80px}.ui-icon-transferthick-e-w{background-position:-112px -80px}.ui-icon-folder-collapsed{background-position:0 -96px}.ui-icon-folder-open{background-position:-16px -96px}.ui-icon-document{background-position:-32px -96px}.ui-icon-document-b{background-position:-48px -96px}.ui-icon-note{background-position:-64px -96px}.ui-icon-mail-closed{background-position:-80px -96px}.ui-icon-mail-open{background-position:-96px -96px}.ui-icon-suitcase{background-position:-112px -96px}.ui-icon-comment{background-position:-128px -96px}.ui-icon-person{background-position:-144px -96px}.ui-icon-print{background-position:-160px -96px}.ui-icon-trash{background-position:-176px -96px}.ui-icon-locked{background-position:-192px -96px}.ui-icon-unlocked{background-position:-208px -96px}.ui-icon-bookmark{background-position:-224px -96px}.ui-icon-tag{background-position:-240px -96px}.ui-icon-home{background-position:0 -112px}.ui-icon-flag{background-position:-16px -112px}.ui-icon-calendar{background-position:-32px -112px}.ui-icon-cart{background-position:-48px -112px}.ui-icon-pencil{background-position:-64px -112px}.ui-icon-clock{background-position:-80px -112px}.ui-icon-disk{background-position:-96px -112px}.ui-icon-calculator{background-position:-112px -112px}.ui-icon-zoomin{background-position:-128px -112px}.ui-icon-zoomout{background-position:-144px -112px}.ui-icon-search{background-position:-160px -112px}.ui-icon-wrench{background-position:-176px -112px}.ui-icon-gear{background-position:-192px -112px}.ui-icon-heart{background-position:-208px -112px}.ui-icon-star{background-position:-224px -112px}.ui-icon-link{background-position:-240px -112px}.ui-icon-cancel{background-position:0 -128px}.ui-icon-plus{background-position:-16px -128px}.ui-icon-plusthick{background-position:-32px -128px}.ui-icon-minus{background-position:-48px -128px}.ui-icon-minusthick{background-position:-64px -128px}.ui-icon-close{background-position:-80px -128px}.ui-icon-closethick{background-position:-96px -128px}.ui-icon-key{background-position:-112px -128px}.ui-icon-lightbulb{background-position:-128px -128px}.ui-icon-scissors{background-position:-144px -128px}.ui-icon-clipboard{background-position:-160px -128px}.ui-icon-copy{background-position:-176px -128px}.ui-icon-contact{background-position:-192px -128px}.ui-icon-image{background-position:-208px -128px}.ui-icon-video{background-position:-224px -128px}.ui-icon-script{background-position:-240px -128px}.ui-icon-alert{background-position:0 -144px}.ui-icon-info{background-position:-16px -144px}.ui-icon-notice{background-position:-32px -144px}.ui-icon-help{background-position:-48px -144px}.ui-icon-check{background-position:-64px -144px}.ui-icon-bullet{background-position:-80px -144px}.ui-icon-radio-on{background-position:-96px -144px}.ui-icon-radio-off{background-position:-112px -144px}.ui-icon-pin-w{background-position:-128px -144px}.ui-icon-pin-s{background-position:-144px -144px}.ui-icon-play{background-position:0 -160px}.ui-icon-pause{background-position:-16px -160px}.ui-icon-seek-next{background-position:-32px -160px}.ui-icon-seek-prev{background-position:-48px -160px}.ui-icon-seek-end{background-position:-64px -160px}.ui-icon-seek-start{background-position:-80px -160px}.ui-icon-seek-first{background-position:-80px -160px}.ui-icon-stop{background-position:-96px -160px}.ui-icon-eject{background-position:-112px -160px}.ui-icon-volume-off{background-position:-128px -160px}.ui-icon-volume-on{background-position:-144px -160px}.ui-icon-power{background-position:0 -176px}.ui-icon-signal-diag{background-position:-16px -176px}.ui-icon-signal{background-position:-32px -176px}.ui-icon-battery-0{background-position:-48px -176px}.ui-icon-battery-1{background-position:-64px -176px}.ui-icon-battery-2{background-position:-80px -176px}.ui-icon-battery-3{background-position:-96px -176px}.ui-icon-circle-plus{background-position:0 -192px}.ui-icon-circle-minus{background-position:-16px -192px}.ui-icon-circle-close{background-position:-32px -192px}.ui-icon-circle-triangle-e{background-position:-48px -192px}.ui-icon-circle-triangle-s{background-position:-64px -192px}.ui-icon-circle-triangle-w{background-position:-80px -192px}.ui-icon-circle-triangle-n{background-position:-96px -192px}.ui-icon-circle-arrow-e{background-position:-112px -192px}.ui-icon-circle-arrow-s{background-position:-128px -192px}.ui-icon-circle-arrow-w{background-position:-144px -192px}.ui-icon-circle-arrow-n{background-position:-160px -192px}.ui-icon-circle-zoomin{background-position:-176px -192px}.ui-icon-circle-zoomout{background-position:-192px -192px}.ui-icon-circle-check{background-position:-208px -192px}.ui-icon-circlesmall-plus{background-position:0 -208px}.ui-icon-circlesmall-minus{background-position:-16px -208px}.ui-icon-circlesmall-close{background-position:-32px -208px}.ui-icon-squaresmall-plus{background-position:-48px -208px}.ui-icon-squaresmall-minus{background-position:-64px -208px}.ui-icon-squaresmall-close{background-position:-80px -208px}.ui-icon-grip-dotted-vertical{background-position:0 -224px}.ui-icon-grip-dotted-horizontal{background-position:-16px -224px}.ui-icon-grip-solid-vertical{background-position:-32px -224px}.ui-icon-grip-solid-horizontal{background-position:-48px -224px}.ui-icon-gripsmall-diagonal-se{background-position:-64px -224px}.ui-icon-grip-diagonal-se{background-position:-80px -224px}.ui-corner-all,.ui-corner-top,.ui-corner-left,.ui-corner-tl{border-top-left-radius:3px}.ui-corner-all,.ui-corner-top,.ui-corner-right,.ui-corner-tr{border-top-right-radius:3px}.ui-corner-all,.ui-corner-bottom,.ui-corner-left,.ui-corner-bl{border-bottom-left-radius:3px}.ui-corner-all,.ui-corner-bottom,.ui-corner-right,.ui-corner-br{border-bottom-right-radius:3px}.ui-widget-overlay{background:#aaa;opacity:.003;filter:Alpha(Opacity=.3)}.ui-widget-shadow{-webkit-box-shadow:0 0 5px #666;box-shadow:0 0 5px #666}";
document.getElementsByTagName("head")[0].appendChild(myScriptStyle);
var aside_html = '<div class=c-aside > <h2><i class="">四字标题</i>· · · · · · </h2> <div class=c-aside-body  style="padding: 0 12px;"> <ul class=bs > </ul> </div> </div>';
var imdb_html = '<div class="rating_wrap clearbox rating_imdb" rel="v:rating" style="padding-top: 0;"> <div class=rating_logo >IMDB 评分</div> <div class="rating_self clearfix" typeof="v:Rating"> <strong class="ll rating_num" property="v:average">0</strong> <span property="v:best" content=10.0 ></span> <div class="rating_right "> <div class=ll ></div> <div class=rating_sum > <a href=collections  class=rating_people ><span property="v:votes">0</span>人评价</a> </div> </div> </div> </div>';
var sites_list = {
    "ptsites": {
        "name": "PT资源",
        "sites": {
            "BYR": {
                "imdb": "https://bt.byr.cn/torrents.php?incldead=0&search_area=4&search=",
                "title": "https://bt.byr.cn/torrents.php?incldead=0&search="
            },
            "HUDBT": {
                "imdb": "https://hudbt.hust.edu.cn/torrents.php?incldead=1&search_area=4&search=",
                "title": "https://hudbt.hust.edu.cn/torrents.php?incldead=1&search=",
                "torrent_table_selector":"table.torrents:last > tbody > tr"
            },
            "TTG": {
                "title": "https://totheglory.im/browse.php?search_field=",
                "torrent_table_selector":"table#torrent_table:last > tbody > tr:gt(0)"
            }
        }
    }
}


if (!document.getElementById("seBwhA") && "页面不存在" !== document.title) {
    var seBwhA = document.createElement("a");
    seBwhA.id = "seBwhA";
    document.getElementsByTagName("html")[0].appendChild(seBwhA);

    var reservedValues = 'bl|flag_bl';
    function sleep(milliSeconds) {
        var startTime = new Date().getTime(); // get the current time
        while (new Date().getTime() < startTime + milliSeconds);
    }
    var getDoc, getJSON, parseURL, postDoc;
    getDoc = function (url, meta, callback) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            headers: {
                'User-agent': window.navigator.userAgent,
                'Content-type': null
            },
            onload: function (responseDetail) {
                var doc;
                doc = '';
                if (responseDetail.status == 200) {
                    doc = (new DOMParser).parseFromString(responseDetail.responseText, 'text/html');
                    if (doc == undefined) {
                        doc = document.implementation.createHTMLDocument('');
                        doc.querySelector('html').innerHTML = responseText;
                    }
                }
                callback(doc, responseDetail, meta);
            }
        });
    };
    postDoc = function (url, data, meta, callback) {
        GM_xmlhttpRequest({
            anonymous: true,
            method: 'POST',
            url: url,
            headers: {
                'User-agent': window.navigator.userAgent,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: data,
            onload: function (responseDetail) {
                callback(responseDetail.responseText, responseDetail, meta);
            }
        });
    };
    getJSON = function (url, callback) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            headers: {
                'Accept': 'application/json'
            },
            onload: function (response) {
                if (response.status >= 200 && response.status < 400) {
                    callback(JSON.parse(response.responseText), url);
                } else {
                    callback(false, url);
                }
            }
        });
    };
    parseURL = function (url) {
        var a;
        a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function () {
                var i, len, ret, s, seg;
                ret = {};
                seg = a.search.replace(/^\?/, '').split('&');
                len = seg.length;
                i = 0;
                s = void 0;
                while (i < len) {
                    if (!seg[i]) {
                        i++;
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                    i++;
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    };

    if (location.href.startsWith('https://movie.douban.com/subject/')) {
        $(document).ready(function () {

            // chage plot summary style
            $('#interest_sectl').after($('div.grid-16-8 div.related-info'));
            $('#interest_sectl').attr('style', 'float:right');
            $('div.related-info').attr('style', 'width:480px;float:left');


            // gen text info
            // due to the slow connection with imdb.com, only show the info button after IMDB info is ready
            var movieinfo = $("<a>movieinfo</a>").css('color', '#37a');
            var infobox = $(aside_html);
            infobox.find('h2 i').text('电影简介');
            infobox.addClass("movieinfo");
            infobox.attr('style', 'float:left;width:470px;margin-top:20px');
            movieinfo.click(function () {
                //////译名，片名///////
                var title, title_en, title_sec;
                title = title_en = $('#content > h1 > span')[0].textContent.split(' ');
                title = title.shift();
                title_en = title_en.join(' ').trim();
                var temp;
                temp = $('div.article #info').contents().filter(function () {
                    return (this.nodeType === 3) && ($(this).prev().text() == "又名:");
                }).text();
                if (temp) {
                    temp = temp.split(' / ');
                    temp = temp.filter(function (x) {
                        var rname = /[\u4E00-\u9FA5]/;
                        if (rname.test(x)) {
                            //alert("含汉字!");
                            return true;
                        }
                        else {
                            //alert("不含汉字!");
                            return false;
                        }
                    });
                    //alert(temp !== "");
                    if (!(temp == "")) {
                        temp = temp.join(' / ').trim();
                        temp = ' / ' + temp;
                    }
                }
                if (title_en) {
                    infobox.append('◎译　　名　' + title + temp + '</br>');
                    infobox.append('◎片　　名　' + title_en + '</br>');
                }
                else {
                    infobox.append('◎片　　名　' + title + temp + '</br>');
                }
                // var movieinfo = $("<span></span>");

                //////////////◎年　　代/////////////////
                infobox.append('◎年　　代　' + $('#content > h1 > span.year').text().substr(1, 4) + '</br>');
                //////////////◎产　　地/////////////////
                infobox.append('◎产　　地　' + $('div.article #info').contents().filter(function () {
                    return (this.nodeType === 3) && ($(this).prev().text() == "制片国家/地区:");
                }).text().trim() + '</br>');
                //////////////◎类　　别/////////////////
                var temp = $("<div></div>");
                temp.append($('div.article #info span[property="v:genre"]').clone());
                // //temp.find("span").
                temp.find('span').each(function () {
                    $(this).append('<div> / </div>');
                });
                temp.find("div:last").remove();
                // $('div.article #info').append(temp.text());
                infobox.append('◎类　　别　' + temp.text() + '<br>');
                //////////////◎语　　言/////////////////
                infobox.append('◎语　　言　' + $('div.article #info').contents().filter(function () {
                    return (this.nodeType === 3) && ($(this).prev().text() == "语言:");
                }).text().trim() + '</br>');
                //////////////◎上映日期/////////////////
                infobox.append('◎上映日期　' + $('div.article #info [property="v:initialReleaseDate"]').text() + '</br>');
                //////////////◎IMDb评分/////////////////
                infobox.append('◎IMDb评分　' + $('div#info a:last').attr('imdb_rating') + '/10 from ' + $('.rating_imdb a.rating_people').text() + '</br>');
                //////////////◎IMDb链接/////////////////
                infobox.append('◎IMDb链接　' + $('div#info a[href^=\'http://www.imdb.com/title/tt\']').attr('href') + '</br>');
                //////////////◎豆瓣评分/////////////////
                infobox.append('◎豆瓣评分　' + $('.rating_douban strong.ll').text() + '/10 from ' + $('.rating_douban a.rating_people').text() + '</br>');
                //////////////◎豆瓣链接/////////////////
                temp = $('#mainpic p.gact a').attr('href');
                temp = temp.substring(0, temp.length - 5);
                infobox.append('◎豆瓣链接　' + temp + '</br>');
                //////////////◎片　　长/////////////////
                infobox.append('◎片　　长　' + $('div.article #info').contents().filter(function () {
                    return ($(this).prev().attr('property') == "v:runtime") || ($(this).prev().text() == "片长:");
                }).text().trim() + '</br>');
                //////////////◎导　　演/////////////////
                infobox.append('◎导　　演　' + $('div.article #info span.attrs:first').text() + '</br>');
                //////////////◎主　　演/////////////////
                infobox.append('◎主　　演　' + $('div.article #info span.actor span.attrs').contents().filter(function () {
                    return $(this).attr("class") !== "more-actor";
                }).text() + '</br>');
                //////////////◎简    介/////////////////
                infobox.append('<p>◎简　　介</p><p>' + $('div.article div.related-info [property="v:summary"]').html() + '</p>');
                //////////////◎获奖情况/////////////////
                if ($('ul').hasClass("award")) {
                    var temp = $('<div></div>');
                    $('ul.award').each(function () {
                        temp.append($(this).text() + '</br>');
                    });
                    // $('div.article div.related-info').before(temp);
                    infobox.append('<p>◎获奖情况</p>' + temp.html() + '</br>');
                }
                movieinfo.hide();
                $('div.article div.related-info').before(infobox);
            })

            // get IMDB info
            var imdb, imdb_href, imdb_id;
            imdb = $('div#info a[href^=\'http://www.imdb.com/title/tt\']');
            if (imdb.length) {
                imdb_href = imdb.attr('href');
                imdb_id = imdb.text();
                if (imdb && imdb_id.startsWith('tt')) {
                    imdb_id = imdb_id.slice(2);
                } else {
                    imdb_id = '';
                }
            }

            // get  title
            var title_cn, title_sec;
            title_cn = title_sec = $('#content > h1 > span')[0].textContent.split(' ');
            title_cn = title_cn.shift();


            var update_site = function (group, site, link_prefix, keyword, enable_search, torrent_table_selector) {
                // check if this site is enabled by user
                var enable_site = GM_getValue(site, 'none');
                if (enable_site == 'none') {
                    enable_site = 1;
                    GM_setValue(enable_site);
                }
                if (!enable_site) return;
            
                function Get_Search_Page(site, link_prefix, parser_func) {
                    //console.log("Start Searching in Site " + site + " ."+link_prefix );
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: link_prefix,
                        onload: function (res) {
                            if (/(login|verify|returnto)[.=]/.test(res.finalUrl)) {
                                //console.log("May Not Login in Site " + site + ". With finalUrl: " + res.finalUrl);
                            } else {
                                //console.log("Get Search Pages Success in Site " + site + ".");
                                var doc = (new DOMParser()).parseFromString(res.responseText, 'text/html');
                                var body = doc.querySelector("body");
                                var page = $(body); // 构造 jQuery 对象
                                try {
                                    parser_func(res, doc, body, page);
                                    //console.log("End of Search in Site " + site + ".");
                                } catch (error) {
                                    //console.log("An error occurred when parser in Site " + site + ". With Error information: " + error + ". Please opening a issues to report at https://github.com/Rhilip/PT-help/issues/2");
                                }
                            }
                        },
                        onerror: function (res) {
                            //console.log("An error occurred when searching in Site " + site + " .With finalUrl: " + res.finalUrl + ". Your computer may not be able to access this site.");
                        }
                    });
                }
            
                if ($('#content div.' + group + '-body ul a.' + site).attr('stat') == 'true') return;
            
            
                // add this site to the right column
                var url = parseURL(link_prefix + keyword);
                //console.log('url', url);
                var link = $('<a></a>');
                link.addClass(site);
                link.attr('href', url.source);
                link.attr('data-host', url.host);
                link.attr('target', '_blank').attr('rel', 'nofollow');
                link.html(site);
                if ($('#content div.' + group + '-body ul a.' + site).attr('class') == site) {
                    console.log(site, ' alreay exist')
                    if (!enable_search) return;
                    console.log('stat=', $('#content div.' + group + '-body ul a.' + site).attr('stat'));
                    if ($('#content div.' + group + '-body ul a.' + site).attr('stat') == 'true') return;
                }
                else {
                    $('#content div.' + group + '-body ul').append(link);
                    console.log('append first time');
                }
                if (enable_search) {
                    Get_Search_Page(site, url.source, function (res, doc, body, page) {
                        // console.log("loading info from", url);
                        var url_prefix = /pt\.whu\.edu\.cn|whupt\.net|hudbt\.hust\.edu\.cn/.test(res.finalUrl) ? "" : (res.finalUrl.match(/(https?:\/\/[^\/]+?\/).+/) || ['', ''])[1];
                        //console.log("Using The normal parser for NexusPHP in Site: " + site);
                        var result;
                        if (/没有种子|No Torrents Found|Your search did not match anything.|No torrents here|用准确的关键字重试/.test(res.responseText)) {
                            //console.log("No any torrent find in Site " + site + ".");
                            result = false;
                        }
                        var tr_list = page.find(torrent_table_selector || "table.torrents:last > tbody > tr:gt(0)");
                        //console.log("Get " + tr_list.length + " records in Site " + site + ".");
                        if (tr_list.length) {
                            result = true;
                            // console.log('search result',tr_list.length);
                        }
                        else {
                            result = false;
            
                        }
                        console.log(result,url);
                        if (result) {
                            $('#content div.' + group + '-body ul a.' + site).css("background-color", "#e3f1ed");
                            $('#content div.' + group + '-body ul a.' + site).attr('stat', 'true').attr('href', url.source);
                            console.log('result true');
                        }
                        else {
                            if($('#content div.' + group + '-body ul a.' + site).attr('stat') == 'true') return;
                            $('#content div.' + group + '-body ul a.' + site).css("background-color", "#f4eac2");
                            $('#content div.' + group + '-body ul a.' + site).attr('stat', 'none');
                            console.log('result false');
                        }
                    });
                }
            
            
            
            
            
            }
            
            var update_group = function (group, group_title) {
                var site_pt = $(aside_html);
                site_pt.addClass(group);
                site_pt.find('div.c-aside-body').addClass(group + '-body');
                site_pt.find('h2 i').text(group_title);
                $('#content div.tags').before(site_pt);
            }
            
            var update_batch = function () {
                // config pt batch link
                site_pt_batch = $(aside_html);
                site_pt_batch.addClass('name-offline');
                site_pt_batch.find('div.c-aside-body').addClass('site-pt-batch');
                site_pt_batch.find('h2 i').text('PT批量打开');
                $('#content div.tags').before(site_pt_batch);
                $('#interest_sectl').after($('div.grid-16-8 div.related-info'));
                $('#interest_sectl').attr('style', 'float:right');
                $('div.related-info').attr('style', 'width:480px;float:left');
                var ptlink_all, ptlink_true, ptlink_none;
                ptlink_all = $('<a>全 部</a>').attr('class', 'ptlink_all');
                ptlink_all.css("background-color", "#f5f5f5");
                ptlink_true = $('<a>有资源</a>').attr('class', 'ptlink_true');
                ptlink_true.css("background-color", "#e3f1ed");
                ptlink_none = $('<a>无资源</a>').attr('class', 'ptlink_none');
                ptlink_none.css("background-color", "#f4eac2");
                ptlink_all.click(function () {
                    $('.site-pt-body a[href]').each(function () {
                        window.open($(this).attr('href'))
                    });
                });
                ptlink_true.click(function () {
                    $('.site-pt-body a[stat="true"]').each(function () {
                        window.open($(this).attr('href'))
                    });
                });
                ptlink_none.click(function () {
                    $('.site-pt-body a[stat="none"]').each(function () {
                        window.open($(this).attr('href'))
                    });
                });
                $('#content div.site-pt-batch ul').prepend(ptlink_none);
                $('#content div.site-pt-batch ul').prepend(ptlink_true);
                $('#content div.site-pt-batch ul').prepend(ptlink_all);
            }
            




            if (imdb.length) {
                // imdb_id has been got from the page, generate all IMDB search links in PT part
                getDoc(imdb_href, null, function (doc, resp, meta) {
                    var i, item, len, metascore, parse, popularity, ratingCount, ratingValue, rating_douban, rating_douban_ratingValue, rating_imdb, rating_more, reviews, starValue, titleReviewBarItem, title_en;
                    title_en = $(doc).attr('title');
                    title_en = title_en.split(' (')[0];


                    for (group in sites_list) {
                        var flag_group=GM_getValue(group,"none");
                        if(flag_group=="none"){
                            flag_group=1;
                            GM_setValue(flag_group);
                        }
                        if(!flag_group) continue;
                        update_group(group, sites_list[group].name);
                        if(group=='ptsites') update_batch();
                        for (site in sites_list[group].sites) {
                            if (imdb.length && sites_list[group].sites[site].imdb) {
                                console.log(update_site(group, site, sites_list[group].sites[site].imdb, imdb_id, 1, sites_list[group].sites[site].torrent_table_selector));
                            }
                            console.log(update_site(group, site, sites_list[group].sites[site].title, title_cn, 1, sites_list[group].sites[site].torrent_table_selector));
                            console.log(update_site(group, site, sites_list[group].sites[site].title, title_en, 1, sites_list[group].sites[site].torrent_table_selector));
                        }
                    }
                    




                    rating_douban = $('#interest_sectl .rating_wrap').addClass('rating_douban');
                    rating_douban_ratingValue = $('#interest_sectl .rating_douban a.rating_people span[property^=v]').text();
                    rating_douban_ratingValue = (rating_douban_ratingValue + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                    $('#interest_sectl .rating_douban a.rating_people span[property^=v]').text(rating_douban_ratingValue);

                    rating_imdb = $('#interest_sectl .rating_imdb');
                    $('#interest_sectl .rating_imdb a.rating_people').attr('href', imdb_href + '/' + 'ratings?ref_=tt_ov_rt');
                    ratingValue = $('span[itemprop=ratingValue]', doc).text();
                    $('#interest_sectl .rating_imdb strong.rating_num').text(ratingValue);
                    starValue = ratingValue / 2;
                    starValue = starValue % 1 > 0.5 ? Math.floor(starValue) + 0.5 : Math.floor(starValue);
                    starValue *= 10;
                    starValue = 'bigstar' + starValue;
                    $('#interest_sectl .rating_imdb div.rating_right div.ll').addClass(starValue);
                    ratingCount = $('span[itemprop=ratingCount]', doc).text();
                    $('#interest_sectl .rating_imdb a.rating_people span[property^=v]').text(ratingCount);
                    rating_imdb.after($('<div></div>').addClass('rating_more'));
                    rating_more = $('#interest_sectl .rating_more');
                    titleReviewBarItem = $('.titleReviewBar div.titleReviewBarItem', doc);
                    metascore = null;
                    popularity = null;
                    reviews = null;
                    parse = function (item) {
                        var Popularity, score, text;
                        text = $(item).text();
                        if (text.indexOf('Metascore') !== -1) {
                            score = $(item).find('a[href^=criticreviews] span').text();
                            metascore = $("<div>");
                            metascore.html('Metascore');
                            return metascore.append($('<a></a>').attr('href', imdb_href + '/' + 'criticreviews?ref_=tt_ov_rt').text(score));
                        } else if (text.indexOf('Popularity') !== -1) {
                            popularity = $("<div>");
                            Popularity = $(item).find('span.subText').html();
                            return popularity.html('流行度&nbsp;&nbsp;' + Popularity + '<br>');
                        } else if (text.indexOf('Reviews') !== -1) {
                            return null;
                        }
                    };
                    // add IMDB top 250 tag
                    if (ratingValue >= 8) {
                        getDoc('https://m.imdb.com/chart/top', meta, function (doc, res, meta) {
                            var list = res.responseText.match(/data-tconst="(tt\d{7})"/g);
                            //console.log(list);
                            var number = list.indexOf('data-tconst="tt' + imdb_id + '"') + 1;
                            if (number < 1 || number > 250) return;
                            // inject css if needed
                            if (document.getElementsByClassName('top250').length === 0) {
                                var style = document.createElement('style');
                                style.innerHTML = '.top250{background:url(https://s.doubanio.com/f/movie/f8a7b5e23d00edee6b42c6424989ce6683aa2fff/pics/movie/top250_bg.png) no-repeat;width:150px;font:12px Helvetica,Arial,sans-serif;margin:5px 0;color:#744900}.top250 span{display:inline-block;text-align:center;height:18px;line-height:18px}.top250 a,.top250 a:link,.top250 a:hover,.top250 a:active,.top250 a:visited{color:#744900;text-decoration:none;background:none}.top250-no{width:34%}.top250-link{width:66%}';
                                document.head.appendChild(style);
                            }
                            var after = document.getElementById('dale_movie_subject_top_icon');
                            if (!after)
                                after = document.querySelector('h1');
                            after.insertAdjacentHTML('beforebegin', '<div class="top250"><span class="top250-no">No.' + number + '</span><span class="top250-link"><a href="http://www.imdb.com/chart/top">IMDb Top 250</a></span></div>');
                            [].forEach.call(document.getElementsByClassName('top250'), function (e) {
                                e.style.display = 'inline-block';
                            });
                        });
                    }

                    // update_site_online_sites(title_en, true);
                    // update_site_sub_sites(title_en, true);
                    // update_site_offline_sites(title_en, true, imdb_id);

                    var flag_infogen = GM_getValue('infogen');
                    if (flag_infogen) {
                        movieinfo.attr('imdb_rating', ratingValue);
                        $('div.article #info').append('<span class="pl">生成信息: </span>').append(movieinfo);
                    }

                    // put on more ratings
                    var flag_morerating = GM_getValue('morerating');
                    if (flag_morerating) {
                        $('#interest_sectl').append($(imdb_html));
                        for (i = 0, len = titleReviewBarItem.length; i < len; i++) {
                            item = titleReviewBarItem[i];
                            parse(item);
                        }
                        if (metascore || popularity || reviews) {
                            if (metascore) {
                                rating_more.append(metascore);
                            }
                            if (popularity) {
                                rating_more.append(popularity);
                            }
                            if (reviews) {
                                rating_more.append(reviews);
                            }
                        } else {
                            rating_more.remove();
                        }
                    }

                    return null;
                });

            }







            // add link to BIG poster
            var flag_poster = GM_getValue('poster');
            if (flag_poster) {
                let posterAnchor = document.querySelector('#mainpic > a');
                if (posterAnchor) {
                    // get the posters page's URL via movie.douban.com's customs
                    let url = window.location.href;
                    let urlTrimmed = url.slice(0, 42);
                    let postersUrl = urlTrimmed + "photos?type=R";

                    // ajax call on the posters page's URL
                    let xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let tempDiv = document.createElement('div');
                            tempDiv.innerHTML = this.responseText;
                            let aPosterUrl = tempDiv.querySelector('.article > ul > li:nth-child(1) > div.cover > a').getAttribute('href');

                            // ajax call on the 1st poster's page
                            let xhttp = new XMLHttpRequest();
                            xhttp.onreadystatechange = function () {
                                if (this.readyState == 4 && this.status == 200) {
                                    let tempDiv = document.createElement('div');
                                    tempDiv.innerHTML = this.responseText;
                                    let hdPosterAnchor = tempDiv.querySelector('span.magnifier > a');
                                    let info = document.querySelector('#info');
                                    // info.appendChild(hdPosterAnchor);
                                    $('#mainpic p.gact').after(hdPosterAnchor);
                                }
                            };
                            xhttp.open("GET", aPosterUrl, true);
                            xhttp.send();
                            // another ajax ends
                        }
                    };
                    xhttp.open("GET", postersUrl, true);
                    xhttp.send();
                }
            }


            //         //get torrents info from NexusPHP sites
            //         var flag_ptsite = GM_getValue('ptsite');
            //         if (flag_ptsite) {
            //             function NexusPHP(site, search_prefix, torrent_table_selector) {
            //                 function Get_Search_Page(site, search_prefix, parser_func) {
            //                     //console.log("Start Searching in Site " + site + " ."+search_prefix );
            //                     GM_xmlhttpRequest({
            //                         method: 'GET',
            //                         url: search_prefix,
            //                         onload: function (res) {
            //                             if (/(login|verify|returnto)[.=]/.test(res.finalUrl)) {
            //                                 //console.log("May Not Login in Site " + site + ". With finalUrl: " + res.finalUrl);
            //                             } else {
            //                                 //console.log("Get Search Pages Success in Site " + site + ".");
            //                                 var doc = (new DOMParser()).parseFromString(res.responseText, 'text/html');
            //                                 var body = doc.querySelector("body");
            //                                 var page = $(body); // 构造 jQuery 对象
            //                                 try {
            //                                     parser_func(res, doc, body, page);
            //                                     //console.log("End of Search in Site " + site + ".");
            //                                 } catch (error) {
            //                                     //console.log("An error occurred when parser in Site " + site + ". With Error information: " + error + ". Please opening a issues to report at https://github.com/Rhilip/PT-help/issues/2");
            //                                 }
            //                             }
            //                         },
            //                         onerror: function (res) {
            //                             //console.log("An error occurred when searching in Site " + site + " .With finalUrl: " + res.finalUrl + ". Your computer may not be able to access this site.");
            //                         }
            //                     });

            //                 }
            //                 Get_Search_Page(site, search_prefix, function (res, doc, body, page) {
            //                     var url_prefix = /pt\.whu\.edu\.cn|whupt\.net|hudbt\.hust\.edu\.cn/.test(res.finalUrl) ? "" : (res.finalUrl.match(/(https?:\/\/[^\/]+?\/).+/) || ['', ''])[1];
            //                     //console.log("Using The normal parser for NexusPHP in Site: " + site);
            //                     var psite = $('.site-pt-body a').filter(function () {
            //                         return $(this).attr('site') == site;
            //                     });
            //                     if (/没有种子|No Torrents Found|Your search did not match anything.|No torrents here|用准确的关键字重试/.test(res.responseText)) {
            //                         //console.log("No any torrent find in Site " + site + ".");
            //                         $(psite).css("background-color", "#f4eac2");
            //                         $(psite).attr('stat', 'none');
            //                         return;
            //                     }
            //                     var tr_list = page.find(torrent_table_selector || "table.torrents:last > tbody > tr:gt(0)");
            //                     //console.log("Get " + tr_list.length + " records in Site " + site + ".");
            //                     if (tr_list.length) {
            //                         $(psite).css("background-color", "#e3f1ed");
            //                         $(psite).attr('stat', 'true');
            //                     }
            //                     else {
            //                         $(psite).css("background-color", "#f4eac2");
            //                         $(psite).attr('stat', 'none');
            //                     }
            //                 });
            //             }
            //             // edu ipv6 sites
            //             NexusPHP("BYR", "https://bt.byr.cn/torrents.php?incldead=0&search_area=4&search=" + imdb_id);
            //             NexusPHP("WHUPT", "https://pt.whu.edu.cn/torrents.php?incldead=1&search=" + imdb_id, "table.torrents:last > tbody > tr");
            //             NexusPHP("HUDBT", "https://hudbt.hust.edu.cn/torrents.php?incldead=1&search_area=4&search=" + imdb_id, "table.torrents:last > tbody > tr");
            //             NexusPHP("NPUPT", "https://npupt.com/torrents.php?incldead=1&sort=10&imdb=tt" + imdb_id, "table#torrents_table:last > tbody > tr:gt(0)");

            //             // chinese sites
            //             NexusPHP("CHDBits", "https://chdbits.co/torrents.php?cat401=1&incldead=1&search_area=4&search=" + imdb_id);
            //             NexusPHP("CMCT", "https://hdcmct.org/torrents.php?incldead=1&search_area=4&search=" + imdb_id);
            //             NexusPHP("GZTown", "https://pt.gztown.net/torrents.php?incldead=1&search_area=4&search=" + imdb_id);
            //             NexusPHP("HD4FANS", "https://pt.hd4fans.org/torrents.php?incldead=1&search_area=4&search=" + imdb_id);
            //             NexusPHP("HDChina", "https://hdchina.org/torrents.php?incldead=1&search_area=4&search_mode=0&search=" + imdb_id, "table.torrent_list:last > tbody > tr:gt(0)");
            //             NexusPHP("HDHome", "https://hdhome.org/torrents.php?incldead=1&search_area=4&search=" + imdb_id);
            //             NexusPHP("HDSky", "https://hdsky.me/torrents.php?incldead=1&search_area=4&search=" + imdb_id);
            //             NexusPHP("HDTime", "https://hdtime.org/torrents.php?search=" + imdb_id);
            //             NexusPHP("KeepFrds", "https://pt.keepfrds.com/torrents.php?search=" + imdb_id);
            //             NexusPHP("MTeam", "https://tp.m-team.cc/movie.php?incldead=1&search_area=4&search=" + imdb_id);
            //             NexusPHP("Ourbits", "https://ourbits.club/torrents.php?incldead=1&search_area=4&search=" + imdb_id);
            //             NexusPHP("TLFBits", "http://pt.eastgame.org/torrents.php?incldead=1&search_area=4&search=" + imdb_id);
            //             NexusPHP("TTG", "https://totheglory.im/browse.php?search_field=" + title, "table#torrent_table:last > tbody > tr:gt(0)");
            //             NexusPHP("U2", "https://u2.dmhy.org/torrents.php?incldead=1&search_area=4&search=" + imdb_id);

            //             //global sites
            //             NexusPHP("ADC", "http://asiandvdclub.org/browse.php?descr=1&btnSubmit=Search%21&search=tt" + imdb_id, "table.torrenttable:last > tbody > tr");
            //             NexusPHP("AHD", "https://awesome-hd.me/torrents.php?searchstr=tt" + imdb_id, "table.torrent_table:last > tbody > tr:gt(0)");
            //             NexusPHP("HDBits", "https://hdbits.org/browse.php?&imdb=" + imdb_id);
            //             NexusPHP("HDT", "https://hd-torrents.org/torrents.php?active=0&options=2&search=" + imdb_id, "table.mainblockcontenttt:last > tbody > tr:gt(0)");
            //             NexusPHP("HDSpace", "https://hd-space.org/index.php?page=torrents&active=0&options=2&search=" + imdb_id, "table.lista:last > tbody > tr:gt(0)");
            //             NexusPHP("IPT", "https://iptorrents.com/t?q=tt" + imdb_id, "table#torrents:last > tbody > tr:gt(0)");
            //             NexusPHP("KG", "https://karagarga.in/browse.php?search_type=imdb&search=" + imdb_id, "table#browse:last > tbody > tr:gt(0)");
            //             NexusPHP("PTP", "https://passthepopcorn.me/torrents.php?searchstr=tt" + imdb_id, "table.torrent_table:last > tbody > tr:gt(0)");
            //             NexusPHP("Tik", "https://www.cinematik.net/browse.php?incldead=1&sort=1&type=asc&srchdtls=1&search=tt " + imdb_id, "table[cellpadding]:last > tbody > tr:gt(0)");
            //             NexusPHP("TorViet", "http://torviet.com/torrents.php?incldead=&search_area=4&search=" + imdb_id);
            //             NexusPHP("UHD", "https://uhdbits.org/torrents.php?searchstr=tt" + imdb_id, "table.torrent_table:last > tbody > tr:gt(0)");
            //             NexusPHP("SC", "https://secret-cinema.pw/torrents.php?cataloguenumber=tt" + imdb_id, "div.torrent_card");
            //         }
        });
    }
    // movie blacklist on '/explore' and '/tag'
    var flag_blacklist = GM_getValue('blacklist');
    if (flag_blacklist) {
        if (location.href.startsWith('https://movie.douban.com/explore') | location.href.startsWith('https://movie.douban.com/tag/')) {
            $(document).ready(function () {
                // append add_blacklist button on posters
                $('div.list-wp').on('mouseover', 'a.item', function () {
                    if ($(this).prev().is('.bl_cover')) {
                        $(this).prev().show();
                        $(this).prev().css({ "left": ($(this).offset().left + 85), "top": ($(this).offset().top) });
                        return;
                    }
                    var douban_id = $(this).attr('href').split('/')[4];
                    var title = $(this).find('img').attr('alt');
                    var posterid = $(this).find('img').attr('src').split('/')[7].replace('.jpg', '');
                    //  console.log('title=' + title);
                    //  console.log('posterid=' + posterid);
                    $(this).before('<div class="bl_cover" style="display:block;position:absolute;z-index:99;"><a><div style="background:#52a4d7d6;height:20px;width:30px;text-align:center;color:white">屏蔽</div><a></div>');
                    $(this).prev().attr('title', '屏蔽' + douban_id).css({ "left": ($(this).offset().left + 85), "top": ($(this).offset().top) });
                    $(this).prev().click(function () {
                        GM_setValue('bl', GM_getValue('bl', '') + '$' + douban_id);
                        GM_setValue(douban_id, title + '$' + posterid);
                        $(this).hide();
                        blacklist();
                    });
                    $(this).prev().mouseover(function () {
                        $(this).show();
                    });
                    $(this).prev().mouseout(function () {
                        $(this).hide();
                    });
                });
                $('div.list-wp').on('mouseout', 'a.item', function () {
                    $(this).prev().hide();
                });
                // blacklist filter function
                var blacklist = function () {
                    // only do this function when Ajax finished, otherwise may cause in endless loop;
                    if (/载入中/.test($('a.more').text())) return;
                    else {
                        var bl_list = GM_getValue('bl', '').split('$');
                        if (!bl_list.length) return;
                        for (var i = 1; i < bl_list.length; i++) {
                            var reg = '"' + bl_list[i] + '"';
                            $('a.item').filter(function () { return RegExp(reg).test($(this).html()) }).hide();
                        }
                        if ($('a.item').length < 30) {
                            $('.list-wp a.more').text('载入中');
                            $('.list-wp a.more').wrap('<p class="more"></p>');
                            $('.list-wp p.more').click();
                        }
                    }
                }
                // when something has changed in .list-wp, do blacklist()
                $('div.article .list-wp').bind('DOMNodeInserted', function () {
                    blacklist();
                });
                // when .deatil-pop shows up, append add_blocklist_button to it
                $('div.detail-pop').bind('DOMNodeInserted', function () {
                    if ($('div.detail-pop .add_blocklist').length) return;
                    var douban_id = $('div.detail-pop .info h3 a').first().attr('href').split('/')[4];
                    var add_blocklist_button = $('<a class="add_blocklist">屏蔽' + douban_id + '</a>');
                    add_blocklist_button.click(
                        function () {
                            GM_setValue('bl', GM_getValue('bl', '') + '$' + douban_id);
                            var title = $('div.detail-pop .info h3 a').text();
                            var posterid = $('a.item').filter(function () { return RegExp('"' + douban_id + '"').test($(this).html()) }).find('img').first().attr('src').split('/')[7].replace('.jpg', '');
                            GM_setValue(douban_id, title + '$' + posterid);
                            // console.log('title=' + title);
                            // console.log('posterid=' + posterid);
                            blacklist();
                        });
                    $('div.detail-pop .collect-area').append(add_blocklist_button);
                })
                blacklist();
            })
        }
    }
    $(document).ready(function () {
        // add blacklist nav-tag and page
        var flag_blacklist = GM_getValue('blacklist');
        if (flag_blacklist) {
            var bl_nav = $('<a style="color:#27a">黑名单</a>');
            var update_bl = function (i) {
                var bl_list = GM_getValue('bl', '').split('$');
                if (!bl_list.length || i >= bl_list.length) {
                    $('.article h2').first().text('电影黑名单 · · · · · ·');
                    return;
                }
                $('.article h2').first().text('电影黑名单 · · · · · ·正在列出第' + i + '/' + (bl_list.length - 1) + '项');
                var current_id = bl_list[i];
                if (RegExp('/' + current_id + '/').test($('.article .indent').html())) { update_bl(++i); return; }
                var title, posterid;
                function append_movie(title, posterid) {
                    var block_html = $('<table width="100%" class=""><tbody><tr class="item"><td width="100" valign="top"><a class="nbg" href="https://movie.douban.com/subject/' + bl_list[i] + '/" title="' + title + '"><img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/' + posterid + '.webp" width="75" alt="' + title + '" class=""></a></td><td valign="top"><div class="pl2"><a href="https://movie.douban.com/subject/' + bl_list[i] + '/" class="">' + title + '</a></div></td></tr></tbody></table><p class="ul"></p>');
                    var remove_blocklist_button = $('<a class="j remove_blocklist" style="display: inline-block; zoom: 1; margin-right: 5px; border: 1px solid #bbb; padding: 2px 14px 1px; border-radius: 2px; color: #111;">解除屏蔽' + current_id + '</a>');
                    remove_blocklist_button.click(function () {
                        GM_setValue('bl', GM_getValue('bl', '').replace('$' + current_id, ''));
                        $('.article .indent div').first().empty().append('<p class="ul first"></p>');
                        update_bl(1);
                    });
                    var refresh_blocklist_button = $('<a class="j remove_blocklist" style="display: inline-block; zoom: 1; margin-right: 5px; border: 1px solid #bbb; padding: 2px 14px 1px; border-radius: 2px; color: #111;">刷新信息' + current_id + '</a>');
                    refresh_blocklist_button.click(function () {
                        getJSON('http://api.douban.com/v2/movie/' + current_id, function (temp, url) {
                            if (!temp) {
                                alert('get info error, aborting!');
                                return;
                            }
                            var current_id = url.split('/')[5];
                            var title = temp.attrs.language == '汉语普通话' ? temp.title : temp.alt_title.split('/')[0] + ' ' + temp.title.split('/')[0];
                            title = title + '‎ (' + temp.attrs.year + ')';
                            var posterid = temp.image.split('/')[7].replace('.webp', '');
                            GM_setValue(current_id, title + '$' + posterid);
                            append_movie(title, posterid);
                            // console.log('get info from api.douban.com title=' + title + ' and posterid=' + posterid);
                            $('.article .indent div').first().empty().append('<p class="ul first"></p>');
                            update_bl(1);
                        });

                    });
                    block_html.find('div.pl2').append('<p></p>').append(remove_blocklist_button).append(refresh_blocklist_button);
                    $('.article .indent div').first().append(block_html);
                }

                var value_temp = GM_getValue(bl_list[i], '');
                if (value_temp !== '') {
                    var title = value_temp.split('$')[0];
                    var posterid = value_temp.split('$')[1];
                    append_movie(title, posterid);
                    update_bl(++i);
                }
                else {
                    getJSON('http://api.douban.com/v2/movie/' + bl_list[i], function (temp, url) {
                        if (!temp) {
                            alert('get info error, aborting!');
                            return;
                        }
                        var current_id = url.split('/')[5];
                        var title = temp.attrs.country == '中国大陆' ? temp.title : temp.alt_title.split('/')[0] + ' ' + temp.title.split('/')[0];
                        title = title + '‎ (' + temp.attrs.year + ')';
                        var posterid = temp.image.split('/')[7].replace('.webp', '');
                        GM_setValue(current_id, title + '$' + posterid);
                        append_movie(title, posterid);
                        // speed control. The ratio limit of douban api is 100/hour.
                        sleep(1600);
                        update_bl(++i);
                    });
                }
                //console.log(GM_listValues());


            }
            bl_nav.click(function () {
                $('div#wrapper').empty();
                $('div#wrapper').append('<div id="content"><h1>豆瓣电影黑名单</h1><div class="grid-16-8 clearfix"><div class="article"><h2>电影黑名单 · · · · · · </h2><div class="indent"><div class=""><p class="ul first"></p></div></div></div><div class="aside"><div><h2>黑名单说明 · · · · · ·</h2><p>黑名单功能是为了屏蔽掉一些不想在找电影时看到但又不想标记已看的片子，加入黑名单后影片将不会在<a href="https://movie.douban.com/explore" style="color:#27a">选电影</a>和<a href="https://movie.douban.com/tag" style="color:#27a">分类选片</a>页面中出现。</p><p>在选电影界面的detail-pop元素和海报右上角（将鼠标移动到影片海报上就会弹出）增加了“屏蔽该影片”按钮，点击即可一键加入黑名单。</p></div><div><h2>管理功能说明 · · · · · ·</h2><p>清空黑名单：把所有影片移出黑名单。</p><p>清理缓存（慎用！）：重新获取黑名单中影片信息。当发现本页面中的影片信息显示不正确时，可以用这个功能强制刷新。由于douban api有每小时100次的限制，当黑名单列表过长时，此功能会出现问题。</p><p>导出黑名单：由于黑名单只能作用于本地，当多台设备想要同步黑名单时，目前只能利用手动导出导入实现。</p><p>导入黑名单：导入你想屏蔽的影片列表，注意格式。</p></div><div><h2>黑名单管理 · · · · · ·</h2><div class="types"><span><a class="bl_clear" style="color:#27a">清空黑名单</a></br><a class="cache_clear" style="color:#27a">清理缓存（慎用！）</a></br><a class="bl_export" style="color:#27a">导出黑名单</a></br><a class="bl_import" style="color:#27a">导入黑名单</a></span></div></div></div></div></div>');
                $('div#wrapper .types a.bl_clear').click(function () {
                    GM_setValue('bl', '');
                    $('.article .indent').first().empty();
                })
                $('div#wrapper .types a.cache_clear').click(function () {
                    var value_temp = GM_listValues();
                    for (var x = 0; x < value_temp.length; x++) {
                        if (RegExp(reservedValues).test(value_temp[x])) continue;
                        GM_deleteValue(value_temp[x]);
                    }
                    $('.article .indent').first().empty().append('<div><p class="ul first"></p></div>');
                    update_bl(1);
                })
                $('div#wrapper .types a.bl_export').click(function () {
                    $('.article h2').first().text('导出黑名单 · · · · · ·');
                    $('.article .indent').first().empty().append('<textarea class="bl_input" style="width:100%;height:350px">');
                    $('.article .indent .bl_input').text(GM_getValue('bl'));
                })
                $('div#wrapper .types a.bl_import').click(function () {
                    $('.article h2').first().text('导入黑名单 · · · · · ·');
                    $('.article .indent').first().empty().append('<textarea class="bl_input" placeholder="请注意导入格式为“$”+“豆瓣序号”，例如肖申克的救赎为$1292052，多个序号间无空格空行。" style="width:100%;height:350px"></textarea><button class="bl_input_submit" style="padding:0 12px;">提交</button>');
                    $('.article .indent .bl_input_submit').click(function () {
                        GM_setValue('bl', $('.article .indent .bl_input')[0].value);
                        $('.article .indent').first().empty().append('<div><p class="ul first"></p></div>');
                        $('.article h2').first().text('电影黑名单 · · · · · ·');
                        update_bl(1);
                    });
                })
                update_bl(1);
            })
            // bl_nav=bl_nav.wrap('<li></li>')
            $('div.nav-items ul').append(bl_nav);
        }
        // add Script Control Panel
        var cp_nav = $('<a class="lnk-remind">功能开关</a>')
        var cp_box = $('<div class="more-items" style="width: 180px;"><table cellpadding="0" cellspacing="0"><tbody><tr><td><a>电影黑名单</a></td><td><div class="blacklist"></div></td></tr><tr><td><a>原图链接</a></td><td><div class="poster"></div></td></tr><tr><td><a>生成信息</a></td><td><div class="infogen"></div></td></tr><tr><td><a>PT资源</a></td><td><div class="ptsite"></div></td></tr><tr><td><a>离线资源</a></td><td><div class="offlinesite"></div></td></tr><tr><td><a>字幕资源</a></td><td><div class="subsite"></div></td></tr><tr><td><a>更多评分</a></td><td><div class="morerating"></div></td></tr></tbody></table></div>');

        cp_nav.click(function () {
            if ($('div.top-nav-info .cp_nav').hasClass('more-active')) {
                $('div.top-nav-info .cp_nav').removeClass('more-active');
            }
            else {
                $('div.top-nav-info .cp_nav').addClass('more-active');
            }
            // $('div.top-nav-info .cp_box').css('display','block');
        })
        cp_box.find('a').css('color', "#3d3d3d");
        cp_box.find('td').css('display', "table-cell");
        cp_box.find('td').css('width', "auto");
        cp_box.find('div').each(function () {
            var temp = $('<img>');
            var switch_class = $(this).attr('class');
            temp.addClass(switch_class);
            temp.click(function () {
                var flag = GM_getValue(switch_class);
                GM_setValue(switch_class, !flag);
                console.log(!flag);
                $(this).attr('src', flag ? 'https://raw.githubusercontent.com/Exhen/douban-movie-helper/master/off.png' : 'https://raw.githubusercontent.com/Exhen/douban-movie-helper/master/on.png');
            })
            var flag = GM_getValue(switch_class, 'none');
            console.log(switch_class, flag);
            if (flag == 'none') {
                GM_setValue(switch_class, 1); flag = 1;
            }
            console.log("update_switch");

            temp.attr('src', flag ? 'https://raw.githubusercontent.com/Exhen/douban-movie-helper/master/on.png' : 'https://raw.githubusercontent.com/Exhen/douban-movie-helper/master/off.png');
            $(this).append(temp);
        });

        $('div.top-nav-info ul').append($('<li class="cp_nav nav-user-account"></li>'));
        $('div.top-nav-info ul .cp_nav').append(cp_nav).append(cp_box);
    })
}
else {
    console.log("page not found");
}



console.log(GM_listValues());
// GM_deleteValue('bl');
// GM_deleteValue('poster');
// GM_deleteValue('infogen');
// GM_deleteValue('ptsite');
// GM_deleteValue('subsite');
// GM_deleteValue('offlinesite');
// GM_deleteValue('morerating');