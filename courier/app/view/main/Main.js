/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Courier.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'Courier.view.main.MainController',
        'Courier.view.main.MainModel',
        'Courier.view.parcel.Grid'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'panel',
        bind: {
            title: '<i class="fa fa-truck"></i> {name}'
        },
        region: 'west',
        html: '<i style="color:#d3d7cf;font-size:15em" class="fa fa-truck"></i>',
        width: 250,
        split: true,
        tbar: [{
            text: 'Button',
            iconCls: 'fa fa-rocket',
            handler: 'onClickButton'
        }]
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[{
            title: 'Parcel Grid',
            xtype: 'parcel-grid'
        }, {
            title: 'Coffee Tab',
            html: '<i style="color:#8f5902;font-size:15em; margin:0.05em" class="fa fa-coffee"></i></h2>'
        }]
    }]
});
