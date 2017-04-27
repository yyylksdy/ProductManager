/**
 * Created by YoYo on 4/25/17.
 */
var ProductManager=new Marionette.Application();
//var addproduct;
//var addproductvalue;
var productarray=[{
    productname:"Prada",
    productsize:"L",
    productcolor:"Black",
    img:"https://images.bloomingdales.com/is/image/BLM/products/0/optimized/9413280_fpx.tif?wid=800&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg",

},{productname:"Nike",
    productsize:"M",
    productcolor:"Green",
    img:"https://images.bloomingdales.com/is/image/BLM/products/0/optimized/9413280_fpx.tif?wid=800&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg"
},{productname:"Banana Republic",
    productsize:"S",
    productcolor:"White",
    img:"https://images.bloomingdales.com/is/image/BLM/products/0/optimized/9413280_fpx.tif?wid=800&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg"},{
    productname:"LV",
    productsize:"XL",
    productcolor:"Blue",
    img:"https://images.bloomingdales.com/is/image/BLM/products/0/optimized/9413280_fpx.tif?wid=800&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg"
},
    {productname:"Banana Republic",
        productsize:"M",
        productcolor:"Red",
        img:"https://images.bloomingdales.com/is/image/BLM/products/0/optimized/9413280_fpx.tif?wid=800&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg"}
];
var doc_obj=$(document);
doc_obj.on('click','#submitadd',function (e) {
    e.preventDefault();
    var name=$("input.name");
    var size=$("input.size");
    var color=$("input.color");
    var  addproductvalue=name.val();
    var addproductsize=size.val();
    var addproductcolor=color.val();
    console.log(addproductvalue);
    productarray.push({productname:addproductvalue,
        productsize:addproductsize,
        productcolor:addproductcolor,
        img:""});
    refreshProducts();
});

ProductManager.Products=Backbone.Model.extend({
//        defaults:{
//           productsize:""
//        }
    clicked:function () {
        this.trigger("clickedcollection",this)
    }
});
ProductManager.ProductList=Backbone.Collection.extend({
    model:ProductManager.Products,
    comparator:"productname",
    initialize:function(){
        this.on("clickedcollection",this.wasclicked,this)
    },
    wasclicked:function(){
        console.log("was clicked");
    }
});

ProductManager.ProductItemView=Marionette.ItemView.extend({
    //  el:"#main-region",
    tagName:"li",
    template:"#product_item_view",
    initialize: function(){
        this.model.on("change",this.render,this);

    },
    events:{"click .delete": "alertProductSize",
        "click .edit":"editProduct"
   // "submit":"submit"
    },
    alertProductSize: function(){
        //  alert(this.model.escape("productsize"));
        this.model.destroy();
    },
    editProduct:function(){
        var newproduct=prompt("please enter new product name",this.model.get('productname'));
        this.model.set("productname",newproduct);
        //  console.log(this.model.escape("productname"));

    }
  /*  submit:function (e) {
      //  alert("fff");
        e.preventDefault();
        var name=$("input.name");
        var size=$("input.size");
        var color=$("input.color");
       var  addproductvalue=$(e.currentTarget).find(name).val();
       var addproductsize=$(e.currentTarget).find(size).val();
        var addproductcolor=$(e.currentTarget).find(color).val();
     //var    addproduct=new ProductManager.Products({productname:addproductvalue});
        productarray.push({productname:addproductvalue,
                productsize:addproductsize,
                productcolor:addproductcolor,
                img:""});
     //   console.log(productarray);
       refreshProducts();


    }*/
});
ProductManager.ProductView=Marionette.CollectionView.extend({
        tagName:"ul",
        childView:ProductManager.ProductItemView,
    events:{
        "click":"handleclick"
    },

    handleclick:function () {
        this.model.clicked();
    }

    }
);




ProductManager.on('before:start',function () {
    var RegionContainer = Marionette.LayoutView.extend({
        el: "#app-container",
        regions: {
            main: "#main-region",
            addview:"#add-region"
        }
    });
    ProductManager.regions = new RegionContainer();
});
ProductManager.on('start',function(){

//       var productview=new ProductManager.ProductView({
//        model:prada
//
//        //   template:"#different_static_template"
//       });

 //   console.log(addproductvalue);
 //    productarray.push({productname:addproductvalue,
 //    productsize:"",
 //    productcolor:"",
 //    img:""});
    var productlist=new ProductManager.ProductList(productarray);
    productlist.sort("productsize");

   // productlist.add(addproduct);
    console.log(productarray);
    var productview=new ProductManager.ProductView({

        collection:productlist

    });
    ProductManager.regions.main.show(productview);

    //   staticview.render();
});
var refreshProducts=function() {
    var productlist=new ProductManager.ProductList(productarray);
    productlist.sort("productsize");

    // productlist.add(addproduct);
    console.log(productarray);
    var productview=new ProductManager.ProductView({

        collection:productlist
    });
    ProductManager.regions.main.show(productview);
};
ProductManager.start();