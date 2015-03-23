Ext.define('Courier.store.Parcels', {
    extend: 'Ext.data.Store',
    model:'Courier.model.Parcel',
    storeId: 'parcels',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'resources/data/parcels.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});