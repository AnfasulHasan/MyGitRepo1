sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("newcapmapp1.controller.View1", {
            onInit: function () {
                this._oTable = this.byId("table0");
            },
            navTo: function(oEvent){
                var oItem = oEvent.getSource();
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteView2", {
                    tripTest: window.encodeURIComponent(oItem.getBindingContext("odata").getPath().substr(1))
                });
            },
            onOpenAddDialog: function () {
                this.getView().byId("OpenDialog").open();
            },
            onCancelDialog: function (oEvent) {
                oEvent.getSource().getParent().close();
            },
            onCreate: function () {
                var oidId = this.getView().byId("idId").getValue();
                if (oidId !== "") {
                    const oList = this._oTable;
                    const oBinding = oList.getBinding("items");
                    const oContext = oBinding.create({
                        "ID": this.byId("idId").getValue(),
                        "Name": this.byId("idName").getValue(),
                        "Profile": this.byId("idProfile").getValue(),
                        "UnitPrice": this.byId("idUnitPrice").getValue()                                 
                    });
                    oContext.created()
                    .then(()=>{
                        // that._focusItem(oList, oContext);
                        this.getView().byId("OpenDialog").close();
                    });  
                }
                else {
                    MessageToast.show("Record cannot be blank");
                }
            }, 
            onEditMode: function(){
                this.byId("editModeButton").setVisible(true);
                this.byId("saveButton").setVisible(true);
                this.byId("deleteButton").setVisible(true);
                // this.rebindTable(this.oEditableTemplate, "Edit");
           },
           onDelete: function(){

            var oSelected = this.byId("table0").getSelectedItem();
            if(oSelected){
                var oSalesOrder = oSelected.getBindingContext("odata").getObject().soNumber;
            
                oSelected.getBindingContext("odata").delete().then(function () {
                    MessageToast.show(oSalesOrder + " SuccessFully Deleted");
                }.bind(this), function (oError) {
                    MessageToast.show("Deletion Error: ",oError);
                });
            } else {
                MessageToast.show("Please Select a Row to Delete");
            }
            
            },          
        });
    });
