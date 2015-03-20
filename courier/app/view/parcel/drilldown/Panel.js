
Ext.define("Courier.view.parcel.drilldown.Panel",{
    extend: "Ext.form.Panel",

   	xtype: "parcel-drilldown-panel",

      defaults: {
         readOnly: true
      },

   	items: [{
   		xtype: 'numberfield',
   		name: 'id',
   		fieldLabel: 'id'
   	}, {
   		xtype: 'textfield',
   		name: 'description',
   		fieldLabel: 'description'
      }, {
   		xtype: 'numberfield',
   		name: 'location',
   		fieldLabel: 'location'
   	}]
});
