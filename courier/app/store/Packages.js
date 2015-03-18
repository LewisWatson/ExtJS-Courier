Ext.define('Courier.store.Packages', {
	extend: 'Ext.data.Store',
	model:'Courier.model.Package',
	storeId: 'packages',
	autoLoad: true,

	proxy: {
    	type: 'ajax',
    	url: '/ExtJS-Courier/data/packages.json',
    	reader: {
    		type: 'json',
    		rootProperty: 'data'
    	}
    }
});