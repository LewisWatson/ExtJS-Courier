Ext.define('Courier.model.Package', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'int' },
        { name: 'description', type: 'string' },
        { name: 'location', type: 'int' }

    ]
});
