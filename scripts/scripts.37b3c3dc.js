"use strict";angular.module("shopApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ui.router","monospaced.elastic","oitozero.ngSweetAlert","ngDialog","ngUrlParser","angular-inview"]).run(["$rootScope","$state","$resource","urlParser","stateS","storageS","TokenSignInR","SiteR",function(a,b,c,d,e,f,g,h){b&&(a.state=b),e&&(a.stateS=e),d&&(a.urlParser=d),a.initialize=function(){console.info("initialize"),c("json/readingRoom.json").get({},function(b){a.service=b,console.info("$rootScope.service",a.service)})},a.initialize(),f.get("is_auto_login")?a.user=f.get("user"):a.user=null}]),angular.module("shopApp").config(["$resourceProvider","$stateProvider","$urlRouterProvider",function(a,b,c){a.defaults.stripTrailingSlashes=!1,b.state("landing",{url:"/landing",templateUrl:"views/landing/landing.html",controller:"LandingCtrl",group:"landing"}),c.otherwise("/landing")}]),angular.module("shopApp").constant("ServerURL","http://127.0.0.1:8000/").constant("ModelUrl","Develist").constant("SolutionUrl","ReadingRoom").factory("SignInR",["$resource","ServerURL","ModelUrl",function(a,b,c){return a(b+"SignIn/:id/",{id:"@id"},{update:{method:"PATCH"}})}]).factory("TokenSignInR",["$resource","ServerURL","ModelUrl",function(a,b,c){return a(b+"TokenSignIn/:id/",{id:"@id"},{update:{method:"PATCH"}})}]).factory("SiteR",["$resource","ServerURL","ModelUrl","SolutionUrl",function(a,b,c,d){return a(b+c+d+"Site/:id/",{id:"@id"},{update:{method:"PATCH"}})}]).factory("DevelistShopCounselR",["$resource","ServerURL",function(a,b){return a(b+"DevelistShopCounsel/:id/",{id:"@id"},{update:{method:"PATCH"}})}]).factory("DevelistShopPaymentR",["$resource","ServerURL",function(a,b){return a(b+"DevelistShopPayment/:id/",{id:"@id"},{update:{method:"PATCH"}})}]),angular.module("shopApp").service("stateS",["$state","$window","$rootScope","$timeout","$filter",function(a,b,c,d,e){this.go=function(b,c,d){if(!b)return!1;var e=!0;if(c&&_.isBoolean(c.reload)&&(e=c.reload),d&&d.ctrlKey){var f=a.href(b,c,{absolute:!0,notify:e});return window.open(f,"_blank"),!0}if(d&&d.shiftKey){var f=a.href(b,c,{absolute:!0,notify:e},"_blank");return window.open(f,"_blank"),!0}return a.go(b,c,{notify:e}),!0},this.goBack=function(){a.get(a.fromState.name)?b.history.back():this.go("landing")},c.$on("$stateChangeSuccess",function(b,d,e,f,g){a.toState=d,a.toParams=e,d.signin&&!c.user&&a.go("signIn"),a.fromState=f,a.fromParams=g})}]),angular.module("shopApp").service("storageS",["$rootScope","$http",function(a,b){this.get=function(a){if(a){var b=null;try{localStorage.getItem(a)&&(b=angular.fromJson(localStorage.getItem(a)))}catch(c){localStorage.removeItem(a)}return b}},this.set=function(a,c){"token"==a&&(b.defaults.headers.common.Authorization="Token "+c),localStorage.setItem(a,JSON.stringify(c))},this["delete"]=function(a){"token"==a&&delete b.defaults.headers.common.Authorization,localStorage.removeItem(a)},this.remove=function(a){localStorage.removeItem(a)}}]),angular.module("shopApp").controller("LandingCtrl",["$scope","$resource","$rootScope","SweetAlert","ngDialog","urlParser",function(a,b,c,d,e,f){a.buttons=[{button:"상담하기",dialog:{template:"views/templates/dialog/counsel.html",showClose:!1,controller:"PopUpsCtrl"}},{button:"제작하기",dialog:{template:"views/templates/dialog/payment.html",showClose:!1,controller:"PopUpsCtrl"}}],a.footers=[{info:"상호: ",detail:"아이디스트"},{info:"대표이사: ",detail:"김선욱"},{info:"주소: ",detail:"서울특별시 중구 다산로 258, B동 1922호"},{info:"이메일: ",detail:"ceo@idist.ai"},{info:"사업자등록번호: ",detail:"546-20-00066"},{info:"통신판매업 신고번호: ",detail:"546-20-00066"},{info:"개인정보 처리방침",detail:""}],a.initialize=function(){c.service&&(a.titles=c.service.titles,a.background=c.service.background,a.solutions=c.service.solutions,a.style=c.service.style,a.price=c.service.price)},a.initialize()}]),angular.module("shopApp").directive("buttonLandingDir",["$rootScope","ngDialog",function(a,b){return{link:function(a,c,d){a.clickButton=function(a){b.open(a)}},replace:!0,scope:!1,restrict:"EA",templateUrl:"views/landing/directive/buttonLandingDir.html"}}]),angular.module("shopApp").directive("footerLandingDir",["$rootScope",function(a){return{link:function(a,b,c){},replace:!0,scope:!1,restrict:"EA",templateUrl:"views/landing/directive/footerLandingDir.html"}}]),angular.module("shopApp").directive("priceLandingDir",["$rootScope",function(a){return{link:function(a,b,c){},replace:!0,scope:!1,restrict:"EA",templateUrl:"views/landing/directive/priceLandingDir.html"}}]),angular.module("shopApp").directive("solutionsLandingDir",["$rootScope",function(a){return{link:function(a,b,c){a.hoverIn=function(a){a.hoverIn=!0},a.hoverOut=function(a){a.hoverIn=!1},a.initialize=function(){}},replace:!0,scope:!1,restrict:"EA",templateUrl:"views/landing/directive/solutionsLandingDir.html"}}]),angular.module("shopApp").directive("solutionLandingDir",["$rootScope","ngDialog",function(a,b){return{link:function(a,c,d){a.clickImage=function(a){b.open(a)}},replace:!0,scope:!1,restrict:"EA",templateUrl:"views/landing/directive/solutionLandingDir.html"}}]),angular.module("shopApp").directive("titleLandingDir",function(){return{link:function(a,b,c,d){},replace:!0,scope:!1,restrict:"EA",templateUrl:"views/landing/directive/titleLandingDir.html"}}),angular.module("shopApp").controller("PopUpsCtrl",["$scope","$resource","$rootScope","SweetAlert","ngDialog","DevelistShopCounselR","DevelistShopPaymentR",function(a,b,c,d,e,f,g){a.clickClose=function(){e.close()},a.saveCounsel=function(){},a.saveCounsel=function(){a.counsel_model.host=c.urlParser.getHostname(),f.save(a.counsel_model,function(a){},function(a){})},a.savePayment=function(){a.payment_model.host=c.urlParser.getHostname(),g.save(a.payment_model,function(a){},function(a){})},a.infos=[{info:"이름",input_type:"text",model:"name"},{info:"상호",input_type:"text",model:"shop_name"},{info:"번호",input_type:"tel",model:"phone"},{info:"이메일",input_type:"email",model:"email"}],a.counsel_model={host:"",name:"",shop_name:"",phone:"",email:"",counsel:""},a.payment_model={host:"",name:"",shop_name:"",phone:"",email:""},a.clickGo=function(a){var b=window.open("about:blank");b.location.href=a},a.pc_buttons=[{button:"웹사이트",url:"https://www.naver.com/"},{button:"관리자페이지",url:"https://www.google.co.kr/"}],a.mobile_buttons=[{button:"웹사이트",url:"https://m.naver.com/"},{button:"관리자페이지",url:"http://m.blog.naver.com/"}],a.sns_button={button:"그래머 웹사이트 구경하기",url:"http://grammer.kr/"},a.payment={ment:"신한은행 0201403310 김선욱(아이디스트)으로 5,000,000원 입금해주세요."},a.initialize=function(){a.pc=c.service.popup.pc,a.mobile=c.service.popup.mobile,a.sns=c.service.popup.sns,a.contact=c.service.contact},a.initialize()}]),angular.module("shopApp").run(["$templateCache",function(a){a.put("views/landing/landing.html",'<div class="w-100 h-100vh"> <img class="p-a t-0 l-0 w-100 h-100 z-1" ng-src="{{background.cover}}"> <div class="p-a t-0 l-0 w-100 h-100 b-{{style.background}} o-30 z-2"></div> <div class="p-a t-0 l-0 w-100 h-100 z-3"> <title-landing-dir class="p-a t-120D1080M100-N450 t-80D667M100-X450"></title-landing-dir> <solutions-landing-dir class="p-a t-370D1080M100-N450 t-183D667M100-X450"></solutions-landing-dir> <price-landing-dir class="p-a t-690D1080M100-N450 t-456D667M100-X450"></price-landing-dir> <button-landing-dir class="p-a t-885D1080M100-N450 t-547D667M100-X450"></button-landing-dir> <footer-landing-dir class="p-a t-1020D1080M100-N450 t-610D667M100-X450"></footer-landing-dir> </div> </div>')}]);