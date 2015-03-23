/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Courier.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Courier',

    stores: [
        'Parcels'
    ],
    
	controllers: [
    	'view.parcel.Grid'
    ],

    launch: function () {
        // TODO - Launch the application
    }
});
