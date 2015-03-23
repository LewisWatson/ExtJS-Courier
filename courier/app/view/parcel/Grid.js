
Ext.define("Courier.view.parcel.Grid",{
    extend: "Ext.grid.Panel",
    xtype: "parcel-grid",

    store: "Parcels",

    columns: [{
    	dataIndex: "id"
    }, {
    	text: "Description", dataIndex: "description", flex: 1
    }]
});
