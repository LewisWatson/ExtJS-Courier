Ext.define("Courier.view.parcel.drilldown.Window",{
    extend: "Ext.window.Window",
    requires: [
        'Courier.view.parcel.drilldown.Panel'
    ],

    title: 'Parcel',

    padding: '5',

    items: [{
        xtype: 'parcel-drilldown-panel'
    }]
});