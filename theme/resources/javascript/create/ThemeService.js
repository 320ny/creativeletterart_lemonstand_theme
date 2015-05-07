CreateApp.service('ThemeService', function ($http) {
	this.selectedTheme = 'default';
	this.findThemeCode = function (theme, character) {
		var character = character.toUpperCase()
		return character + '-' + this.themes[theme][character];
	};
	this.themes = {
		  default: {
			//'A': '200','B': '204','C': '200','D': '207','E': '206',
	 		//'F': '202','G': '204','H': '202','I': '202','J': '201',
	  	//'K': '203','L': '206','M': '216','N': '205','O': '200',
	  	//'P': '103','Q': '301','R': '098','S': '112','T': '205',
	  	//'U': '201','V': '207','W': '101','X': '200','Y': '205',
	  	//'Z': '104','0': '000','1': '030','2': '080','3': '001',
	  	//'4': '095','5': '080','6': '001','7': '002','8': '000',
	  	//'9': '000','!': '001','&': '002'
			'A': '100','B': '100','C': '100','D': '100','E': '100',
	 		'F': '100','G': '100','H': '100','I': '100','J': '100',
	  	'K': '100','L': '100','M': '100','N': '100','O': '100',
	  	'P': '100','Q': '100','R': '100','S': '100','T': '100',
	  	'U': '100','V': '100','W': '100','X': '100','Y': '100',
	  	'Z': '100','0': '100','1': '100','2': '100','3': '100',
	  	'4': '100','5': '100','6': '100','7': '100','8': '100',
	  	'9': '100','!': '100','&': '100'
		},
		architecture: {
			'A': '200','B': '206','C': '200','D': '207','E': '100',
	 		'F': '203','G': '204','H': '202','I': '221','J': '201',
	  		'K': '203','L': '501','M': '200','N': '205','O': '201',
	  		'P': '103','Q': '301','R': '098','S': '202','T': '205',
	  		'U': '201','V': '203','W': '100','X': '200','Y': '205',
	  		'Z': '105','0': '000','1': '030','2': '080','3': '001',
	  		'4': '095','5': '080','6': '001','7': '002','8': '000',
	  		'9': '000','!': '001','&': '002'
		},
		industrial: {
			'A': '905','B': '901','C': '900','D': '902','E': '900',
	 		'F': '900','G': '900','H': '903','I': '900','J': '992_BW',
	  		'K': '904','L': '900','M': '900','N': '901','O': '900',
	  		'P': '900','Q': '910','R': '900','S': '900','T': '900',
	  		'U': '900','V': '900','W': '900','X': '102','Y': '900',
	  		'Z': '901','0': '000','1': '030','2': '080','3': '001',
	  		'4': '095','5': '080','6': '001','7': '002','8': '000',
	  		'9': '000','!': '001','&': '002'
		},
		music: {
			'A': '500','B': '503','C': '500','D': '500','E': '500',
	 		'F': '500','G': '500','H': '500','I': '500','J': '500',
	  		'K': '500','L': '501','M': '500','N': '500','O': '508',
	  		'P': '500','Q': '910','R': '501','S': '500','T': '500',
	  		'U': '500','V': '500','W': '501','X': '995','Y': '500',
	  		'Z': '500','0': '000','1': '030','2': '080','3': '001',
	  		'4': '095','5': '080','6': '001','7': '002','8': '000',
	  		'9': '000','!': '001','&': '002'
		},
		nature: {
			'A': '300','B': '100','C': '303','D': '302','E': '300',
	 		'F': '300','G': '300','H': '300','I': '310','J': '100',
	  		'K': '350','L': '300','M': '213','N': '302','O': '300',
	  		'P': '300','Q': '300','R': '302','S': '305','T': '202',
	  		'U': '302','V': '301','W': '300','X': '300','Y': '310',
	  		'Z': '201','0': '000','1': '030','2': '080','3': '001',
	  		'4': '095','5': '080','6': '001','7': '002','8': '000',
	  		'9': '000','!': '001','&': '002'
		},
		nautical: {
			'A': '722','B': '906','C': '351','D': '750','E': '721',
	 		'F': '204','G': '105','H': '353','I': '351c','J': '350',
	  		'K': '350','L': '210','M': '350','N': '350','O': '721',
	  		'P': '102','Q': '101','R': '720','S': '111','T': '721a',
	  		'U': '720','V': '350','W': '301','X': '302','Y': '310',
	  		'Z': '201','0': '000','1': '030','2': '080','3': '001',
	  		'4': '095','5': '080','6': '001','7': '002','8': '000',
	  		'9': '000','!': '001','&': '002'
		},
		neon: {
			'A': '996','B': '990','C': '992','D': '994','E': '995',
	 		'F': '997','G': '992','H': '995','I': '994','J': '992',
	  		'K': '920','L': '996','M': '990','N': '995','O': '990',
	  		'P': '995','Q': '996','R': '990','S': '990','T': '993',
	  		'U': '995','V': '980','W': '995','X': '995','Y': '996',
	  		'Z': '994','0': '000','1': '030','2': '080','3': '001',
	  		'4': '095','5': '080','6': '001','7': '002','8': '000',
	  		'9': '000','!': '001','&': '002'
		}
	},
	this.codes = undefined;

});
