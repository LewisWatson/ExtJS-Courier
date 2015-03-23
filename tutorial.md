# ExtJS Courier Tutorial
This step by step tutorial will take you through to process of creating a simple MVC web application using Sencha Cmd and Ext JS 5.1.0-GPL

## Create a sencha directory (optional)
For simplicity we are going to create a directory called `Sencha` that will contain all Sencha Cmd, SDK's and workspaces.

    ~$ mkdir Sencha

_If you decide to skip this step then adapt any subsequent commands accordingly._

## Install Sencha Cmd
We will be using Sencha Cmd in order to speed up development by automating much of the development process.

Download and install Sencha Cmd from the [sencha website](http://www.sencha.com/products/sencha-cmd/). I am going to assume that the `sencha` command is on your systems path so can be called from anywhere.

If you install to your home directory then your Sencha directory will look something like this:

    ~/Sencha$ tree -d -L 2
    .
    ├── Cmd
        ├── 5.1.2.52

## Download ExtJS SDK
Sencha Cmd requires an SDK to work from, which can also be downloaded from the sencha workplace. ExtJS is offered in a dual license of [commercial](http://www.sencha.com/products/extjs/) or an [Open Source GPL](http://www.sencha.com/products/extjs/details) one. Make sure you do your research and pick the appropriate license for you.

Unzip the folder into `~/Sencha/sdk`

    ~/Sencha$ tree -d -L 2
    .
    ├── Cmd
    │   ├── 5.1.2.52
    ├── sdk
        ├── ext-5.1.0-commerical
        └── ext-5.1.0-gpl

## Generate a Workspace

    ~/Sencha$ mkdir worksapces
    ~/Sencha$ cd workspaces

Generate a workspace. If using commercial version then adapt sdk path accordingly.

    ~/Sencha/workspaces$ sencha -sdk ../sdk/ext-5.1.0-gpl generate workspace ExtJS-Courier

Your Sencha directory should look something like this:

    ~/Sencha$ tree -d -L 2
    .
    ├── Cmd
    │   ├── 5.1.2.52
    ├── sdk
    │   ├── ext-5.1.0-commerical
    │   └── ext-5.1.0-gpl
    └── workspaces
        ├── ExtJS-Courier

## The Courier App

Change directory into `~/Sencha/workspaces`

    sencha -sdk ext generate app Courier courier

This will generate an empty application that we can then adapt to our needs. 

### Building the Courier App
It's a fully operational app so we can build it

    $ cd courier
    $ sencha app build

We can even start up a simple web server and view it

    $ cd ..
    $ sencha web start
    Sencha Cmd v5.1.2.52
    [INF] Mapping http://localhost:1841/ to ....
    [INF] ------------------------------------------------------------------
    [INF] Starting web server at : http://localhost:1841
    [INF] ------------------------------------------------------------------

You should find a development version of `courier` at <http://localhost:1841/courier/> and an optimised production version at <http://localhost:1841/build/production/Courier/>.

For the remainder of this tutorial we are going to use the `sencha app watch` that will watch the files in the `Courier` app and automatically update a running web server.

If you still have `sencha web start` running then stop it with `ctrl-c` and start `sencha app watch`.

You may find that you will need to run `sencha app build` in order to update the production version of the app. `sencha app watch` should keep the development version up to date.

### The Model

We are going to display some parcel data from the following JSON

```JSON    
{
    "data": [{
        "id": 1,
        "description": "lewmart order 1245",
        "location": 1
    }, {
        "id": 2,
        "description": "lewmart order 3242",
        "location": 2
    }, {
        "id": 3,
        "description": "lewmart order 5434",
        "location": 1
    }, {
        "id": 4,
        "description": "lewmart order 2352",
        "location": 3
    }, {
        "id": 5,
        "description": "lewmart order 8797",
        "location": 2
    }, {
        "id": 6,
        "description": "lewmart order 3451",
        "location": 1
    }, {
        "id": 7,
        "description": "lewmart order 9774",
        "location": 2
    }],
    "success": true
}
```

Use Sencha Cmd to generate a model class for the courier app. From the Courier app directory `~/Sencha/workspaces/courier/`.

    $ sencha generate model Parcel id:int,description:string,location:int

Which will generate `/courierapp/model/Parcel.js`

```JavaScript
Ext.define('Courier.model.Parcel', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'int' },
        { name: 'description', type: 'string' },
        { name: 'location', type: 'int' }

    ]
});
```

### Parcel Store

In order to load data into the application, we will need to create a store. Sencha Cmd doesn't support store generation so create `courier/app/store/Parcels.js`

```JavaScript
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
```

This is going to be a global store so add a reference to `courier/app/Application.js`

```JavaScript
Ext.define('Courier.Application', {
    
    ...

    stores: [
        'Parcels'
    ],
    
    ...
});
```

Now create a static JSON file for the store to load `courier/resources/data/parcels.json`

```JSON
{
    "data": [{
        "id": 1,
        "description": "lewmart order 1245",
        "location": 1
    }, {
        "id": 2,
        "description": "lewmart order 3242",
        "location": 2
    }, {
        "id": 3,
        "description": "lewmart order 5434",
        "location": 1
    }, {
        "id": 4,
        "description": "lewmart order 2352",
        "location": 3
    }, {
        "id": 5,
        "description": "lewmart order 8797",
        "location": 2
    }, {
        "id": 6,
        "description": "lewmart order 3451",
        "location": 1
    }, {
        "id": 7,
        "description": "lewmart order 9774",
        "location": 2
    }],
    "success": true
}
```

If you have the server running then you should now be able to view `parcels.json` at <http://localhost:1841/courier/resources/data/parcels.json>

### Grid View for Parcels

Now that we have some package data to display, we can create a view for it. We will start by making a simple grid that binds directly to the `Parcels` store.

While in the courier directory

    sencha generate view parcel.Grid

This will generate three new JavaScript files following the MVVC pattern in `courier/app/view/parcel`. We are following the MVC pattern in this tutorial so delete `GridController.js` and `GridModel.js` and edit `Grid.js` to look like this:

```JavaScript
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
```

#### Adding parcel-grid to the application

We can use our new parcel-grid by simply adding it to the existing Main view `courier/app/view/main/Main.js`

```JavaScript
Ext.define('Courier.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        ...
        'Courier.view.parcel.Grid'
    ],

    ...

    items: [{
        ...
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[{
            title: 'Parcel Grid',
            xtype: 'parcel-grid'
        }, {
            title: 'Tab 2',
            html: '<h2>Content appropriate for the current navigation.</h2>'
        }]
    }]
});
```

The updated application should now be available at <http://localhost:1841/courier/>

### Drill Down Window

Now we will extend the Courier application by adding a drill down window when users click on a row on the `parcel-grid`.

#### Drill Down Panel

    sencha generate view parcel.drilldown.Panel

Just like before, delete the non MVC files `PanelController.js` and `PanelModel.js`.

Edit `courier/app/view/parcel/drilldown/Panel.js` to look like this:

```JavaScript
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
```

#### Drill Down Window

    sencha generate view parcel.drilldown.Window

Delete the non MVC files and edit `courier/app/view/parcel/drilldown/Window.js` to be a window that contains the `parcel-drilldown-panel`.

```JavaScript
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
```

#### Parcel Grid View Controller

We now need some sort of mechanism to display the drill down window when a user clicks on a row. To do this we will create a controller.

    sencha generate controller view.parcel.Grid

Add the following code to `courier/app/controller/view/parcel/Grid.js` to display the drill down window:

```JavaScript
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
    }
});
```

`view.parcel.Grid` controller is going to be a global controller so a reference needs to be added to `courier/app/Application.js`

```JavaScript
Ext.define('Courier.Application', {

    ...
    
    controllers: [
        'view.parcel.Grid'
    ],

    ...
});
```

Reload <http://localhost:1841/courier/> and the drill down window will now appear when you click on rows in `parcel-grid`.

### Controller Events

One of the most useful features of ExtJS controllers is that they can be completely decoupled from views by using application events. For example, let's say that multiple views are going to share some functionality relating to deleting Parcels. We could make a controller what has explicit listeners for every view that deleted parcels, but that would be messy and hard to maintain in larger applications. A cleaner approach is to assign each view its own controller that converts view actions into generic application events that can be handled by specialised controllers.

Create a new method in the `view.parcel.Grid` controller that generates an application event. Then add a call to it at the end of `onRowClick`

```JavaScript
Ext.define('Courier.controller.view.parcel.Grid', {
    
    ...

    onRowClick: function(grid, parcel, tr) {

       ...

       this.deleteParcel(parcel);
    }

    deleteParcel: function(parcel) {
        this.getApplication().fireEvent('deleteParcel', parcel);
    }
});
```

Now create new controller that will handle deleteParcel application events.

    sencha generate controller Parcel

Add the following functionality:

```JavaScript
Ext.define('Courier.controller.Parcel', {
    extend: 'Ext.app.Controller',

    init: function() {
        this.application.on({
            deleteParcel: this.deleteParcel,
            scope: this
        });
    },

    deleteParcel: function(parcel) {
        console.log('delete');
        // parcel.erase();
    }
});
```

and add the `Parcel` controller to `courier/app/Application.js`

```JavaScript
Ext.define('Courier.Application', {
    
    ...
    
    controllers: [
        'Parcel',
        'view.parcel.Grid'
    ],

    ...
});
```

Reload <http://localhost:1841/courier/> and you will now see a console message every time you click on a row in `parcel-grid`. The `parcel.erase()` line that is commented out is how you could send a delete command to the server when the underlying proxy is set up for CRUD operations.