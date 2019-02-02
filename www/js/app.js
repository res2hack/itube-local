// Dom7
var $ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
  theme: theme,
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  routes: routes,
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
});


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
						// screen.orientation.lock('landscape');

	};
    document.addEventListener("backbutton", function(e){
			// alert($('#pagetitle').text());
       if($('#pagetitle').text()!=null){
           
					 // alert($('#pagetitle').text());
          // document.getElementById('1').contentWindow.history.back(-1);
					navigator.app.backHistory();
					e.preventDefault();
       }
       else{
           // e.preventDefault();
					 // alert($('#pagetitle').text());
           navigator.app.exitApp();
					 e.preventDefault();
       }
    }, false);
}