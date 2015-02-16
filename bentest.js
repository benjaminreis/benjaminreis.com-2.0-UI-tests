var info = {
  url: 'http://benjaminreis.com/index.html',
};

// an array of various device sizes
viewportSizes = [
    [320,480],
    [320,568],
    [600,1024],
    [1024,768],
    [1280,800],
    [1440,900]
]


//the begin function passes in 3 parameters, a heading, number of tests, and the test function
casper.test.begin('Tests benjaminreis.com', 8, function suite(test) {

	// a comment to the user running the test.
	test.comment('loading the url: ' + info.url);

	casper.start(info.url, function() {
		test.assertExists('div.brand', 'brand is found');
	
		//test.assertSelectorHasText('h2.intro-text text-center', 'BEAUTIFUL BOXES TO SHOWCASE YOUR CONTENT');
		test.assertVisible('footer');
		

		
		
		this.clickLabel('About', 'a');	
		test.comment('loading the url: http://benjaminreis\.com/about.html');
		});
		// the casper.then() function allows us to wait until previous items are done
		casper.then(function () {

		  	test.assertUrlMatch("http://benjaminreis\.com/about.html", 'New location is ' + this.getCurrentUrl());
			test.assertExists('div.address-bar', 'address bar is found');
		
		this.clickLabel('Interests', 'a');	
		test.comment('loading the url: http://benjaminreis\.com/interests.html');

		});
		// the casper.then() function allows us to wait until previous items are done
		casper.then(function () {

		  test.assertUrlMatch("http://benjaminreis\.com/interests.html", 'New location is ' + this.getCurrentUrl());
		  test.assertExists('h2.intro-text', 'intro text is found');
	
		
		this.clickLabel('Contact', 'a');	
		test.comment('loading the url: http://benjaminreis\.com/contact.html');


		});
		// the casper.then() function allows us to wait until previous items are done
		casper.then(function () {

		  test.assertUrlMatch("http://benjaminreis\.com/contact.html", 'New location is ' + this.getCurrentUrl());
		  test.assertExists('div.map', 'the google map exists');


		 
		});
		
// ** this next section takes screenshots of the website loaded in various sizes.  
// ** These images will need to be reviewed to test responsiveness of the website.

// this loops through each pair in the viewportSizes array.  		
	casper.each(viewportSizes, function(self, viewportSize, i) {
 
    // set two vars for the viewport height and width as we loop through each item in the viewport array
    var width = viewportSize[0],
        height = viewportSize[1];
        
        saveDir = info.url.replace(/[^a-zA-Z0-9]/gi, '-').replace(/^https?-+/, '');
 
 
    //waits a bit for the page to load
    casper.wait(5000, function() {
 
        //set the viewport to the desired height and width
        this.viewport(width, height);
 
        casper.thenOpen(info.url, function() {
            this.echo('Opening at ' + width);
 
            //Set up two vars, one for the fullpage save, one for the actual viewport save
            var FPfilename = saveDir + '/fullpage-' + width + ".png";
            var ACfilename = saveDir + '/' + width + '-' + height + ".png";
 
            //Capture selector captures the whole body
            this.captureSelector(FPfilename, 'body');
 
            //capture snaps a defined selection of the page
            this.capture(ACfilename,{top: 0,left: 0,width: width, height: height});
            this.echo('snapshot taken');
        });
    });
});		
		
// this is where the magic happens.. the tests are run after the JavaScript is loaded into memory
  casper.run(function() {
    test.done();
  });
});