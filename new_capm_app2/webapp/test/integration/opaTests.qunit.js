sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'newcapmapp2/test/integration/FirstJourney',
		'newcapmapp2/test/integration/pages/BooksList',
		'newcapmapp2/test/integration/pages/BooksObjectPage'
    ],
    function(JourneyRunner, opaJourney, BooksList, BooksObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('newcapmapp2') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBooksList: BooksList,
					onTheBooksObjectPage: BooksObjectPage
                }
            },
            opaJourney.run
        );
    }
);