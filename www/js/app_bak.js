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
	$(document).on('page:afterin','.page[data-name="jadwal"]', function (e, page) {
		var storage = window.localStorage;
		var no_hp = 0;
		var no_paspor = 0;
		var lat = 0;
		var lon = 0;
		var altitude = 0;
		var accuracy = 0;
		var altitudeAccuracy = 0;
		var heading = 0;
		var speed = 0;
		var timestamp = 0;

		$('.alert').on('click', function () {
			//Pendaftar Baru
			if(storage.getItem("no_hp") == null){
				function onPrompt(results) {
					// alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
					if(results.buttonIndex==1){ //simpan
						storage.setItem("no_hp", results.input1);
						// console.log(storage.getItem("no_hp"));
						app.dialog.prompt('No Passpor Anda ?','Pendaftaran - No Paspor', function (no_passpor) {
							storage.setItem("no_passpor", no_passpor);
							// console.log(storage.getItem("no_passpor"));
							app.dialog.alert('Pendaftaran Berhasil','Klik Tombol SOS hanya untuk keadaan DARURAT');
						});						
					}else{
						storage.setItem("no_hp", storage.getItem("no_hp_old"));
						storage.setItem("no_passpor", storage.getItem("no_passpor_old"));
					}
				}

				navigator.notification.prompt(
						'Masukkan No HP (Whatsapp) Anda',  	// message
						onPrompt,                  					// callback to invoke
						'Pendaftaran',            					// title
						['Simpan','Batal']  		// buttonLabels
				);
			}else{ //Kirim Laporan
				function onPrompt(results) {
					// alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
					if(results.buttonIndex==3){
						var laporan = results.input1;
						app.dialog.confirm('Apakah Anda yakin Akan Mengirim Laporan Keadaan Darurat ?','Laporan Keadaan Darurat', function () {
							app.dialog.alert('Kami Akan Mengirim data Anda','Laporan Keadaan Darurat');
								navigator.geolocation.getCurrentPosition(
									function(position) {
										lat = position.coords.latitude;
										lon = position.coords.longitude;
										altitude = position.coords.altitude;
										accuracy = position.coords.accuracy;
										altitudeAccuracy = position.coords.altitudeAccuracy;
										heading = position.coords.heading;
										speed = position.coords.speed;
										timestamp = position.timestamp;
										console.log("Lat: " + lat + "\nLon: " + position.coords.longitude);
											 
									},
									function(error){
											 alert(error.message);
									}, {
											 enableHighAccuracy: true
														,timeout : 5000
									}
								);
								var no_hp = storage.getItem("no_hp");
								var no_passpor = storage.getItem("no_passpor");
								// console.log("no ku1 = " + no_hp);
								// console.log("no pass1 = " + no_passpor);
								// console.log("laporan 1 = " + laporan);
								app.request.get('http://ptsp.infokerja-jatim.com/site/sos?no_hp='+no_hp+'&no_paspor='+no_passpor+'&lat='+lat+'&lon='+lon+'&altitude='+altitude+'&accuracy='+accuracy+'&altitudeAccuracy='+altitudeAccuracy+'&heading='+heading+'&speed='+speed+'&laporan='+laporan+'&timestamp='+timestamp, function (data) {
									console.log(data);
								});
						});						
					}else if(results.buttonIndex==2){
						storage.setItem("no_hp_old", storage.getItem("no_hp"));
						storage.setItem("no_passpor_old", storage.getItem("no_passpor"));
						storage.removeItem("no_hp");
						storage.removeItem("no_passpor");
						$('.alert').trigger('click');
					}
				}

				navigator.notification.prompt(
						'Masukkan Detail Laporan Darurat Anda, jangan lupa Nyalakan GPS dan berikan hak akses untuk mengakses GPS',  	// message
						onPrompt,                  					// callback to invoke
						'Laporan Keadaan Darurat',            					// title
						['Batal','Ubah Data','Kirim']  		// buttonLabels
				);
				
			}
		});
		// console.log("tes");
		$('.open-login').on('click', function () {
				console.log("no ku = " + storage.getItem("no_hp"));
				console.log("no pass = " + storage.getItem("no_passpor"));
			if(storage.getItem("no_hp") == null){
				app.dialog.prompt('No Handphone Anda ?','Pendaftaran - No HP', function (no_hp) {
					app.dialog.prompt('No Passpor Anda ?','Pendaftaran - No Paspor', function (no_passpor) {
						storage.setItem("no_passpor", no_passpor);
						console.log(storage.getItem("no_passpor"));
						app.dialog.alert('Pendaftaran Berhasil','Klik Tombol SOS hana untuk keadaan DARURAT');
					});
				});
				
			}else{
				app.dialog.prompt('Detail Laporan ?','Laporan Keadaan Darurat', function (laporan) {
					app.dialog.confirm('Apakah Anda yakin Akan Mengirim Laporan Keadaan Darurat ?','Laporan Keadaan Darurat', function () {
						app.dialog.alert('Kami Akan Mengirim data Anda','Laporan Keadaan Darurat');
							var no_hp = storage.getItem("no_hp");
							var no_passpor = storage.getItem("no_passpor");
							console.log("no ku1 = " + no_hp);
							console.log("no pass1 = " + no_passpor);
							console.log("laporan 1 = " + laporan);
							// app.request.get('http://ptsp.infokerja-jatim.com/site/sos?no_hp='+no_hp+'&no_paspor='+no_passpor+'&lat='+lat+'&lon='+lon+'&altitude='+altitude+'&accuracy='+accuracy+'&altitudeAccuracy='+altitudeAccuracy+'&heading='+heading+'&speed='+speed+'&laporan='+laporan+'&timestamp='+timestamp, function (data) {
							// console.log(data);
						// });
					});
				});
				
			}
		});
	});
	$('.alert2').on('click', function () {
				console.log("no ku = " + storage.getItem("no_hp"));
				console.log("no pass = " + storage.getItem("no_passpor"));
			if(storage.getItem("no_hp") == null){

				app.dialog.prompt('No Handphone Anda ?','Pendaftaran - No HP', function (no_hp) {
					app.dialog.prompt('No Passpor Anda ?','Pendaftaran - No Paspor', function (no_passpor) {
						storage.setItem("no_passpor", no_passpor);
						console.log(storage.getItem("no_passpor"));
						app.dialog.alert('Pendaftaran Berhasil','Klik Tombol SOS hana untuk keadaan DARURAT');
					});
				});
				
			}else{
				app.dialog.create({
					title: 'Laporan Keadaan Darurat',
					text: 'Masukkan Detail Laporan Darurat Anda, jangan lupa Nyalakan GPS dan berikan hak akses untuk mengakses GPS',
					 buttons: [
						{
							text: 'Ubah Data',
							onClick:	function(dialog, e){
								storage.setItem("no_hp_old", storage.getItem("no_hp"));
								storage.setItem("no_passpor_old", storage.getItem("no_passpor"));
								storage.removeItem("no_hp");
								storage.removeItem("no_passpor");
								$('.alert2').trigger('click');								
							},
						},
						{
							text: 'Batal',
						},
						{
							text: 'Kirim SOS',
							onClick:	function(dialog, e){
								app.dialog.prompt('Detail Laporan ?','Laporan Keadaan Darurat', function (laporan) {
									app.dialog.confirm('Apakah Anda yakin Akan Mengirim Laporan Keadaan Darurat ?','Laporan Keadaan Darurat', function () {
										app.dialog.alert('Kami Akan Mengirim data Anda','Laporan Keadaan Darurat');
											var no_hp = storage.getItem("no_hp");
											var no_passpor = storage.getItem("no_passpor");
											console.log("no ku1 = " + no_hp);
											console.log("no pass1 = " + no_passpor);
											console.log("laporan 1 = " + laporan);
											// app.request.get('http://ptsp.infokerja-jatim.com/site/sos?no_hp='+no_hp+'&no_paspor='+no_passpor+'&lat='+lat+'&lon='+lon+'&altitude='+altitude+'&accuracy='+accuracy+'&altitudeAccuracy='+altitudeAccuracy+'&heading='+heading+'&speed='+speed+'&laporan='+laporan+'&timestamp='+timestamp, function (data) {
											// console.log(data);
										// });
									});
								});
							},
						},
					],
					on: {
						opened: function () {
							console.log('Dialog opened')
						}
					}
				});				

				
			}
		});
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