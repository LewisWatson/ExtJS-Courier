Ext.define('Courier.store.Packages', {
	extend: 'Ext.data.Store',
	model:'Courier.model.Package',
	storeId: 'packages',

	proxy: {
    	type: 'ajax',
    	url: '/data/packages.json',
    	reader: {
    		type: 'json',
    		rootProperty: 'data'
    	}
    }
});