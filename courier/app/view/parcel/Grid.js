
Ext.define("Courier.view.parcel.Grid",{
    extend: "Ext.grid.Panel",
    xtype: "parcel-grid",

    store: "Packages",

    columns: [{
    	text: "id", dataIndex: "id"
    }, {
    	text: "Description", dataIndex: "description", flex: 1
    }]
});