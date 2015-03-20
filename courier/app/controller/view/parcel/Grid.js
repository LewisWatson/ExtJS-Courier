Ext.define('Courier.controller.view.parcel.Grid', {
    extend: 'Ext.app.Controller',
    requires: [
        'Courier.view.parcel.drilldown.Window'
    ],

    refs: [{
        ref: 'parcelGrid',
        selector: 'parcel-grid'
    }],

    init: function() {
    	this.control({
    		'parcelGrid': {
    			rowClick: this.onRowClick
    		}
    	})
    },

    onRowClick: function(grid, parcel, tr) {
        var window = Ext.create('Courier.view.parcel.drilldown.Window', {
            animateTarget: tr,
        });

        window.down('form').loadRecord(parcel);
        window.setTitle(window.getTitle() + ': ' + parcel.get('description'));
        window.show();

        this.deleteParcel(parcel);
    },

    deleteParcel: function(parcel) {
        this.getApplication().fireEvent('deleteParcel', parcel);
    }
});
