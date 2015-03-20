Ext.define('Courier.controller.Parcel', {
    extend: 'Ext.app.Controller',

    init: function() {
 		this.application.on({
            deleteParcel: this.deleteParcel,
            scope: this
        });
    },

    deleteParcel: function(parcel) {
    	console.log('delete');
    	// parcel.erase();
    }
});
